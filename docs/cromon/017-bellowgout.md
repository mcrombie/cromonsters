# 017 — Bellowgout

## 1. Cromon Name

**Bellowgout**. Margin Notes number **017**.

## 2. Real-World Inspiration

American bullfrog — _Lithobates catesbeianus_. One source animal, one Cromon; no evolutionary form consumes a second roster slot.

## 3. Name Origin and Wordplay

Bellow + gout, in the sense of a sudden splash or spurt.

## 4. Real Biology and Ecology

American bullfrogs inhabit permanent fresh water and eat a wide variety of prey. Males produce deep advertisement calls; their large external eardrums are conspicuous.

**Real-world range:** Native to eastern North America; introduced widely elsewhere, sometimes with harmful ecological effects. Biological reference: [University of Michigan Animal Diversity Web](https://animaldiversity.org/accounts/Lithobates_catesbeianus/).

## 5. Fantasy Elaboration

Its throat sac shapes a single globule of sound that bursts like a dropped bucket.

## 6. Visual Design

**Future color concept:** Olive body, pale throat bubble, and copper circular eardrum marks. The retained concept swatch is `#7e9d66`. The current playable 80 × 72 pixel portrait uses the four-ink palette defined in [art direction](../design/art-direction.md).

## 7. Silhouette and Identifying Features

Broad frog head, exposed round tympana, squat body, four limbs, and powerful folded hind legs.

## 8. Temperament and Behavior

Boisterous but easily embarrassed by an accidental squeak.

## 9. Habitat in the Game

Sluicefen open pond.

Available in the wilderness encounter tables listed below.

## 10. Affinity or Classification

**Signal approach.** Reading a stable pattern reveals its opening. Its Signal techniques gain a 1.35× modifier against Anchor and a 0.8× modifier against Skitter. Same-approach exchanges use 1×. The technique’s approach determines the modifier; these are tactical relationships, not biological taxonomy.

## 11. Battle Role

Resonant burst attacker. High vitality and force support a brisk burst-focused battle.

## 12. Base Stats

| Vitality | Force | Guard | Tempo |
| -------- | ----- | ----- | ----- |
| 34       | 12    | 6     | 7     |

These are level-one game values, not measurements of animal strength. Level growth is shared across the roster and defined in `src/core/progression.ts`.

## 13. Move Set

| Learned at level | Technique     | Approach | Power | Reliability | Priority | Effect |
| ---------------- | ------------- | -------- | ----- | ----------- | -------- | ------ |
| 1                | Clear Note    | Signal   | 10    | 100%        | 0        | none   |
| 1                | Bucket Bellow | Signal   | 14    | 90%         | 0        | none   |
| 4                | Sidebeat      | Skitter  | 8     | 100%        | 1        | none   |
| 7                | Perfect Cue   | Signal   | 18    | 95%         | 0        | none   |

Both level-one techniques are immediately usable. Level four adds a complementary option; level seven adds a stronger practiced attack. Positive priority acts before lower priority, then tempo resolves order.

## 14. Signature Technique

**Bucket Bellow** (`sig-017`): A deep sound globule lands with force but can go wide. Power 14; reliability 90%; priority 0; effect **none**. Effects occur only when the technique succeeds. The shared battle engine governs duration, recovery, and guard strength.

## 15. Strengths and Weaknesses

**Strength:** High vitality and force support a brisk burst-focused battle.

**Limitation:** Low guard and imperfect signature accuracy create openings for fast rivals.

## 16. Encounter Level and Rarity

**Roster classification: common.**

Sluicefen: levels 2–4, encounter weight 25 out of 100.

Every roster member is viewable in the Margin Notes and can be selected as a practice opponent in the developer showcase. Weight is a relative table entry, not a promise of a sighting on each step.

## 17. Design Thought Process

A loud frog provides a grounded sonic attacker. The eardrums and vocal sac are more specific to its identity than generic spring-loaded shoes.

## 18. Distinction Between Fact and Fiction

The animal, range, and biological behaviors in section 4 are factual inspiration. The visible powers in section 5, tactical approach, vitality, techniques, invitation agreement, and Foldwater travel are invented game rules. Real wildlife does not consent through game menus or learn combat techniques.

## 19. Future Art or Animation Notes

Inflate the throat once and compress the body as the sound globule leaves. Keep the silhouette readable at journal-thumbnail size and retain the anatomy before adding detail. Current playable portrait: `public/art/pixel/017.png` (80 × 72 pixels); preserved SVG: `public/art/017.svg`. Both come from the original editable drawing source in `src/art/generate.mjs`. The current field plate is static, with no dedicated rear pose; the animation ideas above are future work.
