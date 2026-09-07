# 002 — Palmarch

## 1. Cromon Name

**Palmarch**. Margin Notes number **002**.

## 2. Real-World Inspiration

Moose — _Alces alces_. One source animal, one Cromon; no evolutionary form consumes a second roster slot.

## 3. Name Origin and Wordplay

Palmate antlers + march, with an unexpectedly quick marching rhythm.

## 4. Real Biology and Ecology

Moose browse woody plants and aquatic vegetation. Their long legs help them move through snow and wetlands; males grow broad palmate antlers.

**Real-world range:** Boreal and northern temperate forests of North America, Europe, and Asia. Biological reference: [University of Michigan Animal Diversity Web](https://animaldiversity.org/accounts/Alces_alces/).

## 5. Fantasy Elaboration

Its antlers sweep reeds into temporary lanes that let its improbably long strides interrupt an opponent.

## 6. Visual Design

**Future color concept:** Broad antlers have a single reed-shaped notch; elongated knees emphasize motion rather than bulk. The retained concept swatch is `#a58562`. The current playable 80 × 72 pixel portrait uses the four-ink palette defined in [art direction](../design/art-direction.md).

## 7. Silhouette and Identifying Features

High shoulders, drooping muzzle, hanging throat bell, tall legs, and wide palmate antlers.

## 8. Temperament and Behavior

Unhurried until it needs to be somewhere else; regards path signs as personal suggestions.

## 9. Habitat in the Game

Sluicefen, willow margins.

Available in the wilderness encounter tables listed below.

## 10. Affinity or Classification

**Skitter approach.** Sudden timing interrupts a prepared cue. Its Skitter techniques gain a 1.35× modifier against Signal and a 0.8× modifier against Anchor. Same-approach exchanges use 1×. The technique’s approach determines the modifier; these are tactical relationships, not biological taxonomy.

## 11. Battle Role

Long-stride disruptor. High tempo and slowing contact can seize the order of a battle.

## 12. Base Stats

| Vitality | Force | Guard | Tempo |
| -------- | ----- | ----- | ----- |
| 36       | 10    | 6     | 12    |

These are level-one game values, not measurements of animal strength. Level growth is shared across the roster and defined in `src/core/progression.ts`.

## 13. Move Set

| Learned at level | Technique     | Approach | Power | Reliability | Priority | Effect |
| ---------------- | ------------- | -------- | ----- | ----------- | -------- | ------ |
| 1                | Passing Tap   | Skitter  | 10    | 100%        | 0        | none   |
| 1                | Reedlane Step | Skitter  | 8     | 95%         | 1        | slow   |
| 4                | Hold Steady   | Anchor   | 0     | 100%        | 1        | guard  |
| 7                | Seize the Gap | Skitter  | 18    | 95%         | 0        | none   |

Both level-one techniques are immediately usable. Level four adds a complementary option; level seven adds a stronger practiced attack. Positive priority acts before lower priority, then tempo resolves order.

## 14. Signature Technique

**Reedlane Step** (`sig-002`): A long crossing step clips the rival and tangles its next stride. Power 8; reliability 95%; priority 1; effect **slow**. Effects occur only when the technique succeeds. The shared battle engine governs duration, recovery, and guard strength.

## 15. Strengths and Weaknesses

**Strength:** High tempo and slowing contact can seize the order of a battle.

**Limitation:** Broad body offers poor guard; Anchor techniques punish its committed stride.

## 16. Encounter Level and Rarity

**Roster classification: uncommon.**

Sluicefen: levels 3–5, encounter weight 7 out of 100.

Every roster member is viewable in the Margin Notes and can be selected as a practice opponent in the developer showcase. Weight is a relative table entry, not a promise of a sighting on each step.

## 17. Design Thought Process

A large mammal need not be a wall. Wetland locomotion suggested a mobile reach specialist, making the moose different from the bison and whale.

## 18. Distinction Between Fact and Fiction

The animal, range, and biological behaviors in section 4 are factual inspiration. The visible powers in section 5, tactical approach, vitality, techniques, invitation agreement, and Foldwater travel are invented game rules. Real wildlife does not consent through game menus or learn combat techniques.

## 19. Future Art or Animation Notes

Use a long two-step stride and swinging throat bell; antlers remain part of the skull, not hand-held tools. Keep the silhouette readable at journal-thumbnail size and retain the anatomy before adding detail. Current playable portrait: `public/art/pixel/002.png` (80 × 72 pixels); preserved SVG: `public/art/002.svg`. Both come from the original editable drawing source in `src/art/generate.mjs`. The current field plate is static, with no dedicated rear pose; the animation ideas above are future work.
