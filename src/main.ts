import './handheld.css';
import { ROSTER, STARTERS, getCromon } from './data/roster';
import { WORLD, MAP_IDS } from './data/world';
import { INTRO, ITEMS } from './data/dialogue';
import { newSave, loadSave, persistSave, SAVE_KEY } from './core/save';
import { createCompanion, healCompanion, statsFor, PARTY_LIMIT } from './core/progression';
import { startBattle, resolveTurn } from './core/battle';
import { selectEncounter, trialChecklist, trialComplete } from './core/world';
import { createField } from './game/FieldScene';
import { chime } from './game/audio';
import { art } from './ui/helpers';
import { journalPanel, speciesPanel, companyPanel, controlsPanel } from './ui/panels';
import { shell } from './ui/shell';
import { battlePanel, type BattleMenu } from './ui/battle-panel';
import type {
  SaveData,
  BattleState,
  BattleEvent,
  MapObject,
  MapId,
  BattleAction,
  Direction,
} from './core/types';

const dev = new URLSearchParams(location.search).get('dev') === '1';
const save: SaveData = loadSave() ?? newSave();
let battle: BattleState | null = null;
let battleMenu: BattleMenu = 'root';
let battleEvents: BattleEvent[] = [];
let battleEventIndex = 0;
let battleBefore: BattleEvent | undefined;
let activePanel = '';
let lastMove = '';
let launched = false,
  modalOpen = false,
  pendingIntro = 0,
  devSpecies = '001',
  devLevel = 4;
let lastSaved = true;
const heldDirections = new Map<string, [number, number]>();
const app = document.querySelector<HTMLDivElement>('#app')!;
function fitDisplay() {
  const scale = Math.max(
    1,
    Math.min(
      3,
      Math.floor(Math.min((window.innerWidth - 48) / 320, (window.innerHeight - 210) / 240)),
    ),
  );
  document.documentElement.style.setProperty('--screen-width', 320 * scale + 'px');
}
fitDisplay();
window.addEventListener('resize', fitDisplay);
app.innerHTML = shell(save, dev);
const dialog = document.querySelector<HTMLDialogElement>('#panel')!;
const panel = document.querySelector<HTMLDivElement>('#panel-content')!;
const { scene } = createField('game-canvas', {
  position: () => save.player,
  face: (direction) => {
    save.player.facing = direction;
    updatePosition();
  },
  discoveries: () => save.discoveries,
  blocked: () => modalOpen || !launched || !!battle,
  step: (x, y) => {
    save.player.x = x;
    save.player.y = y;
    save.steps++;
    updatePosition();
    if (
      WORLD[save.player.map].tiles[y][x] === 'g' &&
      save.steps % 4 === 0 &&
      Math.random() < 0.65
    ) {
      startWild();
    } else store();
  },
  interact: (object) => interact(object),
});
function store() {
  if (!dev) lastSaved = persistSave(save);
  document.querySelector('#save-status')!.textContent = dev
    ? 'Sandbox session'
    : lastSaved
      ? 'Saved locally'
      : 'Storage unavailable · keep this tab open';
}
function say(message: string) {
  document.querySelector('#field-message')!.textContent = message;
}
function show(content: string, kind = '') {
  modalOpen = true;
  activePanel = kind;
  scene.cancelRoute();
  scene.releaseDirection();
  heldDirections.clear();
  panel.innerHTML = content;
  dialog.className = kind;
  document.querySelector<HTMLButtonElement>('#panel-close')!.hidden =
    kind === 'battle' || kind === 'intro' || kind === 'complete';
  if (!dialog.open) dialog.showModal();
  const heading = panel.querySelector<HTMLElement>('h2');
  if (heading) {
    heading.id = 'panel-title';
    heading.tabIndex = -1;
    dialog.setAttribute('aria-labelledby', 'panel-title');
  } else {
    dialog.removeAttribute('aria-labelledby');
    dialog.setAttribute(
      'aria-label',
      kind === 'battle' ? 'Battle commands and messages' : 'Field menu',
    );
  }
  const firstControl = panel.querySelector<HTMLElement>('button:not(:disabled),select,input');
  const target =
    firstControl && firstControl.offsetTop < dialog.clientHeight ? firstControl : heading;
  target?.focus({ preventScroll: true });
  dialog.scrollTop = 0;
}
function close() {
  if (battle) {
    if (battleEventIndex < battleEvents.length || battle.result) return;
    battleMenu = 'root';
    drawBattle();
    return;
  }
  if (!save.starterChosen && launched) return;
  modalOpen = false;
  if (dialog.open) dialog.close();
  document
    .querySelector<HTMLElement>(launched ? '#game-canvas' : '[data-action="begin"]')!
    .focus({ preventScroll: true });
}
function updatePosition() {
  const near = nearest();
  document.querySelector('#interact-button')!.textContent = near
    ? 'A · ' + near.label
    : 'A · INTERACT';
}
function render() {
  const map = WORLD[save.player.map];
  document.querySelector('#map-name')!.textContent = map.name;
  document.querySelector('#map-subtitle')!.textContent = map.subtitle;

  document.querySelector('#trial-list')!.innerHTML = trialChecklist(save)
    .map(
      (c) =>
        '<div class="trial-row ' +
        (c.value >= c.target ? 'done' : '') +
        '"><span class="check">' +
        (c.value >= c.target ? '✓' : '○') +
        '</span><span>' +
        c.label +
        '</span><b>' +
        Math.min(c.value, c.target) +
        '/' +
        c.target +
        '</b></div>',
    )
    .join('');
  document.querySelector('#party-preview')!.innerHTML = save.party
    .map(
      (c) =>
        '<div class="mini-companion"><img src="' +
        art(c.speciesId) +
        '" alt="" /><div><strong>' +
        getCromon(c.speciesId).name +
        '</strong><small>Lv ' +
        c.level +
        ' · ' +
        getCromon(c.speciesId).affinity +
        '</small><div class="vitality"><span style="width:' +
        (c.hp / statsFor(c).vitality) * 100 +
        '%"></span></div><small>' +
        c.hp +
        ' / ' +
        statsFor(c).vitality +
        ' vitality</small></div></div>',
    )
    .join('');
  document.querySelector('#landmarks')!.innerHTML = map.objects
    .map(
      (o) =>
        '<button data-action="walk" data-id="' +
        o.id +
        '"><span>' +
        { guide: '✎', heal: '+', shop: 'S', transition: '↗', note: 'i', discovery: '!', peer: '↔' }[
          o.kind
        ] +
        '</span>' +
        o.label +
        (save.discoveries.includes(o.id) ? ' ✓' : '') +
        '</button>',
    )
    .join('');
  document.querySelector('#supply-preview')!.innerHTML =
    '<span>' +
    save.supplies.invitations +
    ' invitation ribbons</span><span>' +
    save.supplies.salves +
    ' broth wraps</span><span>' +
    save.credits +
    ' field chits</span>';
  document.querySelector('#mute-button')!.textContent = save.muted ? 'Sound off' : 'Sound on';
  document.querySelector('#panel-mute')!.textContent = save.muted
    ? 'Sound off · M'
    : 'Sound on · M';
  updatePosition();
  store();
}
function nearest(): MapObject | undefined {
  const offsets: Record<Direction, [number, number]> = {
    north: [0, -1],
    east: [1, 0],
    south: [0, 1],
    west: [-1, 0],
  };
  const [dx, dy] = offsets[save.player.facing ?? 'south'];
  return (
    WORLD[save.player.map].objects.find(
      (o) => o.x === save.player.x + dx && o.y === save.player.y + dy,
    ) ?? WORLD[save.player.map].objects.find((o) => o.x === save.player.x && o.y === save.player.y)
  );
}
function begin() {
  launched = true;
  document.querySelector<HTMLElement>('#title-screen')!.hidden = true;
  document.querySelector<HTMLElement>('#play-screen')!.hidden = false;
  window.dispatchEvent(new Event('resize'));
  render();
  if (!save.starterChosen) {
    pendingIntro = 0;
    intro();
  } else
    document
      .querySelector<HTMLElement>(launched ? '#game-canvas' : '[data-action="begin"]')!
      .focus({ preventScroll: true });
}
function intro() {
  if (pendingIntro < INTRO.length - 1) {
    show(
      '<span class="eyebrow">LATCHLEAF FIELD STATION / NELLA QUILL</span><h2>' +
        (pendingIntro === 0
          ? 'Welcome, fieldwalker.'
          : pendingIntro === 1
            ? 'Good company is voluntary.'
            : 'The Fourfold Ramble.') +
        '</h2><p class="lead">' +
        INTRO[pendingIntro] +
        '</p><button class="primary" data-action="intro-next">Continue ↗</button>',
      'intro',
    );
    return;
  }
  show(
    '<span class="eyebrow">A TRAVELING COMPANION, NOT A TROPHY</span><h2>Who shares your curiosity?</h2><p>' +
      INTRO[3] +
      '</p><div class="starter-grid">' +
      STARTERS.map((id) => {
        const c = getCromon(id);
        return (
          '<button class="starter-card" data-action="starter" data-id="' +
          id +
          '"><span class="eyebrow">' +
          c.affinity +
          '</span><img src="' +
          art(id) +
          '" alt="' +
          c.animal +
          ' inspired ' +
          c.name +
          '" /><h3>' +
          c.name +
          '</h3><p>' +
          c.role +
          '</p><small>' +
          c.personality +
          '</small><span class="choose-label">Set out together ↗</span></button>'
        );
      }).join('') +
      '</div>',
    'intro',
  );
}
function chooseStarter(id: string) {
  if (save.starterChosen || !STARTERS.some((starter) => starter === id)) return;
  save.party = [createCompanion(id, 3)];
  save.starterChosen = true;
  save.seen = [id];
  save.recruited = [id];
  modalOpen = false;
  dialog.close();
  render();
  document.querySelector<HTMLElement>('#game-canvas')!.focus({ preventScroll: true });
  say(
    'Nella hands you Margin Notes, 8 invitation ribbons, and 4 broth wraps. First stop: any habitat. Kit is in Bellwether Field.',
  );
  chime(save.muted);
}
function transition(id: MapId) {
  save.player = { map: id, ...WORLD[id].spawn, facing: id === 'town' ? 'south' : 'north' };
  if (!save.visited.includes(id)) save.visited.push(id);
  render();
  say(
    WORLD[id].subtitle +
      '. ' +
      (id === 'town'
        ? 'Nella is ready to look over your notes.'
        : 'Explore the ! landmark and search for wild neighbors.'),
  );
}
function interact(object: MapObject) {
  if (!save.starterChosen) return;
  if (object.kind === 'transition') {
    transition(object.target!);
    return;
  }
  if (object.kind === 'guide') {
    if (trialComplete(save)) {
      save.completed = true;
      render();
      completion();
    } else
      show(
        '<span class="eyebrow">PATHWARDEN NELLA QUILL</span><h2>A page at a time.</h2><p class="lead">' +
          object.text +
          '</p>' +
          trialChecklist(save)
            .map(
              (c) =>
                '<p>' +
                (c.value >= c.target ? '✓' : '○') +
                ' ' +
                c.label +
                ' · ' +
                Math.min(c.value, c.target) +
                ' / ' +
                c.target +
                '</p>',
            )
            .join('') +
          '<p>Kit waits in Bellwether Field. The ! landmark in each habitat has an observation to make.</p><button class="primary" data-action="close">Back to the ramble</button>',
      );
  } else if (object.kind === 'heal') {
    save.party = save.party.map(healCompanion);
    save.reserve = save.reserve.map(healCompanion);
    render();
    chime(save.muted);
    show(
      '<span class="eyebrow">KETTLE REST</span><h2>Everyone takes a breath.</h2><p class="lead">' +
        object.text +
        '</p><button class="primary" data-action="close">Thank you</button>',
    );
  } else if (object.kind === 'shop') {
    shop();
  } else if (object.kind === 'note')
    show(
      '<span class="eyebrow">A NOTE FROM THE FIELD</span><h2>' +
        object.label +
        '</h2><p class="lead">' +
        object.text +
        '</p><button data-action="close">Close note</button>',
    );
  else if (object.kind === 'discovery') {
    const done = save.discoveries.includes(object.id);
    if (!done) {
      save.discoveries.push(object.id);
      const id = WORLD[save.player.map].observation;
      if (!save.seen.includes(id)) save.seen.push(id);
      if (['forest', 'wetland'].includes(save.player.map)) save.supplies.invitations += 2;
      else save.supplies.salves++;
      save.credits += 8;
      render();
      chime(save.muted);
    }
    show(
      '<span class="eyebrow">' +
        (done ? 'ALREADY RECORDED' : 'HABITAT OBSERVATION RECORDED') +
        '</span><h2>' +
        object.label +
        '</h2><p class="lead">' +
        object.text +
        '</p><p>' +
        (done ? 'Your careful work is still holding.' : 'Margin Notes updated. +8 field chits.') +
        '</p><button class="primary" data-action="close">Continue exploring</button>',
    );
  } else if (object.kind === 'peer') {
    show(
      '<span class="eyebrow">FELLOW FIELDWALKER KIT</span><h2>Compare notes?</h2><p class="lead">' +
        object.text +
        '</p><p>Kit lends your whole company a kettle flask before the bout. Your companions start rested.</p><button class="primary" data-action="peer-start">' +
        (save.peerWon ? 'Practice again' : 'Begin friendly bout') +
        '</button><button data-action="close">Later</button>',
    );
  }
}
function shop() {
  show(
    '<span class="eyebrow">MOSS & SUNDRIES</span><h2>Supplies for the ramble.</h2><p>' +
      save.credits +
      ' field chits · ' +
      save.supplies.invitations +
      ' ribbons · ' +
      save.supplies.salves +
      ' wraps</p><div class="shop-grid">' +
      ITEMS.map(
        (item) =>
          '<section><h3>' +
          item.name +
          '</h3><p>' +
          item.description +
          '</p><button data-action="buy" data-id="' +
          item.id +
          '" ' +
          (save.credits < item.price ? 'disabled' : '') +
          '>Buy · ' +
          item.price +
          ' chits</button></section>',
      ).join('') +
      '</div><p>For walkers caught short: the station tops up your kit to two ribbons and one wrap, free.</p><button data-action="borrow">Top up field kit</button>',
  );
}
function startWild() {
  if (battle || save.player.map === 'town' || !save.starterChosen) return;
  const encounter = selectEncounter(save.player.map)!;
  const level =
    encounter.minLevel + Math.floor(Math.random() * (encounter.maxLevel - encounter.minLevel + 1));
  beginBattle(encounter.speciesId, level, 'wild');
}
function beginBattle(id: string, level: number, kind: 'wild' | 'peer' | 'showcase') {
  if (!save.party.some((c) => c.hp > 0) && kind !== 'showcase') {
    recover();
    return;
  }
  if (kind !== 'showcase' && !save.seen.includes(id)) save.seen.push(id);
  store();
  battle = startBattle(
    kind === 'showcase' ? [createCompanion(id, level)] : save.party,
    createCompanion(id, level),
    kind,
    kind === 'showcase' ? { invitations: 99, salves: 99 } : save.supplies,
  );
  battleMenu = 'root';
  battleEvents = [
    { text: battle.log[0], party: battle.party, active: battle.active, enemy: battle.enemy },
  ];
  battleEventIndex = 0;
  drawBattle();
  chime(save.muted, 'battle');
}
function drawBattle(animate = false) {
  if (!battle) return;
  const event = battleEvents[battleEventIndex];
  const state = event
    ? {
        ...battle,
        ...event.effects,
        party: event.party,
        active: event.active,
        enemy: event.enemy,
        result: null,
      }
    : battle;
  const previous = battleEvents[battleEventIndex - 1] ?? battleBefore;
  const hit =
    animate && event && previous
      ? event.enemy.hp < previous.enemy.hp
        ? 'enemy'
        : event.party[event.active].uid === previous.party[previous.active].uid &&
            event.party[event.active].hp < previous.party[previous.active].hp
          ? 'player'
          : undefined
      : undefined;
  show(battlePanel(state, { menu: battleMenu, message: event?.text, hit }), 'battle');
  if (!event && battleMenu === 'fight' && lastMove) {
    panel
      .querySelector<HTMLElement>(
        '[data-action="battle-move"][data-id="' + lastMove + '"]:not(:disabled)',
      )
      ?.focus({ preventScroll: true });
  }
}
function battleAction(action: BattleAction) {
  if (!battle || battle.result || battleEventIndex < battleEvents.length) return;
  if (action.type === 'move') lastMove = action.moveId;
  battleBefore = { text: '', party: battle.party, active: battle.active, enemy: battle.enemy };
  battle = resolveTurn(battle, action);
  battleEvents = battle.events ?? [];
  battleEventIndex = 0;
  battleMenu = 'root';
  drawBattle(true);
}
function nextBattleMessage() {
  if (!battle) return;
  if (battleEventIndex < battleEvents.length) {
    battleEventIndex++;
    drawBattle(true);
  }
}
function finishBattle() {
  if (!battle?.result) return;
  const result = battle.result,
    kind = battle.kind;
  if (kind !== 'showcase') {
    save.party = battle.party;
    save.supplies = battle.supplies;
    if (result === 'recruited') {
      const companion = healCompanion({ ...battle.enemy, uid: crypto.randomUUID() });
      (save.party.length < PARTY_LIMIT ? save.party : save.reserve).push(companion);
      if (!save.recruited.includes(companion.speciesId)) save.recruited.push(companion.speciesId);
    }
    if (result === 'victory' || result === 'recruited') save.credits += 7;
    if (kind === 'peer' && result === 'victory') save.peerWon = true;
  }
  battle = null;
  modalOpen = false;
  dialog.close();
  document.querySelector<HTMLElement>('#game-canvas')!.focus({ preventScroll: true });
  if (result === 'defeat' && kind !== 'showcase') {
    recover();
    return;
  }
  render();
  chime(save.muted);
  say(
    result === 'recruited'
      ? 'A new companion joins. If your company is full, they will meet you at the home roost.'
      : result === 'victory'
        ? 'Field lesson complete. Experience gained and 7 field chits earned.'
        : 'You give each other a little space.',
  );
  if (kind === 'showcase') developer();
  else if (kind === 'peer' && save.peerWon)
    say(
      'Kit: “Fine work. I’m revising my entire color system.” Friendly bout recorded. Return to Nella when your notebook is ready.',
    );
}
function recover() {
  save.party = save.party.map(healCompanion);
  save.reserve = save.reserve.map(healCompanion);
  save.player = { map: 'town', x: 12, y: 10 };
  render();
  show(
    '<span class="eyebrow">BACK AT THE KETTLE HOUSE</span><h2>A breather, not a setback.</h2><p class="lead">Nella brings everyone home and restores their vitality. Your notes, companions, and supplies are safe. The fieldwork can wait for one cup of broth.</p><button class="primary" data-action="close">Set out again</button>',
  );
}
function completion() {
  show(
    '<div class="completion-seal">✓</div><span class="eyebrow">THE FOURFOLD RAMBLE / FIELD REPORT ACCEPTED</span><h2>Proof of Concept Complete</h2><p class="lead">Four habitats. New companions. A notebook with mud on the useful pages.</p><p>Nella closes the report. “You noticed what was here. That’s the beginning of every worthwhile expedition.” Kit has already requested a less absorbent clipboard.</p><div class="completion-stats"><span><b>' +
      save.seen.length +
      '</b>Cromon recorded</span><span><b>' +
      save.recruited.length +
      '</b>companions welcomed</span><span><b>4</b>habitats explored</span></div><button class="primary" data-action="close">Keep rambling ↗</button><button data-action="journal">Browse Margin Notes</button>',
    'complete',
  );
}
function developer() {
  if (!dev) return;
  show(
    '<span class="eyebrow">DEVELOPER SANDBOX / NOT SAVED</span><h2>Specimen workbench</h2><p>Every Cromon is viewable and battle-testable here. Tests use a separate mirror pair and cannot change your company or field report.</p><div class="dev-controls"><label>Specimen<select id="dev-species">' +
      ROSTER.map(
        (c) =>
          '<option value="' +
          c.id +
          '" ' +
          (c.id === devSpecies ? 'selected' : '') +
          '>' +
          c.id +
          ' · ' +
          c.name +
          '</option>',
      ).join('') +
      '</select></label><label>Level<input id="dev-level" type="number" min="1" max="50" value="' +
      devLevel +
      '" /></label><button class="primary" data-action="dev-battle">Start test battle</button></div>' +
      speciesPanel(devSpecies) +
      '<h3>Jump between maps</h3><div class="inline-actions">' +
      MAP_IDS.map(
        (id) =>
          '<button data-action="dev-map" data-id="' + id + '">' + WORLD[id].name + '</button>',
      ).join('') +
      '</div><h3>Local save</h3><button data-action="reset-prompt">Reset normal save…</button>',
  );
}
function menu() {
  show(
    '<span class="eyebrow">' +
      WORLD[save.player.map].name +
      '</span><h2>FIELD MENU</h2><div class="field-menu-list"><button data-action="company">COMPANY <small>' +
      save.party.length +
      ' / ' +
      PARTY_LIMIT +
      '</small></button><button data-action="journal">MARGIN NOTES <small>' +
      save.seen.length +
      ' RECORDED</small></button><button data-action="pack">PACK <small>' +
      save.supplies.invitations +
      ' RIBBONS</small></button><button data-action="area">AREA MAP</button><button data-action="trial">ASSIGNMENT</button><button data-action="save">SAVE</button><button data-action="controls">OPTIONS / CONTROLS</button><button data-action="close">RETURN</button></div>',
    'field-menu',
  );
}
function fieldPack() {
  show(
    '<span class="eyebrow">' +
      save.credits +
      ' FIELD CHITS</span><h2>FIELD PACK</h2><div class="pack-list"><section><h3>Invitation ribbons ×' +
      save.supplies.invitations +
      '</h3><p>Use from Pack during a wild encounter. Lower vitality and slowing improve acceptance.</p></section><section><h3>Broth wraps ×' +
      save.supplies.salves +
      '</h3><p>Restore a companion’s vitality. Kettle rest also restores technique uses.</p><button data-action="company">USE ON A COMPANION</button></section></div>',
    'pack',
  );
}
function areaPanel() {
  const map = WORLD[save.player.map];
  show(
    '<span class="eyebrow">FOLDWATER REACH</span><h2>' +
      map.name +
      '</h2><p>' +
      map.subtitle +
      '</p><p class="map-instruction">Select a landmark to follow a safe route. You can also walk there yourself.</p><div class="landmarks">' +
      map.objects
        .map(
          (o) =>
            '<button data-action="walk" data-id="' +
            o.id +
            '">' +
            o.label +
            (save.discoveries.includes(o.id) ? ' [RECORDED]' : '') +
            '</button>',
        )
        .join('') +
      '</div>' +
      (map.id === 'town' ? '' : '<button data-action="search">SEARCH NEARBY HABITAT</button>'),
    'area',
  );
}
function trialPanel() {
  show(
    '<span class="eyebrow">ASSIGNMENT 01</span><h2>THE FOURFOLD RAMBLE</h2>' +
      trialChecklist(save)
        .map(
          (c) =>
            '<div class="trial-row"><span>' +
            (c.value >= c.target ? '[✓]' : '[ ]') +
            '</span><span>' +
            c.label +
            '</span><b>' +
            Math.min(c.value, c.target) +
            '/' +
            c.target +
            '</b></div>',
        )
        .join('') +
      '<p>Return to Nella in Latchleaf when the report is complete.</p>',
    'trial',
  );
}
app.addEventListener('click', (event) => {
  const button = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-action]');
  if (!button || button.disabled) return;
  const action = button.dataset.action!,
    id = button.dataset.id!,
    index = Number(button.dataset.index);
  if (action === 'begin') begin();
  else if (action === 'menu') {
    if (launched) menu();
  } else if (action === 'cancel') {
    if (modalOpen) close();
    else if (launched) menu();
  } else if (action === 'pack') fieldPack();
  else if (action === 'area') areaPanel();
  else if (action === 'trial') trialPanel();
  else if (action === 'save') {
    store();
    show(
      '<h2>FIELD RECORD SAVED</h2><p>Your expedition is stored on this browser.</p><button data-action="close">CONTINUE</button>',
      'notice',
    );
  } else if (action === 'battle-menu') {
    battleMenu = id as BattleMenu;
    drawBattle();
  } else if (action === 'battle-back') {
    battleMenu = 'root';
    drawBattle();
  } else if (action === 'battle-next') nextBattleMessage();
  else if (action === 'intro-next') {
    pendingIntro++;
    intro();
  } else if (action === 'starter') chooseStarter(id);
  else if (action === 'close') close();
  else if (action === 'controls') show(controlsPanel());
  else if (action === 'mute') {
    save.muted = !save.muted;
    render();
    chime(save.muted);
  } else if (action === 'journal') show(journalPanel(save), 'wide');
  else if (action === 'species') show(speciesPanel(id), 'wide');
  else if (action === 'company') show(companyPanel(save), 'company');
  else if (action === 'walk') {
    const o = WORLD[save.player.map].objects.find((o) => o.id === id)!;
    if (modalOpen) close();
    scene.walkTo(o.x, o.y, o);
    document
      .querySelector<HTMLElement>(launched ? '#game-canvas' : '[data-action="begin"]')!
      .focus({ preventScroll: true });
  } else if (action === 'interact') {
    if (!launched) return;
    if (modalOpen) {
      panel.querySelector<HTMLButtonElement>('button:not(:disabled)')?.click();
      return;
    }
    if (scene.isMoving()) return;
    const o = nearest();
    if (o) interact(o);
    else say('Face a person, sign, or landmark and press A. START opens the field menu.');
  } else if (action === 'search') {
    if (modalOpen) close();
    startWild();
  } else if (['up', 'down', 'left', 'right'].includes(action)) {
    const [dx, dy] = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] }[action]!;
    scene.move(dx, dy);
  } else if (action === 'peer-start') {
    save.party = save.party.map(healCompanion);
    beginBattle('001', 3, 'peer');
  } else if (action === 'battle-move') battleAction({ type: 'move', moveId: id });
  else if (action === 'battle-switch') battleAction({ type: 'switch', index });
  else if (action === 'battle-observe') battleAction({ type: 'observe' });
  else if (action === 'battle-invite') battleAction({ type: 'invite' });
  else if (action === 'battle-salve') battleAction({ type: 'salve' });
  else if (action === 'battle-flee') battleAction({ type: 'flee' });
  else if (action === 'battle-finish') finishBattle();
  else if (action === 'buy') {
    const item = ITEMS.find((i) => i.id === id)!;
    if (save.credits >= item.price) {
      save.credits -= item.price;
      save.supplies[item.id]++;
      render();
      shop();
    }
  } else if (action === 'borrow') {
    save.supplies.invitations = Math.max(2, save.supplies.invitations);
    save.supplies.salves = Math.max(1, save.supplies.salves);
    render();
    shop();
  } else if (action === 'lead') {
    [save.party[0], save.party[index]] = [save.party[index], save.party[0]];
    render();
    show(companyPanel(save), 'company');
  } else if (action === 'field-wrap') {
    const c = save.party[index];
    if (save.supplies.salves > 0 && c.hp < statsFor(c).vitality) {
      save.supplies.salves--;
      c.hp = Math.min(statsFor(c).vitality, c.hp + Math.ceil(statsFor(c).vitality * 0.65));
      render();
      show(companyPanel(save), 'company');
    }
  } else if (action === 'roost' && save.party.length > 1) {
    save.reserve.push(save.party.splice(index, 1)[0]);
    render();
    show(companyPanel(save), 'company');
  } else if (action === 'retrieve' && save.party.length < PARTY_LIMIT) {
    save.party.push(save.reserve.splice(index, 1)[0]);
    render();
    show(companyPanel(save), 'company');
  } else if (action === 'developer') developer();
  else if (action === 'dev-battle' && dev) {
    devLevel = Math.max(
      1,
      Math.min(
        50,
        Math.floor(Number(document.querySelector<HTMLInputElement>('#dev-level')!.value) || 4),
      ),
    );
    beginBattle(devSpecies, devLevel, 'showcase');
  } else if (action === 'dev-map' && dev) {
    if (!save.starterChosen) {
      save.party = [createCompanion('003', 4)];
      save.starterChosen = true;
    }
    close();
    if (!launched) begin();
    transition(id as MapId);
  } else if (action === 'reset-prompt' && dev)
    show(
      '<h2>Reset the normal local save?</h2><p>This removes your saved fieldwork on this browser. Your current developer session will remain open.</p><button data-action="reset-confirm">Yes, reset normal save</button><button data-action="developer">Cancel</button>',
    );
  else if (action === 'reset-confirm' && dev) {
    try {
      localStorage.removeItem(SAVE_KEY);
      show(
        '<h2>Normal save reset.</h2><p>Open the game without ?dev=1 to begin new fieldwork.</p><button data-action="developer">Back to workbench</button>',
      );
    } catch {
      show('<h2>Storage is unavailable.</h2><button data-action="developer">Back</button>');
    }
  }
});
app.addEventListener('change', (event) => {
  const target = event.target as HTMLSelectElement;
  if (target.id === 'dev-species') {
    devLevel = Math.max(
      1,
      Math.min(
        50,
        Math.floor(Number(document.querySelector<HTMLInputElement>('#dev-level')!.value) || 4),
      ),
    );
    devSpecies = target.value;
    developer();
  }
});
dialog.addEventListener('cancel', (event) => {
  event.preventDefault();
  close();
});
const directionKeys: Record<string, [number, number]> = {
  arrowup: [0, -1],
  w: [0, -1],
  arrowdown: [0, 1],
  s: [0, 1],
  arrowleft: [-1, 0],
  a: [-1, 0],
  arrowright: [1, 0],
  d: [1, 0],
};
document.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase(),
    target = event.target as HTMLElement;
  if (['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName)) return;
  if (key === 'm') {
    event.preventDefault();
    save.muted = !save.muted;
    render();
    return;
  }
  const cancel = key === 'escape' || key === 'x',
    confirm = key === 'enter' || key === ' ' || key === 'z';
  if (modalOpen) {
    if (cancel) {
      event.preventDefault();
      close();
      return;
    }
    if (confirm) {
      if (key === 'z' || key === ' ' || target.tagName !== 'BUTTON') {
        event.preventDefault();
        if (battle && battleEventIndex < battleEvents.length) {
          nextBattleMessage();
          return;
        }
        const focused = document.activeElement as HTMLButtonElement;
        if (focused.tagName === 'BUTTON' && dialog.contains(focused)) focused.click();
        else panel.querySelector<HTMLButtonElement>('button:not(:disabled)')?.click();
      }
      return;
    }
    if (directionKeys[key]) {
      event.preventDefault();
      const list = Array.from(
        panel.querySelectorAll<HTMLElement>('button:not(:disabled):not([hidden]),select,input'),
      );
      const current = list.indexOf(document.activeElement as HTMLElement);
      const grid =
        (activePanel === 'battle' && (battleMenu === 'root' || battleMenu === 'fight')) ||
        activePanel === 'intro';
      const delta =
        key === 'arrowup' || key === 'w'
          ? grid
            ? -2
            : -1
          : key === 'arrowdown' || key === 's'
            ? grid
              ? 2
              : 1
            : key === 'arrowleft' || key === 'a'
              ? -1
              : 1;
      list[(Math.max(current, 0) + delta + list.length) % list.length]?.focus();
      return;
    }
    return;
  }
  if (!launched) return;
  if (cancel) {
    event.preventDefault();
    menu();
  } else if (key === 'j') show(journalPanel(save), 'wide');
  else if (key === 'c') show(companyPanel(save), 'company');
  else if (key === 'p') fieldPack();
  else if (key === 'tab' && target.id === 'game-canvas') {
    event.preventDefault();
    menu();
  } else if (directionKeys[key]) {
    event.preventDefault();
    if (event.repeat && !heldDirections.has(key)) return;
    document.querySelector<HTMLElement>('#game-canvas')!.focus({ preventScroll: true });
    if (!event.repeat) {
      heldDirections.delete(key);
      heldDirections.set(key, directionKeys[key]);
    }
    const next = [...heldDirections.values()].at(-1);
    if (next) scene.holdDirection(...next);
  } else if (confirm && target.tagName !== 'BUTTON' && target.tagName !== 'A') {
    event.preventDefault();
    if (scene.isMoving()) return;
    const o = nearest();
    if (o) interact(o);
  }
});
document.addEventListener('keyup', (event) => {
  if (!directionKeys[event.key.toLowerCase()]) return;
  heldDirections.delete(event.key.toLowerCase());
  const next = [...heldDirections.values()].at(-1);
  if (next && !modalOpen) scene.holdDirection(...next);
  else scene.releaseDirection();
});
window.addEventListener('blur', () => {
  heldDirections.clear();
  scene.releaseDirection();
});
render();
