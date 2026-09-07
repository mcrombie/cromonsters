# 012 — Veilmorrow

## 1. Cromon Name

**Veilmorrow**. Margin Notes number **012**.

## 2. Real-World Inspiration

Luna moth — _Actias luna_. One source animal, one Cromon; no evolutionary form consumes a second roster slot.

## 3. Name Origin and Wordplay

Veil + morrow: a soft trailing curtain that seems to arrive from tomorrow.

## 4. Real Biology and Ecology

Luna moth adults have pale green wings, long hindwing tails, and reduced mouthparts. Their tails can divert attacks by echolocating bats away from the body.

**Real-world range:** Eastern North America, from southern Canada through the eastern United States. Biological reference: [University of Michigan Animal Diversity Web](https://animaldiversity.org/accounts/Actias_luna/); [Barber and colleagues, acoustic deflection study](https://scholarworks.boisestate.edu/bio_facpubs/432/).

## 5. Fantasy Elaboration

The trailing tails hold a delayed echo of each wingbeat, drawing one incoming blow away from its body.

## 6. Visual Design

**Future color concept:** Pale green wings with plum rims, small eyespots, and two long ribbonlike tails. The retained concept swatch is `#a8c48f`. The current playable 80 × 72 pixel portrait uses the four-ink palette defined in [art direction](../design/art-direction.md).

## 7. Silhouette and Identifying Features

Broad triangular forewings, sweeping hindwing tails, furry body, and feathery antennae.

## 8. Temperament and Behavior

Quiet, nocturnal, and inclined to make an entrance after everyone has stopped talking.

## 9. Habitat in the Game

Russetwalk canopy; Bellwether Field woodland edge.

Available in the wilderness encounter tables listed below.

## 10. Affinity or Classification

**Signal approach.** Reading a stable pattern reveals its opening. Its Signal techniques gain a 1.35× modifier against Anchor and a 0.8× modifier against Skitter. Same-approach exchanges use 1×. The technique’s approach determines the modifier; these are tactical relationships, not biological taxonomy.

## 11. Battle Role

Protective decoy caller. Prompt guard gives a fragile caller time to make a useful observation.

## 12. Base Stats

| Vitality | Force | Guard | Tempo |
| -------- | ----- | ----- | ----- |
| 25       | 8     | 10    | 10    |

These are level-one game values, not measurements of animal strength. Level growth is shared across the roster and defined in `src/core/progression.ts`.

## 13. Move Set

| Learned at level | Technique     | Approach | Power | Reliability | Priority | Effect |
| ---------------- | ------------- | -------- | ----- | ----------- | -------- | ------ |
| 1                | Clear Note    | Signal   | 10    | 100%        | 0        | none   |
| 1                | Borrowed Echo | Signal   | 6     | 100%        | 1        | guard  |
| 4                | Sidebeat      | Skitter  | 8     | 100%        | 1        | none   |
| 7                | Perfect Cue   | Signal   | 18    | 95%         | 0        | none   |

Both level-one techniques are immediately usable. Level four adds a complementary option; level seven adds a stronger practiced attack. Positive priority acts before lower priority, then tempo resolves order.

## 14. Signature Technique

**Borrowed Echo** (`sig-012`): A trailing echo taps the rival and diverts the next incoming hit. Power 6; reliability 100%; priority 1; effect **guard**. Effects occur only when the technique succeeds. The shared battle engine governs duration, recovery, and guard strength.

## 15. Strengths and Weaknesses

**Strength:** Prompt guard gives a fragile caller time to make a useful observation.

**Limitation:** Low vitality and force limit extended direct trades.

## 16. Encounter Level and Rarity

**Roster classification: uncommon.**

Russetwalk: levels 2–4, encounter weight 12 out of 100.

Every roster member is viewable in the Margin Notes and can be selected as a practice opponent in the developer showcase. Weight is a relative table entry, not a promise of a sighting on each step.

## 17. Design Thought Process

The moth is deliberately distinct from the monarch: defense through acoustic deception rather than migratory recovery. The real tail effect is an unusually direct bridge between ecology and battle.

## 18. Distinction Between Fact and Fiction

The animal, range, and biological behaviors in section 4 are factual inspiration. The visible powers in section 5, tactical approach, vitality, techniques, invitation agreement, and Foldwater travel are invented game rules. Real wildlife does not consent through game menus or learn combat techniques.

## 19. Future Art or Animation Notes

Let tail tips lag behind the main wing motion; never detach the tails as independent creatures. Keep the silhouette readable at journal-thumbnail size and retain the anatomy before adding detail. Current playable portrait: `public/art/pixel/012.png` (80 × 72 pixels); preserved SVG: `public/art/012.svg`. Both come from the original editable drawing source in `src/art/generate.mjs`. The current field plate is static, with no dedicated rear pose; the animation ideas above are future work.
