# 026 — Kitespan

## 1. Cromon Name

**Kitespan**. Margin Notes number **026**.

## 2. Real-World Inspiration

Manta ray — _Mobula birostris_. One source animal, one Cromon; no evolutionary form consumes a second roster slot.

## 3. Name Origin and Wordplay

Kite + span, describing the broad winglike silhouette without turning it into a flying machine.

## 4. Real Biology and Ecology

Giant manta rays are filter feeders. Their broad pectoral fins propel them, and their cephalic lobes help guide plankton-rich water toward the mouth.

**Real-world range:** Giant manta rays occupy tropical, subtropical, and some temperate ocean waters worldwide; they are not routine cool woodland-inlet residents. Biological reference: [NOAA Fisheries](https://www.fisheries.noaa.gov/species/giant-manta-ray).

## 5. Fantasy Elaboration

Its cephalic lobes gather two little currents and spread them into a protective sheet beneath its wings.

## 6. Visual Design

**Future color concept:** Blue-gray upper surface, cream belly, two curled cephalic lobes, and one pale margin along each wing. The retained concept swatch is `#708f9f`. The current playable 80 × 72 pixel portrait uses the four-ink palette defined in [art direction](../design/art-direction.md).

## 7. Silhouette and Identifying Features

Wide diamond-shaped ray, forward mouth, two head lobes, long slender tail, and gill slits below.

## 8. Temperament and Behavior

Curious and welcoming; offers excellent shade and no comment on anyone’s swimming ability.

## 9. Habitat in the Game

Farcurrent Strand warm Foldwater window.

The Foldwater seam temporarily brings distant habitats alongside the inlet. This is an explicit fantasy mechanism, not a claim that the source animal naturally lives in an autumn woodland estuary. Aquatic companions keep their full bodies in suitable water and use a small Foldwater presence for land practice.

Available in the wilderness encounter tables listed below.

## 10. Affinity or Classification

**Anchor approach.** Stable positions catch fast movement. Its Anchor techniques gain a 1.35× modifier against Skitter and a 0.8× modifier against Signal. Same-approach exchanges use 1×. The technique’s approach determines the modifier; these are tactical relationships, not biological taxonomy.

## 11. Battle Role

Current-shelter defender. Strong guard and prompt shielding make it a calm counter to Skitter pressure.

## 12. Base Stats

| Vitality | Force | Guard | Tempo |
| -------- | ----- | ----- | ----- |
| 33       | 7     | 13    | 9     |

These are level-one game values, not measurements of animal strength. Level growth is shared across the roster and defined in `src/core/progression.ts`.

## 13. Move Set

| Learned at level | Technique        | Approach | Power | Reliability | Priority | Effect |
| ---------------- | ---------------- | -------- | ----- | ----------- | -------- | ------ |
| 1                | Rooted Nudge     | Anchor   | 10    | 100%        | 0        | none   |
| 1                | Plankton Parasol | Anchor   | 6     | 100%        | 1        | guard  |
| 4                | Read the Room    | Signal   | 0     | 100%        | 0        | focus  |
| 7                | Set the Line     | Anchor   | 18    | 95%         | 0        | none   |

Both level-one techniques are immediately usable. Level four adds a complementary option; level seven adds a stronger practiced attack. Positive priority acts before lower priority, then tempo resolves order.

## 14. Signature Technique

**Plankton Parasol** (`sig-026`): A cupped current brushes the rival and shields the next impact. Power 6; reliability 100%; priority 1; effect **guard**. Effects occur only when the technique succeeds. The shared battle engine governs duration, recovery, and guard strength.

## 15. Strengths and Weaknesses

**Strength:** Strong guard and prompt shielding make it a calm counter to Skitter pressure.

**Limitation:** Low force lets opponents prolong the battle; Signal attacks challenge its shelter.

## 16. Encounter Level and Rarity

**Roster classification: visitor.**

Farcurrent Strand: levels 2–4, encounter weight 4 out of 100.

Every roster member is viewable in the Margin Notes and can be selected as a practice opponent in the developer showcase. Weight is a relative table entry, not a promise of a sighting on each step.

## 17. Design Thought Process

Filter feeding inspires flow control rather than teeth or a stinging tail. The specific biological model is the giant manta ray, keeping the user’s generic manta slot unambiguous.

## 18. Distinction Between Fact and Fiction

The animal, range, and biological behaviors in section 4 are factual inspiration. The visible powers in section 5, tactical approach, vitality, techniques, invitation agreement, and Foldwater travel are invented game rules. Real wildlife does not consent through game menus or learn combat techniques.

## 19. Future Art or Animation Notes

Use a broad shallow wing undulation, uncurl the head lobes briefly, and draw a thin current sheet. Keep the silhouette readable at journal-thumbnail size and retain the anatomy before adding detail. Current playable portrait: `public/art/pixel/026.png` (80 × 72 pixels); preserved SVG: `public/art/026.svg`. Both come from the original editable drawing source in `src/art/generate.mjs`. The current field plate is static, with no dedicated rear pose; the animation ideas above are future work.
