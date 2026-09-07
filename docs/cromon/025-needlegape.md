# 025 — Needlegape

## 1. Cromon Name

**Needlegape**. Margin Notes number **025**.

## 2. Real-World Inspiration

Alligator gar — _Atractosteus spatula_. One source animal, one Cromon; no evolutionary form consumes a second roster slot.

## 3. Name Origin and Wordplay

Needlelike teeth + gape, emphasizing the broad mouth rather than confusing it with an alligator.

## 4. Real Biology and Ecology

Alligator gars have broad tooth-filled snouts and hard ganoid scales. Their vascularized swim bladders allow them to take air from the surface.

**Real-world range:** Lower Mississippi basin and Gulf coastal drainages of the southern United States and northeastern Mexico. Biological reference: [University of Michigan Animal Diversity Web](https://animaldiversity.org/accounts/Atractosteus_spatula/).

## 5. Fantasy Elaboration

Its overlapping scales hold a straight pressure seam that snaps forward when it opens its broad jaws.

## 6. Visual Design

**Future color concept:** Olive-speckled torpedo body with pale diamond scale seams and a broad flattened snout. The retained concept swatch is `#92966c`. The current playable 80 × 72 pixel portrait uses the four-ink palette defined in [art direction](../design/art-direction.md).

## 7. Silhouette and Identifying Features

Long fish body, broad toothed jaws, dorsal and anal fins near the tail, and no reptile legs.

## 8. Temperament and Behavior

Unflappable and economical; considers one successful motion a full afternoon of work.

## 9. Habitat in the Game

Farcurrent Strand freshwater sanctuary channel; Foldwater visitor.

The Foldwater seam temporarily brings distant habitats alongside the inlet. This is an explicit fantasy mechanism, not a claim that the source animal naturally lives in an autumn woodland estuary. Aquatic companions keep their full bodies in suitable water and use a small Foldwater presence for land practice.

This slice exposes this sanctuary visitor through the clearly labeled developer showcase and its Margin Notes page; it does not add a sixth map.

## 10. Affinity or Classification

**Anchor approach.** Stable positions catch fast movement. Its Anchor techniques gain a 1.35× modifier against Skitter and a 0.8× modifier against Signal. Same-approach exchanges use 1×. The technique’s approach determines the modifier; these are tactical relationships, not biological taxonomy.

## 11. Battle Role

Armored high-force ambusher. High force and guard create a formidable close-range Anchor breaker.

## 12. Base Stats

| Vitality | Force | Guard | Tempo |
| -------- | ----- | ----- | ----- |
| 34       | 14    | 11    | 5     |

These are level-one game values, not measurements of animal strength. Level growth is shared across the roster and defined in `src/core/progression.ts`.

## 13. Move Set

| Learned at level | Technique     | Approach | Power | Reliability | Priority | Effect |
| ---------------- | ------------- | -------- | ----- | ----------- | -------- | ------ |
| 1                | Rooted Nudge  | Anchor   | 10    | 100%        | 0        | none   |
| 1                | Ganoid Seam   | Anchor   | 15    | 88%         | -1       | none   |
| 4                | Read the Room | Signal   | 0     | 100%        | 0        | focus  |
| 7                | Set the Line  | Anchor   | 18    | 95%         | 0        | none   |

Both level-one techniques are immediately usable. Level four adds a complementary option; level seven adds a stronger practiced attack. Positive priority acts before lower priority, then tempo resolves order.

## 14. Signature Technique

**Ganoid Seam** (`sig-025`): An armored pressure seam hits hard after a deliberate wind-up. Power 15; reliability 88%; priority -1; effect **none**. Effects occur only when the technique succeeds. The shared battle engine governs duration, recovery, and guard strength.

## 15. Strengths and Weaknesses

**Strength:** High force and guard create a formidable close-range Anchor breaker.

**Limitation:** Very low tempo and imperfect reliability leave a clear opening for Signal techniques.

## 16. Encounter Level and Rarity

**Roster classification: visitor.**

No ordinary encounter in this slice; select this species and an adjustable level in the developer showcase.

Every roster member is viewable in the Margin Notes and can be selected as a practice opponent in the developer showcase. Weight is a relative table entry, not a promise of a sighting on each step.

## 17. Design Thought Process

The alligator and alligator gar share a name fragment but must look and behave differently. This fish holds position while the reptile uses an ambush dash.

## 18. Distinction Between Fact and Fiction

The animal, range, and biological behaviors in section 4 are factual inspiration. The visible powers in section 5, tactical approach, vitality, techniques, invitation agreement, and Foldwater travel are invented game rules. Real wildlife does not consent through game menus or learn combat techniques.

## 19. Future Art or Animation Notes

Rise slightly for a surface breath, close the mouth, then release one straight pressure seam. Keep the silhouette readable at journal-thumbnail size and retain the anatomy before adding detail. Current playable portrait: `public/art/pixel/025.png` (80 × 72 pixels); preserved SVG: `public/art/025.svg`. Both come from the original editable drawing source in `src/art/generate.mjs`. The current field plate is static, with no dedicated rear pose; the animation ideas above are future work.
