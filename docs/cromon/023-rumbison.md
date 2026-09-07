# 023 — Rumbison

## 1. Cromon Name

**Rumbison**. Margin Notes number **023**.

## 2. Real-World Inspiration

American bison — _Bison bison_. One source animal, one Cromon; no evolutionary form consumes a second roster slot.

## 3. Name Origin and Wordplay

Rumble + bison, a rolling sound for an animal whose speed is easy to underestimate.

## 4. Real Biology and Ecology

American bison graze and have a prominent shoulder hump, shaggy forequarters, and short horns. Despite their size they can run quickly.

**Real-world range:** Historically widespread in North American grasslands and some woodlands; present herds occupy scattered managed and wild ranges. Biological reference: [University of Michigan Animal Diversity Web](https://animaldiversity.org/accounts/Bison_bison/).

## 5. Fantasy Elaboration

Its loose shoulder mane gathers the rustle of grass into a rolling cushion that kicks its first stride forward.

## 6. Visual Design

**Future color concept:** Dark shaggy forequarters, small curved horns, and a single ochre curl in the shoulder mane. The retained concept swatch is `#9c7655`. The current playable 80 × 72 pixel portrait uses the four-ink palette defined in [art direction](../design/art-direction.md).

## 7. Silhouette and Identifying Features

High shoulder hump, large low head, short horns, heavy forequarters, and narrower hindquarters.

## 8. Temperament and Behavior

Companionable and enthusiastic; has a poor estimate of how wide a gate ought to be.

## 9. Habitat in the Game

Farcurrent Strand meadow sanctuary; Foldwater visitor.

The Foldwater seam temporarily brings distant habitats alongside the inlet. This is an explicit fantasy mechanism, not a claim that the source animal naturally lives in an autumn woodland estuary. Aquatic companions keep their full bodies in suitable water and use a small Foldwater presence for land practice.

This slice exposes this sanctuary visitor through the clearly labeled developer showcase and its Margin Notes page; it does not add a sixth map.

## 10. Affinity or Classification

**Skitter approach.** Sudden timing interrupts a prepared cue. Its Skitter techniques gain a 1.35× modifier against Signal and a 0.8× modifier against Anchor. Same-approach exchanges use 1×. The technique’s approach determines the modifier; these are tactical relationships, not biological taxonomy.

## 11. Battle Role

Momentum burst specialist. High vitality and force support an immediate heavy assault.

## 12. Base Stats

| Vitality | Force | Guard | Tempo |
| -------- | ----- | ----- | ----- |
| 38       | 13    | 6     | 10    |

These are level-one game values, not measurements of animal strength. Level growth is shared across the roster and defined in `src/core/progression.ts`.

## 13. Move Set

| Learned at level | Technique     | Approach | Power | Reliability | Priority | Effect |
| ---------------- | ------------- | -------- | ----- | ----------- | -------- | ------ |
| 1                | Passing Tap   | Skitter  | 10    | 100%        | 0        | none   |
| 1                | Tussock Roll  | Skitter  | 14    | 90%         | 1        | none   |
| 4                | Hold Steady   | Anchor   | 0     | 100%        | 1        | guard  |
| 7                | Seize the Gap | Skitter  | 18    | 95%         | 0        | none   |

Both level-one techniques are immediately usable. Level four adds a complementary option; level seven adds a stronger practiced attack. Positive priority acts before lower priority, then tempo resolves order.

## 14. Signature Technique

**Tussock Roll** (`sig-023`): A grass-cushioned charge hits early with substantial force. Power 14; reliability 90%; priority 1; effect **none**. Effects occur only when the technique succeeds. The shared battle engine governs duration, recovery, and guard strength.

## 15. Strengths and Weaknesses

**Strength:** High vitality and force support an immediate heavy assault.

**Limitation:** Low guard and a less reliable signature punish repeated reckless charges.

## 16. Encounter Level and Rarity

**Roster classification: visitor.**

No ordinary encounter in this slice; select this species and an adjustable level in the developer showcase.

Every roster member is viewable in the Margin Notes and can be selected as a practice opponent in the developer showcase. Weight is a relative table entry, not a promise of a sighting on each step.

## 17. Design Thought Process

The roster needs a large, energetic striker. Its sanctuary label reflects that the real animal is not simply a common coastal woodland resident.

## 18. Distinction Between Fact and Fiction

The animal, range, and biological behaviors in section 4 are factual inspiration. The visible powers in section 5, tactical approach, vitality, techniques, invitation agreement, and Foldwater travel are invented game rules. Real wildlife does not consent through game menus or learn combat techniques.

## 19. Future Art or Animation Notes

Compress the shoulder mane before a short accelerating trot; keep the horns small and natural. Keep the silhouette readable at journal-thumbnail size and retain the anatomy before adding detail. Current playable portrait: `public/art/pixel/023.png` (80 × 72 pixels); preserved SVG: `public/art/023.svg`. Both come from the original editable drawing source in `src/art/generate.mjs`. The current field plate is static, with no dedicated rear pose; the animation ideas above are future work.
