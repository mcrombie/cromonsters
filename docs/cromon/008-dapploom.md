# 008 — Dapploom

## 1. Cromon Name

**Dapploom**. Margin Notes number **008**.

## 2. Real-World Inspiration

Spotted salamander — _Ambystoma maculatum_. One source animal, one Cromon; no evolutionary form consumes a second roster slot.

## 3. Name Origin and Wordplay

Dappled spots + loom, suggesting a small repair woven from mist.

## 4. Real Biology and Ecology

Spotted salamanders spend much of their lives under cover and breed in woodland pools. Their skin needs moisture; salamanders can regenerate some damaged body structures.

**Real-world range:** Eastern North America, including southern Canada and much of the eastern United States. Biological reference: [University of Michigan Animal Diversity Web](https://animaldiversity.org/accounts/Ambystoma_maculatum/).

## 5. Fantasy Elaboration

Its yellow spots gather cool mist into a soft patch that restores battle vitality without replacing limbs during combat.

## 6. Visual Design

**Future color concept:** Two irregular rows of gold spots become larger near the shoulders; one translucent dew collar is the only magical accent. The retained concept swatch is `#596c79`. The current playable 80 × 72 pixel portrait uses the four-ink palette defined in [art direction](../design/art-direction.md).

## 7. Silhouette and Identifying Features

Long low body, four short legs, broad head, smooth skin, and a substantial tapering tail.

## 8. Temperament and Behavior

Gentle and private; arrives at group activities slightly damp and exactly on time.

## 9. Habitat in the Game

Russetwalk rotting logs; Sluicefen shaded pools.

Available in the wilderness encounter tables listed below.

## 10. Affinity or Classification

**Anchor approach.** Stable positions catch fast movement. Its Anchor techniques gain a 1.35× modifier against Skitter and a 0.8× modifier against Signal. Same-approach exchanges use 1×. The technique’s approach determines the modifier; these are tactical relationships, not biological taxonomy.

## 11. Battle Role

Moisture recovery duelist. Damage plus modest recovery allows it to stabilize a close encounter.

## 12. Base Stats

| Vitality | Force | Guard | Tempo |
| -------- | ----- | ----- | ----- |
| 31       | 8     | 10    | 7     |

These are level-one game values, not measurements of animal strength. Level growth is shared across the roster and defined in `src/core/progression.ts`.

## 13. Move Set

| Learned at level | Technique     | Approach | Power | Reliability | Priority | Effect |
| ---------------- | ------------- | -------- | ----- | ----------- | -------- | ------ |
| 1                | Rooted Nudge  | Anchor   | 10    | 100%        | 0        | none   |
| 1                | Dew Hem       | Anchor   | 6     | 100%        | 0        | heal   |
| 4                | Read the Room | Signal   | 0     | 100%        | 0        | focus  |
| 7                | Set the Line  | Anchor   | 18    | 95%         | 0        | none   |

Both level-one techniques are immediately usable. Level four adds a complementary option; level seven adds a stronger practiced attack. Positive priority acts before lower priority, then tempo resolves order.

## 14. Signature Technique

**Dew Hem** (`sig-008`): A damp tail flick lands while a mist patch restores vitality. Power 6; reliability 100%; priority 0; effect **heal**. Effects occur only when the technique succeeds. The shared battle engine governs duration, recovery, and guard strength.

## 15. Strengths and Weaknesses

**Strength:** Damage plus modest recovery allows it to stabilize a close encounter.

**Limitation:** Low force and tempo struggle to finish opponents before repeated pressure accumulates.

## 16. Encounter Level and Rarity

**Roster classification: common.**

Russetwalk: levels 2–4, encounter weight 22 out of 100.

Sluicefen: levels 2–4, encounter weight 8 out of 100.

Every roster member is viewable in the Margin Notes and can be selected as a practice opponent in the developer showcase. Weight is a relative table entry, not a promise of a sighting on each step.

## 17. Design Thought Process

Regeneration informs recovery, but instantaneous regrowth would misrepresent biology. Restoring an abstract stamina-like vitality keeps the distinction explicit.

## 18. Distinction Between Fact and Fiction

The animal, range, and biological behaviors in section 4 are factual inspiration. The visible powers in section 5, tactical approach, vitality, techniques, invitation agreement, and Foldwater travel are invented game rules. Real wildlife does not consent through game menus or learn combat techniques. Recovery in a few turns does not depict the speed or full biological process of regeneration.

## 19. Future Art or Animation Notes

Gather three droplets onto the yellow spots, then release one slow ripple along the tail. Keep the silhouette readable at journal-thumbnail size and retain the anatomy before adding detail. Current playable portrait: `public/art/pixel/008.png` (80 × 72 pixels); preserved SVG: `public/art/008.svg`. Both come from the original editable drawing source in `src/art/generate.mjs`. The current field plate is static, with no dedicated rear pose; the animation ideas above are future work.
