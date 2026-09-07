# 007 — Knurlattle

## 1. Cromon Name

**Knurlattle**. Margin Notes number **007**.

## 2. Real-World Inspiration

Timber rattlesnake — _Crotalus horridus_. One source animal, one Cromon; no evolutionary form consumes a second roster slot.

## 3. Name Origin and Wordplay

Knurl, a ridged surface, + rattle; the name has a small deliberate stumble.

## 4. Real Biology and Ecology

Timber rattlesnakes are venomous ambush predators. They detect heat with facial pits and use a keratin rattle as a warning; rattle segments do not reliably measure age.

**Real-world range:** Eastern United States, with a fragmented present distribution. Biological reference: [University of Michigan Animal Diversity Web](https://animaldiversity.org/accounts/Crotalus_horridus/).

## 5. Fantasy Elaboration

Its rattle rolls a patterned vibration through the ground, making nearby feet miss the beat.

## 6. Visual Design

**Future color concept:** Charcoal chevrons follow a warm tan body; three oversized rounded rattle segments form a visible rhythm. The retained concept swatch is `#b8a36b`. The current playable 80 × 72 pixel portrait uses the four-ink palette defined in [art direction](../design/art-direction.md).

## 7. Silhouette and Identifying Features

Legless coiled body, distinct head, neck, and terminal rattle; no added horns or limbs.

## 8. Temperament and Behavior

Reserved and clear about boundaries; prefers a warning that works to an argument.

## 9. Habitat in the Game

Russetwalk sun patches; Bellwether Field rocky edge.

Available in the wilderness encounter tables listed below.

## 10. Affinity or Classification

**Anchor approach.** Stable positions catch fast movement. Its Anchor techniques gain a 1.35× modifier against Skitter and a 0.8× modifier against Signal. Same-approach exchanges use 1×. The technique’s approach determines the modifier; these are tactical relationships, not biological taxonomy.

## 11. Battle Role

Warning-based control striker. High force combines with slowing contact to punish impatient approaches.

## 12. Base Stats

| Vitality | Force | Guard | Tempo |
| -------- | ----- | ----- | ----- |
| 28       | 12    | 10    | 6     |

These are level-one game values, not measurements of animal strength. Level growth is shared across the roster and defined in `src/core/progression.ts`.

## 13. Move Set

| Learned at level | Technique      | Approach | Power | Reliability | Priority | Effect |
| ---------------- | -------------- | -------- | ----- | ----------- | -------- | ------ |
| 1                | Rooted Nudge   | Anchor   | 10    | 100%        | 0        | none   |
| 1                | Rattle Measure | Anchor   | 10    | 90%         | 0        | slow   |
| 4                | Read the Room  | Signal   | 0     | 100%        | 0        | focus  |
| 7                | Set the Line   | Anchor   | 18    | 95%         | 0        | none   |

Both level-one techniques are immediately usable. Level four adds a complementary option; level seven adds a stronger practiced attack. Positive priority acts before lower priority, then tempo resolves order.

## 14. Signature Technique

**Rattle Measure** (`sig-007`): A measured ground ripple damages and slows the rival. Power 10; reliability 90%; priority 0; effect **slow**. Effects occur only when the technique succeeds. The shared battle engine governs duration, recovery, and guard strength.

## 15. Strengths and Weaknesses

**Strength:** High force combines with slowing contact to punish impatient approaches.

**Limitation:** Low tempo makes it vulnerable before it has established control.

## 16. Encounter Level and Rarity

**Roster classification: uncommon.**

Russetwalk: levels 2–4, encounter weight 8 out of 100.

Every roster member is viewable in the Margin Notes and can be selected as a practice opponent in the developer showcase. Weight is a relative table entry, not a promise of a sighting on each step.

## 17. Design Thought Process

A warning signal is more distinctive than generic poison. The POC avoids a poison status while retaining the snake identity through anatomy and boundary-setting behavior.

## 18. Distinction Between Fact and Fiction

The animal, range, and biological behaviors in section 4 are factual inspiration. The visible powers in section 5, tactical approach, vitality, techniques, invitation agreement, and Foldwater travel are invented game rules. Real wildlife does not consent through game menus or learn combat techniques.

## 19. Future Art or Animation Notes

Vibrate only the tail tip in short bursts; keep the body anchored in a stable coil. Keep the silhouette readable at journal-thumbnail size and retain the anatomy before adding detail. Current playable portrait: `public/art/pixel/007.png` (80 × 72 pixels); preserved SVG: `public/art/007.svg`. Both come from the original editable drawing source in `src/art/generate.mjs`. The current field plate is static, with no dedicated rear pose; the animation ideas above are future work.
