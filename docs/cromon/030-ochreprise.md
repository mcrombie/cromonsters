# 030 — Ochreprise

## 1. Cromon Name

**Ochreprise**. Margin Notes number **030**.

## 2. Real-World Inspiration

Ochre sea star — _Pisaster ochraceus_. One source animal, one Cromon; no evolutionary form consumes a second roster slot.

## 3. Name Origin and Wordplay

Ochre + reprise, a return to form after a difficult passage.

## 4. Real Biology and Ecology

Ochre sea stars use many tube feet to grip surfaces and handle prey such as mussels. They are important rocky-shore predators and can regenerate damaged arms over time.

**Real-world range:** Rocky intertidal shores of the northeastern Pacific, from Alaska to Baja California; not native to the Atlantic. Biological reference: [University of Michigan Animal Diversity Web](https://animaldiversity.org/accounts/Pisaster_ochraceus/).

## 5. Fantasy Elaboration

Its tube feet stitch a temporary star-shaped grip into a ripple, recovering vitality while holding its position.

## 6. Visual Design

**Future color concept:** Five thick ochre arms with pale beadlike tube-foot accents and a few simple violet surface patches. The retained concept swatch is `#bd865e`. The current playable 80 × 72 pixel portrait uses the four-ink palette defined in [art direction](../design/art-direction.md).

## 7. Silhouette and Identifying Features

Five broad tapering arms around a central disc; no face, limbs, or ornamental armor added.

## 8. Temperament and Behavior

Persistent and quietly curious; finishes one task before deciding which direction was forward.

## 9. Habitat in the Game

Farcurrent Strand cold research pool; Foldwater visitor.

The Foldwater seam temporarily brings distant habitats alongside the inlet. This is an explicit fantasy mechanism, not a claim that the source animal naturally lives in an autumn woodland estuary. Aquatic companions keep their full bodies in suitable water and use a small Foldwater presence for land practice.

Available in the wilderness encounter tables listed below.

## 10. Affinity or Classification

**Anchor approach.** Stable positions catch fast movement. Its Anchor techniques gain a 1.35× modifier against Skitter and a 0.8× modifier against Signal. Same-approach exchanges use 1×. The technique’s approach determines the modifier; these are tactical relationships, not biological taxonomy.

## 11. Battle Role

Adhesive recovery specialist. Strong guard and recovery reward a patient defensive rhythm.

## 12. Base Stats

| Vitality | Force | Guard | Tempo |
| -------- | ----- | ----- | ----- |
| 31       | 8     | 12    | 5     |

These are level-one game values, not measurements of animal strength. Level growth is shared across the roster and defined in `src/core/progression.ts`.

## 13. Move Set

| Learned at level | Technique        | Approach | Power | Reliability | Priority | Effect |
| ---------------- | ---------------- | -------- | ----- | ----------- | -------- | ------ |
| 1                | Rooted Nudge     | Anchor   | 10    | 100%        | 0        | none   |
| 1                | Fivefold Reprise | Anchor   | 6     | 100%        | 0        | heal   |
| 4                | Read the Room    | Signal   | 0     | 100%        | 0        | focus  |
| 7                | Set the Line     | Anchor   | 18    | 95%         | 0        | none   |

Both level-one techniques are immediately usable. Level four adds a complementary option; level seven adds a stronger practiced attack. Positive priority acts before lower priority, then tempo resolves order.

## 14. Signature Technique

**Fivefold Reprise** (`sig-030`): An adhesive ripple taps the rival and restores the user. Power 6; reliability 100%; priority 0; effect **heal**. Effects occur only when the technique succeeds. The shared battle engine governs duration, recovery, and guard strength.

## 15. Strengths and Weaknesses

**Strength:** Strong guard and recovery reward a patient defensive rhythm.

**Limitation:** Very low tempo and modest force allow Signal pressure to wear it down.

## 16. Encounter Level and Rarity

**Roster classification: visitor.**

Farcurrent Strand: levels 2–4, encounter weight 6 out of 100.

Every roster member is viewable in the Margin Notes and can be selected as a practice opponent in the developer showcase. Weight is a relative table entry, not a promise of a sighting on each step.

## 17. Design Thought Process

The sea star completes the roster with radial symmetry and attachment-based play. Its Pacific origin and slow biological regeneration are stated directly rather than disguised by the fantasy inlet.

## 18. Distinction Between Fact and Fiction

The animal, range, and biological behaviors in section 4 are factual inspiration. The visible powers in section 5, tactical approach, vitality, techniques, invitation agreement, and Foldwater travel are invented game rules. Real wildlife does not consent through game menus or learn combat techniques. Real regeneration is gradual and injury-dependent, not instant restoration from every fragment.

## 19. Future Art or Animation Notes

Ripple tiny tube-foot dots under one arm, then transfer the pulse around the central disc. Keep the silhouette readable at journal-thumbnail size and retain the anatomy before adding detail. Current playable portrait: `public/art/pixel/030.png` (80 × 72 pixels); preserved SVG: `public/art/030.svg`. Both come from the original editable drawing source in `src/art/generate.mjs`. The current field plate is static, with no dedicated rear pose; the animation ideas above are future work.
