# 009 — Pleatacle

## 1. Cromon Name

**Pleatacle**. Margin Notes number **009**.

## 2. Real-World Inspiration

Giant Pacific octopus — _Enteroctopus dofleini_. One source animal, one Cromon; no evolutionary form consumes a second roster slot.

## 3. Name Origin and Wordplay

Pleat + tentacle; octopus appendages are anatomically arms, despite the wordplay.

## 4. Real Biology and Ecology

Giant Pacific octopuses have eight sucker-lined arms, flexible bodies, and skin that changes color and texture. They shelter in dens and hunt marine animals.

**Real-world range:** Temperate North Pacific, from western North America around the northern Pacific to Japan; not native to the Atlantic. Biological references: [National Aquarium](https://aqua.org/explore/animals/giant-pacific-octopus), [Aquarium of the Pacific](https://www.aquariumofpacific.org/onlinelearningcenter/species/giant_pacific_octopus).

## 5. Fantasy Elaboration

Its skin patterns fold into offset pleats, making the next arm movement difficult to predict.

## 6. Visual Design

**Future color concept:** Eight coral arms with pale sucker dots; two broad zigzag skin folds imply shifting camouflage. The retained concept swatch is `#cf795e`. The current playable 80 × 72 pixel portrait uses the four-ink palette defined in [art direction](../design/art-direction.md).

## 7. Silhouette and Identifying Features

Bulbous mantle, eyes below it, eight radiating arms, and no added fins.

## 8. Temperament and Behavior

Resourceful and mischievous; opens the sample jar, then thoughtfully replaces the label.

## 9. Habitat in the Game

Farcurrent Strand research pools; Foldwater visitor.

The Foldwater seam temporarily brings distant habitats alongside the inlet. This is an explicit fantasy mechanism, not a claim that the source animal naturally lives in an autumn woodland estuary. Aquatic companions keep their full bodies in suitable water and use a small Foldwater presence for land practice.

Available in the wilderness encounter tables listed below.

## 10. Affinity or Classification

**Skitter approach.** Sudden timing interrupts a prepared cue. Its Skitter techniques gain a 1.35× modifier against Signal and a 0.8× modifier against Anchor. Same-approach exchanges use 1×. The technique’s approach determines the modifier; these are tactical relationships, not biological taxonomy.

## 11. Battle Role

Flexible feint specialist. High tempo and a focused follow-up exploit an opening quickly.

## 12. Base Stats

| Vitality | Force | Guard | Tempo |
| -------- | ----- | ----- | ----- |
| 30       | 10    | 7     | 12    |

These are level-one game values, not measurements of animal strength. Level growth is shared across the roster and defined in `src/core/progression.ts`.

## 13. Move Set

| Learned at level | Technique     | Approach | Power | Reliability | Priority | Effect |
| ---------------- | ------------- | -------- | ----- | ----------- | -------- | ------ |
| 1                | Passing Tap   | Skitter  | 10    | 100%        | 0        | none   |
| 1                | Pleat Feint   | Skitter  | 8     | 95%         | 1        | focus  |
| 4                | Hold Steady   | Anchor   | 0     | 100%        | 1        | guard  |
| 7                | Seize the Gap | Skitter  | 18    | 95%         | 0        | none   |

Both level-one techniques are immediately usable. Level four adds a complementary option; level seven adds a stronger practiced attack. Positive priority acts before lower priority, then tempo resolves order.

## 14. Signature Technique

**Pleat Feint** (`sig-009`): A shifting-pattern feint lands quickly and prepares a focused follow-up. Power 8; reliability 95%; priority 1; effect **focus**. Effects occur only when the technique succeeds. The shared battle engine governs duration, recovery, and guard strength.

## 15. Strengths and Weaknesses

**Strength:** High tempo and a focused follow-up exploit an opening quickly.

**Limitation:** Light guard makes repeated direct exchanges costly.

## 16. Encounter Level and Rarity

**Roster classification: visitor.**

Farcurrent Strand: levels 2–4, encounter weight 6 out of 100.

Every roster member is viewable in the Margin Notes and can be selected as a practice opponent in the developer showcase. Weight is a relative table entry, not a promise of a sighting on each step.

## 17. Design Thought Process

Camouflage is condensed into focus rather than random invisibility. Explicit Pacific visitor status prevents the fictional inlet from teaching a false Atlantic range.

## 18. Distinction Between Fact and Fiction

The animal, range, and biological behaviors in section 4 are factual inspiration. The visible powers in section 5, tactical approach, vitality, techniques, invitation agreement, and Foldwater travel are invented game rules. Real wildlife does not consent through game menus or learn combat techniques.

## 19. Future Art or Animation Notes

Keep all eight arms in the design sheet; animate two leading arms while the others stabilize the pose. Keep the silhouette readable at journal-thumbnail size and retain the anatomy before adding detail. Current playable portrait: `public/art/pixel/009.png` (80 × 72 pixels); preserved SVG: `public/art/009.svg`. Both come from the original editable drawing source in `src/art/generate.mjs`. The current field plate is static, with no dedicated rear pose; the animation ideas above are future work.
