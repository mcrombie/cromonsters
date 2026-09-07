import { WORLD, MAP_HEIGHT, MAP_WIDTH, FIELD_IDS } from '../data/world';
import type { MapId, SaveData, Encounter } from './types';
export function canWalk(map: MapId, x: number, y: number): boolean {
  return (
    x >= 0 &&
    y >= 0 &&
    x < MAP_WIDTH &&
    y < MAP_HEIGHT &&
    !['T', '~', '#'].includes(WORLD[map].tiles[y][x])
  );
}
/** Terrain validity stays separate so saves made before NPC collision still load. */
export function canOccupy(map: MapId, x: number, y: number): boolean {
  return (
    canWalk(map, x, y) &&
    !WORLD[map].objects.some(
      (object) =>
        (object.kind === 'guide' || object.kind === 'peer') && object.x === x && object.y === y,
    )
  );
}
export function findPath(
  map: MapId,
  start: { x: number; y: number },
  end: { x: number; y: number },
): { x: number; y: number }[] {
  const queue = [{ ...start, cost: 0, path: [] as { x: number; y: number }[] }];
  const costs = new Map<string, number>([[start.x + ',' + start.y, 0]]);
  while (queue.length) {
    queue.sort((a, b) => a.cost - b.cost);
    const cur = queue.shift()!;
    if (cur.x === end.x && cur.y === end.y) return cur.path;
    for (const [dx, dy] of [
      [0, -1],
      [-1, 0],
      [1, 0],
      [0, 1],
    ]) {
      const x = cur.x + dx,
        y = cur.y + dy,
        key = x + ',' + y;
      if (!canOccupy(map, x, y)) continue;
      const cost = cur.cost + (WORLD[map].tiles[y][x] === '=' ? 1 : MAP_WIDTH * MAP_HEIGHT);
      if (cost < (costs.get(key) ?? Infinity)) {
        costs.set(key, cost);
        queue.push({ x, y, cost, path: [...cur.path, { x, y }] });
      }
    }
  }
  return [];
}
export function selectEncounter(map: MapId, rng = Math.random): Encounter | undefined {
  const table = WORLD[map].encounters;
  let value = rng() * table.reduce((n, e) => n + e.weight, 0);
  for (const item of table) {
    value -= item.weight;
    if (value < 0) return item;
  }
  return table.at(-1);
}
export function trialChecklist(save: SaveData) {
  return [
    {
      label: 'Visit all four habitats',
      value: FIELD_IDS.filter((id) => save.visited.includes(id)).length,
      target: 4,
    },
    {
      label: 'Make four habitat observations',
      value: FIELD_IDS.filter((id) => save.discoveries.includes(id + '-discovery')).length,
      target: 4,
    },
    { label: 'Record six different Cromon', value: save.seen.length, target: 6 },
    {
      label: 'Welcome two new wild species',
      value: Math.max(0, save.recruited.length - 1),
      target: 2,
    },
    { label: 'Complete Kit’s friendly bout', value: Number(save.peerWon), target: 1 },
  ];
}
export const trialComplete = (save: SaveData) =>
  trialChecklist(save).every((c) => c.value >= c.target);
