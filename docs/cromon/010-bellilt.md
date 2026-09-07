# 010 — Bellilt

## 1. Cromon Name

**Bellilt**. Margin Notes number **010**.

## 2. Real-World Inspiration

Moon jelly — _Aurelia aurita species complex_. One source animal, one Cromon; no evolutionary form consumes a second roster slot.

## 3. Name Origin and Wordplay

Bell, its body shape, + lilt, the uneven rhythm of a gentle tune.

## 4. Real Biology and Ecology

Moon jellies pulse a translucent bell and capture small drifting food with stinging cells. Four rounded internal reproductive structures are often visible.

**Real-world range:** Moon jellies occur widely in coastal seas; Aurelia contains several similar species whose ranges differ. Biological reference: [University of Michigan Animal Diversity Web](https://animaldiversity.org/accounts/Aurelia_aurita/).

## 5. Fantasy Elaboration

Four pale internal loops ring at slightly different rates, sending a wobbling pulse through nearby water or Foldwater mist.

## 6. Visual Design

**Future color concept:** A milky round bell with four mauve loops and a sparse fringe of fine tentacles. The retained concept swatch is `#abbdcb`. The current playable 80 × 72 pixel portrait uses the four-ink palette defined in [art direction](../design/art-direction.md).

## 7. Silhouette and Identifying Features

Shallow dome, scalloped rim, four short oral arms, and no face with a vertebrate muzzle.

## 8. Temperament and Behavior

Serene and easily distracted by its own reflection.

## 9. Habitat in the Game

Farcurrent Strand sheltered inlet.

Available in the wilderness encounter tables listed below.

## 10. Affinity or Classification

**Signal approach.** Reading a stable pattern reveals its opening. Its Signal techniques gain a 1.35× modifier against Anchor and a 0.8× modifier against Skitter. Same-approach exchanges use 1×. The technique’s approach determines the modifier; these are tactical relationships, not biological taxonomy.

## 11. Battle Role

Gentle pulse controller. Reliable slowing pulses can change the order of a longer battle.

## 12. Base Stats

| Vitality | Force | Guard | Tempo |
| -------- | ----- | ----- | ----- |
| 28       | 8     | 8     | 9     |

These are level-one game values, not measurements of animal strength. Level growth is shared across the roster and defined in `src/core/progression.ts`.

## 13. Move Set

| Learned at level | Technique     | Approach | Power | Reliability | Priority | Effect |
| ---------------- | ------------- | -------- | ----- | ----------- | -------- | ------ |
| 1                | Clear Note    | Signal   | 10    | 100%        | 0        | none   |
| 1                | Fourfold Lilt | Signal   | 7     | 100%        | 0        | slow   |
| 4                | Sidebeat      | Skitter  | 8     | 100%        | 1        | none   |
| 7                | Perfect Cue   | Signal   | 18    | 95%         | 0        | none   |

Both level-one techniques are immediately usable. Level four adds a complementary option; level seven adds a stronger practiced attack. Positive priority acts before lower priority, then tempo resolves order.

## 14. Signature Technique

**Fourfold Lilt** (`sig-010`): An uneven bell pulse nudges the rival and slows its rhythm. Power 7; reliability 100%; priority 0; effect **slow**. Effects occur only when the technique succeeds. The shared battle engine governs duration, recovery, and guard strength.

## 15. Strengths and Weaknesses

**Strength:** Reliable slowing pulses can change the order of a longer battle.

**Limitation:** Moderate stats need careful matchups; strong Skitter pressure overwhelms it.

## 16. Encounter Level and Rarity

**Roster classification: common.**

Farcurrent Strand: levels 2–4, encounter weight 22 out of 100.

Every roster member is viewable in the Margin Notes and can be selected as a practice opponent in the developer showcase. Weight is a relative table entry, not a promise of a sighting on each step.

## 17. Design Thought Process

The recognizable four-loop pattern provides a visual identity. It remains a drifting animal rather than becoming a floating lamp with arbitrary electricity.

## 18. Distinction Between Fact and Fiction

The animal, range, and biological behaviors in section 4 are factual inspiration. The visible powers in section 5, tactical approach, vitality, techniques, invitation agreement, and Foldwater travel are invented game rules. Real wildlife does not consent through game menus or learn combat techniques.

## 19. Future Art or Animation Notes

Compress and relax the bell in a slow pulse; shift the four loops one frame out of phase. Keep the silhouette readable at journal-thumbnail size and retain the anatomy before adding detail. Current playable portrait: `public/art/pixel/010.png` (80 × 72 pixels); preserved SVG: `public/art/010.svg`. Both come from the original editable drawing source in `src/art/generate.mjs`. The current field plate is static, with no dedicated rear pose; the animation ideas above are future work.
