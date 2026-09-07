import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  chargesFor,
  createCompanion,
  healCompanion,
  PARTY_LIMIT,
  statsFor,
} from '../src/core/progression';
import { MAP_IDS, WORLD } from '../src/data/world';
import type { MapId } from '../src/core/types';
import {
  deserializeSave,
  loadSave,
  newSave,
  persistSave,
  SAVE_KEY,
  serializeSave,
} from '../src/core/save';

afterEach(() => vi.unstubAllGlobals());

function populatedSave() {
  return {
    ...newSave(),
    starterChosen: true,
    party: [createCompanion('003')],
    reserve: [createCompanion('005')],
    seen: ['003', '005'],
    recruited: ['003', '005'],
  };
}

describe('versioned field saves', () => {
  it('round-trips new and populated saves without losing state', () => {
    for (const save of [newSave(), populatedSave()]) {
      expect(deserializeSave(serializeSave(save))).toEqual(save);
    }
    expect(newSave().player).toEqual({ map: 'town', x: 12, y: 10, facing: 'south' });
    expect(newSave().supplies).toEqual({ invitations: 8, salves: 4 });
  });

  it('returns null for malformed JSON and unsupported versions', () => {
    for (const raw of ['', 'nope', '{}', 'null', '[]', '{', '{"version": 2}'])
      expect(deserializeSave(raw)).toBeNull();
    expect(deserializeSave(JSON.stringify({ ...newSave(), version: 2 }))).toBeNull();
  });

  it('rejects unknown species and duplicate companion identities', () => {
    const save = populatedSave();
    const unknown = { ...save, party: [{ ...save.party[0], speciesId: '999' }] };
    expect(deserializeSave(JSON.stringify(unknown))).toBeNull();
    expect(deserializeSave(JSON.stringify({ ...save, reserve: [save.party[0]] }))).toBeNull();
    expect(deserializeSave(JSON.stringify({ ...save, seen: ['003', '003'] }))).toBeNull();
    expect(deserializeSave(JSON.stringify({ ...save, recruited: ['missing'] }))).toBeNull();
  });

  it('rejects invalid levels, experience, vitality and party limits', () => {
    const save = populatedSave();
    for (const patch of [
      { level: 0 },
      { level: 51 },
      { level: 2.5 },
      { xp: -1 },
      { xp: 999 },
      { hp: -1 },
      { hp: statsFor(save.party[0]).vitality + 1 },
      { uid: '' },
    ]) {
      expect(
        deserializeSave(JSON.stringify({ ...save, party: [{ ...save.party[0], ...patch }] })),
      ).toBeNull();
    }
    expect(
      deserializeSave(
        JSON.stringify({
          ...save,
          party: Array.from({ length: PARTY_LIMIT + 1 }, () => createCompanion('003')),
        }),
      ),
    ).toBeNull();
    expect(deserializeSave(JSON.stringify({ ...save, party: [] }))).toBeNull();
    const resting = { ...save, party: [{ ...save.party[0], hp: 0 }] };
    expect(deserializeSave(JSON.stringify(resting))).toEqual(resting);
  });

  it('rejects maps outside the five areas and positions outside 25 by 17 tiles', () => {
    for (const player of [
      { map: 'elsewhere', x: 12, y: 10 },
      { map: 'town', x: -1, y: 10 },
      { map: 'town', x: 25, y: 10 },
      { map: 'forest', x: 12, y: 17 },
      { map: 'forest', x: 12.5, y: 10 },
    ]) {
      expect(deserializeSave(JSON.stringify({ ...newSave(), player }))).toBeNull();
    }
    expect(deserializeSave(JSON.stringify({ ...newSave(), visited: ['moon'] }))).toBeNull();
  });

  it('preserves existing version-one saves with missing charges and direction', () => {
    const old = populatedSave();
    delete old.player.facing;
    delete old.party[0].charges;
    delete old.reserve[0].charges;
    old.party[0].hp = 8;
    old.credits = 142;
    old.discoveries = ['forest-discovery'];
    const loaded = deserializeSave(JSON.stringify(old));
    expect(loaded).toEqual(old);
    expect(chargesFor(loaded!.party[0], 'anchor-nudge')).toBe(22);
    expect(chargesFor(loaded!.party[0], 'sig-003')).toBe(12);
    expect(healCompanion(loaded!.party[0]).charges).toEqual({ 'anchor-nudge': 22, 'sig-003': 12 });
  });

  it('saves all six companions, remaining technique uses, and facing direction', () => {
    const save = populatedSave();
    save.party = Array.from({ length: PARTY_LIMIT }, () => createCompanion('003'));
    save.party[0].charges!['anchor-nudge'] = 0;
    save.party[1].charges!['sig-003'] = 5;
    save.player.facing = 'west';
    expect(deserializeSave(serializeSave(save))).toEqual(save);
  });

  it('rejects invalid technique counts, unrelated techniques and invalid facing', () => {
    const save = populatedSave();
    for (const charges of [
      { 'anchor-nudge': -1 },
      { 'anchor-nudge': 23 },
      { 'sig-003': 13 },
      { 'sig-003': 1.5 },
      { 'sig-003': '12' },
      { missing: 1 },
      { 'sig-005': 12 },
      { strain: 10 },
      [],
      null,
    ]) {
      expect(
        deserializeSave(JSON.stringify({ ...save, party: [{ ...save.party[0], charges }] })),
      ).toBeNull();
    }
    expect(
      deserializeSave(JSON.stringify({ ...save, player: { ...save.player, facing: 'up' } })),
    ).toBeNull();
  });

  it('rejects otherwise valid saves located inside trees, water, or buildings', () => {
    const blocked: { map: MapId; x: number; y: number; tile: string }[] = [
      { map: 'town', x: 0, y: 0, tile: 'T' },
      { map: 'forest', x: 3, y: 7, tile: 'T' },
      { map: 'inlet', x: 20, y: 4, tile: '~' },
      { map: 'wetland', x: 3, y: 3, tile: '~' },
      { map: 'town', x: 5, y: 3, tile: '#' },
    ];
    for (const { map, x, y, tile } of blocked) {
      expect(WORLD[map].tiles[y][x]).toBe(tile);
      const save = { ...populatedSave(), player: { map, x, y } };
      expect(deserializeSave(JSON.stringify(save)), `${map} ${x},${y}`).toBeNull();
      expect(() => serializeSave(save)).toThrow(TypeError);
    }
  });

  it('accepts the walkable arrival position in all five maps', () => {
    for (const map of MAP_IDS) {
      const save = { ...populatedSave(), player: { map, ...WORLD[map].spawn } };
      expect(deserializeSave(serializeSave(save))).toEqual(save);
    }
  });

  it('rejects invalid supplies, flags and nonfinite values', () => {
    for (const patch of [
      { supplies: { invitations: -1, salves: 4 } },
      { supplies: { invitations: 1.5, salves: 4 } },
      { credits: -1 },
      { credits: Infinity },
      { muted: 'yes' },
      { steps: -1 },
      { discoveries: [null] },
      { starterChosen: null },
    ]) {
      expect(deserializeSave(JSON.stringify({ ...newSave(), ...patch }))).toBeNull();
    }
    expect(() => serializeSave({ ...newSave(), credits: -1 })).toThrow(TypeError);
    expect(deserializeSave(JSON.stringify({ ...newSave(), peerWon: true }))).toBeNull();
    expect(deserializeSave(JSON.stringify({ ...populatedSave(), completed: true }))).toBeNull();
    const finished = { ...populatedSave(), peerWon: true, completed: true };
    expect(deserializeSave(serializeSave(finished))).toEqual(finished);
  });

  it('reads and writes only its versioned browser key', () => {
    const values = new Map<string, string>();
    const storage = {
      getItem: vi.fn((key: string) => values.get(key) ?? null),
      setItem: vi.fn((key: string, value: string) => values.set(key, value)),
    };
    vi.stubGlobal('localStorage', storage);
    expect(loadSave()).toBeNull();
    const save = populatedSave();
    expect(persistSave(save)).toBe(true);
    expect(storage.setItem).toHaveBeenCalledWith(SAVE_KEY, serializeSave(save));
    expect(loadSave()).toEqual(save);
    values.set(SAVE_KEY, 'damaged');
    expect(loadSave()).toBeNull();
  });

  it('handles unavailable storage and write quota errors without throwing', () => {
    vi.stubGlobal('localStorage', undefined);
    expect(loadSave()).toBeNull();
    expect(persistSave(newSave())).toBe(false);
    vi.stubGlobal('localStorage', {
      getItem() {
        throw new Error('Storage blocked');
      },
      setItem() {
        throw new Error('Quota exhausted');
      },
    });
    expect(loadSave()).toBeNull();
    expect(persistSave(newSave())).toBe(false);
  });
});
