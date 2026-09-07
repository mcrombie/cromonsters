import { getCromon } from '../data/roster';
import { availableMoves, chargesFor, maxUses, statsFor, xpToNext } from '../core/progression';
import { recruitmentChance } from '../core/battle';
import type { BattleState, Companion } from '../core/types';
import { art, escapeHtml } from './helpers';
export type BattleMenu = 'root' | 'fight' | 'pack' | 'company';
export interface BattlePresentation {
  menu: BattleMenu;
  message?: string;
  hit?: 'player' | 'enemy';
}
function status(state: BattleState, player: boolean) {
  return [
    state[player ? 'playerGuard' : 'enemyGuard'] ? 'GUARD' : '',
    state[player ? 'playerFocus' : 'enemyFocus'] ? 'FOCUS' : '',
    state[player ? 'playerSlow' : 'enemySlow'] ? 'SLOW' : '',
  ]
    .filter(Boolean)
    .join(' / ');
}
function meter(c: Companion, enemy = false) {
  const species = getCromon(c.speciesId),
    max = statsFor(c).vitality;
  return `<div class="combat-status ${enemy ? 'enemy-status' : 'player-status'}"><div class="combat-name"><strong>${species.name}</strong><span>Lv${c.level}</span></div><div class="hp-line"><b>VP</b><div class="vitality"><span style="width:${(100 * c.hp) / max}%"></span></div></div><div class="hp-value">${c.hp} / ${max}<span>${species.affinity.toUpperCase()}</span></div>${enemy ? '' : `<div class="experience" aria-label="Experience ${c.xp} of ${xpToNext(c.level)}"><span style="width:${(100 * c.xp) / xpToNext(c.level)}%"></span></div>`}</div>`;
}
export function battlePanel(
  state: BattleState,
  presentation: BattlePresentation = { menu: 'root' },
) {
  const player = state.party[state.active],
    enemy = state.enemy,
    p = getCromon(player.speciesId),
    e = getCromon(enemy.speciesId);
  let controls = '';
  const back = '<button class="menu-back" data-action="battle-back">BACK [B]</button>';
  if (presentation.message) {
    controls = `<div class="battle-text" role="log" aria-live="polite"><p>${escapeHtml(presentation.message)}</p><button class="continue-text" data-action="battle-next">CONTINUE <span>▼</span></button></div>`;
  } else if (state.result) {
    const labels = {
      victory: 'Battle won',
      recruited: 'Companion recruited',
      defeat: 'Company defeated',
      fled: 'Escaped safely',
    };
    controls = `<div class="battle-text"><h2>${labels[state.result]}</h2><p>${state.result === 'recruited' ? e.name + ' will travel with your company.' : state.result === 'victory' ? 'Experience and field chits received.' : state.result === 'defeat' ? 'Return to the station for recovery.' : 'You leave the encounter.'}</p><button class="continue-text" data-action="battle-finish">CONTINUE <span>▼</span></button></div>`;
  } else if (presentation.menu === 'fight') {
    const moves = availableMoves(player);
    controls =
      '<div class="command-panel"><div class="command-caption">SELECT TECHNIQUE <small>USES / MAX</small></div><div class="technique-grid menu-grid">' +
      moves
        .map(
          (m) =>
            `<button data-action="battle-move" data-id="${m.id}" ${chargesFor(player, m.id) <= 0 ? 'disabled' : ''}><strong>${m.name}</strong><small>${m.affinity} · ${m.id === 'strain' ? '∞' : chargesFor(player, m.id) + ' / ' + maxUses(m)}</small><span class="move-detail">${m.power} POW · ${Math.round(m.accuracy * 100)}% ACC · ${m.description}</span></button>`,
        )
        .join('') +
      '</div>' +
      back +
      '</div>';
  } else if (presentation.menu === 'pack') {
    controls =
      '<div class="command-panel"><div class="command-caption">FIELD PACK</div><div class="pack-list">' +
      (state.kind === 'wild'
        ? `<button data-action="battle-invite" ${state.supplies.invitations ? '' : 'disabled'}><strong>Invitation ribbon</strong><b>×${state.supplies.invitations}</b><small>${Math.round(recruitmentChance(state) * 100)}% acceptance · lower vitality helps</small></button>`
        : '') +
      `<button data-action="battle-salve" ${state.supplies.salves && player.hp < statsFor(player).vitality ? '' : 'disabled'}><strong>Broth wrap</strong><b>×${state.supplies.salves}</b><small>Restore 65% of maximum vitality</small></button>` +
      (state.kind === 'wild'
        ? `<button data-action="battle-observe"><strong>Study opponent</strong><small>Brace and improve familiarity (${Math.min(state.bond, 3)}/3)</small></button>`
        : '') +
      '</div>' +
      back +
      '</div>';
  } else if (presentation.menu === 'company') {
    controls =
      '<div class="command-panel"><div class="command-caption">SELECT COMPANION</div><div class="switch-list">' +
      state.party
        .map(
          (c, i) =>
            `<button data-action="battle-switch" data-index="${i}" ${i === state.active || c.hp <= 0 ? 'disabled' : ''}><img src="${art(c.speciesId)}" alt="" /><strong>${getCromon(c.speciesId).name}</strong><small>Lv${c.level} · ${c.hp}/${statsFor(c).vitality} VP ${i === state.active ? '· ACTIVE' : ''}</small></button>`,
        )
        .join('') +
      '</div>' +
      back +
      '</div>';
  } else {
    controls = `<div class="root-command"><div class="command-prompt">What will<br><strong>${p.name}</strong> do?<span class="affinity-note">${p.affinity} / ${e.affinity}</span></div><div class="menu-grid battle-root"><button data-action="battle-menu" data-id="fight">FIGHT</button><button data-action="battle-menu" data-id="pack">PACK</button><button data-action="battle-menu" data-id="company">COMPANY</button><button data-action="battle-flee" ${state.kind === 'peer' ? 'disabled title="A friendly bout must be completed"' : ''}>RUN</button></div></div>`;
  }
  return `<section class="battle-screen" aria-label="${state.kind === 'peer' ? 'Kit’s friendly bout' : state.kind === 'showcase' ? 'Developer battle' : 'Wild encounter'}"><header class="battle-heading"><span>${state.kind === 'peer' ? 'KIT / FIELDWALKER' : state.kind === 'showcase' ? 'SPECIMEN TRIAL' : 'WILD ENCOUNTER'}</span><span>TURN ${state.round + 1}</span></header><div class="battle-field ${presentation.hit ? 'hit-' + presentation.hit : ''}">
 <section class="combatant enemy-combatant" aria-label="Opponent ${e.name}">${meter(enemy, true)}<div class="sprite-ground enemy-ground"></div><img class="battle-sprite enemy-sprite" src="${art(e.id)}" alt="${e.name}" /><span class="battle-condition enemy-condition">${status(state, false)}</span></section>
 <section class="combatant player-combatant" aria-label="Your ${p.name}"><div class="sprite-ground player-ground"></div><img class="battle-sprite player-sprite" src="${art(p.id)}" alt="${p.name}" />${meter(player)}<span class="battle-condition player-condition">${status(state, true)}</span></section>
 </div><div class="battle-controls">${controls}</div></section>`;
}
