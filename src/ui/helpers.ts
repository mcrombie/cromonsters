import { getCromon } from '../data/roster';
import { statsFor } from '../core/progression';
import type { Companion } from '../core/types';
export const art = (id: string) => import.meta.env.BASE_URL + 'art/pixel/' + id + '.png';
export const escapeHtml = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
  );
export function companionCard(c: Companion, extra = '') {
  const species = getCromon(c.speciesId),
    stats = statsFor(c);
  return (
    '<article class="companion-card"><img src="' +
    art(species.id) +
    '" alt="' +
    species.animal +
    ' inspired ' +
    species.name +
    '" /><div><span class="eyebrow">' +
    species.affinity +
    ' / LV ' +
    c.level +
    '</span><h3>' +
    species.name +
    '</h3><p>' +
    species.role +
    '</p><div class="vitality"><span style="width:' +
    Math.max(0, (c.hp / stats.vitality) * 100) +
    '%"></span></div><small>Vitality ' +
    c.hp +
    ' / ' +
    stats.vitality +
    '</small>' +
    extra +
    '</div></article>'
  );
}
