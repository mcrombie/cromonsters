# 021 — Thrumble

## 1. Cromon Name

**Thrumble**. Margin Notes number **021**.

## 2. Real-World Inspiration

Ruby-throated hummingbird — _Archilochus colubris_. One source animal, one Cromon; no evolutionary form consumes a second roster slot.

## 3. Name Origin and Wordplay

Thrum, a rapid vibration, + a soft tumble: a tiny bird that can stop halfway through a fall.

## 4. Real Biology and Ecology

Ruby-throated hummingbirds hover while feeding on nectar and also eat tiny arthropods. Males have an iridescent red throat whose appearance depends on light.

**Real-world range:** Breeds in eastern North America and winters mainly in Mexico and Central America. Biological reference: [University of Michigan Animal Diversity Web](https://animaldiversity.org/accounts/Archilochus_colubris/).

## 5. Fantasy Elaboration

Its throat patch marks a precise airborne beat, letting it stop and jab within a thumb-sized space.

## 6. Visual Design

**Future color concept:** Green back, pale belly, narrow ruby throat diamond, and two crisp wing-motion arcs. The retained concept swatch is `#71a69a`. The current playable 80 × 72 pixel portrait uses the four-ink palette defined in [art direction](../design/art-direction.md).

## 7. Silhouette and Identifying Features

Tiny compact bird, long needlelike bill, very short legs, and narrow wings held to either side.

## 8. Temperament and Behavior

Energetic and particular; inspects every flower as though reviewing a restaurant.

## 9. Habitat in the Game

Bellwether Field flowers; Latchleaf starter station.

Available in the wilderness encounter tables listed below.

## 10. Affinity or Classification

**Skitter approach.** Sudden timing interrupts a prepared cue. Its Skitter techniques gain a 1.35× modifier against Signal and a 0.8× modifier against Anchor. Same-approach exchanges use 1×. The technique’s approach determines the modifier; these are tactical relationships, not biological taxonomy.

## 11. Battle Role

Hovering precision; starter. Excellent tempo and an accurate priority technique teach decisive finishing.

## 12. Base Stats

| Vitality | Force | Guard | Tempo |
| -------- | ----- | ----- | ----- |
| 25       | 10    | 7     | 14    |

These are level-one game values, not measurements of animal strength. Level growth is shared across the roster and defined in `src/core/progression.ts`.

## 13. Move Set

| Learned at level | Technique      | Approach | Power | Reliability | Priority | Effect |
| ---------------- | -------------- | -------- | ----- | ----------- | -------- | ------ |
| 1                | Passing Tap    | Skitter  | 10    | 100%        | 0        | none   |
| 1                | Pinpoint Hover | Skitter  | 10    | 100%        | 1        | none   |
| 4                | Hold Steady    | Anchor   | 0     | 100%        | 1        | guard  |
| 7                | Seize the Gap  | Skitter  | 18    | 95%         | 0        | none   |

Both level-one techniques are immediately usable. Level four adds a complementary option; level seven adds a stronger practiced attack. Positive priority acts before lower priority, then tempo resolves order.

## 14. Signature Technique

**Pinpoint Hover** (`sig-021`): A tiny, precisely timed hovering jab strikes with priority. Power 10; reliability 100%; priority 1; effect **none**. Effects occur only when the technique succeeds. The shared battle engine governs duration, recovery, and guard strength.

## 15. Strengths and Weaknesses

**Strength:** Excellent tempo and an accurate priority technique teach decisive finishing.

**Limitation:** Low vitality and guard make Anchor opponents a lesson in switching.

## 16. Encounter Level and Rarity

**Roster classification: common.**

Bellwether Field: levels 2–4, encounter weight 12 out of 100.

Every roster member is viewable in the Margin Notes and can be selected as a practice opponent in the developer showcase. Weight is a relative table entry, not a promise of a sighting on each step.

## 17. Design Thought Process

Hovering precision provides the mobile corner of the starter relationship. It stays useful through reliable priority, while its fragile body keeps speed from solving every encounter.

## 18. Distinction Between Fact and Fiction

The animal, range, and biological behaviors in section 4 are factual inspiration. The visible powers in section 5, tactical approach, vitality, techniques, invitation agreement, and Foldwater travel are invented game rules. Real wildlife does not consent through game menus or learn combat techniques.

## 19. Future Art or Animation Notes

Keep the body almost still while two wing poses alternate; dash a very short distance and return. Keep the silhouette readable at journal-thumbnail size and retain the anatomy before adding detail. Current playable portrait: `public/art/pixel/021.png` (80 × 72 pixels); preserved SVG: `public/art/021.svg`. Both come from the original editable drawing source in `src/art/generate.mjs`. The current field plate is static, with no dedicated rear pose; the animation ideas above are future work.
