# 005 — Pipistitch

## 1. Cromon Name

**Pipistitch**. Margin Notes number **005**.

## 2. Real-World Inspiration

Little brown bat — _Myotis lucifugus_. One source animal, one Cromon; no evolutionary form consumes a second roster slot.

## 3. Name Origin and Wordplay

Pip, a tiny sharp call, + stitch, the dotted echo traces; the name does not claim it belongs to the genus Pipistrellus.

## 4. Real Biology and Ecology

Little brown bats use echolocation to find flying insects. They roost socially and may hibernate in caves or mines.

**Real-world range:** Much of North America, including forest and freshwater habitats. Biological reference: [University of Michigan Animal Diversity Web](https://animaldiversity.org/accounts/Myotis_lucifugus/).

## 5. Fantasy Elaboration

Returning echoes appear as short pale stitches between the veins of its wing membranes, outlining an opening for the next strike.

## 6. Visual Design

**Future color concept:** Warm brown body with lilac membranes and three cream stitch marks on each wing. The retained concept swatch is `#987caa`. The current playable 80 × 72 pixel portrait uses the four-ink palette defined in [art direction](../design/art-direction.md).

## 7. Silhouette and Identifying Features

Two membranous wings supported by long fingers, small furry body, prominent ears, and a tail membrane.

## 8. Temperament and Behavior

Inquisitive and precise; checks an empty cupboard twice because the echo sounded interesting.

## 9. Habitat in the Game

Russetwalk stream canopy; Latchleaf starter station.

Available in the wilderness encounter tables listed below.

## 10. Affinity or Classification

**Signal approach.** Reading a stable pattern reveals its opening. Its Signal techniques gain a 1.35× modifier against Anchor and a 0.8× modifier against Skitter. Same-approach exchanges use 1×. The technique’s approach determines the modifier; these are tactical relationships, not biological taxonomy.

## 11. Battle Role

Perception and focus; starter. Reliable focus creates strong follow-up hits against Anchor defenses.

## 12. Base Stats

| Vitality | Force | Guard | Tempo |
| -------- | ----- | ----- | ----- |
| 26       | 10    | 8     | 11    |

These are level-one game values, not measurements of animal strength. Level growth is shared across the roster and defined in `src/core/progression.ts`.

## 13. Move Set

| Learned at level | Technique   | Approach | Power | Reliability | Priority | Effect |
| ---------------- | ----------- | -------- | ----- | ----------- | -------- | ------ |
| 1                | Clear Note  | Signal   | 10    | 100%        | 0        | none   |
| 1                | Echo Stitch | Signal   | 8     | 100%        | 0        | focus  |
| 4                | Sidebeat    | Skitter  | 8     | 100%        | 1        | none   |
| 7                | Perfect Cue | Signal   | 18    | 95%         | 0        | none   |

Both level-one techniques are immediately usable. Level four adds a complementary option; level seven adds a stronger practiced attack. Positive priority acts before lower priority, then tempo resolves order.

## 14. Signature Technique

**Echo Stitch** (`sig-005`): An echo-guided tap leaves the next action focused. Power 8; reliability 100%; priority 0; effect **focus**. Effects occur only when the technique succeeds. The shared battle engine governs duration, recovery, and guard strength.

## 15. Strengths and Weaknesses

**Strength:** Reliable focus creates strong follow-up hits against Anchor defenses.

**Limitation:** Its small vitality pool and slower order than dedicated Skitter species demand careful recovery.

## 16. Encounter Level and Rarity

**Roster classification: common.**

Russetwalk: levels 2–4, encounter weight 20 out of 100.

Every roster member is viewable in the Margin Notes and can be selected as a practice opponent in the developer showcase. Weight is a relative table entry, not a promise of a sighting on each step.

## 17. Design Thought Process

Perception is a strong beginner lesson: a modest first action improves the second. Avoid the vampire motif; this animal eats insects and does not need fangs as its defining feature.

## 18. Distinction Between Fact and Fiction

The animal, range, and biological behaviors in section 4 are factual inspiration. The visible powers in section 5, tactical approach, vitality, techniques, invitation agreement, and Foldwater travel are invented game rules. Real wildlife does not consent through game menus or learn combat techniques.

## 19. Future Art or Animation Notes

A shallow wing beat emits three little dashes; returning dashes briefly align along one wing. Keep the silhouette readable at journal-thumbnail size and retain the anatomy before adding detail. Current playable portrait: `public/art/pixel/005.png` (80 × 72 pixels); preserved SVG: `public/art/005.svg`. Both come from the original editable drawing source in `src/art/generate.mjs`. The current field plate is static, with no dedicated rear pose; the animation ideas above are future work.
