import { getCromon } from '../data/roster';
import { getMove } from '../data/moves';
import type { Companion, Stats, Technique } from './types';

export const MAX_LEVEL = 50;
export const PARTY_LIMIT = 6;
let companionSequence = 0;

export function statsFor(companion: Companion): Stats {
  const base = getCromon(companion.speciesId).stats;
  const growth = Math.max(0, companion.level - 1);
  return {
    vitality: base.vitality + growth * 4,
    force: base.force + growth,
    guard: base.guard + Math.floor(growth * 0.7),
    tempo: base.tempo + Math.floor(growth * 0.6),
  };
}

export function createCompanion(speciesId: string, level = 3): Companion {
  getCromon(speciesId);
  const companion: Companion = {
    uid: `c-${Date.now().toString(36)}-${(++companionSequence).toString(36)}-${Math.random().toString(36).slice(2, 9)}`,
    speciesId,
    level: Math.max(1, Math.min(MAX_LEVEL, Number.isFinite(level) ? Math.floor(level) : 3)),
    xp: 0,
    hp: 0,
  };
  companion.hp = statsFor(companion).vitality;
  companion.charges = restoredCharges(companion);
  return companion;
}

export function learnedMoves(companion: Companion): Technique[] {
  const ids = getCromon(companion.speciesId)
    .moves.filter((entry) => entry.level <= companion.level)
    .map((entry) => entry.moveId);
  return [...new Set(ids)].slice(-4).map(getMove);
}

export function maxUses(move: Technique): number {
  if (move.id === 'strain') return Infinity;
  return move.maxUses ?? (move.id.startsWith('sig-') ? 12 : move.power > 0 ? 22 : 16);
}

export function chargesFor(companion: Companion, moveId: string): number {
  const maximum = maxUses(getMove(moveId));
  return companion.charges?.[moveId] ?? maximum;
}

function restoredCharges(companion: Companion): Record<string, number> {
  return Object.fromEntries(learnedMoves(companion).map((move) => [move.id, maxUses(move)]));
}

/** Keep depleted choices visible until every technique is empty, then allow Strain. */
export function availableMoves(companion: Companion): Technique[] {
  const moves = learnedMoves(companion);
  return moves.some((move) => chargesFor(companion, move.id) > 0) ? moves : [getMove('strain')];
}

export function xpToNext(level: number): number {
  return 18 + Math.max(1, Math.floor(level)) * 12;
}

export function gainXp(companion: Companion, amount: number): Companion {
  const next = { ...companion, charges: { ...companion.charges } };
  const oldMaximum = statsFor(next).vitality;
  next.xp += Math.max(0, Math.floor(Number.isFinite(amount) ? amount : 0));
  while (next.level < MAX_LEVEL && next.xp >= xpToNext(next.level)) {
    next.xp -= xpToNext(next.level);
    next.level += 1;
  }
  if (next.level === MAX_LEVEL) next.xp = 0;
  for (const move of learnedMoves(next)) next.charges[move.id] ??= maxUses(move);
  // Level growth adds vitality without reviving a resting companion.
  if (next.hp > 0) next.hp += statsFor(next).vitality - oldMaximum;
  return next;
}

export function healCompanion(companion: Companion): Companion {
  return {
    ...companion,
    hp: statsFor(companion).vitality,
    charges: restoredCharges(companion),
  };
}
