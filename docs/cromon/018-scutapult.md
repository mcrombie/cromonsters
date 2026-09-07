# 018 — Scutapult

## 1. Cromon Name

**Scutapult**. Margin Notes number **018**.

## 2. Real-World Inspiration

American alligator — _Alligator mississippiensis_. One source animal, one Cromon; no evolutionary form consumes a second roster slot.

## 3. Name Origin and Wordplay

Scute, a bony skin plate, + catapult.

## 4. Real Biology and Ecology

American alligators have broad snouts, powerful swimming tails, and armored back scutes. They ambush prey and can move in sudden short bursts.

**Real-world range:** Southeastern United States, especially freshwater wetlands and slow waters. Biological reference: [University of Michigan Animal Diversity Web](https://animaldiversity.org/accounts/Alligator_mississippiensis/).

## 5. Fantasy Elaboration

Its back scutes flex like a row of shallow springs, converting a still pose into one sudden sliding lunge.

## 6. Visual Design

**Future color concept:** Dark green body with five rounded gold-edged back scutes that tilt along a single curve. The retained concept swatch is `#698876`. The current playable 80 × 72 pixel portrait uses the four-ink palette defined in [art direction](../design/art-direction.md).

## 7. Silhouette and Identifying Features

Broad U-shaped snout, low sprawling four-legged body, long muscular tail, and dorsal scutes.

## 8. Temperament and Behavior

Patient, observant, and offended when its careful stillness is called laziness.

## 9. Habitat in the Game

Farcurrent Strand warm sanctuary channel; Foldwater visitor.

The Foldwater seam temporarily brings distant habitats alongside the inlet. This is an explicit fantasy mechanism, not a claim that the source animal naturally lives in an autumn woodland estuary. Aquatic companions keep their full bodies in suitable water and use a small Foldwater presence for land practice.

This slice exposes this sanctuary visitor through the clearly labeled developer showcase and its Margin Notes page; it does not add a sixth map.

## 10. Affinity or Classification

**Skitter approach.** Sudden timing interrupts a prepared cue. Its Skitter techniques gain a 1.35× modifier against Signal and a 0.8× modifier against Anchor. Same-approach exchanges use 1×. The technique’s approach determines the modifier; these are tactical relationships, not biological taxonomy.

## 11. Battle Role

Ambush priority bruiser. A powerful priority strike makes a large reptile threatening before slower foes can act.

## 12. Base Stats

| Vitality | Force | Guard | Tempo |
| -------- | ----- | ----- | ----- |
| 35       | 12    | 7     | 9     |

These are level-one game values, not measurements of animal strength. Level growth is shared across the roster and defined in `src/core/progression.ts`.

## 13. Move Set

| Learned at level | Technique     | Approach | Power | Reliability | Priority | Effect |
| ---------------- | ------------- | -------- | ----- | ----------- | -------- | ------ |
| 1                | Passing Tap   | Skitter  | 10    | 100%        | 0        | none   |
| 1                | Scute Spring  | Skitter  | 13    | 88%         | 1        | none   |
| 4                | Hold Steady   | Anchor   | 0     | 100%        | 1        | guard  |
| 7                | Seize the Gap | Skitter  | 18    | 95%         | 0        | none   |

Both level-one techniques are immediately usable. Level four adds a complementary option; level seven adds a stronger practiced attack. Positive priority acts before lower priority, then tempo resolves order.

## 14. Signature Technique

**Scute Spring** (`sig-018`): A springlike lunge acts promptly but needs careful aim. Power 13; reliability 88%; priority 1; effect **none**. Effects occur only when the technique succeeds. The shared battle engine governs duration, recovery, and guard strength.

## 15. Strengths and Weaknesses

**Strength:** A powerful priority strike makes a large reptile threatening before slower foes can act.

**Limitation:** Moderate guard and unreliable lunges make sustained slugging less effective.

## 16. Encounter Level and Rarity

**Roster classification: visitor.**

No ordinary encounter in this slice; select this species and an adjustable level in the developer showcase.

Every roster member is viewable in the Margin Notes and can be selected as a practice opponent in the developer showcase. Weight is a relative table entry, not a promise of a sighting on each step.

## 17. Design Thought Process

The ambush is the role, rather than size-based tanking. A managed warm sanctuary explains its presence in an autumn region without claiming a northern natural range.

## 18. Distinction Between Fact and Fiction

The animal, range, and biological behaviors in section 4 are factual inspiration. The visible powers in section 5, tactical approach, vitality, techniques, invitation agreement, and Foldwater travel are invented game rules. Real wildlife does not consent through game menus or learn combat techniques.

## 19. Future Art or Animation Notes

Hold completely still for a beat, then slide forward with the tail following; no upright running pose. Keep the silhouette readable at journal-thumbnail size and retain the anatomy before adding detail. Current playable portrait: `public/art/pixel/018.png` (80 × 72 pixels); preserved SVG: `public/art/018.svg`. Both come from the original editable drawing source in `src/art/generate.mjs`. The current field plate is static, with no dedicated rear pose; the animation ideas above are future work.
