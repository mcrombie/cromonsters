# 001 — Choiruff

## 1. Cromon Name

**Choiruff**. Margin Notes number **001**.

## 2. Real-World Inspiration

Gray wolf — _Canis lupus_. One source animal, one Cromon; no evolutionary form consumes a second roster slot.

## 3. Name Origin and Wordplay

Choir + ruff: a choral voice carried by a shaggy neck.

## 4. Real Biology and Ecology

Gray wolves use scent, posture, and vocal calls to communicate. Family groups cooperate in caring for pups and obtaining food.

**Real-world range:** Northern North America and parts of Eurasia; greatly reduced from its historical range. Biological reference: [University of Michigan Animal Diversity Web](https://animaldiversity.org/accounts/Canis_lupus/).

## 5. Fantasy Elaboration

Its layered cheek ruff holds several delayed versions of its own voice, letting one wolf rehearse a whole chorus.

## 6. Visual Design

**Future color concept:** Slate fur with three pale, curved ruff bands resembling sound contours. The retained concept swatch is `#84999f`. The current playable 80 × 72 pixel portrait uses the four-ink palette defined in [art direction](../design/art-direction.md).

## 7. Silhouette and Identifying Features

Long muzzle, pointed ears, bushy tail, and four long canine legs; never an upright mascot.

## 8. Temperament and Behavior

Earnest, sociable, and distressed by anyone walking out of formation.

## 9. Habitat in the Game

Russetwalk, deep leaf trail.

Available in the wilderness encounter tables listed below.

## 10. Affinity or Classification

**Signal approach.** Reading a stable pattern reveals its opening. Its Signal techniques gain a 1.35× modifier against Anchor and a 0.8× modifier against Skitter. Same-approach exchanges use 1×. The technique’s approach determines the modifier; these are tactical relationships, not biological taxonomy.

## 11. Battle Role

Pack caller and accurate finisher. Accurate pressure and a focused follow-up threaten prepared Anchor opponents.

## 12. Base Stats

| Vitality | Force | Guard | Tempo |
| -------- | ----- | ----- | ----- |
| 31       | 11    | 7     | 10    |

These are level-one game values, not measurements of animal strength. Level growth is shared across the roster and defined in `src/core/progression.ts`.

## 13. Move Set

| Learned at level | Technique   | Approach | Power | Reliability | Priority | Effect |
| ---------------- | ----------- | -------- | ----- | ----------- | -------- | ------ |
| 1                | Clear Note  | Signal   | 10    | 100%        | 0        | none   |
| 1                | Roundhowl   | Signal   | 9     | 100%        | 0        | focus  |
| 4                | Sidebeat    | Skitter  | 8     | 100%        | 1        | none   |
| 7                | Perfect Cue | Signal   | 18    | 95%         | 0        | none   |

Both level-one techniques are immediately usable. Level four adds a complementary option; level seven adds a stronger practiced attack. Positive priority acts before lower priority, then tempo resolves order.

## 14. Signature Technique

**Roundhowl** (`sig-001`): A short choral strike sets up a focused next action. Power 9; reliability 100%; priority 0; effect **focus**. Effects occur only when the technique succeeds. The shared battle engine governs duration, recovery, and guard strength.

## 15. Strengths and Weaknesses

**Strength:** Accurate pressure and a focused follow-up threaten prepared Anchor opponents.

**Limitation:** Light guard and only moderate tempo leave it exposed to Skitter bursts.

## 16. Encounter Level and Rarity

**Roster classification: uncommon.**

Russetwalk: levels 3–5, encounter weight 4 out of 100.

Every roster member is viewable in the Margin Notes and can be selected as a practice opponent in the developer showcase. Weight is a relative table entry, not a promise of a sighting on each step.

## 17. Design Thought Process

Start with family communication rather than lone-wolf aggression. Repeated ruff curves make a voice-based role readable without putting a musical instrument on the animal.

## 18. Distinction Between Fact and Fiction

The animal, range, and biological behaviors in section 4 are factual inspiration. The visible powers in section 5, tactical approach, vitality, techniques, invitation agreement, and Foldwater travel are invented game rules. Real wildlife does not consent through game menus or learn combat techniques.

## 19. Future Art or Animation Notes

Tilt the muzzle, ripple the ruff bands in sequence, then settle into a loose four-footed stance. Keep the silhouette readable at journal-thumbnail size and retain the anatomy before adding detail. Current playable portrait: `public/art/pixel/001.png` (80 × 72 pixels); preserved SVG: `public/art/001.svg`. Both come from the original editable drawing source in `src/art/generate.mjs`. The current field plate is static, with no dedicated rear pose; the animation ideas above are future work.
