import { ROSTER } from '../data/roster';
import { MAP_HEIGHT, MAP_IDS, MAP_WIDTH } from '../data/world';
import { learnedMoves, MAX_LEVEL, maxUses, PARTY_LIMIT, statsFor, xpToNext } from './progression';
import { canWalk } from './world';
import type { Companion, MapId, SaveData } from './types';

export const SAVE_KEY = 'cromonsters.field-save.v1';
const mapIds = MAP_IDS;
const species = new Set(ROSTER.map((entry) => entry.id));

export function newSave(): SaveData {
  return {
    version: 1,
    player: { map: 'town', x: 12, y: 10, facing: 'south' },
    party: [],
    reserve: [],
    seen: [],
    recruited: [],
    visited: ['town'],
    discoveries: [],
    supplies: { invitations: 8, salves: 4 },
    credits: 30,
    starterChosen: false,
    peerWon: false,
    completed: false,
    muted: false,
    steps: 0,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function integer(value: unknown, minimum: number, maximum: number): value is number {
  return (
    typeof value === 'number' && Number.isInteger(value) && value >= minimum && value <= maximum
  );
}

function strings(value: unknown, validate: (entry: string) => boolean): value is string[] {
  return (
    Array.isArray(value) &&
    value.length <= 10000 &&
    value.every((entry) => typeof entry === 'string' && validate(entry)) &&
    new Set(value).size === value.length
  );
}

function validCompanion(value: unknown): value is Companion {
  if (!isRecord(value)) return false;
  if (typeof value.uid !== 'string' || value.uid.length < 1 || value.uid.length > 120) return false;
  if (typeof value.speciesId !== 'string' || !species.has(value.speciesId)) return false;
  if (!integer(value.level, 1, MAX_LEVEL)) return false;
  if (!integer(value.xp, 0, value.level === MAX_LEVEL ? 0 : xpToNext(value.level) - 1))
    return false;
  const companion = value as unknown as Companion;
  if (value.charges !== undefined) {
    if (!isRecord(value.charges)) return false;
    const learned = new Map(learnedMoves(companion).map((move) => [move.id, maxUses(move)]));
    if (
      !Object.entries(value.charges).every(
        ([id, uses]) => learned.has(id) && integer(uses, 0, learned.get(id)!),
      )
    )
      return false;
  }
  return integer(value.hp, 0, statsFor(companion).vitality);
}

function validSave(value: unknown): value is SaveData {
  if (!isRecord(value) || value.version !== 1 || !isRecord(value.player)) return false;
  if (!mapIds.includes(value.player.map as MapId)) return false;
  if (
    value.player.facing !== undefined &&
    !['north', 'east', 'south', 'west'].includes(value.player.facing as string)
  )
    return false;
  if (!integer(value.player.x, 0, MAP_WIDTH - 1) || !integer(value.player.y, 0, MAP_HEIGHT - 1))
    return false;
  if (!canWalk(value.player.map as MapId, value.player.x, value.player.y)) return false;
  if (
    !Array.isArray(value.party) ||
    value.party.length > PARTY_LIMIT ||
    !value.party.every(validCompanion)
  )
    return false;
  if (
    !Array.isArray(value.reserve) ||
    value.reserve.length > 10000 ||
    !value.reserve.every(validCompanion)
  )
    return false;
  const uids = [...value.party, ...value.reserve].map((entry) => entry.uid);
  if (new Set(uids).size !== uids.length) return false;
  if (!strings(value.seen, (entry) => species.has(entry))) return false;
  if (!strings(value.recruited, (entry) => species.has(entry))) return false;
  if (!strings(value.visited, (entry) => mapIds.includes(entry as MapId))) return false;
  if (!strings(value.discoveries, (entry) => entry.length > 0 && entry.length <= 120)) return false;
  if (!isRecord(value.supplies)) return false;
  if (!integer(value.supplies.invitations, 0, 100000) || !integer(value.supplies.salves, 0, 100000))
    return false;
  if (!integer(value.credits, 0, 10000000) || !integer(value.steps, 0, 1000000000)) return false;
  for (const flag of ['starterChosen', 'peerWon', 'completed', 'muted']) {
    if (typeof value[flag] !== 'boolean') return false;
  }
  if (value.starterChosen && value.party.length === 0) return false;
  if (value.peerWon && !value.starterChosen) return false;
  if (value.completed && (!value.starterChosen || !value.peerWon)) return false;
  return true;
}

export function serializeSave(state: SaveData): string {
  if (!validSave(state)) throw new TypeError('Cannot serialize an invalid field save.');
  return JSON.stringify(state);
}

export function deserializeSave(raw: string): SaveData | null {
  try {
    const value: unknown = JSON.parse(raw);
    return validSave(value) ? value : null;
  } catch {
    return null;
  }
}

export function loadSave(): SaveData | null {
  try {
    const raw = globalThis.localStorage?.getItem(SAVE_KEY);
    return raw ? deserializeSave(raw) : null;
  } catch {
    return null;
  }
}

export function persistSave(state: SaveData): boolean {
  try {
    if (!globalThis.localStorage) return false;
    globalThis.localStorage.setItem(SAVE_KEY, serializeSave(state));
    return true;
  } catch {
    return false;
  }
}
