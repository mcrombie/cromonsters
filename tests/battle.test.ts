import { describe, expect, it } from 'vitest';
import {
  affinityModifier,
  calculateDamage,
  escapeChance,
  recruitmentChance,
  resolveTurn,
  startBattle,
  turnOrder,
} from '../src/core/battle';
import {
  availableMoves,
  chargesFor,
  createCompanion,
  gainXp,
  healCompanion,
  learnedMoves,
  MAX_LEVEL,
  maxUses,
  statsFor,
  xpToNext,
} from '../src/core/progression';
import { getCromon, ROSTER, STARTERS } from '../src/data/roster';
import { getMove } from '../src/data/moves';
import type { BattleState, Technique } from '../src/core/types';

const reliable = () => 0.5;
const supplies = { invitations: 8, salves: 4 };
const setup = (): BattleState =>
  startBattle([createCompanion('003')], createCompanion('005'), 'wild', supplies);
const attackFor = (state: BattleState) =>
  availableMoves(state.party[state.active]).find((move) => move.power > 0)!;

describe('ecological approaches and damage', () => {
  it('uses only the documented three-way relationship', () => {
    expect(affinityModifier('Anchor', 'Skitter')).toBe(1.35);
    expect(affinityModifier('Skitter', 'Signal')).toBe(1.35);
    expect(affinityModifier('Signal', 'Anchor')).toBe(1.35);
    expect(affinityModifier('Anchor', 'Signal')).toBe(0.8);
    expect(affinityModifier('Signal', 'Skitter')).toBe(0.8);
    expect(affinityModifier('Skitter', 'Anchor')).toBe(0.8);
    for (const affinity of ['Anchor', 'Skitter', 'Signal'] as const)
      expect(affinityModifier(affinity, affinity)).toBe(1);
  });

  it('gives positive integer damage and zero damage for support techniques', () => {
    const attacker = createCompanion('003', 1);
    const defender = createCompanion('005', 1);
    const move = getMove('anchor-nudge');
    const damage = calculateDamage(attacker, defender, move, reliable);
    expect(Number.isInteger(damage)).toBe(true);
    expect(damage).toBeGreaterThan(0);
    expect(calculateDamage(attacker, defender, { ...move, power: 0 }, reliable)).toBe(0);
    expect(
      calculateDamage(attacker, createCompanion('003', 50), { ...move, power: 0.1 }, reliable),
    ).toBe(1);
  });

  it('uses affinity, level, and bounded random variation', () => {
    const attacker = createCompanion('003', 3);
    const defender = createCompanion('003', 3);
    const neutral = getMove('anchor-nudge');
    const strong = { ...neutral, affinity: 'Signal' as const };
    const weak = { ...neutral, affinity: 'Skitter' as const };
    const middle = calculateDamage(attacker, defender, neutral, reliable);
    expect(calculateDamage(attacker, defender, strong, reliable)).toBeGreaterThan(middle);
    expect(calculateDamage(attacker, defender, weak, reliable)).toBeLessThan(middle);
    expect(
      calculateDamage(createCompanion('003', 20), defender, neutral, reliable),
    ).toBeGreaterThan(middle);
    expect(calculateDamage(attacker, defender, neutral, () => 0)).toBeLessThanOrEqual(middle);
    expect(calculateDamage(attacker, defender, neutral, () => 1)).toBeGreaterThanOrEqual(middle);
  });

  it('matches the documented level-one Weirwhittle damage reference', () => {
    const companion = createCompanion('003', 1);
    const move = getMove('anchor-nudge');
    expect(calculateDamage(companion, companion, move, reliable)).toBe(7);
    expect(calculateDamage(companion, companion, { ...move, affinity: 'Signal' }, reliable)).toBe(
      10,
    );
    expect(calculateDamage(companion, companion, { ...move, affinity: 'Skitter' }, reliable)).toBe(
      6,
    );
  });

  it('uses priority before tempo and resolves ties in the player’s favor', () => {
    const slower = createCompanion('003');
    const faster = createCompanion('021');
    const ordinary = getMove('anchor-nudge');
    const urgent: Technique = { ...ordinary, priority: 1 };
    expect(statsFor(faster).tempo).toBeGreaterThan(statsFor(slower).tempo);
    expect(turnOrder(slower, faster, ordinary, ordinary)).toEqual(['enemy', 'player']);
    expect(turnOrder(slower, faster, urgent, ordinary)).toEqual(['player', 'enemy']);
    expect(turnOrder(slower, slower, ordinary, ordinary)).toEqual(['player', 'enemy']);
  });
});

describe('experience and companionship', () => {
  it('creates unique, healthy companions and returns unlocked techniques', () => {
    for (const species of ROSTER) {
      const companion = createCompanion(species.id);
      expect(companion.hp).toBe(statsFor(companion).vitality);
      expect(availableMoves(companion).length).toBeGreaterThanOrEqual(2);
      expect(createCompanion(species.id).uid).not.toBe(companion.uid);
    }
  });

  it('carries experience across multiple levels and adds new maximum vitality', () => {
    const original = createCompanion('003', 3);
    original.hp = 10;
    const next = gainXp(original, xpToNext(3) + xpToNext(4) + 2);
    expect(next.level).toBe(5);
    expect(next.xp).toBe(2);
    expect(next.hp).toBe(18);
    expect(original.level).toBe(3);
    expect(original.hp).toBe(10);
  });

  it('never revives through experience, clamps max level, and heals immutably', () => {
    const resting = createCompanion('003', MAX_LEVEL - 1);
    resting.hp = 0;
    const next = gainXp(resting, 100000);
    expect(next.level).toBe(MAX_LEVEL);
    expect(next.hp).toBe(0);
    expect(next.xp).toBe(0);
    expect(healCompanion(next).hp).toBe(statsFor(next).vitality);
    expect(next.hp).toBe(0);
    expect(gainXp(next, -100)).toEqual(next);
  });

  it('weights missing vitality and slowing more heavily than observation, without guarantees', () => {
    const state = setup();
    expect(recruitmentChance(state)).toBeCloseTo(0.2);
    expect(recruitmentChance({ ...state, bond: 1 })).toBeCloseTo(0.24);
    expect(recruitmentChance({ ...state, bond: 3 })).toBeCloseTo(0.32);
    expect(recruitmentChance({ ...state, bond: 100 })).toBeCloseTo(0.32);
    expect(recruitmentChance({ ...state, enemySlow: 1 })).toBeCloseTo(0.32);
    expect(recruitmentChance({ ...state, enemy: { ...state.enemy, hp: 1 } })).toBeGreaterThan(0.7);
    expect(
      recruitmentChance({ ...state, enemy: { ...state.enemy, hp: 1 }, bond: 3, enemySlow: 2 }),
    ).toBe(0.95);
    expect(recruitmentChance({ ...state, kind: 'peer' })).toBe(0);
    expect(recruitmentChance({ ...state, enemy: { ...state.enemy, hp: 0 } })).toBe(0);
  });
});

describe('complete battle turns', () => {
  it('copies all mutable state and leaves inputs untouched', () => {
    const party = [createCompanion('003')];
    const enemy = createCompanion('005');
    const state = startBattle(party, enemy, 'wild', supplies);
    const snapshot = JSON.stringify(state);
    resolveTurn(state, { type: 'move', moveId: attackFor(state).id }, reliable);
    expect(JSON.stringify(state)).toBe(snapshot);
    expect(state.party[0]).not.toBe(party[0]);
    expect(state.enemy).not.toBe(enemy);
    expect(state.supplies).not.toBe(supplies);
  });

  it('makes observation then invitation a complete, non-injuring recruitment path', () => {
    let state = setup();
    const enemyHp = state.enemy.hp;
    for (let turn = 0; turn < 3; turn++) state = resolveTurn(state, { type: 'observe' }, reliable);
    expect(state.enemy.hp).toBe(enemyHp);
    expect(state.bond).toBe(3);
    expect(state.party[0].hp).toBeGreaterThan(0);
    state = resolveTurn(state, { type: 'invite' }, () => 0.1);
    expect(state.result).toBe('recruited');
    expect(state.supplies.invitations).toBe(7);
    expect(state.party[0].xp).toBeGreaterThan(0);
  });

  it('lets low trust invitations fail while consuming one ribbon and an enemy turn', () => {
    const state = setup();
    const next = resolveTurn(state, { type: 'invite' }, () => 0.7);
    expect(next.result).toBeNull();
    expect(next.supplies.invitations).toBe(7);
    expect(next.round).toBe(1);
  });

  it('rejects unavailable moves, empty supplies, and invitations to a fellow walker', () => {
    const state = setup();
    for (const moveId of ['missing', 'sig-030']) {
      const next = resolveTurn(state, { type: 'move', moveId }, reliable);
      expect(next.round).toBe(0);
      expect(next.enemy.hp).toBe(state.enemy.hp);
      expect(next.party[0].hp).toBe(state.party[0].hp);
    }
    expect(
      resolveTurn({ ...state, supplies: { invitations: 0, salves: 0 } }, { type: 'invite' }).round,
    ).toBe(0);
    expect(
      resolveTurn({ ...state, supplies: { invitations: 0, salves: 0 } }, { type: 'salve' }).round,
    ).toBe(0);
    const peer = resolveTurn({ ...state, kind: 'peer' }, { type: 'invite' });
    expect(peer.round).toBe(0);
    expect(peer.supplies.invitations).toBe(8);
  });

  it('heals with one broth wrap and does not waste one at full vitality', () => {
    const state = setup();
    expect(resolveTurn(state, { type: 'salve' }, reliable).round).toBe(0);
    state.party[0].hp = 2;
    const next = resolveTurn(state, { type: 'salve' }, reliable);
    expect(next.supplies.salves).toBe(3);
    expect(next.party[0].hp).toBeGreaterThan(2);
    expect(next.round).toBe(1);
  });

  it('switches party members with an enemy response and rejects resting members', () => {
    const state = setup();
    state.party.push(createCompanion('021'));
    const next = resolveTurn(state, { type: 'switch', index: 1 }, reliable);
    expect(next.active).toBe(1);
    expect(next.party[0].hp).toBe(state.party[0].hp);
    expect(next.round).toBe(1);
    const invalid = { ...state, party: [state.party[0], { ...state.party[1], hp: 0 }] };
    expect(resolveTurn(invalid, { type: 'switch', index: 1 }).round).toBe(0);
    expect(resolveTurn(state, { type: 'switch', index: 99 }).round).toBe(0);
  });

  it('automatically replaces a defeated companion and ends when all need rest', () => {
    const state = setup();
    state.party[0].hp = 1;
    const defeat = resolveTurn(state, { type: 'observe' }, reliable);
    expect(defeat.result).toBe('defeat');
    expect(defeat.party[0].hp).toBe(0);
    state.party.push(createCompanion('021'));
    const replaced = resolveTurn(state, { type: 'observe' }, reliable);
    expect(replaced.active).toBe(1);
    expect(replaced.result).toBeNull();
    expect(replaced.party[1].hp).toBe(state.party[1].hp);
  });

  it('detects a completely resting party at battle start', () => {
    const resting = { ...createCompanion('003'), hp: 0 };
    expect(startBattle([], createCompanion('005'), 'wild', supplies).result).toBe('defeat');
    expect(startBattle([resting], createCompanion('005'), 'wild', supplies).result).toBe('defeat');
    expect(
      startBattle([resting, createCompanion('021')], createCompanion('005'), 'wild', supplies)
        .active,
    ).toBe(1);
  });

  it('rewards victory, supports fleeing, and never resolves a finished battle again', () => {
    const state = setup();
    state.enemy.hp = 1;
    const next = resolveTurn(state, { type: 'move', moveId: attackFor(state).id }, reliable);
    expect(next.result).toBe('victory');
    expect(next.enemy.hp).toBe(0);
    expect(next.party[0].xp).toBe(18 + state.enemy.level * 7);
    expect(resolveTurn(next, { type: 'observe' }, reliable)).toBe(next);
    expect(resolveTurn(state, { type: 'flee' }, () => 0).result).toBe('fled');
  });

  it('consumes a guard on damage and focus on an attacking technique', () => {
    const state = setup();
    const ordinary = resolveTurn(state, { type: 'observe' }, reliable);
    const guarded = resolveTurn({ ...state, playerGuard: true }, { type: 'observe' }, reliable);
    expect(guarded.party[0].hp).toBeGreaterThan(ordinary.party[0].hp);
    expect(guarded.playerGuard).toBe(false);
    const action = { type: 'move' as const, moveId: attackFor(state).id };
    const attack = resolveTurn(state, action, reliable);
    const focused = resolveTurn({ ...state, playerFocus: true }, action, reliable);
    expect(focused.enemy.hp).toBeLessThan(attack.enemy.hp);
    expect(focused.playerFocus).toBe(false);
  });

  it('applies focus reliability to an uncertain attack and clears it after use', () => {
    const state = startBattle(
      [createCompanion('007', 8)],
      createCompanion('003', 8),
      'wild',
      supplies,
    );
    const action = { type: 'move' as const, moveId: 'sig-007' };
    const missed = resolveTurn(state, action, () => 0.999999);
    expect(missed.enemy.hp).toBe(state.enemy.hp);
    expect(missed.log.some((line) => line.includes('timing slips'))).toBe(true);
    const focused = resolveTurn({ ...state, playerFocus: true }, action, () => 0.999999);
    expect(focused.enemy.hp).toBeLessThan(state.enemy.hp);
    expect(focused.playerFocus).toBe(false);
  });

  it('lets wild neighbors pull punches while fellow walkers practice at full force', () => {
    const state = setup();
    const wild = resolveTurn(state, { type: 'observe' }, reliable);
    const peer = resolveTurn({ ...state, kind: 'peer' }, { type: 'observe' }, reliable);
    expect(wild.party[0].hp).toBeGreaterThan(peer.party[0].hp);
  });

  it('keeps a slowing effect for exactly the next two turn orders', () => {
    const controller = ROSTER.find((species) => getMove(species.signature).effect === 'slow')!;
    expect(controller).toBeDefined();
    let state = startBattle(
      [createCompanion(controller.id, 7)],
      createCompanion('003', 7),
      'wild',
      supplies,
    );
    state = resolveTurn(state, { type: 'move', moveId: controller.signature }, reliable);
    expect(state.enemySlow).toBe(2);
    state = resolveTurn(state, { type: 'observe' }, reliable);
    expect(state.enemySlow).toBe(1);
    state = resolveTurn(state, { type: 'observe' }, reliable);
    expect(state.enemySlow).toBe(0);
  });

  it('can battle every roster member to a real outcome', () => {
    for (const species of ROSTER) {
      let state = startBattle(
        [createCompanion('003', 7), createCompanion('005', 7), createCompanion('021', 7)],
        createCompanion(species.id, 3),
        'showcase',
        supplies,
      );
      for (let turn = 0; turn < 30 && !state.result; turn++) {
        state = resolveTurn(state, { type: 'move', moveId: attackFor(state).id }, reliable);
      }
      expect(state.result, `${getCromon(species.id).name} must finish a battle`).toBe('victory');
      expect(state.round).toBeGreaterThan(0);
    }
  });

  it('lets each starter make a low-impact invitation attempt against every low-level species', () => {
    for (const starter of STARTERS) {
      for (const species of ROSTER) {
        let state = startBattle(
          [createCompanion(starter, 3)],
          createCompanion(species.id, 4),
          'wild',
          supplies,
        );
        for (let turn = 0; turn < 3; turn++)
          state = resolveTurn(state, { type: 'observe' }, reliable);
        expect(recruitmentChance(state)).toBeCloseTo(0.32);
        state = resolveTurn(state, { type: 'invite' }, () => 0.1);
        expect(state.result, `${starter} observing ${species.id}`).toBe('recruited');
        expect(state.party[0].hp).toBeGreaterThan(0);
      }
    }
  });

  it('uses the displayed invitation chance before a slowing counter expires', () => {
    const state = { ...setup(), enemySlow: 1 };
    expect(recruitmentChance(state)).toBeCloseTo(0.32);
    expect(resolveTurn(state, { type: 'invite' }, () => 0.3).result).toBe('recruited');
  });

  it('splits earned experience among healthy participants and leaves reserves in the party untrained', () => {
    let state = setup();
    state.party.push(createCompanion('021'), createCompanion('004'));
    state = resolveTurn(state, { type: 'switch', index: 1 }, reliable);
    state.enemy.hp = 1;
    state = resolveTurn(state, { type: 'move', moveId: attackFor(state).id }, reliable);
    expect(state.result).toBe('victory');
    expect(state.party.map((companion) => companion.xp)).toEqual([19, 19, 0]);
  });

  it('records ordered independent presentation snapshots at the moment damage is dealt', () => {
    const state = setup();
    state.enemy.charges!['sig-005'] = 0;
    const next = resolveTurn(state, { type: 'move', moveId: attackFor(state).id }, reliable);
    expect(next.events).toHaveLength(2);
    expect(next.events![0].party[0].hp).toBeLessThan(state.party[0].hp);
    expect(next.events![0].enemy.hp).toBe(state.enemy.hp);
    expect(next.events![1].enemy.hp).toBeLessThan(state.enemy.hp);
    expect(next.events![1].party[0].charges).not.toBe(next.party[0].charges);
    expect(next.events![0].party[0].charges).not.toBe(next.events![1].party[0].charges);
    const second = resolveTurn(next, { type: 'move', moveId: 'missing' }, reliable);
    expect(second.events).toHaveLength(1);
    expect(second.round).toBe(next.round);
  });

  it('updates experience and level in reward snapshots before the corresponding messages', () => {
    const state = setup();
    state.party[0].xp = xpToNext(3) - 1;
    state.enemy.hp = 1;
    const next = resolveTurn(state, { type: 'move', moveId: attackFor(state).id }, reliable);
    const won = next.events!.find((event) => event.text.includes('win the bout'))!;
    const earned = next.events!.find((event) => event.text.includes('earns'))!;
    const leveled = next.events!.find((event) => event.text.includes('reaches level'))!;
    expect(won.party[0].level).toBe(3);
    expect(won.party[0].xp).toBe(xpToNext(3) - 1);
    expect(earned.party[0].level).toBe(4);
    expect(earned.party[0].xp).toBe(38);
    expect(earned.party[0]).toEqual(next.party[0]);
    expect(leveled.party[0]).toEqual(next.party[0]);
    expect(leveled.party[0]).not.toBe(earned.party[0]);
    expect(earned.party[0].hp).toBe(won.party[0].hp + 4);
  });

  it('shows status creation and consumption only after each corresponding event', () => {
    const state = setup();
    state.enemy.charges!['sig-005'] = 0;
    const guarded = resolveTurn(state, { type: 'move', moveId: 'sig-003' }, reliable);
    const strike = guarded.events!.find((event) => event.text.includes('uses Pocket Weir'))!;
    const brace = guarded.events!.find((event) => event.text.includes('braces'))!;
    expect(strike.effects?.playerGuard).toBe(false);
    expect(brace.effects?.playerGuard).toBe(true);
    const next = resolveTurn(guarded, { type: 'move', moveId: 'anchor-nudge' }, reliable);
    expect(next.events![0].effects?.playerGuard).toBe(false);
    expect(brace.effects?.playerGuard).toBe(true);
    expect(brace.effects).not.toBe(next.events![0].effects);

    const focused = setup();
    focused.enemy.charges!['signal-nudge'] = 0;
    const afterFocus = resolveTurn(focused, { type: 'observe' }, reliable);
    const echo = afterFocus.events!.find((event) => event.text.includes('uses Echo Stitch'))!;
    const focus = afterFocus.events!.find((event) => event.text.includes('focuses'))!;
    expect(echo.effects?.enemyFocus).toBe(false);
    expect(focus.effects?.enemyFocus).toBe(true);

    const slowed = startBattle(
      [createCompanion('002', 7)],
      createCompanion('003', 7),
      'wild',
      supplies,
    );
    const afterSlow = resolveTurn(slowed, { type: 'move', moveId: 'sig-002' }, reliable);
    const beforeSlowing = afterSlow.events!.find((event) =>
      event.text.includes('uses Reedlane Step'),
    )!;
    const slow = afterSlow.events!.find((event) => event.text.includes('slowed for'))!;
    expect(beforeSlowing.effects?.enemySlow).toBe(0);
    expect(slow.effects?.enemySlow).toBe(2);
  });
});

describe('limited technique uses and rest', () => {
  it('gives every species two techniques initially and four at level seven', () => {
    for (const species of ROSTER) {
      const companion = createCompanion(species.id, 1);
      expect(learnedMoves(companion)).toHaveLength(2);
      expect(learnedMoves({ ...companion, level: 4 })).toHaveLength(3);
      expect(learnedMoves({ ...companion, level: 7 })).toHaveLength(4);
      expect(learnedMoves({ ...companion, level: MAX_LEVEL })).toHaveLength(4);
      for (const move of learnedMoves(companion))
        expect(chargesFor(companion, move.id)).toBe(maxUses(move));
    }
  });

  it('spends a use on a hit or a miss, but rejects empty techniques without taking a turn', () => {
    const state = startBattle(
      [createCompanion('007', 8)],
      createCompanion('003', 8),
      'wild',
      supplies,
    );
    const moveId = 'sig-007';
    for (const roll of [0.5, 0.999999]) {
      const next = resolveTurn(state, { type: 'move', moveId }, () => roll);
      expect(chargesFor(next.party[0], moveId)).toBe(11);
      expect(chargesFor(state.party[0], moveId)).toBe(12);
    }
    state.party[0].charges![moveId] = 0;
    const invalid = resolveTurn(state, { type: 'move', moveId }, reliable);
    expect(invalid.round).toBe(0);
    expect(invalid.enemy.hp).toBe(state.enemy.hp);
    expect(invalid.party[0].hp).toBe(state.party[0].hp);
    expect(invalid.events?.[0].text).toContain('no uses left');
  });

  it('does not spend the action of a slower companion exhausted before it can act', () => {
    const state = setup();
    const moveId = attackFor(state).id;
    state.party[0].hp = 1;
    state.party.push(createCompanion('021'));
    const next = resolveTurn(state, { type: 'move', moveId }, reliable);
    expect(next.active).toBe(1);
    expect(chargesFor(next.party[0], moveId)).toBe(chargesFor(state.party[0], moveId));
    expect(next.enemy.hp).toBe(state.enemy.hp);
    expect(next.party[1].charges).toEqual(state.party[1].charges);
  });

  it('restores vitality and all uses at Kettle rest, while wraps restore only vitality', () => {
    const state = setup();
    const moveId = attackFor(state).id;
    state.party[0].charges![moveId] = 0;
    state.party[0].hp = 3;
    const rested = healCompanion(state.party[0]);
    expect(rested.hp).toBe(statsFor(rested).vitality);
    expect(chargesFor(rested, moveId)).toBe(22);
    expect(state.party[0].hp).toBe(3);
    expect(chargesFor(state.party[0], moveId)).toBe(0);
    const wrapped = resolveTurn(state, { type: 'salve' }, reliable);
    expect(wrapped.party[0].hp).toBeGreaterThan(3);
    expect(chargesFor(wrapped.party[0], moveId)).toBe(0);
  });

  it('keeps exhausted moves visible and falls back to unlimited neutral Strain only when all run out', () => {
    const state = setup();
    const companion = state.party[0];
    const learned = learnedMoves(companion);
    companion.charges![learned[0].id] = 0;
    expect(availableMoves(companion)).toHaveLength(2);
    for (const move of learned) companion.charges![move.id] = 0;
    expect(availableMoves(companion).map((move) => move.id)).toEqual(['strain']);
    const next = resolveTurn(state, { type: 'move', moveId: 'strain' }, reliable);
    expect(next.enemy.hp).toBeLessThan(state.enemy.hp);
    expect(next.log.some((line) => line.includes('from the effort'))).toBe(true);
    expect(chargesFor(next.party[0], 'strain')).toBe(Infinity);
    expect(next.party[0].charges).toEqual(companion.charges);
    const strain = getMove('strain');
    expect(calculateDamage(companion, state.enemy, strain, reliable)).toBe(
      calculateDamage(companion, state.enemy, { ...strain, affinity: 'Signal' }, reliable),
    );
  });

  it('gives enemy techniques the same use limits and prevents selecting an exhausted move', () => {
    const state = setup();
    for (const move of learnedMoves(state.enemy)) state.enemy.charges![move.id] = 0;
    const next = resolveTurn(state, { type: 'observe' }, reliable);
    expect(next.log.some((line) => line.includes('uses Strain'))).toBe(true);
    expect(next.enemy.hp).toBeLessThan(state.enemy.hp);
    expect(next.enemy.charges).toEqual(state.enemy.charges);
  });

  it('recovers the company when last-effort recoil exhausts both remaining opponents', () => {
    const state = startBattle([createCompanion('021')], createCompanion('003'), 'wild', supplies);
    for (const move of learnedMoves(state.party[0])) state.party[0].charges![move.id] = 0;
    state.party[0].hp = 1;
    state.enemy.hp = 1;
    const next = resolveTurn(state, { type: 'move', moveId: 'strain' }, reliable);
    expect(next.enemy.hp).toBe(0);
    expect(next.party[0].hp).toBe(0);
    expect(next.result).toBe('defeat');
  });

  it('unlocks future techniques at full uses without refilling existing techniques on level gain', () => {
    const companion = createCompanion('003', 3);
    companion.charges!['anchor-nudge'] = 2;
    const next = gainXp(companion, xpToNext(3));
    expect(learnedMoves(next)).toHaveLength(3);
    expect(chargesFor(next, 'anchor-nudge')).toBe(2);
    expect(chargesFor(next, learnedMoves(next)[2].id)).toBe(maxUses(learnedMoves(next)[2]));
  });
});

describe('retreat opportunities', () => {
  it('favors tempo, consumes failed turns, and guarantees the third attempt', () => {
    let state = setup();
    const chance = escapeChance(state);
    const quicker = { ...state, party: [createCompanion('021')] };
    expect(escapeChance(quicker)).toBeGreaterThan(chance);
    state = resolveTurn(state, { type: 'flee' }, () => 0.999999);
    expect(state.result).toBeNull();
    expect(state.round).toBe(1);
    expect(state.party[0].hp).toBeLessThan(statsFor(state.party[0]).vitality);
    expect(escapeChance(state)).toBeGreaterThan(chance);
    state = resolveTurn(state, { type: 'flee' }, () => 0.999999);
    expect(state.result).toBeNull();
    expect(escapeChance(state)).toBe(1);
    state = resolveTurn(state, { type: 'flee' }, () => 0.999999);
    expect(state.result).toBe('fled');
    expect(state.round).toBe(3);
  });

  it('blocks withdrawing from agreed human bouts and always permits leaving the showcase', () => {
    const state = setup();
    const peer = { ...state, kind: 'peer' as const };
    expect(escapeChance(peer)).toBe(0);
    const refused = resolveTurn(peer, { type: 'flee' }, () => 0);
    expect(refused.result).toBeNull();
    expect(refused.round).toBe(0);
    expect(refused.party[0].hp).toBe(peer.party[0].hp);
    expect(
      resolveTurn({ ...state, kind: 'showcase' }, { type: 'flee' }, () => 0.999999).result,
    ).toBe('fled');
  });
});
