# 028 — Clackadier

## 1. Cromon Name

**Clackadier**. Margin Notes number **028**.

## 2. Real-World Inspiration

American lobster — _Homarus americanus_. One source animal, one Cromon; no evolutionary form consumes a second roster slot.

## 3. Name Origin and Wordplay

Clack + a jaunty occupational ending; it sounds like a worker who takes claw maintenance seriously.

## 4. Real Biology and Ecology

American lobsters have a large crushing claw and a narrower cutting claw. They grow by molting and use chemical senses to investigate food and other lobsters.

**Real-world range:** Northwestern Atlantic coast, principally from Labrador to the northeastern United States and farther south offshore. Biological reference: [University of Michigan Animal Diversity Web](https://animaldiversity.org/accounts/Homarus_americanus/).

## 5. Fantasy Elaboration

Its two claws click different notes; the narrow claw measures a gap before the broad claw closes it with a tidy thump.

## 6. Visual Design

**Future color concept:** Mottled brown-green shell with one broad ochre claw and one narrow cream-edged claw; not boiled bright red. The retained concept swatch is `#977b62`. The current playable 80 × 72 pixel portrait uses the four-ink palette defined in [art direction](../design/art-direction.md).

## 7. Silhouette and Identifying Features

Segmented tail fan, long antennae, ten walking legs including the claw pair, and clearly unequal claws.

## 8. Temperament and Behavior

Businesslike and easily pleased by a well-fitted lid.

## 9. Habitat in the Game

Farcurrent Strand rocky pools.

Available in the wilderness encounter tables listed below.

## 10. Affinity or Classification

**Anchor approach.** Stable positions catch fast movement. Its Anchor techniques gain a 1.35× modifier against Skitter and a 0.8× modifier against Signal. Same-approach exchanges use 1×. The technique’s approach determines the modifier; these are tactical relationships, not biological taxonomy.

## 11. Battle Role

Asymmetric claw bruiser. High force plus a guarded strike supports steady physical pressure.

## 12. Base Stats

| Vitality | Force | Guard | Tempo |
| -------- | ----- | ----- | ----- |
| 29       | 13    | 11    | 6     |

These are level-one game values, not measurements of animal strength. Level growth is shared across the roster and defined in `src/core/progression.ts`.

## 13. Move Set

| Learned at level | Technique         | Approach | Power | Reliability | Priority | Effect |
| ---------------- | ----------------- | -------- | ----- | ----------- | -------- | ------ |
| 1                | Rooted Nudge      | Anchor   | 10    | 100%        | 0        | none   |
| 1                | Measure and Clack | Anchor   | 9     | 95%         | 0        | guard  |
| 4                | Read the Room     | Signal   | 0     | 100%        | 0        | focus  |
| 7                | Set the Line      | Anchor   | 18    | 95%         | 0        | none   |

Both level-one techniques are immediately usable. Level four adds a complementary option; level seven adds a stronger practiced attack. Positive priority acts before lower priority, then tempo resolves order.

## 14. Signature Technique

**Measure and Clack** (`sig-028`): A measuring pinch lands and sets the heavy claw into guard. Power 9; reliability 95%; priority 0; effect **guard**. Effects occur only when the technique succeeds. The shared battle engine governs duration, recovery, and guard strength.

## 15. Strengths and Weaknesses

**Strength:** High force plus a guarded strike supports steady physical pressure.

**Limitation:** Low tempo and a modest vitality pool leave it vulnerable to focused Signal hits.

## 16. Encounter Level and Rarity

**Roster classification: common.**

Farcurrent Strand: levels 2–4, encounter weight 20 out of 100.

Every roster member is viewable in the Margin Notes and can be selected as a practice opponent in the developer showcase. Weight is a relative table entry, not a promise of a sighting on each step.

## 17. Design Thought Process

The unequal claws are both visual signature and mechanical justification. Using natural live coloration avoids treating a familiar cooked appearance as normal biology.

## 18. Distinction Between Fact and Fiction

The animal, range, and biological behaviors in section 4 are factual inspiration. The visible powers in section 5, tactical approach, vitality, techniques, invitation agreement, and Foldwater travel are invented game rules. Real wildlife does not consent through game menus or learn combat techniques.

## 19. Future Art or Animation Notes

Tap the narrow claw once, close the broad claw more slowly, and flick both antennae independently. Keep the silhouette readable at journal-thumbnail size and retain the anatomy before adding detail. Current playable portrait: `public/art/pixel/028.png` (80 × 72 pixels); preserved SVG: `public/art/028.svg`. Both come from the original editable drawing source in `src/art/generate.mjs`. The current field plate is static, with no dedicated rear pose; the animation ideas above are future work.
