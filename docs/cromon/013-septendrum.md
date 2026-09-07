# 013 — Septendrum

## 1. Cromon Name

**Septendrum**. Margin Notes number **013**.

## 2. Real-World Inspiration

Seventeen-year cicada — _Magicicada septendecim_. One source animal, one Cromon; no evolutionary form consumes a second roster slot.

## 3. Name Origin and Wordplay

Seventeen + drum, with septen recalling the number pattern of the brood.

## 4. Real Biology and Ecology

Seventeen-year periodical cicadas develop underground feeding on root fluids. Adults emerge in synchronized broods, and males make loud calls using tymbals.

**Real-world range:** Eastern and central United States, with geographically distinct seventeen-year broods. Biological reference: [University of Michigan Animal Diversity Web](https://animaldiversity.org/accounts/Magicicada_septendecim/).

## 5. Fantasy Elaboration

Its folded back plates save one tiny beat per underground season; the accumulated rhythm is released as a startling single knock.

## 6. Visual Design

**Future color concept:** Dark body, red eyes, clear orange-veined wings, and two pale drum-shaped flank panels. The retained concept swatch is `#a56f4d`. The current playable 80 × 72 pixel portrait uses the four-ink palette defined in [art direction](../design/art-direction.md).

## 7. Silhouette and Identifying Features

Stout insect torso, six legs, short antennae, and roof-held transparent wings.

## 8. Temperament and Behavior

Patient about everything except being asked whether it overslept.

## 9. Habitat in the Game

Bellwether Field brood patch; Foldwater early emergence.

Available in the wilderness encounter tables listed below.

## 10. Affinity or Classification

**Signal approach.** Reading a stable pattern reveals its opening. Its Signal techniques gain a 1.35× modifier against Anchor and a 0.8× modifier against Skitter. Same-approach exchanges use 1×. The technique’s approach determines the modifier; these are tactical relationships, not biological taxonomy.

## 11. Battle Role

Low-tempo sonic breaker. High force creates decisive sonic hits without requiring high speed.

## 12. Base Stats

| Vitality | Force | Guard | Tempo |
| -------- | ----- | ----- | ----- |
| 30       | 13    | 7     | 5     |

These are level-one game values, not measurements of animal strength. Level growth is shared across the roster and defined in `src/core/progression.ts`.

## 13. Move Set

| Learned at level | Technique       | Approach | Power | Reliability | Priority | Effect |
| ---------------- | --------------- | -------- | ----- | ----------- | -------- | ------ |
| 1                | Clear Note      | Signal   | 10    | 100%        | 0        | none   |
| 1                | Seventeen Knock | Signal   | 15    | 88%         | -1       | none   |
| 4                | Sidebeat        | Skitter  | 8     | 100%        | 1        | none   |
| 7                | Perfect Cue     | Signal   | 18    | 95%         | 0        | none   |

Both level-one techniques are immediately usable. Level four adds a complementary option; level seven adds a stronger practiced attack. Positive priority acts before lower priority, then tempo resolves order.

## 14. Signature Technique

**Seventeen Knock** (`sig-013`): A delayed, forceful tymbal knock rewards a patient turn. Power 15; reliability 88%; priority -1; effect **none**. Effects occur only when the technique succeeds. The shared battle engine governs duration, recovery, and guard strength.

## 15. Strengths and Weaknesses

**Strength:** High force creates decisive sonic hits without requiring high speed.

**Limitation:** Low tempo and imperfect signature reliability leave it exposed before the burst.

## 16. Encounter Level and Rarity

**Roster classification: uncommon.**

Bellwether Field: levels 2–4, encounter weight 19 out of 100.

Every roster member is viewable in the Margin Notes and can be selected as a practice opponent in the developer showcase. Weight is a relative table entry, not a promise of a sighting on each step.

## 17. Design Thought Process

Long dormancy becomes a heavy initial strike, avoiding an actual seventeen-year wait. Autumn emergence here is explicitly a Foldwater disturbance, not a normal annual life cycle.

## 18. Distinction Between Fact and Fiction

The animal, range, and biological behaviors in section 4 are factual inspiration. The visible powers in section 5, tactical approach, vitality, techniques, invitation agreement, and Foldwater travel are invented game rules. Real wildlife does not consent through game menus or learn combat techniques. The normal adult emergence is a brood event, usually in late spring or early summer; this autumn appearance is explicitly caused by Foldwater.

## 19. Future Art or Animation Notes

Flank tymbal panels contract once, followed by a very short full-body shiver. Keep the silhouette readable at journal-thumbnail size and retain the anatomy before adding detail. Current playable portrait: `public/art/pixel/013.png` (80 × 72 pixels); preserved SVG: `public/art/013.svg`. Both come from the original editable drawing source in `src/art/generate.mjs`. The current field plate is static, with no dedicated rear pose; the animation ideas above are future work.
