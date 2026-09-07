# 003 — Weirwhittle

## 1. Cromon Name

**Weirwhittle**. Margin Notes number **003**.

## 2. Real-World Inspiration

North American beaver — _Castor canadensis_. One source animal, one Cromon; no evolutionary form consumes a second roster slot.

## 3. Name Origin and Wordplay

Weir, a barrier guiding water, + whittle, shaping wood a little at a time.

## 4. Real Biology and Ecology

North American beavers cut woody plants and build dams and lodges. Their broad scaly tails help in swimming and produce warning slaps.

**Real-world range:** Much of North America, especially freshwater habitats with woody vegetation. Biological reference: [University of Michigan Animal Diversity Web](https://animaldiversity.org/accounts/Castor_canadensis/).

## 5. Fantasy Elaboration

It taps its paddle tail against the ground to fold loose twigs into a small, temporary weir.

## 6. Visual Design

**Future color concept:** A broad tail bears a simple chevron grain; two long incisors and a pale sawdust cheek patch provide the flourish. The retained concept swatch is `#b88350`. The current playable 80 × 72 pixel portrait uses the four-ink palette defined in [art direction](../design/art-direction.md).

## 7. Silhouette and Identifying Features

Low rounded body, small ears, orange incisors, hind feet, and a wide flattened tail.

## 8. Temperament and Behavior

Helpful and meticulous; will repair a bench while someone is still sitting on it.

## 9. Habitat in the Game

Sluicefen streams; Latchleaf starter station.

Available in the wilderness encounter tables listed below.

## 10. Affinity or Classification

**Anchor approach.** Stable positions catch fast movement. Its Anchor techniques gain a 1.35× modifier against Skitter and a 0.8× modifier against Signal. Same-approach exchanges use 1×. The technique’s approach determines the modifier; these are tactical relationships, not biological taxonomy.

## 11. Battle Role

Construction defender; starter. Good guard and a damaging defensive technique make repeated incoming hits manageable.

## 12. Base Stats

| Vitality | Force | Guard | Tempo |
| -------- | ----- | ----- | ----- |
| 32       | 9     | 12    | 6     |

These are level-one game values, not measurements of animal strength. Level growth is shared across the roster and defined in `src/core/progression.ts`.

## 13. Move Set

| Learned at level | Technique     | Approach | Power | Reliability | Priority | Effect |
| ---------------- | ------------- | -------- | ----- | ----------- | -------- | ------ |
| 1                | Rooted Nudge  | Anchor   | 10    | 100%        | 0        | none   |
| 1                | Pocket Weir   | Anchor   | 7     | 100%        | 0        | guard  |
| 4                | Read the Room | Signal   | 0     | 100%        | 0        | focus  |
| 7                | Set the Line  | Anchor   | 18    | 95%         | 0        | none   |

Both level-one techniques are immediately usable. Level four adds a complementary option; level seven adds a stronger practiced attack. Positive priority acts before lower priority, then tempo resolves order.

## 14. Signature Technique

**Pocket Weir** (`sig-003`): A twig jab assembles a temporary guard against the next hit. Power 7; reliability 100%; priority 0; effect **guard**. Effects occur only when the technique succeeds. The shared battle engine governs duration, recovery, and guard strength.

## 15. Strengths and Weaknesses

**Strength:** Good guard and a damaging defensive technique make repeated incoming hits manageable.

**Limitation:** Low tempo makes reactive recovery difficult; Signal finds openings in its planned construction.

## 16. Encounter Level and Rarity

**Roster classification: common.**

Sluicefen: levels 2–4, encounter weight 24 out of 100.

Every roster member is viewable in the Margin Notes and can be selected as a practice opponent in the developer showcase. Weight is a relative table entry, not a promise of a sighting on each step.

## 17. Design Thought Process

Construction becomes a one-hit guard, keeping an ecological fantasy within a short battle. It teaches timing and creates a future foundation for terrain support without requiring a building simulator.

## 18. Distinction Between Fact and Fiction

The animal, range, and biological behaviors in section 4 are factual inspiration. The visible powers in section 5, tactical approach, vitality, techniques, invitation agreement, and Foldwater travel are invented game rules. Real wildlife does not consent through game menus or learn combat techniques.

## 19. Future Art or Animation Notes

Show one twig flipped, caught by the incisors, and tapped into place with the tail. Keep the silhouette readable at journal-thumbnail size and retain the anatomy before adding detail. Current playable portrait: `public/art/pixel/003.png` (80 × 72 pixels); preserved SVG: `public/art/003.svg`. Both come from the original editable drawing source in `src/art/generate.mjs`. The current field plate is static, with no dedicated rear pose; the animation ideas above are future work.
