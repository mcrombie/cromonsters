# 014 — Aeroveer

## 1. Cromon Name

**Aeroveer**. Margin Notes number **014**.

## 2. Real-World Inspiration

Common green darner — _Anax junius_. One source animal, one Cromon; no evolutionary form consumes a second roster slot.

## 3. Name Origin and Wordplay

Aero, air, + veer, a sudden directional change.

## 4. Real Biology and Ecology

Common green darners are large dragonflies with aquatic predatory juveniles. Adults hunt flying insects, and some populations migrate seasonally.

**Real-world range:** Widespread in North America, with migratory movements extending into parts of Central America and the Caribbean. Biological reference: [University of Michigan Animal Diversity Web](https://animaldiversity.org/accounts/Anax_junius/).

## 5. Fantasy Elaboration

Its four wings sketch short-lived arrows in the air that pull its next turn into place.

## 6. Visual Design

**Future color concept:** Green thorax, blue abdomen, and four transparent wings with one sharp cream leading edge each. The retained concept swatch is `#75a68a`. The current playable 80 × 72 pixel portrait uses the four-ink palette defined in [art direction](../design/art-direction.md).

## 7. Silhouette and Identifying Features

Very long slender abdomen, enormous compound eyes, six legs, and four separately readable wings.

## 8. Temperament and Behavior

Alert and restless; circles back to check that everyone is still following.

## 9. Habitat in the Game

Bellwether Field air lanes; Sluicefen pond edge.

Available in the wilderness encounter tables listed below.

## 10. Affinity or Classification

**Skitter approach.** Sudden timing interrupts a prepared cue. Its Skitter techniques gain a 1.35× modifier against Signal and a 0.8× modifier against Anchor. Same-approach exchanges use 1×. The technique’s approach determines the modifier; these are tactical relationships, not biological taxonomy.

## 11. Battle Role

Priority pursuit specialist. Exceptional tempo and a reliable priority strike finish weakened rivals.

## 12. Base Stats

| Vitality | Force | Guard | Tempo |
| -------- | ----- | ----- | ----- |
| 26       | 11    | 5     | 14    |

These are level-one game values, not measurements of animal strength. Level growth is shared across the roster and defined in `src/core/progression.ts`.

## 13. Move Set

| Learned at level | Technique      | Approach | Power | Reliability | Priority | Effect |
| ---------------- | -------------- | -------- | ----- | ----------- | -------- | ------ |
| 1                | Passing Tap    | Skitter  | 10    | 100%        | 0        | none   |
| 1                | Crosswind Jink | Skitter  | 10    | 100%        | 2        | none   |
| 4                | Hold Steady    | Anchor   | 0     | 100%        | 1        | guard  |
| 7                | Seize the Gap  | Skitter  | 18    | 95%         | 0        | none   |

Both level-one techniques are immediately usable. Level four adds a complementary option; level seven adds a stronger practiced attack. Positive priority acts before lower priority, then tempo resolves order.

## 14. Signature Technique

**Crosswind Jink** (`sig-014`): A tightly angled aerial strike has exceptional priority. Power 10; reliability 100%; priority 2; effect **none**. Effects occur only when the technique succeeds. The shared battle engine governs duration, recovery, and guard strength.

## 15. Strengths and Weaknesses

**Strength:** Exceptional tempo and a reliable priority strike finish weakened rivals.

**Limitation:** Very low guard punishes any poorly chosen matchup.

## 16. Encounter Level and Rarity

**Roster classification: common.**

Bellwether Field: levels 2–4, encounter weight 22 out of 100.

Every roster member is viewable in the Margin Notes and can be selected as a practice opponent in the developer showcase. Weight is a relative table entry, not a promise of a sighting on each step.

## 17. Design Thought Process

Independent wing control suggested decisive turn order. A narrow body with four obvious wings keeps it different from both moths and the hummingbird.

## 18. Distinction Between Fact and Fiction

The animal, range, and biological behaviors in section 4 are factual inspiration. The visible powers in section 5, tactical approach, vitality, techniques, invitation agreement, and Foldwater travel are invented game rules. Real wildlife does not consent through game menus or learn combat techniques.

## 19. Future Art or Animation Notes

Alternate forewing and hindwing angles, pause in a hover, then move along a short angular path. Keep the silhouette readable at journal-thumbnail size and retain the anatomy before adding detail. Current playable portrait: `public/art/pixel/014.png` (80 × 72 pixels); preserved SVG: `public/art/014.svg`. Both come from the original editable drawing source in `src/art/generate.mjs`. The current field plate is static, with no dedicated rear pose; the animation ideas above are future work.
