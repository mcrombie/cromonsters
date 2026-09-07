import { describe, it, expect } from 'vitest';
import { WORLD, MAP_IDS, MAP_HEIGHT, MAP_WIDTH, FIELD_IDS } from '../src/data/world';
import { canOccupy, canWalk, findPath, selectEncounter, trialComplete } from '../src/core/world';
import { ROSTER } from '../src/data/roster';
import { deserializeSave, newSave, serializeSave } from '../src/core/save';
import type { MapId } from '../src/core/types';

function adjacent(map: MapId, point: { x: number; y: number }) {
  return [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
  ]
    .map(([dx, dy]) => ({ x: point.x + dx, y: point.y + dy }))
    .filter((neighbor) => canOccupy(map, neighbor.x, neighbor.y));
}
describe('world integrity', () => {
  it('has exactly one town and four compact habitats', () => {
    expect(MAP_IDS).toHaveLength(5);
    expect(FIELD_IDS).toHaveLength(4);
  });
  for (const map of Object.values(WORLD)) {
    it(map.id + ' has valid reachable transitions and discoveries', () => {
      expect(map.tiles).toHaveLength(MAP_HEIGHT);
      expect(map.tiles.every((r) => r.length === MAP_WIDTH)).toBe(true);
      expect(canWalk(map.id, map.spawn.x, map.spawn.y)).toBe(true);
      for (const obj of map.objects) {
        expect(canWalk(map.id, obj.x, obj.y)).toBe(true);
        expect(
          adjacent(map.id, obj).some(
            (point) =>
              findPath(map.id, map.spawn, point).length > 0 ||
              (point.x === map.spawn.x && point.y === map.spawn.y),
          ),
        ).toBe(true);
        if (obj.target) {
          expect(MAP_IDS).toContain(obj.target);
          expect(WORLD[obj.target].objects.some((o) => o.target === map.id)).toBe(true);
        }
      }
    });
    it(map.id + ' encounter references and levels are valid', () => {
      for (const e of map.encounters) {
        expect(ROSTER.some((c) => c.id === e.speciesId)).toBe(true);
        expect(e.weight).toBeGreaterThan(0);
        expect(e.minLevel).toBeGreaterThan(0);
        expect(e.maxLevel).toBeGreaterThanOrEqual(e.minLevel);
      }
      if (map.id !== 'town') expect(selectEncounter(map.id, () => 0)).toEqual(map.encounters[0]);
    });
  }
  it('makes at least half the roster available through exploration', () =>
    expect(
      new Set(Object.values(WORLD).flatMap((m) => m.encounters.map((e) => e.speciesId))).size,
    ).toBeGreaterThanOrEqual(15));
  it('blocks deep water, woodland boundary and building collision', () => {
    expect(canWalk('town', 0, 0)).toBe(false);
    expect(canWalk('inlet', 20, 4)).toBe(false);
    expect(canWalk('town', 6, 3)).toBe(false);
  });
  it('blocks actual NPC bodies for movement and routes while retaining usable signposts', () => {
    for (const map of Object.values(WORLD)) {
      for (const object of map.objects) {
        if (object.kind === 'guide' || object.kind === 'peer') {
          expect(canOccupy(map.id, object.x, object.y)).toBe(false);
          expect(findPath(map.id, map.spawn, object)).toEqual([]);
          for (const point of adjacent(map.id, object)) {
            expect(
              findPath(map.id, map.spawn, point).every((step) => canOccupy(map.id, step.x, step.y)),
            ).toBe(true);
          }
        } else expect(canOccupy(map.id, object.x, object.y)).toBe(true);
      }
    }
  });
  it('preserves legacy saves standing on NPC tiles and allows walking away', () => {
    for (const map of Object.values(WORLD)) {
      for (const object of map.objects.filter((o) => o.kind === 'guide' || o.kind === 'peer')) {
        const oldSave = newSave();
        oldSave.player = { map: map.id, x: object.x, y: object.y };
        expect(deserializeSave(serializeSave(oldSave))).toEqual(oldSave);
        const path = findPath(map.id, oldSave.player, map.spawn);
        expect(path.length).toBeGreaterThan(0);
        expect(path.every((step) => canOccupy(map.id, step.x, step.y))).toBe(true);
        expect(path.at(-1)).toEqual(map.spawn);
      }
    }
  });
  it('landmark walking keeps fieldwalkers on safe gravel', () => {
    for (const map of Object.values(WORLD)) {
      for (const start of map.objects) {
        for (const destination of map.objects) {
          expect(
            adjacent(map.id, destination).some((point) => {
              const path = findPath(map.id, start, point);
              return (
                (path.length > 0 || (start.x === point.x && start.y === point.y)) &&
                path.every((p) => map.tiles[p.y][p.x] === '=' && canOccupy(map.id, p.x, p.y))
              );
            }),
          ).toBe(true);
        }
      }
    }
  });
  it('requires every trial objective', () => {
    const s = newSave();
    expect(trialComplete(s)).toBe(false);
    s.visited = [...FIELD_IDS];
    s.discoveries = FIELD_IDS.map((id) => id + '-discovery');
    s.seen = ROSTER.slice(0, 6).map((c) => c.id);
    s.recruited = ['003', '004', '005'];
    s.peerWon = true;
    expect(trialComplete(s)).toBe(true);
    s.peerWon = false;
    expect(trialComplete(s)).toBe(false);
  });
});
