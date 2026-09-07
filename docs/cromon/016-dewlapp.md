# 016 — Dewlapp

## 1. Cromon Name

**Dewlapp**. Margin Notes number **016**.

## 2. Real-World Inspiration

Green anole — _Anolis carolinensis_. One source animal, one Cromon; no evolutionary form consumes a second roster slot.

## 3. Name Origin and Wordplay

Dewlap + lap, suggesting a tiny display that opens like a folded note.

## 4. Real Biology and Ecology

Green anoles climb with adhesive toe pads and communicate with body postures and an extendable dewlap. Their color varies with condition and surroundings.

**Real-world range:** Native to the southeastern United States; introduced to several other places. Biological reference: [University of Michigan Animal Diversity Web](https://animaldiversity.org/accounts/Anolis_carolinensis/).

## 5. Fantasy Elaboration

Its dewlap briefly displays a diagram of its intended feint, so confidently that a rival watches the wrong detail.

## 6. Visual Design

**Future color concept:** Leaf-green body and a single coral throat fan patterned with two clean concentric arcs. The retained concept swatch is `#87b478`. The current playable 80 × 72 pixel portrait uses the four-ink palette defined in [art direction](../design/art-direction.md).

## 7. Silhouette and Identifying Features

Slender lizard, triangular head, four spread-toed feet, and a very long tapering tail.

## 8. Temperament and Behavior

Expressive, proud, and surprisingly considerate when asked to lower its voice.

## 9. Habitat in the Game

Farcurrent Strand warm conservatory; Foldwater visitor.

The Foldwater seam temporarily brings distant habitats alongside the inlet. This is an explicit fantasy mechanism, not a claim that the source animal naturally lives in an autumn woodland estuary. Aquatic companions keep their full bodies in suitable water and use a small Foldwater presence for land practice.

This slice exposes this sanctuary visitor through the clearly labeled developer showcase and its Margin Notes page; it does not add a sixth map.

## 10. Affinity or Classification

**Signal approach.** Reading a stable pattern reveals its opening. Its Signal techniques gain a 1.35× modifier against Anchor and a 0.8× modifier against Skitter. Same-approach exchanges use 1×. The technique’s approach determines the modifier; these are tactical relationships, not biological taxonomy.

## 11. Battle Role

Display-based focus duelist. Fast focus setup gives its next reliable attack greater impact.

## 12. Base Stats

| Vitality | Force | Guard | Tempo |
| -------- | ----- | ----- | ----- |
| 25       | 10    | 7     | 12    |

These are level-one game values, not measurements of animal strength. Level growth is shared across the roster and defined in `src/core/progression.ts`.

## 13. Move Set

| Learned at level | Technique      | Approach | Power | Reliability | Priority | Effect |
| ---------------- | -------------- | -------- | ----- | ----------- | -------- | ------ |
| 1                | Clear Note     | Signal   | 10    | 100%        | 0        | none   |
| 1                | Dewlap Diagram | Signal   | 7     | 100%        | 1        | focus  |
| 4                | Sidebeat       | Skitter  | 8     | 100%        | 1        | none   |
| 7                | Perfect Cue    | Signal   | 18    | 95%         | 0        | none   |

Both level-one techniques are immediately usable. Level four adds a complementary option; level seven adds a stronger practiced attack. Positive priority acts before lower priority, then tempo resolves order.

## 14. Signature Technique

**Dewlap Diagram** (`sig-016`): A vivid display distracts the rival and focuses the next action. Power 7; reliability 100%; priority 1; effect **focus**. Effects occur only when the technique succeeds. The shared battle engine governs duration, recovery, and guard strength.

## 15. Strengths and Weaknesses

**Strength:** Fast focus setup gives its next reliable attack greater impact.

**Limitation:** Low vitality and guard demand good timing against Skitter rivals.

## 16. Encounter Level and Rarity

**Roster classification: visitor.**

No ordinary encounter in this slice; select this species and an adjustable level in the developer showcase.

Every roster member is viewable in the Margin Notes and can be selected as a practice opponent in the developer showcase. Weight is a relative table entry, not a promise of a sighting on each step.

## 17. Design Thought Process

Communication, not an imaginary chameleon tongue, drives the design. Its southern real range is made explicit through a warm visitor habitat.

## 18. Distinction Between Fact and Fiction

The animal, range, and biological behaviors in section 4 are factual inspiration. The visible powers in section 5, tactical approach, vitality, techniques, invitation agreement, and Foldwater travel are invented game rules. Real wildlife does not consent through game menus or learn combat techniques.

## 19. Future Art or Animation Notes

Open the dewlap in three fan segments and make a short head bob; keep the tail as counterbalance. Keep the silhouette readable at journal-thumbnail size and retain the anatomy before adding detail. Current playable portrait: `public/art/pixel/016.png` (80 × 72 pixels); preserved SVG: `public/art/016.svg`. Both come from the original editable drawing source in `src/art/generate.mjs`. The current field plate is static, with no dedicated rear pose; the animation ideas above are future work.
