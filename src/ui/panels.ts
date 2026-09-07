import { getCromon, ROSTER } from '../data/roster';
import { getMove } from '../data/moves';
import { statsFor, xpToNext, PARTY_LIMIT } from '../core/progression';
import { art, companionCard } from './helpers';
import type { SaveData } from '../core/types';
export function journalPanel(save: SaveData) {
  return (
    '<span class="eyebrow">THE FIELDWALKER’S JOURNAL</span><h2>Margin Notes</h2><p>Thirty reference plates. ' +
    save.seen.length +
    ' field records. Every animal has a real range; each entry distinguishes field observations from biological reference.</p><div class="journal-grid">' +
    ROSTER.map(
      (c) =>
        '<button class="journal-entry" data-action="species" data-id="' +
        c.id +
        '"><span class="plate-no">' +
        c.id +
        '</span><img src="' +
        art(c.id) +
        '" alt="' +
        c.animal +
        ' inspired creature" /><strong>' +
        c.name +
        '</strong><small>' +
        c.affinity +
        ' · ' +
        (save.seen.includes(c.id) ? 'Field recorded' : 'Reference plate') +
        '</small></button>',
    ).join('') +
    '</div>'
  );
}
export function speciesPanel(id: string) {
  const c = getCromon(id);
  return (
    '<div class="species-heading"><img src="' +
    art(id) +
    '" alt="' +
    c.animal +
    ' inspired ' +
    c.name +
    '" /><div><span class="eyebrow">REFERENCE PLATE ' +
    id +
    ' / ' +
    c.affinity +
    '</span><h2>' +
    c.name +
    '</h2><p>' +
    c.animal +
    '</p><span class="tag">' +
    c.role +
    '</span></div></div><p class="lead">' +
    c.description +
    '</p><div class="facts-grid"><section><h3>In the real world</h3><p>' +
    c.biology +
    '</p><h4>Actual range</h4><p>' +
    c.range +
    '</p></section><section><h3>Cromon traits</h3><p>' +
    c.fantasy +
    '</p><h4>In Foldwater Reach</h4><p>' +
    c.habitat +
    '</p><p>' +
    c.personality +
    '</p></section></div><h3>Base stats</h3><div class="stat-row">' +
    Object.entries(c.stats)
      .map(([k, v]) => '<span>' + k + ' <b>' + v + '</b></span>')
      .join('') +
    '</div><h3>Technique progression</h3><div class="move-list">' +
    c.moves
      .map((m) => {
        const move = getMove(m.moveId);
        return (
          '<p><b>Lv ' +
          m.level +
          ' · ' +
          move.name +
          '</b> <span class="tag">' +
          move.affinity +
          '</span><br><small>' +
          move.description +
          ' · Power ' +
          move.power +
          ' · Reliability ' +
          Math.round(move.accuracy * 100) +
          '%</small></p>'
        );
      })
      .join('') +
    '</div><button data-action="journal">Back to Margin Notes</button>'
  );
}
export function companyPanel(save: SaveData) {
  return (
    '<span class="eyebrow">YOUR FIELD COMPANY</span><h2>Walking company</h2><p>Up to six companions travel beside you. Everyone else rests at the home roost. Sea-going companions travel through the Foldwater seam.</p><div class="company-list">' +
    save.party
      .map((c, i) =>
        companionCard(
          c,
          '<small>Experience ' +
            c.xp +
            ' / ' +
            xpToNext(c.level) +
            '</small><div class="inline-actions">' +
            (i > 0
              ? '<button data-action="lead" data-index="' + i + '">Lead company</button>'
              : '<span class="tag">Leading</span>') +
            '<button data-action="field-wrap" data-index="' +
            i +
            '" ' +
            (c.hp >= statsFor(c).vitality || save.supplies.salves === 0 ? 'disabled' : '') +
            '>Broth wrap (' +
            save.supplies.salves +
            ')</button>' +
            (save.party.length > 1
              ? '<button data-action="roost" data-index="' + i + '">To home roost</button>'
              : '') +
            '</div>',
        ),
      )
      .join('') +
    '</div><h3>Home roost · ' +
    save.reserve.length +
    '</h3><p>Retrieve a resident when a walking-company space is available.</p><div class="company-list">' +
    save.reserve
      .map((c, i) =>
        companionCard(
          c,
          '<button data-action="retrieve" data-index="' +
            i +
            '" ' +
            (save.party.length >= PARTY_LIMIT ? 'disabled' : '') +
            '>Join company</button>',
        ),
      )
      .join('') +
    (save.reserve.length
      ? ''
      : '<p class="empty-note">No companions currently at the home roost.</p>') +
    '</div>'
  );
}
export const controlsPanel = () =>
  '<span class="eyebrow">FIELD CONTROLS</span><h2>HOW TO PLAY</h2><div class="facts-grid"><section><h3>Exploration</h3><p><kbd>WASD</kbd> / <kbd>Arrow keys</kbd> — walk. Your fieldwalker turns to face the direction you press, even against an obstacle.</p><p><kbd>Enter</kbd>, <kbd>Space</kbd>, or <kbd>Z</kbd> — confirm / interact with what you face.</p><p><kbd>Escape</kbd> or <kbd>X</kbd> — back / START menu.</p><p><kbd>J</kbd> journal · <kbd>C</kbd> company · <kbd>P</kbd> pack · <kbd>M</kbd> mute.</p></section><section><h3>Battles</h3><p>Select Fight, Pack, Company, or Run. Arrow keys move the selection. Confirm advances one battle message at a time; Back returns from a submenu without using a turn.</p><p>Fight opens up to four techniques. Each has limited uses, restored by Kettle rest. Switching and using an item take a turn.</p><p>Weaken a wild Cromon, then use an invitation ribbon from Pack. Low vitality, slowing and studying improve acceptance. A defeated opponent cannot be recruited.</p><p>Run depends on speed and becomes more reliable after failed attempts. You must finish a friendly bout.</p></section></div><p>Progress saves automatically. Existing saves remain compatible. Reloading during a battle returns to the pre-encounter field state.</p><button data-action="close">RETURN [B]</button>';
