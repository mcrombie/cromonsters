# 015 — Zigzib

## 1. Cromon Name

**Zigzib**. Margin Notes number **015**.

## 2. Real-World Inspiration

Black-and-yellow garden spider — _Argiope aurantia_. One source animal, one Cromon; no evolutionary form consumes a second roster slot.

## 3. Name Origin and Wordplay

Zigzag + jib, a small angled support; short syllables mimic a plucked thread.

## 4. Real Biology and Ecology

Black-and-yellow garden spiders build orb webs, often with a conspicuous zigzag silk band. They detect prey through web vibrations.

**Real-world range:** Much of North and Central America, especially sunny gardens, fields, and edges. Biological reference: [University of Michigan Animal Diversity Web](https://animaldiversity.org/accounts/Argiope_aurantia/).

## 5. Fantasy Elaboration

Its zigzag band holds a single elastic angle, briefly catching a rival whose movement crosses the line.

## 6. Visual Design

**Future color concept:** Black abdomen with bright yellow paired patches; one simple white zigzag sits between the front legs. The retained concept swatch is `#c6b746`. The current playable 80 × 72 pixel portrait uses the four-ink palette defined in [art direction](../design/art-direction.md).

## 7. Silhouette and Identifying Features

Eight long jointed legs, two-part body, small head region, and an oval abdomen.

## 8. Temperament and Behavior

Methodical and tolerant of visitors who respect the guide strings.

## 9. Habitat in the Game

Bellwether Field, aster stems.

Available in the wilderness encounter tables listed below.

## 10. Affinity or Classification

**Anchor approach.** Stable positions catch fast movement. Its Anchor techniques gain a 1.35× modifier against Skitter and a 0.8× modifier against Signal. Same-approach exchanges use 1×. The technique’s approach determines the modifier; these are tactical relationships, not biological taxonomy.

## 11. Battle Role

Web geometry controller. Good guard and slowing web contact help it control faster Skitter opponents.

## 12. Base Stats

| Vitality | Force | Guard | Tempo |
| -------- | ----- | ----- | ----- |
| 27       | 9     | 11    | 7     |

These are level-one game values, not measurements of animal strength. Level growth is shared across the roster and defined in `src/core/progression.ts`.

## 13. Move Set

| Learned at level | Technique     | Approach | Power | Reliability | Priority | Effect |
| ---------------- | ------------- | -------- | ----- | ----------- | -------- | ------ |
| 1                | Rooted Nudge  | Anchor   | 10    | 100%        | 0        | none   |
| 1                | Zigzag Lease  | Anchor   | 8     | 95%         | 0        | slow   |
| 4                | Read the Room | Signal   | 0     | 100%        | 0        | focus  |
| 7                | Set the Line  | Anchor   | 18    | 95%         | 0        | none   |

Both level-one techniques are immediately usable. Level four adds a complementary option; level seven adds a stronger practiced attack. Positive priority acts before lower priority, then tempo resolves order.

## 14. Signature Technique

**Zigzag Lease** (`sig-015`): A temporary silk angle catches the rival and reduces its tempo. Power 8; reliability 95%; priority 0; effect **slow**. Effects occur only when the technique succeeds. The shared battle engine governs duration, recovery, and guard strength.

## 15. Strengths and Weaknesses

**Strength:** Good guard and slowing web contact help it control faster Skitter opponents.

**Limitation:** Low tempo can delay the first web effect; Signal pressure bypasses its preferred matchup.

## 16. Encounter Level and Rarity

**Roster classification: common.**

Bellwether Field: levels 2–4, encounter weight 17 out of 100.

Every roster member is viewable in the Margin Notes and can be selected as a practice opponent in the developer showcase. Weight is a relative table entry, not a promise of a sighting on each step.

## 17. Design Thought Process

Web geometry gives the spider a constructive identity without a poison stereotype. Keep eight legs visible and avoid adding a ninth decorative appendage.

## 18. Distinction Between Fact and Fiction

The animal, range, and biological behaviors in section 4 are factual inspiration. The visible powers in section 5, tactical approach, vitality, techniques, invitation agreement, and Foldwater travel are invented game rules. Real wildlife does not consent through game menus or learn combat techniques.

## 19. Future Art or Animation Notes

Two forelegs pluck a strand while the other six remain braced; draw a single widening zigzag. Keep the silhouette readable at journal-thumbnail size and retain the anatomy before adding detail. Current playable portrait: `public/art/pixel/015.png` (80 × 72 pixels); preserved SVG: `public/art/015.svg`. Both come from the original editable drawing source in `src/art/generate.mjs`. The current field plate is static, with no dedicated rear pose; the animation ideas above are future work.
