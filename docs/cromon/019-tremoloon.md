# 019 — Tremoloon

## 1. Cromon Name

**Tremoloon**. Margin Notes number **019**.

## 2. Real-World Inspiration

Common loon — _Gavia immer_. One source animal, one Cromon; no evolutionary form consumes a second roster slot.

## 3. Name Origin and Wordplay

Tremolo, a trembling musical effect, + loon.

## 4. Real Biology and Ecology

Common loons dive for fish using feet set far back on the body. Their calls carry over water, and their breeding plumage has striking black-and-white patterns.

**Real-world range:** Breeds on northern North American lakes and winters mainly on North American coasts, with some Atlantic populations reaching Europe. Biological reference: [University of Michigan Animal Diversity Web](https://animaldiversity.org/accounts/Gavia_immer/).

## 5. Fantasy Elaboration

Its checker marks briefly double into a reflected bird, letting its real body slip beneath one incoming attack.

## 6. Visual Design

**Future color concept:** Dark head, pale neck bars, and a few square back markings repeated in a water reflection. The retained concept swatch is `#6f8e9b`. The current playable 80 × 72 pixel portrait uses the four-ink palette defined in [art direction](../design/art-direction.md).

## 7. Silhouette and Identifying Features

Low floating bird, straight pointed bill, long body, short tail, and rear-set feet.

## 8. Temperament and Behavior

Sincere and a little theatrical; sings to check who is listening across the water.

## 9. Habitat in the Game

Sluicefen deep channel; Farcurrent Strand passage.

Available in the wilderness encounter tables listed below.

## 10. Affinity or Classification

**Signal approach.** Reading a stable pattern reveals its opening. Its Signal techniques gain a 1.35× modifier against Anchor and a 0.8× modifier against Skitter. Same-approach exchanges use 1×. The technique’s approach determines the modifier; these are tactical relationships, not biological taxonomy.

## 11. Battle Role

Call-and-dive defender. Guarded contact and good natural guard reward deliberate timing.

## 12. Base Stats

| Vitality | Force | Guard | Tempo |
| -------- | ----- | ----- | ----- |
| 31       | 9     | 11    | 7     |

These are level-one game values, not measurements of animal strength. Level growth is shared across the roster and defined in `src/core/progression.ts`.

## 13. Move Set

| Learned at level | Technique      | Approach | Power | Reliability | Priority | Effect |
| ---------------- | -------------- | -------- | ----- | ----------- | -------- | ------ |
| 1                | Clear Note     | Signal   | 10    | 100%        | 0        | none   |
| 1                | Tremolo Double | Signal   | 7     | 100%        | 0        | guard  |
| 4                | Sidebeat       | Skitter  | 8     | 100%        | 1        | none   |
| 7                | Perfect Cue    | Signal   | 18    | 95%         | 0        | none   |

Both level-one techniques are immediately usable. Level four adds a complementary option; level seven adds a stronger practiced attack. Positive priority acts before lower priority, then tempo resolves order.

## 14. Signature Technique

**Tremolo Double** (`sig-019`): A ringing tap leaves a reflected decoy to absorb the next hit. Power 7; reliability 100%; priority 0; effect **guard**. Effects occur only when the technique succeeds. The shared battle engine governs duration, recovery, and guard strength.

## 15. Strengths and Weaknesses

**Strength:** Guarded contact and good natural guard reward deliberate timing.

**Limitation:** Low tempo makes recovery or switching a better choice under strong Skitter pressure.

## 16. Encounter Level and Rarity

**Roster classification: uncommon.**

Sluicefen: levels 2–4, encounter weight 18 out of 100.

Every roster member is viewable in the Margin Notes and can be selected as a practice opponent in the developer showcase. Weight is a relative table entry, not a promise of a sighting on each step.

## 17. Design Thought Process

Diving defense distinguishes this waterbird from the forceful bullfrog and healing whale. Breeding markings are used for recognition even though actual autumn plumage becomes plainer.

## 18. Distinction Between Fact and Fiction

The animal, range, and biological behaviors in section 4 are factual inspiration. The visible powers in section 5, tactical approach, vitality, techniques, invitation agreement, and Foldwater travel are invented game rules. Real wildlife does not consent through game menus or learn combat techniques. The high-contrast portrait preserves recognizable breeding markings; actual common loons change to plainer nonbreeding plumage.

## 19. Future Art or Animation Notes

Lower the head, dissolve the reflected duplicate, and make one compact dive ripple. Keep the silhouette readable at journal-thumbnail size and retain the anatomy before adding detail. Current playable portrait: `public/art/pixel/019.png` (80 × 72 pixels); preserved SVG: `public/art/019.svg`. Both come from the original editable drawing source in `src/art/generate.mjs`. The current field plate is static, with no dedicated rear pose; the animation ideas above are future work.
