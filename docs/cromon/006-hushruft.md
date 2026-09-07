# 006 — Hushruft

## 1. Cromon Name

**Hushruft**. Margin Notes number **006**.

## 2. Real-World Inspiration

Great horned owl — _Bubo virginianus_. One source animal, one Cromon; no evolutionary form consumes a second roster slot.

## 3. Name Origin and Wordplay

Hush + ruff + tuft, compressed into a soft rustling sound.

## 4. Real Biology and Ecology

Great horned owls are nocturnal predators. Their feather tufts are not ears; their actual ears and facial structures help them locate sounds.

**Real-world range:** Widespread across the Americas in varied wooded and open habitats. Biological reference: [University of Michigan Animal Diversity Web](https://animaldiversity.org/accounts/Bubo_virginianus/).

## 5. Fantasy Elaboration

Its facial feathers dampen a tiny pocket of sound, making rivals hesitate when their own footsteps vanish.

## 6. Visual Design

**Future color concept:** Two prominent ear tufts and a large cream facial ring edged like a quiet ripple. The retained concept swatch is `#a48b69`. The current playable 80 × 72 pixel portrait uses the four-ink palette defined in [art direction](../design/art-direction.md).

## 7. Silhouette and Identifying Features

Upright barrel body, broad rounded wings, forward-facing eyes, feather tufts, and strong feet.

## 8. Temperament and Behavior

Attentive, dryly amused, and inclined to listen before answering.

## 9. Habitat in the Game

Russetwalk, hollow-tree overlook.

Available in the wilderness encounter tables listed below.

## 10. Affinity or Classification

**Signal approach.** Reading a stable pattern reveals its opening. Its Signal techniques gain a 1.35× modifier against Anchor and a 0.8× modifier against Skitter. Same-approach exchanges use 1×. The technique’s approach determines the modifier; these are tactical relationships, not biological taxonomy.

## 11. Battle Role

Quiet tempo controller. Balanced guard and slowing sound control help it outlast faster attackers.

## 12. Base Stats

| Vitality | Force | Guard | Tempo |
| -------- | ----- | ----- | ----- |
| 29       | 10    | 9     | 8     |

These are level-one game values, not measurements of animal strength. Level growth is shared across the roster and defined in `src/core/progression.ts`.

## 13. Move Set

| Learned at level | Technique   | Approach | Power | Reliability | Priority | Effect |
| ---------------- | ----------- | -------- | ----- | ----------- | -------- | ------ |
| 1                | Clear Note  | Signal   | 10    | 100%        | 0        | none   |
| 1                | Hush Pocket | Signal   | 8     | 95%         | 0        | slow   |
| 4                | Sidebeat    | Skitter  | 8     | 100%        | 1        | none   |
| 7                | Perfect Cue | Signal   | 18    | 95%         | 0        | none   |

Both level-one techniques are immediately usable. Level four adds a complementary option; level seven adds a stronger practiced attack. Positive priority acts before lower priority, then tempo resolves order.

## 14. Signature Technique

**Hush Pocket** (`sig-006`): A muffled pulse unsettles the rival and reduces its tempo. Power 8; reliability 95%; priority 0; effect **slow**. Effects occur only when the technique succeeds. The shared battle engine governs duration, recovery, and guard strength.

## 15. Strengths and Weaknesses

**Strength:** Balanced guard and slowing sound control help it outlast faster attackers.

**Limitation:** Average tempo means it may absorb a hit before control takes effect.

## 16. Encounter Level and Rarity

**Roster classification: uncommon.**

Russetwalk: levels 2–4, encounter weight 10 out of 100.

Every roster member is viewable in the Margin Notes and can be selected as a practice opponent in the developer showcase. Weight is a relative table entry, not a promise of a sighting on each step.

## 17. Design Thought Process

Use hearing and silence instead of glowing eyes or a wizard hat. The misleading name of the real ear tufts becomes a useful journal fact.

## 18. Distinction Between Fact and Fiction

The animal, range, and biological behaviors in section 4 are factual inspiration. The visible powers in section 5, tactical approach, vitality, techniques, invitation agreement, and Foldwater travel are invented game rules. Real wildlife does not consent through game menus or learn combat techniques.

## 19. Future Art or Animation Notes

Rotate the head only within a plausible arc, lift facial feathers, and let the sound ring collapse inward. Keep the silhouette readable at journal-thumbnail size and retain the anatomy before adding detail. Current playable portrait: `public/art/pixel/006.png` (80 × 72 pixels); preserved SVG: `public/art/006.svg`. Both come from the original editable drawing source in `src/art/generate.mjs`. The current field plate is static, with no dedicated rear pose; the animation ideas above are future work.
