# 029 — Curlcourier

## 1. Cromon Name

**Curlcourier**. Margin Notes number **029**.

## 2. Real-World Inspiration

Lined seahorse — _Hippocampus erectus_. One source animal, one Cromon; no evolutionary form consumes a second roster slot.

## 3. Name Origin and Wordplay

Curling tail + courier, a careful carrier of tiny current parcels.

## 4. Real Biology and Ecology

Lined seahorses hold vegetation with a prehensile tail and suck small prey through a tubular snout. Males brood developing young in a pouch.

**Real-world range:** Western Atlantic coastal waters, including the eastern United States, Gulf of Mexico, and Caribbean region. Biological reference: [University of Michigan Animal Diversity Web](https://animaldiversity.org/accounts/Hippocampus_erectus/).

## 5. Fantasy Elaboration

Its tail stores a single loop of current; releasing the loop sends a precise little parcel of water to the chosen opening.

## 6. Visual Design

**Future color concept:** Ochre body with a few cream vertical lines, small coronet, and a tightly curled tail. The retained concept swatch is `#bba16a`. The current playable 80 × 72 pixel portrait uses the four-ink palette defined in [art direction](../design/art-direction.md).

## 7. Silhouette and Identifying Features

Upright fish, horse-shaped head, tubular snout, tiny dorsal fin, ridged body, and grasping tail.

## 8. Temperament and Behavior

Gentle and dependable; delivers found objects to the wrong desk with great confidence.

## 9. Habitat in the Game

Farcurrent Strand eelgrass beds.

Available in the wilderness encounter tables listed below.

## 10. Affinity or Classification

**Skitter approach.** Sudden timing interrupts a prepared cue. Its Skitter techniques gain a 1.35× modifier against Signal and a 0.8× modifier against Anchor. Same-approach exchanges use 1×. The technique’s approach determines the modifier; these are tactical relationships, not biological taxonomy.

## 11. Battle Role

Stationary precision opportunist. Priority and accuracy create a precision role despite an animal that does not swim fast.

## 12. Base Stats

| Vitality | Force | Guard | Tempo |
| -------- | ----- | ----- | ----- |
| 25       | 11    | 8     | 11    |

These are level-one game values, not measurements of animal strength. Level growth is shared across the roster and defined in `src/core/progression.ts`.

## 13. Move Set

| Learned at level | Technique      | Approach | Power | Reliability | Priority | Effect |
| ---------------- | -------------- | -------- | ----- | ----------- | -------- | ------ |
| 1                | Passing Tap    | Skitter  | 10    | 100%        | 0        | none   |
| 1                | Current Parcel | Skitter  | 11    | 100%        | 1        | none   |
| 4                | Hold Steady    | Anchor   | 0     | 100%        | 1        | guard  |
| 7                | Seize the Gap  | Skitter  | 18    | 95%         | 0        | none   |

Both level-one techniques are immediately usable. Level four adds a complementary option; level seven adds a stronger practiced attack. Positive priority acts before lower priority, then tempo resolves order.

## 14. Signature Technique

**Current Parcel** (`sig-029`): A precisely delivered water bead reaches the rival promptly. Power 11; reliability 100%; priority 1; effect **none**. Effects occur only when the technique succeeds. The shared battle engine governs duration, recovery, and guard strength.

## 15. Strengths and Weaknesses

**Strength:** Priority and accuracy create a precision role despite an animal that does not swim fast.

**Limitation:** Low vitality gives it little room for error against Anchor techniques.

## 16. Encounter Level and Rarity

**Roster classification: uncommon.**

Farcurrent Strand: levels 2–4, encounter weight 14 out of 100.

Every roster member is viewable in the Margin Notes and can be selected as a practice opponent in the developer showcase. Weight is a relative table entry, not a promise of a sighting on each step.

## 17. Design Thought Process

Skitter measures tactical timing, not literal travel speed. Suction feeding supplies a quick action while the body stays anchored to eelgrass.

## 18. Distinction Between Fact and Fiction

The animal, range, and biological behaviors in section 4 are factual inspiration. The visible powers in section 5, tactical approach, vitality, techniques, invitation agreement, and Foldwater travel are invented game rules. Real wildlife does not consent through game menus or learn combat techniques.

## 19. Future Art or Animation Notes

Keep the tail wrapped around an implied stem; flick the tiny dorsal fin and release a single water bead. Keep the silhouette readable at journal-thumbnail size and retain the anatomy before adding detail. Current playable portrait: `public/art/pixel/029.png` (80 × 72 pixels); preserved SVG: `public/art/029.svg`. Both come from the original editable drawing source in `src/art/generate.mjs`. The current field plate is static, with no dedicated rear pose; the animation ideas above are future work.
