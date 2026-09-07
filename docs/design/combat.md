# Field practice

Cromon bouts use a familiar handheld RPG rhythm: select **Fight**, **Pack**, **Company**, or **Run**, choose one action, and advance each result with confirmation. Both sides have a level and visible vitality. The quicker technique acts first; exhausting an opponent ends the encounter. The creatures, approaches, techniques, invitation equipment, writing, and presentation remain original.

The six-member **walking company** travels together. The **home roost** keeps other companions between outings. Vitality represents stamina; zero vitality means a Cromon needs rest. A human fellow walker can arrange a supervised bout. All battle rules remain pure TypeScript, separate from rendering and animation.

## Three approaches

Approaches describe how a Cromon solves a problem. Each technique also has an approach, so a creature can learn a useful countermeasure.

| Approach | Strong against | Reason                                              | Limited by                                                |
| -------- | -------------- | --------------------------------------------------- | --------------------------------------------------------- |
| Anchor   | Skitter        | Construction and persistence interrupt maneuvering. | Signal reads the weak point in a fixed plan.              |
| Skitter  | Signal         | Sudden repositioning breaks prediction.             | Anchor limits room to maneuver.                           |
| Signal   | Anchor         | Timing and perception unravel settled defenses.     | Skitter changes the situation faster than it can be read. |

A favorable attack deals **1.35×**, an unfavorable attack **0.8×**, and the same approach **1×** damage. Labels and messages explain this relationship; color is supplementary. There are no immunities or additional hidden classifications. This small behavior-based cycle is original, rather than an imported elemental chart.

## Vitality and turn order

Base stats are **vitality, force, guard, and tempo**. For every level after one, vitality rises by 4 and force by 1. Guard gains `floor(0.7 × levels gained)` and tempo gains `floor(0.6 × levels gained)`. Technique priority precedes tempo; equal priority and tempo favor the player. Slowing multiplies tempo by 0.55 for the next two turn orders and never changes an order already selected.

An attack rolls reliability between zero and one. Focus adds 0.2 reliability, capped at one. On a hit:

```text
raw = (technique power + 0.45 × force − 0.30 × opposing guard + 0.40 × level) × 0.72
damage = max(1, floor(raw × approach modifier × random factor))
random factor = 0.90 through just under 1.10
```

A level-one Weirwhittle using Rooted Nudge against another level-one Weirwhittle deals 7 vitality at the middle random value. Changing only the technique approach to Signal gives 10; Skitter gives 6. Normal low-level attack exchanges generally take four to six rounds, with shorter encounters when level or approach advantages align. Deliberate recovery and guard strategies can last longer.

Zero-power support techniques deal zero damage. Focus multiplies the next attack's damage by 1.25 and is spent on the attempt, including a miss. Wild opponents receive a gentle 0.9 outgoing damage multiplier; fellow walkers and showcase opponents use full force. A guard halves the next damaging hit and then expires. Observation multiplies the opponent's damage that turn by 0.4. These reductions apply in that order, round down, and retain at least one damage.

Only three temporary effects exist: **guard**, **focus**, and **slowed**. They do not stack with themselves. Switching clears the player's effects. A replacement companion does not inherit the action of one exhausted before its turn.

Recovery techniques restore 30% of maximum vitality, rounded up. A **broth wrap** restores 65%, consumes one wrap, and uses a turn. Full-vitality companions cannot waste wraps; wraps do not restore technique uses.

## Techniques and limited uses

Every species learns two techniques at level one, a third at level four, and a fourth at level seven. The usable set holds at most four techniques. Techniques have finite uses, preserved between encounters:

| Technique                 | Full allowance |
| ------------------------- | -------------- |
| Shared damaging technique | 22             |
| Signature technique       | 12             |
| Support technique         | 16             |

Individual technique data can override its allowance with `maxUses`. A technique consumes one use when actually attempted, including misses. A slower companion exhausted before its action spends nothing. Empty techniques remain visible but cannot be selected. Opponents obey the same limits.

When all learned techniques are empty, **Strain** provides an unlimited last effort. It ignores approach relationships and costs the user one quarter of its damage as recoil, rounded down with a minimum of one. Strain is not a learned fifth technique. **Kettle rest** restores full vitality and every learned technique's allowance. Level increases unlock new techniques at full allowance while preserving the remaining uses of existing techniques.

## Invitations and observation

An **invitation ribbon** offers cooperation. A recruited Cromon chooses to travel; the Foldwater seam and sanctuary arrangements explain enormous or distant-water companions. The ribbon is not a containment device.

The interface displays the invitation chance before an attempt:

```text
chance = clamp(
  0.20 + 0.60 × missing vitality fraction
       + 0.04 × min(observations, 3)
       + (slowed ? 0.12 : 0),
  0, 0.95
)
```

Weaken the opponent, or use a slowing technique, to improve the offer. Observation is a gentler assessment action with a modest trust bonus; three observations at full vitality raise the chance from 20% to 32%, without guaranteeing agreement. Further observations do not increase trust. The chance uses the status visible when the invitation is selected, including the final turn of slowing.

A failed invitation spends a ribbon and permits an ordinary opposing action. Success ends the encounter and awards experience. A completely exhausted Cromon cannot accept an invitation. Fellow walkers' companions and showcase specimens cannot be recruited. Invalid actions spend neither turns nor supplies.

The world adds a recruited companion to the company or roost, provides arrival rest, records the species, and saves. This arrival rest and voluntary invitation remain deliberate original design choices.

## Opponents, switching, retreat, and experience

The opponent chooses among learned techniques with uses remaining. Below 40% vitality it attempts an available recovery technique with 65% probability. It occasionally guards or focuses when the corresponding effect is absent, otherwise choosing a damaging technique. All randomness can be injected for deterministic tests.

Voluntary switching uses a turn and allows an opposing response. An exhausted active companion is automatically replaced by the next healthy company member. If none remain, the world returns the player to town for Kettle rest.

Running from a wild encounter depends on the current companions' tempo, including slowing:

```text
chance = min(0.95, 0.20 + 0.40 × player tempo / opponent tempo + 0.25 × failed attempts)
```

A failed retreat spends a turn and permits an opposing action. The third attempt always succeeds if the company is still able to act. The agreed human bout must be finished, while showcase encounters always permit immediate withdrawal. Retreat does not award experience.

Defeating or recruiting an opponent awards `18 + 7 × opponent level` experience, divided equally among healthy company members that took the field, rounded down with a minimum of one each. Unused and exhausted companions gain none. Switching is therefore a way to train a weaker companion, with the cost of an opposing action.

The next level requires `18 + 12 × current level` experience. Overflow carries forward through multiple levels. A level increase adds the gain in maximum vitality without reviving an exhausted companion. The prototype caps levels at 50, where accumulated experience is zero.

## Presentation and save contract

`startBattle` deep-copies companions and their technique counts. `resolveTurn` returns a fresh state and never mutates its input. Completed results remain stable. Each call provides ordered `BattleEvent` snapshots containing a message, company, active slot, opponent, and guard/focus/slowing effects. The interface shows one message at a time and updates vitality, experience, level, and effects at the corresponding event. Rewards enter the company before reward messages are snapshotted. Snapshots do not share mutable companion, charge, or effect objects. The historical log retains the last fourteen messages.

Version-one saves remain compatible. The optional companion `charges` map persists remaining uses; absent entries in older saves read as a full allowance. Player facing is also optional and older saves default to south in the renderer. Existing progress, companions, and inventory are retained. Saves allow six company members and validate known techniques and charge bounds. `learnedMoves`, `availableMoves`, `chargesFor`, `maxUses`, and `healCompanion` centralize these rules.

No evolution, multi-opponent human teams, move-replacement prompt, equipment, weather, or elaborate status simulation is implemented. Manual replacement after exhaustion is a future refinement; the automatic replacement preserves the complete current loop.
