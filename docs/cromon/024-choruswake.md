# 024 — Choruswake

## 1. Cromon Name

**Choruswake**. Margin Notes number **024**.

## 2. Real-World Inspiration

Humpback whale — _Megaptera novaeangliae_. One source animal, one Cromon; no evolutionary form consumes a second roster slot.

## 3. Name Origin and Wordplay

Chorus + wake: a song leaving a visible trail on the water.

## 4. Real Biology and Ecology

Humpback whales are baleen whales with long pectoral fins. They feed on small schooling animals, and males produce complex patterned songs.

**Real-world range:** Oceans worldwide; populations migrate between feeding and breeding areas, including the North Atlantic and North Pacific. Biological reference: [NOAA Fisheries](https://www.fisheries.noaa.gov/species/humpback-whale).

## 5. Fantasy Elaboration

Its song smooths Foldwater ripples into a calm breathing interval. A small watery presence visits battle while its full body remains offshore.

## 6. Visual Design

**Future color concept:** Slate body, cream elongated pectoral fins, small head knobs, and three pale throat-groove arcs. The retained concept swatch is `#6e92a4`. The current playable 80 × 72 pixel portrait uses the four-ink palette defined in [art direction](../design/art-direction.md).

## 7. Silhouette and Identifying Features

Long whale body, horizontal tail flukes, low dorsal hump, enormous pectoral fins, and no fishlike gills.

## 8. Temperament and Behavior

Warm, curious, and politely willing to repeat a verse for people taking notes.

## 9. Habitat in the Game

Farcurrent Strand offshore Foldwater window.

The Foldwater seam temporarily brings distant habitats alongside the inlet. This is an explicit fantasy mechanism, not a claim that the source animal naturally lives in an autumn woodland estuary. Aquatic companions keep their full bodies in suitable water and use a small Foldwater presence for land practice.

Available in the wilderness encounter tables listed below.

## 10. Affinity or Classification

**Signal approach.** Reading a stable pattern reveals its opening. Its Signal techniques gain a 1.35× modifier against Anchor and a 0.8× modifier against Skitter. Same-approach exchanges use 1×. The technique’s approach determines the modifier; these are tactical relationships, not biological taxonomy.

## 11. Battle Role

Resonant recovery support. Large vitality and restorative song let it stabilize a difficult exchange.

## 12. Base Stats

| Vitality | Force | Guard | Tempo |
| -------- | ----- | ----- | ----- |
| 37       | 8     | 8     | 9     |

These are level-one game values, not measurements of animal strength. Level growth is shared across the roster and defined in `src/core/progression.ts`.

## 13. Move Set

| Learned at level | Technique       | Approach | Power | Reliability | Priority | Effect |
| ---------------- | --------------- | -------- | ----- | ----------- | -------- | ------ |
| 1                | Clear Note      | Signal   | 10    | 100%        | 0        | none   |
| 1                | Breathing Verse | Signal   | 6     | 100%        | 0        | heal   |
| 4                | Sidebeat        | Skitter  | 8     | 100%        | 1        | none   |
| 7                | Perfect Cue     | Signal   | 18    | 95%         | 0        | none   |

Both level-one techniques are immediately usable. Level four adds a complementary option; level seven adds a stronger practiced attack. Positive priority acts before lower priority, then tempo resolves order.

## 14. Signature Technique

**Breathing Verse** (`sig-024`): A steady phrase nudges the rival and restores the singer. Power 6; reliability 100%; priority 0; effect **heal**. Effects occur only when the technique succeeds. The shared battle engine governs duration, recovery, and guard strength.

## 15. Strengths and Weaknesses

**Strength:** Large vitality and restorative song let it stabilize a difficult exchange.

**Limitation:** Modest force prevents fast knockouts, and Skitter pressure can outrun recovery.

## 16. Encounter Level and Rarity

**Roster classification: visitor.**

Farcurrent Strand: levels 3–5, encounter weight 4 out of 100.

Every roster member is viewable in the Margin Notes and can be selected as a practice opponent in the developer showcase. Weight is a relative table entry, not a promise of a sighting on each step.

## 17. Design Thought Process

A whale becomes a support presence rather than a slow physical wall. Foldwater staging addresses scale honestly instead of pretending a child carries a full-sized whale in a pocket.

## 18. Distinction Between Fact and Fiction

The animal, range, and biological behaviors in section 4 are factual inspiration. The visible powers in section 5, tactical approach, vitality, techniques, invitation agreement, and Foldwater travel are invented game rules. Real wildlife does not consent through game menus or learn combat techniques.

## 19. Future Art or Animation Notes

Use a slow fluke stroke and expanding throat-line ripples; keep a thin water halo around the battle presence. Keep the silhouette readable at journal-thumbnail size and retain the anatomy before adding detail. Current playable portrait: `public/art/pixel/024.png` (80 × 72 pixels); preserved SVG: `public/art/024.svg`. Both come from the original editable drawing source in `src/art/generate.mjs`. The current field plate is static, with no dedicated rear pose; the animation ideas above are future work.
