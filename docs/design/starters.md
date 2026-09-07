# Three first companions

Nella Quill offers three already-socialized Cromon to a new fieldwalker in Latchleaf: **Weirwhittle**, **Pipistitch**, and **Thrumble**. Each belongs to the main thirty-species roster; there are no extra starter-only species. They are plausible small companions drawn from the region’s streams, woodland air, and flowers.

| Starter                                     | Source                    | Approach | First lesson                         | Base vitality / force / guard / tempo |
| ------------------------------------------- | ------------------------- | -------- | ------------------------------------ | ------------------------------------- |
| [Weirwhittle](../cromon/003-weirwhittle.md) | North American beaver     | Anchor   | Protect the next exchange            | 32 / 9 / 12 / 6                       |
| [Pipistitch](../cromon/005-pipistitch.md)   | Little brown bat          | Signal   | Prepare a focused follow-up          | 26 / 10 / 8 / 11                      |
| [Thrumble](../cromon/021-thrumble.md)       | Ruby-throated hummingbird | Skitter  | Choose the right moment to act first | 25 / 10 / 7 / 14                      |

## The three-way relationship

**Anchor catches Skitter; Skitter interrupts Signal; Signal reads Anchor.**

Weirwhittle’s constructed position makes a hurried hovering pass easier to intercept. Pipistitch listens for the opening in a predictable structure. Thrumble acts before an elaborate cue is ready. These are explanations for a game rule, not claims about which real animal wins a fight.

A technique’s approach has a **1.35×** damage modifier against the next approach in the cycle, **0.8×** against the previous one, and **1×** against itself. The modest modifiers let vitality, guard, timing, and switching matter. An affinity advantage is useful guidance, not a guaranteed result.

```mermaid
flowchart LR
  A["Anchor · Weirwhittle"] -->|"catches"| K["Skitter · Thrumble"]
  K -->|"interrupts"| S["Signal · Pipistitch"]
  S -->|"reads"| A
```

This is a relationship between stability, timing, and perception. Habitat and body plan do not dictate approach: a flying hawk can defend a thermal as Anchor, and a large bison can use a sudden opening as Skitter.

## Weirwhittle: build a little breathing room

Pocket Weir combines a modest hit with a guard against the next damaging hit. High guard and good vitality make this the most forgiving first choice; low tempo teaches the player to prepare before trouble arrives. The broad paddle tail and low body contrast sharply with both aerial starters.

Its natural engineering behavior offers future terrain support, bridge repair, and companion assistance. Those are roadmap opportunities, not hidden POC mechanics. The current battle role remains useful as a dependable switching destination and a safe place to begin an observation.

## Pipistitch: learn before committing

Echo Stitch deals a small reliable hit and focuses the following attack. The starter therefore demonstrates a simple two-action plan alongside a visible technique-use counter. Its intermediate tempo and modest vitality reward attention to the opponent rather than repeated setup with no purpose.

The bat’s membrane wings, large ears, and tiny echo stitches identify it immediately. The biological basis is echolocation and insect hunting, not vampirism. Future perception interactions could reveal hidden paths or improve ally coordination while retaining the same focus role.

## Thrumble: precision is a commitment

Pinpoint Hover is accurate and has positive priority. It makes turn order tangible: a small companion can finish an exchange before a rival acts. Excellent tempo also improves wild-retreat odds; low vitality and guard provide a clear reason to switch when it faces a stable Anchor opponent.

A long narrow bill, compact body, ruby throat patch, and hovering wing arcs distinguish it from the bat. Its durable future niche is a reliable finisher and interrupting scout. It does not need escalating damage or a larger body to stay useful.

## A welcoming trial for every choice

All three begin with two usable techniques, gain a complementary option at level four, and learn a stronger same-approach attack at level seven, filling the four-technique set. Each begins with a shared damaging technique at 22 uses and its signature at 12 uses. These counts persist between encounters and Kettle rest restores them. The two unchosen starters remain available through ordinary exploration: Weirwhittle in Sluicefen, Pipistitch in Russetwalk, and Thrumble in Bellwether Field.

The Fourfold Ramble rewards observation and invitations as well as practice battles. Weakening a wild opponent and applying slowing improve invitation odds, while Study opponent offers a modest trust bonus and a gentler turn. Three studies do not guarantee recruitment. A fieldwalker can return to the Kettle House, replenish supplies in Latchleaf, and fill a six-member company. Healthy members that take the field share experience, making a deliberate switch useful for training a new companion. No starter is a compulsory traversal key, and no choice locks an area or the ending.

The owner-requested handheld revision preserves these three original designs and their strategic cycle. More serious pixel portraits distinguish the beaver's broad body, the bat's extended membranes, and the hummingbird's compact hovering shape without changing their source animals or replacing the cycle with elements.

Starter IDs are centralized in `STARTERS` in `src/data/roster.ts`. Their techniques and stats use the same data and rules as every other species, so later balancing does not require a special starter subsystem.
