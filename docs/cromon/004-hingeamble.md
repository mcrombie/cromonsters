# 004 — Hingeamble

## 1. Cromon Name

**Hingeamble**. Margin Notes number **004**.

## 2. Real-World Inspiration

Eastern box turtle — _Terrapene carolina carolina_. One source animal, one Cromon; no evolutionary form consumes a second roster slot.

## 3. Name Origin and Wordplay

The shell hinge + amble: protection that keeps a comfortable walking pace.

## 4. Real Biology and Ecology

Eastern box turtles live mainly on land. Their hinged lower shell can close over the openings, and they eat varied plant and animal foods.

**Real-world range:** Eastern United States; the eastern box turtle is a subspecies of the common box turtle. Biological reference: [University of Michigan Animal Diversity Web](https://animaldiversity.org/accounts/Terrapene_carolina/).

## 5. Fantasy Elaboration

Shell seams briefly align like a folding door, redirecting the force of its own small shove into a protective stance.

## 6. Visual Design

**Future color concept:** Ochre shell markings form a few broken door-like rectangles, with a tiny projecting shell lip. The retained concept swatch is `#c29b40`. The current playable 80 × 72 pixel portrait uses the four-ink palette defined in [art direction](../design/art-direction.md).

## 7. Silhouette and Identifying Features

Domed shell, short elephantine feet, small beaked head, and visible lower-shell hinge.

## 8. Temperament and Behavior

Courteous, stubborn, and never convinced that a deadline is a real object.

## 9. Habitat in the Game

Russetwalk, damp leaf litter.

Available in the wilderness encounter tables listed below.

## 10. Affinity or Classification

**Anchor approach.** Stable positions catch fast movement. Its Anchor techniques gain a 1.35× modifier against Skitter and a 0.8× modifier against Signal. Same-approach exchanges use 1×. The technique’s approach determines the modifier; these are tactical relationships, not biological taxonomy.

## 11. Battle Role

Patient defensive closer. The highest early guard gives it time to invite a wild companion after observing.

## 12. Base Stats

| Vitality | Force | Guard | Tempo |
| -------- | ----- | ----- | ----- |
| 30       | 7     | 14    | 5     |

These are level-one game values, not measurements of animal strength. Level growth is shared across the roster and defined in `src/core/progression.ts`.

## 13. Move Set

| Learned at level | Technique     | Approach | Power | Reliability | Priority | Effect |
| ---------------- | ------------- | -------- | ----- | ----------- | -------- | ------ |
| 1                | Rooted Nudge  | Anchor   | 10    | 100%        | 0        | none   |
| 1                | Latchback     | Anchor   | 6     | 100%        | 1        | guard  |
| 4                | Read the Room | Signal   | 0     | 100%        | 0        | focus  |
| 7                | Set the Line  | Anchor   | 18    | 95%         | 0        | none   |

Both level-one techniques are immediately usable. Level four adds a complementary option; level seven adds a stronger practiced attack. Positive priority acts before lower priority, then tempo resolves order.

## 14. Signature Technique

**Latchback** (`sig-004`): A prompt shell bump closes into a guarded posture. Power 6; reliability 100%; priority 1; effect **guard**. Effects occur only when the technique succeeds. The shared battle engine governs duration, recovery, and guard strength.

## 15. Strengths and Weaknesses

**Strength:** The highest early guard gives it time to invite a wild companion after observing.

**Limitation:** Very low tempo and modest force let Signal pressure wear it down.

## 16. Encounter Level and Rarity

**Roster classification: common.**

Russetwalk: levels 2–4, encounter weight 24 out of 100.

Every roster member is viewable in the Margin Notes and can be selected as a practice opponent in the developer showcase. Weight is a relative table entry, not a promise of a sighting on each step.

## 17. Design Thought Process

The protective behavior is already memorable. A hinged-door visual reinforces it without making the animal a literal house.

## 18. Distinction Between Fact and Fiction

The animal, range, and biological behaviors in section 4 are factual inspiration. The visible powers in section 5, tactical approach, vitality, techniques, invitation agreement, and Foldwater travel are invented game rules. Real wildlife does not consent through game menus or learn combat techniques.

## 19. Future Art or Animation Notes

Draw head and feet inside in two readable frames; leave the shell grounded. Keep the silhouette readable at journal-thumbnail size and retain the anatomy before adding detail. Current playable portrait: `public/art/pixel/004.png` (80 × 72 pixels); preserved SVG: `public/art/004.svg`. Both come from the original editable drawing source in `src/art/generate.mjs`. The current field plate is static, with no dedicated rear pose; the animation ideas above are future work.
