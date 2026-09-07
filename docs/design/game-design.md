# Cromonsters! proof of concept

**Cromonsters!** is an original naturalist adventure with a serious visual tone and occasional warm absurdity. The player joins a modest field station, chooses a companion, takes notes in four autumn habitats, practices techniques with wild Cromon and a peer, welcomes new companions, and brings a finished report home. The slice has a clear ending and permits continued exploration after it.

The scale and accessible rhythm nod to early handheld monster RPGs. The identity comes from ecological observation, voluntary company, pragmatic fieldwork, and lightly absurd biology-based creatures. All names, creatures, dialogue, maps, visual assets, terms, music-free synthesized sound, and interface composition are original. There is no copied character, creature design, map, professor scene, containment ball, league, gym, badge, villain team, or standard elemental type chart.

## Design priorities

The second presentation pass follows the owner's playtest request for a less childish appearance, a player that visibly turns, and mechanics closer to the familiar original-handheld monster RPG experience. Four-shade pixel art, a small scrolling viewport, deliberate text advancement, six company slots, four techniques, and finite technique uses establish that baseline. Original names, biological inspiration, the approach cycle, and the Foldwater setting remain intact so subsequent design changes can be judged against a familiar loop.

1. A complete loop that a new player can finish without grinding or scarce-resource failure.
2. Thirty distinct animal-based designs with their real inspiration separated from fantasy.
3. Short readable battles, transparent invitations, safe return routes, and useful companions.
4. Small coherent places with one purposeful observation in each.
5. Replaceable original art and clear architectural seams for future work.

## Original vocabulary

| Concept            | Term and purpose                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------------------- |
| Creatures          | **Cromon**: biologically recognizable neighbors with a little fantastic license                               |
| Player naturalist  | **Fieldwalker**: a beginner learning observation through practice                                             |
| Local guide        | **Pathwarden**: Nella Quill keeps routes and fieldwork in order                                               |
| Journal            | **Margin Notes**: reference plates plus individually recorded sightings                                       |
| Recruitment        | **Welcoming**, through an **invitation**: voluntary companionship                                             |
| Recruitment tool   | **Invitation ribbon**: a visible agreement, never a container                                                 |
| Active party       | **Walking company**: up to six companions                                                                     |
| Reserve            | **Home roost**: companions resting between outings, with suitable Foldwater arrangements for aquatic visitors |
| Healing            | **Kettle rest** at the Kettle House; portable **broth wraps**                                                 |
| Affinities         | **Approaches**: Anchor, Skitter, and Signal describe how a creature solves problems                           |
| Moves              | **Techniques**, demonstrated in **field practice**                                                            |
| Human opponents    | **Fellow fieldwalkers**, including Kit                                                                        |
| Currency           | **Field chits** for supplies                                                                                  |
| Introductory trial | **The Fourfold Ramble**                                                                                       |

## Beginning, middle, ending

Nella introduces Latchleaf, the principle of voluntary company, and the assignment. The player selects one level-three starter: Anchor Weirwhittle, Signal Pipistitch, or Skitter Thrumble. All receive the same kit of eight ribbons, four broth wraps, and thirty chits. Starter reasoning and long-term roles are documented in [starters.md](starters.md).

The four habitats can be visited in any order. Each offers a safe path, a one-time environmental observation, a free item discovery, a naturalist note, a different encounter table, and a direct route back to town. Observations visibly change the branch, vane, spillway, or tide lens; the saved discovery controls its persistent after-state. Wild encounters arise from grass or Search Nearby Habitat under START → Area Map. That menu also provides optional safe-route assistance. START → Assignment shows the trial checklist. The journal distinguishes a supplied reference plate from an actual field record.

The completion gate is the exact checklist in `src/core/world.ts`:

- Visit all four wilderness map IDs.
- Record all four `mapId-discovery` observations.
- Record at least six distinct species, including the starter if applicable.
- Recruit two additional distinct species beyond the starter; welcoming duplicates does not increase this objective.
- Win Kit's friendly bout in Bellwether Field.

Nella evaluates the report when the player interacts with her in Latchleaf. A successful evaluation sets the completed save flag and opens **Proof of Concept Complete**. A button returns to free exploration. No later campaign is implied to be implemented.

## Practice and companionship

Each Cromon has vitality, force, guard, and tempo, two techniques available at level one including its signature, a third at level four, and a fourth at level seven. Three approaches form a small strategic cycle: **Anchor catches Skitter; Skitter outpaces Signal; Signal reads Anchor**. This describes construction, positioning, and perception rather than three substances or elements. Techniques can differ from the user's approach.

Battles present **Fight / Pack / Company / Run**, with separate technique, item, and switching choices. Confirm advances one result message at a time and vitality changes with the relevant event. At most four learned techniques are available, with remaining uses that persist between encounters. Shared damaging techniques normally have 22 uses, signatures 12, and support techniques 16. Kettle rest restores all uses. If every technique is exhausted, Strain provides a neutral last effort with recoil.

Wild encounters also offer Study opponent and invitation ribbons through Pack. Lower vitality and slowing improve recruitment more than observation. Three studies at full vitality raise the chance from 20% to 32%; agreement is never guaranteed and the total chance is capped at 95%. A failed invitation spends a ribbon and allows the opponent to act. The visible probability and confirmed messages explain the outcome. Running from a wild encounter uses tempo-based odds that improve after failures; the third attempt succeeds if the company remains able to act. An agreed human bout must be completed. Details and equations are in [combat.md](combat.md).

Accepted companions join the walking company until its six spaces are occupied, then go to the home roost. The field controller fully rests a newly welcomed companion as a convenience. Healthy companions that took the field share experience from victories and invitations; unused members gain none. Switching uses a turn, and an exhausted active companion is automatically replaced by the next healthy member. Defeat sends everyone home and restores them; existing notes and companions remain safe.

## Supplies and recovery

| Resource          | Source / use                                                                         |
| ----------------- | ------------------------------------------------------------------------------------ |
| Invitation ribbon | Starts at 8; costs 6 chits; one consumed per invitation attempt                      |
| Broth wrap        | Starts at 4; costs 5 chits; restores vitality in the field or a battle               |
| Field chits       | Starts at 30; a first habitat observation awards 8; a victory or invitation awards 7 |
| Free minimum kit  | Moss & Sundries raises current stock to at least 2 ribbons and 1 wrap                |
| Kettle rest       | Free full vitality and technique-use recovery for company and reserve                |

There is no economy grind requirement. Observation discoveries and the minimum kit keep invitations accessible. Kit rests the company before each friendly bout. Broth wraps restore 65% of maximum vitality, rounded up and capped at full, both on the field and in battle. This small slice keeps those uses simple rather than adding item grades.

## Place, tone, and ecology

The setting is early autumn in the fictional Foldwater Reach. Latchleaf, Russetwalk, Bellwether Field, Sluicefen, and Farcurrent Strand form a compact hub and four habitats. Eastern Woodlands ecology shapes the scenery; the game does not use generalized Indigenous aesthetics or sacred traditions.

Warm writing gives the landscape room to matter. Cromon personalities provide much of the humor: a helpful beaver with strong opinions about gradients, a tiny precise flier, a singing wolf worried about formations, and a fieldwalker whose notes are sorted by startled noises. A joke is an occasional observation, not every sentence.

The Foldwater seam and sanctuary arrangements explicitly explain nonlocal species. A Pacific octopus remains a Pacific animal in the journal's real-world account. Fantasy powers and geographic shortcuts appear in separate fields. The [roster index](../cromon/README.md) links the thirty individual design dossiers and biology references.

## Presentation and access

Phaser draws a 320×240 scrolling view of original 16-pixel terrain. The restrained four-shade palette and more anatomical creature pixel portraits give the game a quieter visual tone. The 16×24 player sprite has three frames for each of four directions and turns even when a wall prevents movement. The field remains visually central; company, journal, supplies, route assistance, and the assignment live in a START menu rather than an always-visible dashboard.

Arrow keys or WASD move; Z, Enter, and Space act as A; X and Escape act as B. The visible A, B, START, and direction controls support pointer or touch use. Menus retain keyboard focus and activation through ordinary DOM buttons. Names, approach labels, status words, vitality numbers, probability, and focus outlines avoid reliance on color. A visible controls screen explains play. M and the visible mute control work during menus and battles; sound consists of original synthesized chimes without a soundtrack.

Normal progress autosaves locally. First-build version-one saves remain compatible: missing technique counts default to full and missing facing defaults to south, without resetting the assignment. The `?dev=1` workbench offers isolated specimen battles and map jumps and does not appear in the normal interface.

## Deliberate boundaries

The slice includes one town, four wilderness areas, three starters, thirty designs, twenty-six ordinary encounter species, four showcase-only sanctuary species, one peer, and one assignment. Environmental actions set discoveries, grant rewards, and produce persistent visual changes. Collision changes, companion-dependent traversal, swimming, interiors, multi-opponent tactics, evolution, breeding, crafting, online services, and a full campaign are outside this version. The [roadmap](../roadmap.md) extends the strongest existing systems before increasing world size.
