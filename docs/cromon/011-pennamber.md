# 011 — Pennamber

## 1. Cromon Name

**Pennamber**. Margin Notes number **011**.

## 2. Real-World Inspiration

Monarch butterfly — _Danaus plexippus_. One source animal, one Cromon; no evolutionary form consumes a second roster slot.

## 3. Name Origin and Wordplay

Pennant + amber: banner-shaped wings carried along a migratory route.

## 4. Real Biology and Ecology

Monarch caterpillars feed on milkweeds. Adults drink nectar, and some populations undertake long seasonal migrations across multiple generations.

**Real-world range:** Native to the Americas; migratory North American populations link breeding regions with overwintering areas in Mexico or coastal California. Biological reference: [University of Michigan Animal Diversity Web](https://animaldiversity.org/accounts/Danaus_plexippus/).

## 5. Fantasy Elaboration

Amber wing panels store a little warmth from flower stops, releasing it as a restorative gust during a sharp turn.

## 6. Visual Design

**Future color concept:** Black-veined orange wings with cream border dots; one elongated amber panel suggests a travel banner. The retained concept swatch is `#d89549`. The current playable 80 × 72 pixel portrait uses the four-ink palette defined in [art direction](../design/art-direction.md).

## 7. Silhouette and Identifying Features

Four broad butterfly wings, thin body, six legs, and clubbed antennae.

## 8. Temperament and Behavior

Determined, sociable at flowers, and always looking toward the next hill.

## 9. Habitat in the Game

Bellwether Field, goldenrod and asters.

Available in the wilderness encounter tables listed below.

## 10. Affinity or Classification

**Skitter approach.** Sudden timing interrupts a prepared cue. Its Skitter techniques gain a 1.35× modifier against Signal and a 0.8× modifier against Anchor. Same-approach exchanges use 1×. The technique’s approach determines the modifier; these are tactical relationships, not biological taxonomy.

## 11. Battle Role

Sustained travel skirmisher. Quick recovery contact sustains its low-vitality skirmishing style.

## 12. Base Stats

| Vitality | Force | Guard | Tempo |
| -------- | ----- | ----- | ----- |
| 27       | 8     | 6     | 13    |

These are level-one game values, not measurements of animal strength. Level growth is shared across the roster and defined in `src/core/progression.ts`.

## 13. Move Set

| Learned at level | Technique      | Approach | Power | Reliability | Priority | Effect |
| ---------------- | -------------- | -------- | ----- | ----------- | -------- | ------ |
| 1                | Passing Tap    | Skitter  | 10    | 100%        | 0        | none   |
| 1                | Wayfarer Draft | Skitter  | 6     | 100%        | 1        | heal   |
| 4                | Hold Steady    | Anchor   | 0     | 100%        | 1        | guard  |
| 7                | Seize the Gap  | Skitter  | 18    | 95%         | 0        | none   |

Both level-one techniques are immediately usable. Level four adds a complementary option; level seven adds a stronger practiced attack. Positive priority acts before lower priority, then tempo resolves order.

## 14. Signature Technique

**Wayfarer Draft** (`sig-011`): A quick warm draft clips the rival and restores a little vitality. Power 6; reliability 100%; priority 1; effect **heal**. Effects occur only when the technique succeeds. The shared battle engine governs duration, recovery, and guard strength.

## 15. Strengths and Weaknesses

**Strength:** Quick recovery contact sustains its low-vitality skirmishing style.

**Limitation:** Poor guard makes an unfavorable Anchor matchup risky.

## 16. Encounter Level and Rarity

**Roster classification: common.**

Bellwether Field: levels 2–4, encounter weight 24 out of 100.

Every roster member is viewable in the Margin Notes and can be selected as a practice opponent in the developer showcase. Weight is a relative table entry, not a promise of a sighting on each step.

## 17. Design Thought Process

Migration suggests endurance as well as speed. A healing attack differentiates this butterfly from a disposable fast attacker without inventing a fire affinity.

## 18. Distinction Between Fact and Fiction

The animal, range, and biological behaviors in section 4 are factual inspiration. The visible powers in section 5, tactical approach, vitality, techniques, invitation agreement, and Foldwater travel are invented game rules. Real wildlife does not consent through game menus or learn combat techniques.

## 19. Future Art or Animation Notes

Use a drifting glide between two broad flaps, with a brief warm wing-panel glint. Keep the silhouette readable at journal-thumbnail size and retain the anatomy before adding detail. Current playable portrait: `public/art/pixel/011.png` (80 × 72 pixels); preserved SVG: `public/art/011.svg`. Both come from the original editable drawing source in `src/art/generate.mjs`. The current field plate is static, with no dedicated rear pose; the animation ideas above are future work.
