# 027 — Hingehaven

## 1. Cromon Name

**Hingehaven**. Margin Notes number **027**.

## 2. Real-World Inspiration

Atlantic horseshoe crab — _Limulus polyphemus_. One source animal, one Cromon; no evolutionary form consumes a second roster slot.

## 3. Name Origin and Wordplay

Hinge + haven, a small refuge made by a jointed shell.

## 4. Real Biology and Ecology

Atlantic horseshoe crabs are chelicerates, not true crabs. Their long tail spine helps right the body, and book gills beneath the abdomen exchange gases.

**Real-world range:** Atlantic and Gulf coasts of North America, from northeastern United States toward the Yucatan Peninsula. Biological reference: [University of Michigan Animal Diversity Web](https://animaldiversity.org/accounts/Limulus_polyphemus/).

## 5. Fantasy Elaboration

The hinge between its shell sections rocks like a small shelter roof, pulling a restoring wash underneath.

## 6. Visual Design

**Future color concept:** A broad olive-brown dome, crescent pale rim, and simple paired shell hinge marks. The retained concept swatch is `#a19879`. The current playable 80 × 72 pixel portrait uses the four-ink palette defined in [art direction](../design/art-direction.md).

## 7. Silhouette and Identifying Features

Horseshoe-shaped front shell, smaller angular rear shell, long straight telson, and legs tucked below.

## 8. Temperament and Behavior

Steady and accommodating; will patiently right an overturned bucket for no reward.

## 9. Habitat in the Game

Farcurrent Strand sandy shallows.

Available in the wilderness encounter tables listed below.

## 10. Affinity or Classification

**Anchor approach.** Stable positions catch fast movement. Its Anchor techniques gain a 1.35× modifier against Skitter and a 0.8× modifier against Signal. Same-approach exchanges use 1×. The technique’s approach determines the modifier; these are tactical relationships, not biological taxonomy.

## 11. Battle Role

Safe-stance recovery defender. High guard and restorative contact keep its vitality stable during observation.

## 12. Base Stats

| Vitality | Force | Guard | Tempo |
| -------- | ----- | ----- | ----- |
| 32       | 7     | 13    | 6     |

These are level-one game values, not measurements of animal strength. Level growth is shared across the roster and defined in `src/core/progression.ts`.

## 13. Move Set

| Learned at level | Technique     | Approach | Power | Reliability | Priority | Effect |
| ---------------- | ------------- | -------- | ----- | ----------- | -------- | ------ |
| 1                | Rooted Nudge  | Anchor   | 10    | 100%        | 0        | none   |
| 1                | Righting Wash | Anchor   | 5     | 100%        | 0        | heal   |
| 4                | Read the Room | Signal   | 0     | 100%        | 0        | focus  |
| 7                | Set the Line  | Anchor   | 18    | 95%         | 0        | none   |

Both level-one techniques are immediately usable. Level four adds a complementary option; level seven adds a stronger practiced attack. Positive priority acts before lower priority, then tempo resolves order.

## 14. Signature Technique

**Righting Wash** (`sig-027`): A rocking shell sends a small wash outward and restores vitality. Power 5; reliability 100%; priority 0; effect **heal**. Effects occur only when the technique succeeds. The shared battle engine governs duration, recovery, and guard strength.

## 15. Strengths and Weaknesses

**Strength:** High guard and restorative contact keep its vitality stable during observation.

**Limitation:** Very low tempo and force mean it needs a favorable matchup to finish briskly.

## 16. Encounter Level and Rarity

**Roster classification: common.**

Farcurrent Strand: levels 2–4, encounter weight 24 out of 100.

Every roster member is viewable in the Margin Notes and can be selected as a practice opponent in the developer showcase. Weight is a relative table entry, not a promise of a sighting on each step.

## 17. Design Thought Process

Righting and shelter replace weaponized-tail imagery. The tail is a support structure, not a venomous stinger.

## 18. Distinction Between Fact and Fiction

The animal, range, and biological behaviors in section 4 are factual inspiration. The visible powers in section 5, tactical approach, vitality, techniques, invitation agreement, and Foldwater travel are invented game rules. Real wildlife does not consent through game menus or learn combat techniques.

## 19. Future Art or Animation Notes

Tip slightly, brace with the tail, and settle upright as a thin wash passes below the shell. Keep the silhouette readable at journal-thumbnail size and retain the anatomy before adding detail. Current playable portrait: `public/art/pixel/027.png` (80 × 72 pixels); preserved SVG: `public/art/027.svg`. Both come from the original editable drawing source in `src/art/generate.mjs`. The current field plate is static, with no dedicated rear pose; the animation ideas above are future work.
