import { getCromon } from '../data/roster';
import { availableMoves, chargesFor, gainXp, statsFor } from './progression';
import type {
  Affinity,
  BattleAction,
  BattleKind,
  BattleState,
  Companion,
  Supplies,
  Technique,
} from './types';

type Side = 'player' | 'enemy';
const advantage: Record<Affinity, Affinity> = {
  Anchor: 'Skitter',
  Skitter: 'Signal',
  Signal: 'Anchor',
};
const name = (companion: Companion) => getCromon(companion.speciesId).name;
const boundedRandom = (rng: () => number) => Math.max(0, Math.min(0.999999, rng()));

export function affinityModifier(attack: Affinity, defend: Affinity): number {
  if (attack === defend) return 1;
  return advantage[attack] === defend ? 1.35 : 0.8;
}

export function calculateDamage(
  attacker: Companion,
  defender: Companion,
  move: Technique,
  random: () => number = Math.random,
): number {
  if (move.power <= 0) return 0;
  const offense = statsFor(attacker);
  const defense = statsFor(defender);
  const raw =
    (move.power + offense.force * 0.45 - defense.guard * 0.3 + attacker.level * 0.4) * 0.72;
  return Math.max(
    1,
    Math.floor(
      raw *
        (move.id === 'strain'
          ? 1
          : affinityModifier(move.affinity, getCromon(defender.speciesId).affinity)) *
        (0.9 + boundedRandom(random) * 0.2),
    ),
  );
}

function orderedSides(
  playerTempo: number,
  enemyTempo: number,
  playerMove: Technique,
  enemyMove: Technique,
): Side[] {
  const playerFirst =
    playerMove.priority !== enemyMove.priority
      ? playerMove.priority > enemyMove.priority
      : playerTempo >= enemyTempo;
  return playerFirst ? ['player', 'enemy'] : ['enemy', 'player'];
}

export function turnOrder(
  player: Companion,
  enemy: Companion,
  playerMove: Technique,
  enemyMove: Technique,
): Side[] {
  return orderedSides(statsFor(player).tempo, statsFor(enemy).tempo, playerMove, enemyMove);
}

export function recruitmentChance(state: BattleState): number {
  if (state.kind !== 'wild' || state.enemy.hp <= 0) return 0;
  const injury = 1 - state.enemy.hp / statsFor(state.enemy).vitality;
  return Math.max(
    0,
    Math.min(
      0.95,
      0.2 + injury * 0.6 + Math.min(3, state.bond) * 0.04 + (state.enemySlow > 0 ? 0.12 : 0),
    ),
  );
}

export function escapeChance(state: BattleState): number {
  if (state.kind === 'peer') return 0;
  if (state.kind === 'showcase' || (state.escapeAttempts ?? 0) >= 2) return 1;
  const playerTempo = statsFor(state.party[state.active]).tempo * (state.playerSlow > 0 ? 0.55 : 1);
  const enemyTempo = statsFor(state.enemy).tempo * (state.enemySlow > 0 ? 0.55 : 1);
  return Math.min(
    0.95,
    0.2 + 0.4 * (playerTempo / Math.max(1, enemyTempo)) + (state.escapeAttempts ?? 0) * 0.25,
  );
}

function copyCompanion(companion: Companion): Companion {
  return { ...companion, charges: { ...companion.charges } };
}

function recordParticipant(state: BattleState) {
  const uid = state.party[state.active].uid;
  if (!state.participants?.includes(uid)) state.participants = [...(state.participants ?? []), uid];
}

export function startBattle(
  party: Companion[],
  enemy: Companion,
  kind: BattleKind,
  supplies: Supplies,
): BattleState {
  const active = party.findIndex((companion) => companion.hp > 0);
  return {
    kind,
    party: party.map(copyCompanion),
    active: Math.max(0, active),
    enemy: copyCompanion(enemy),
    supplies: { ...supplies },
    round: 0,
    bond: 0,
    escapeAttempts: 0,
    participants: active >= 0 ? [party[active].uid] : [],
    playerGuard: false,
    enemyGuard: false,
    playerSlow: 0,
    enemySlow: 0,
    playerFocus: false,
    enemyFocus: false,
    log: [
      kind === 'wild'
        ? `A wild ${name(enemy)} approaches.`
        : `${name(enemy)} steps into the practice circle.`,
    ],
    result: active < 0 ? 'defeat' : enemy.hp <= 0 ? 'victory' : null,
  };
}

function addLog(state: BattleState, message: string) {
  state.log.push(message);
  state.log = state.log.slice(-14);
  state.events ??= [];
  state.events.push({
    text: message,
    party: state.party.map(copyCompanion),
    active: state.active,
    enemy: copyCompanion(state.enemy),
    effects: {
      playerGuard: state.playerGuard,
      enemyGuard: state.enemyGuard,
      playerFocus: state.playerFocus,
      enemyFocus: state.enemyFocus,
      playerSlow: state.playerSlow,
      enemySlow: state.enemySlow,
    },
  });
}

function resetPlayerEffects(state: BattleState) {
  state.playerGuard = false;
  state.playerFocus = false;
  state.playerSlow = 0;
}

function finish(state: BattleState, result: 'victory' | 'recruited') {
  state.result = result;
  const earned = 18 + state.enemy.level * 7;
  const participants = new Set(state.participants ?? [state.party[state.active].uid]);
  const eligible = state.party.filter(
    (companion) => companion.hp > 0 && participants.has(companion.uid),
  );
  for (let index = 0; index < state.party.length; index++) {
    const companion = state.party[index];
    if (!eligible.includes(companion)) continue;
    const reward = Math.max(1, Math.floor(earned / eligible.length));
    const next = gainXp(companion, reward);
    state.party[index] = next;
    addLog(state, `${name(companion)} earns ${reward} field experience.`);
    if (next.level > companion.level) {
      addLog(
        state,
        `${name(companion)} reaches level ${next.level}! New skills come with practice.`,
      );
    }
  }
}

function checkDefeat(state: BattleState): boolean {
  if (state.enemy.hp <= 0) {
    if (!state.party.some((companion) => companion.hp > 0)) {
      state.result = 'defeat';
      addLog(state, 'Both sides are exhausted. Return to the Kettle House for recovery.');
      return true;
    }
    addLog(state, `${name(state.enemy)} is exhausted. You win the bout.`);
    finish(state, 'victory');
    return true;
  }
  if (state.party[state.active].hp <= 0) {
    addLog(state, `${name(state.party[state.active])} needs a rest.`);
    const next = state.party.findIndex((companion) => companion.hp > 0);
    if (next < 0) {
      state.result = 'defeat';
      addLog(
        state,
        'The whole walking company needs a breather. Return to the Kettle House in town.',
      );
      return true;
    }
    state.active = next;
    recordParticipant(state);
    resetPlayerEffects(state);
    addLog(state, `${name(state.party[next])} volunteers to take over.`);
  }
  return false;
}

function chooseEnemyMove(state: BattleState, rng: () => number): Technique {
  const moves = availableMoves(state.enemy).filter((move) => chargesFor(state.enemy, move.id) > 0);
  const hpFraction = state.enemy.hp / statsFor(state.enemy).vitality;
  const healing = moves.find((move) => move.effect === 'heal');
  if (healing && hpFraction < 0.4 && boundedRandom(rng) < 0.65) return healing;
  const preparations = moves.filter(
    (move) =>
      (move.effect === 'guard' && !state.enemyGuard) ||
      (move.effect === 'focus' && !state.enemyFocus),
  );
  if (preparations.length && boundedRandom(rng) < 0.15) return preparations[0];
  const attacks = moves.filter((move) => move.power > 0);
  const choices = attacks.length ? attacks : moves;
  return choices[Math.floor(boundedRandom(rng) * choices.length)];
}

function useTechnique(
  state: BattleState,
  side: Side,
  move: Technique,
  rng: () => number,
  gentle = false,
) {
  const playerSide = side === 'player';
  const attacker = playerSide ? state.party[state.active] : state.enemy;
  const defender = playerSide ? state.enemy : state.party[state.active];
  if (move.id !== 'strain') {
    attacker.charges ??= {};
    attacker.charges[move.id] = Math.max(0, chargesFor(attacker, move.id) - 1);
  }
  const focusKey = playerSide ? 'playerFocus' : 'enemyFocus';
  const guardKey = playerSide ? 'enemyGuard' : 'playerGuard';
  const focused = state[focusKey];
  if (move.power > 0) state[focusKey] = false;
  if (boundedRandom(rng) >= Math.min(1, move.accuracy + (focused ? 0.2 : 0))) {
    addLog(state, `${name(attacker)} tries ${move.name}, but the timing slips.`);
    return;
  }
  let damage = calculateDamage(attacker, defender, move, rng);
  if (damage > 0) {
    if (focused) damage = Math.max(1, Math.floor(damage * 1.25));
    // Curious wild neighbors pull their punches; supervised peer bouts use full force.
    if (!playerSide && state.kind === 'wild') damage = Math.max(1, Math.floor(damage * 0.9));
    if (state[guardKey]) {
      damage = Math.max(1, Math.floor(damage * 0.5));
      state[guardKey] = false;
    }
    if (gentle) damage = Math.max(1, Math.floor(damage * 0.4));
    defender.hp = Math.max(0, defender.hp - damage);
    const modifier =
      move.id === 'strain'
        ? 1
        : affinityModifier(move.affinity, getCromon(defender.speciesId).affinity);
    const hint = modifier > 1 ? ' Strong approach!' : modifier < 1 ? ' Resisted approach.' : '';
    addLog(state, `${name(attacker)} uses ${move.name}: ${damage} vitality.${hint}`);
    if (move.id === 'strain') {
      const recoil = Math.max(1, Math.floor(damage * 0.25));
      attacker.hp = Math.max(0, attacker.hp - recoil);
      addLog(state, `${name(attacker)} loses ${recoil} vitality from the effort.`);
    }
  } else {
    addLog(state, `${name(attacker)} uses ${move.name}.`);
  }
  if (move.effect === 'guard') {
    state[playerSide ? 'playerGuard' : 'enemyGuard'] = true;
    addLog(state, `${name(attacker)} braces: the next damaging hit is halved.`);
  } else if (move.effect === 'focus') {
    state[focusKey] = true;
    addLog(state, `${name(attacker)} focuses: the next attack gains accuracy and force.`);
  } else if (move.effect === 'slow' && defender.hp > 0) {
    state[playerSide ? 'enemySlow' : 'playerSlow'] = 2;
    addLog(state, `${name(defender)} is slowed for two turn orders.`);
  } else if (move.effect === 'heal') {
    const maximum = statsFor(attacker).vitality;
    const restored = Math.min(maximum - attacker.hp, Math.ceil(maximum * 0.3));
    attacker.hp += restored;
    addLog(state, `${name(attacker)} recovers ${restored} vitality.`);
  }
}

export function resolveTurn(
  original: BattleState,
  action: BattleAction,
  rng: () => number = Math.random,
): BattleState {
  if (original.result) return original;
  const state: BattleState = {
    ...original,
    party: original.party.map(copyCompanion),
    enemy: copyCompanion(original.enemy),
    participants: [...(original.participants ?? [original.party[original.active].uid])],
    supplies: { ...original.supplies },
    log: [...original.log],
    events: [],
  };
  const active = state.party[state.active];
  const selectedMove =
    action.type === 'move'
      ? availableMoves(active).find((move) => move.id === action.moveId)
      : undefined;
  let invalid = '';
  if (action.type === 'move' && !selectedMove) invalid = 'That technique has not been learned yet.';
  else if (selectedMove && chargesFor(active, selectedMove.id) <= 0)
    invalid = `${selectedMove.name} has no uses left. Choose another technique or return for Kettle rest.`;
  if (action.type === 'flee' && state.kind === 'peer')
    invalid = 'Finish the agreed bout with your fellow walker.';
  if (action.type === 'switch') {
    if (
      !state.party[action.index] ||
      state.party[action.index].hp <= 0 ||
      action.index === state.active
    )
      invalid = 'Choose another rested member of the walking company.';
  }
  if (action.type === 'invite') {
    if (state.kind !== 'wild') invalid = 'Only a wild Cromon can accept an invitation ribbon.';
    else if (state.supplies.invitations < 1)
      invalid = 'No invitation ribbons remain. Supplies are available in town.';
  }
  if (action.type === 'salve') {
    if (state.supplies.salves < 1) invalid = 'No broth wraps remain.';
    else if (active.hp >= statsFor(active).vitality)
      invalid = `${name(active)} already has full vitality.`;
  }
  if (invalid) {
    addLog(state, invalid);
    return state;
  }
  state.round += 1;
  if (action.type === 'flee') {
    const escaped = boundedRandom(rng) < escapeChance(state);
    state.escapeAttempts = (state.escapeAttempts ?? 0) + 1;
    if (escaped) {
      state.result = 'fled';
      addLog(state, 'You find an opening and retreat to the path.');
      return state;
    }
    addLog(state, 'No clear opening. The wild Cromon blocks your retreat.');
  }

  const enemyMove = chooseEnemyMove(state, rng);
  const invitationChance = recruitmentChance(state);
  const order = selectedMove
    ? orderedSides(
        statsFor(active).tempo * (state.playerSlow > 0 ? 0.55 : 1),
        statsFor(state.enemy).tempo * (state.enemySlow > 0 ? 0.55 : 1),
        selectedMove,
        enemyMove,
      )
    : (['player', 'enemy'] as Side[]);
  state.playerSlow = Math.max(0, state.playerSlow - 1);
  state.enemySlow = Math.max(0, state.enemySlow - 1);

  for (const side of order) {
    if (side === 'enemy') {
      useTechnique(state, 'enemy', enemyMove, rng, action.type === 'observe');
    } else if (selectedMove) {
      // A replacement companion does not inherit its predecessor's action.
      if (state.party[state.active].uid !== active.uid) continue;
      useTechnique(state, 'player', selectedMove, rng);
    } else if (action.type === 'switch') {
      state.active = action.index;
      recordParticipant(state);
      resetPlayerEffects(state);
      addLog(state, `${name(state.party[state.active])} takes the field. Switching uses a turn.`);
    } else if (action.type === 'observe') {
      state.bond = Math.min(3, state.bond + 1);
      addLog(
        state,
        `You quietly observe ${name(state.enemy)}. ${getCromon(state.enemy.speciesId).affinity} approach; the response is gentler.`,
      );
      if (state.kind === 'wild') {
        addLog(
          state,
          `Trust grows. invitation ribbon chance: ${Math.round(recruitmentChance(state) * 100)}%.`,
        );
      }
    } else if (action.type === 'invite') {
      state.supplies.invitations -= 1;
      if (boundedRandom(rng) < invitationChance) {
        addLog(
          state,
          `${name(state.enemy)} accepts your invitation ribbon. A willing traveling companion!`,
        );
        finish(state, 'recruited');
        break;
      }
      addLog(
        state,
        `${name(state.enemy)} declines for now. Lower vitality and a slowed opponent improve the invitation chance.`,
      );
    } else if (action.type === 'salve') {
      state.supplies.salves -= 1;
      const maximum = statsFor(active).vitality;
      const restored = Math.min(maximum - active.hp, Math.ceil(maximum * 0.65));
      active.hp += restored;
      addLog(state, `Broth wrap restores ${restored} vitality to ${name(active)}.`);
    }
    if (checkDefeat(state)) break;
  }
  return state;
}
