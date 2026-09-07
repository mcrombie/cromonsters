# 022 — Stiltscribe

## 1. Cromon Name

**Stiltscribe**. Margin Notes number **022**.

## 2. Real-World Inspiration

Great blue heron — _Ardea herodias_. One source animal, one Cromon; no evolutionary form consumes a second roster slot.

## 3. Name Origin and Wordplay

Stilt legs + scribe, referring to its precise bill-written water marks.

## 4. Real Biology and Ecology

Great blue herons stalk shallow water and seize prey with a rapid bill strike. They fly with the neck folded and have long legs for wading.

**Real-world range:** Much of North and Central America and parts of the Caribbean; also reaches northern South America. Biological reference: [University of Michigan Animal Diversity Web](https://animaldiversity.org/accounts/Ardea_herodias/).

## 5. Fantasy Elaboration

Its bill draws a fine line over the water, marking the one angle where its next strike will not splash.

## 6. Visual Design

**Future color concept:** Blue-gray feathers, a black head stripe, and one cream line tracing the long folded neck. The retained concept swatch is `#879aa5`. The current playable 80 × 72 pixel portrait uses the four-ink palette defined in [art direction](../design/art-direction.md).

## 7. Silhouette and Identifying Features

Very long legs, long pointed bill, S-curved neck, broad wings, and a short tail.

## 8. Temperament and Behavior

Deliberate and exacting; refuses to sign a notebook until the ink has dried.

## 9. Habitat in the Game

Sluicefen shallows; Farcurrent Strand mud edge.

Available in the wilderness encounter tables listed below.

## 10. Affinity or Classification

**Anchor approach.** Stable positions catch fast movement. Its Anchor techniques gain a 1.35× modifier against Skitter and a 0.8× modifier against Signal. Same-approach exchanges use 1×. The technique’s approach determines the modifier; these are tactical relationships, not biological taxonomy.

## 11. Battle Role

Patient precision breaker. High force plus focus gives it a strong planned second strike.

## 12. Base Stats

| Vitality | Force | Guard | Tempo |
| -------- | ----- | ----- | ----- |
| 28       | 13    | 10    | 6     |

These are level-one game values, not measurements of animal strength. Level growth is shared across the roster and defined in `src/core/progression.ts`.

## 13. Move Set

| Learned at level | Technique        | Approach | Power | Reliability | Priority | Effect |
| ---------------- | ---------------- | -------- | ----- | ----------- | -------- | ------ |
| 1                | Rooted Nudge     | Anchor   | 10    | 100%        | 0        | none   |
| 1                | Waterline Script | Anchor   | 9     | 95%         | 0        | focus  |
| 4                | Read the Room    | Signal   | 0     | 100%        | 0        | focus  |
| 7                | Set the Line     | Anchor   | 18    | 95%         | 0        | none   |

Both level-one techniques are immediately usable. Level four adds a complementary option; level seven adds a stronger practiced attack. Positive priority acts before lower priority, then tempo resolves order.

## 14. Signature Technique

**Waterline Script** (`sig-022`): A measured bill stroke lands and marks a focused follow-up. Power 9; reliability 95%; priority 0; effect **focus**. Effects occur only when the technique succeeds. The shared battle engine governs duration, recovery, and guard strength.

## 15. Strengths and Weaknesses

**Strength:** High force plus focus gives it a strong planned second strike.

**Limitation:** Low tempo and only moderate vitality make setup costly against Signal attackers.

## 16. Encounter Level and Rarity

**Roster classification: uncommon.**

Sluicefen: levels 2–4, encounter weight 18 out of 100.

Every roster member is viewable in the Margin Notes and can be selected as a practice opponent in the developer showcase. Weight is a relative table entry, not a promise of a sighting on each step.

## 17. Design Thought Process

Precision need not mean speed. Waiting motionless and choosing one line gives the heron a different battle cadence from the hummingbird.

## 18. Distinction Between Fact and Fiction

The animal, range, and biological behaviors in section 4 are factual inspiration. The visible powers in section 5, tactical approach, vitality, techniques, invitation agreement, and Foldwater travel are invented game rules. Real wildlife does not consent through game menus or learn combat techniques.

## 19. Future Art or Animation Notes

Hold a wading stance, extend the folded neck in one clean line, and retract without bobbing. Keep the silhouette readable at journal-thumbnail size and retain the anatomy before adding detail. Current playable portrait: `public/art/pixel/022.png` (80 × 72 pixels); preserved SVG: `public/art/022.svg`. Both come from the original editable drawing source in `src/art/generate.mjs`. The current field plate is static, with no dedicated rear pose; the animation ideas above are future work.
