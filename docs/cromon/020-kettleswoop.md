# 020 — Kettleswoop

## 1. Cromon Name

**Kettleswoop**. Margin Notes number **020**.

## 2. Real-World Inspiration

Broad-winged hawk — _Buteo platypterus_. One source animal, one Cromon; no evolutionary form consumes a second roster slot.

## 3. Name Origin and Wordplay

Kettle, a soaring aggregation, + swoop; no household kettle is attached to the bird.

## 4. Real Biology and Ecology

Broad-winged hawks hunt from forest perches and migrate in large soaring groups called kettles. Rising warm air helps them gain altitude.

**Real-world range:** Breeds in eastern North American forests; many migrate through Central America to winter in South America. Biological reference: [University of Michigan Animal Diversity Web](https://animaldiversity.org/accounts/Buteo_platypterus/).

## 5. Fantasy Elaboration

Its broad wings cup a small pocket of rising air into a stable platform before it settles into a guarded glide.

## 6. Visual Design

**Future color concept:** Broad brown wings with a cream underside arc and a stout boldly banded tail. The retained concept swatch is `#ac8761`. The current playable 80 × 72 pixel portrait uses the four-ink palette defined in [art direction](../design/art-direction.md).

## 7. Silhouette and Identifying Features

Compact raptor body, broad rounded wings, hooked bill, and short wide tail.

## 8. Temperament and Behavior

Practical and cooperative; waits for the right updraft rather than arguing with the wind.

## 9. Habitat in the Game

Bellwether Field ridge thermals.

Available in the wilderness encounter tables listed below.

## 10. Affinity or Classification

**Anchor approach.** Stable positions catch fast movement. Its Anchor techniques gain a 1.35× modifier against Skitter and a 0.8× modifier against Signal. Same-approach exchanges use 1×. The technique’s approach determines the modifier; these are tactical relationships, not biological taxonomy.

## 11. Battle Role

Thermal-position defender. High guard and prompt defensive contact make a flying Anchor an effective Skitter check.

## 12. Base Stats

| Vitality | Force | Guard | Tempo |
| -------- | ----- | ----- | ----- |
| 28       | 9     | 12    | 8     |

These are level-one game values, not measurements of animal strength. Level growth is shared across the roster and defined in `src/core/progression.ts`.

## 13. Move Set

| Learned at level | Technique     | Approach | Power | Reliability | Priority | Effect |
| ---------------- | ------------- | -------- | ----- | ----------- | -------- | ------ |
| 1                | Rooted Nudge  | Anchor   | 10    | 100%        | 0        | none   |
| 1                | Thermal Shelf | Anchor   | 7     | 100%        | 1        | guard  |
| 4                | Read the Room | Signal   | 0     | 100%        | 0        | focus  |
| 7                | Set the Line  | Anchor   | 18    | 95%         | 0        | none   |

Both level-one techniques are immediately usable. Level four adds a complementary option; level seven adds a stronger practiced attack. Positive priority acts before lower priority, then tempo resolves order.

## 14. Signature Technique

**Thermal Shelf** (`sig-020`): A wingbeat raises a small air shelf and guards the next impact. Power 7; reliability 100%; priority 1; effect **guard**. Effects occur only when the technique succeeds. The shared battle engine governs duration, recovery, and guard strength.

## 15. Strengths and Weaknesses

**Strength:** High guard and prompt defensive contact make a flying Anchor an effective Skitter check.

**Limitation:** Modest force and only average tempo allow Signal rivals to dictate the exchange.

## 16. Encounter Level and Rarity

**Roster classification: uncommon.**

Bellwether Field: levels 3–5, encounter weight 6 out of 100.

Every roster member is viewable in the Margin Notes and can be selected as a practice opponent in the developer showcase. Weight is a relative table entry, not a promise of a sighting on each step.

## 17. Design Thought Process

Birds need not all be fast attackers. Holding a thermal makes stability a flight behavior, keeping the affinity system about approach rather than anatomy.

## 18. Distinction Between Fact and Fiction

The animal, range, and biological behaviors in section 4 are factual inspiration. The visible powers in section 5, tactical approach, vitality, techniques, invitation agreement, and Foldwater travel are invented game rules. Real wildlife does not consent through game menus or learn combat techniques.

## 19. Future Art or Animation Notes

Tilt broad wings around a slow rising circle, then hold one level glide frame. Keep the silhouette readable at journal-thumbnail size and retain the anatomy before adding detail. Current playable portrait: `public/art/pixel/020.png` (80 × 72 pixels); preserved SVG: `public/art/020.svg`. Both come from the original editable drawing source in `src/art/generate.mjs`. The current field plate is static, with no dedicated rear pose; the animation ideas above are future work.
