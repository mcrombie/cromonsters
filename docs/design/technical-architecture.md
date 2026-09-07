# Technical architecture

The proof of concept is a fully local TypeScript application built by Vite. Phaser 3 draws a **320×240** scrolling field with **16-pixel tiles**. DOM panels provide the title, START menu, journal, company management, battle controls, shop, and completion screen. Rules remain ordinary TypeScript functions that can be tested without Phaser or a browser.

The current presentation follows the owner's request for a more serious original-handheld feel. It replaces the first build's dashboard with a field-centered layout and command menus. The original data model, roster, ecological writing, and local save key are preserved.

## Module boundaries

| Location                         | Responsibility                                                                                        |
| -------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `src/core/types.ts`              | Species, techniques, companion instances, direction, saves, battles, actions, and presentation events |
| `src/data/roster.ts`             | Thirty species and starter IDs; biology, real ranges, fantasy, stats, progression                     |
| `src/data/moves.ts`              | Shared techniques, signatures, and last-effort Strain                                                 |
| `src/data/world.ts`              | Five maps, deterministic terrain, objects, encounters, and observation species                        |
| `src/data/dialogue.ts`           | Introduction and supply definitions                                                                   |
| `src/core/battle.ts`             | Pure damage, order, AI, turn resolution, invitations, escape, rewards, and event snapshots            |
| `src/core/progression.ts`        | Instances, stats, four-technique limit, six-company limit, use counts, levels, and rest               |
| `src/core/world.ts`              | Collision, safe-route pathfinding, weighted encounters, and assignment rules                          |
| `src/core/save.ts`               | Versioned serialization, runtime validation, and local storage                                        |
| `src/game/FieldScene.ts`         | Scrolling field, facing, grid movement, camera-aware pointer routes, and interaction                  |
| `src/game/field-art.ts`          | Original four-shade terrain, structures, discoveries, and human sprite textures                       |
| `src/game/audio.ts`              | Optional local Web Audio chimes                                                                       |
| `src/ui/shell.ts`                | Title, field frame, A/B/START buttons, and dialog shell                                               |
| `src/ui/battle-panel.ts`         | Battle scene, vitality and experience meters, four commands, and message presentation                 |
| `src/ui/panels.ts`, `helpers.ts` | Journal, company, controls, reusable cards, and art references                                        |
| `src/main.ts`                    | Application flow, input, field-to-battle integration, event playback, rewards, and developer tools    |
| `src/handheld.css`               | Active handheld styling, responsive scaling, focus states, and battle feedback                        |

The controller coordinates application flow while data, rules, markup, and drawing stay separate. Further controller growth should move feature workflows into dedicated modules before introducing unrelated responsibilities into `main.ts`.

## Exploration bridge and rendering

`createField` receives a `FieldBridge` with current position and optional facing, discovery IDs, movement-blocking state, a facing callback, a completed-step callback, and an interaction callback. Phaser does not calculate battle damage or write saves.

The world remains five maps of 25×17 tiles, now 400×272 logical pixels per map. A 320×240 camera follows the player within map bounds. Pixel rounding, original integer-coordinate drawing, and nearest-neighbor rendering preserve the grid. The shell prefers integer-size enlargement and keeps the aspect ratio on constrained displays.

`field-art.ts` creates 16×24 human sprites with three frames for each of north, east, south, and west. `FieldScene` animates each tile stride over 160 milliseconds. Pressing a new direction turns the player even if collision prevents movement. NPCs can turn toward the player. A modal blocks walking; queued or held movement is cleared when appropriate, including window blur. The scene exposes movement/facing attributes on the canvas for browser regression checks.

Manual interaction checks the facing direction. Pointer coordinates are translated through the camera into world coordinates before route selection. An assisted route to a landmark approaches a neighboring walkable tile and faces the landmark before interacting.

Collision comes from the pure world module. Weighted pathfinding gives gravel a cost of 1 and other walkable tiles a cost of `MAP_WIDTH × MAP_HEIGHT`, currently 425. A gravel-only route is therefore preferred over an off-path shortcut. **START → Area Map** exposes this optional assistance; ordinary play uses the field and A/B/START controls without a dashboard. That menu also provides direct habitat search.

Map IDs connect definitions to saved positions and transitions. Objects specify their kind, label, text, and tile; transitions specify a destination. Saved observation IDs select the branch, vane, spillway, and tide-lens before/after artwork. Those drawings do not alter collision. Z/Enter/Space are A, X/Escape are B, and arrows/WASD provide movement. DOM menus retain keyboard focus; mute remains available while dialogs are open.

## Battle lifecycle and presentation

1. The controller selects an encounter and level, records its sighting, and saves the field snapshot.
2. `startBattle` deep-copies the company, opponent, technique counts, and supplies into independent battle state.
3. **Fight / Pack / Company / Run** produces a typed `BattleAction`. Browsing a submenu or returning with B consumes no turn.
4. `resolveTurn` returns a fresh state using injectable randomness. Every message also produces an ordered `BattleEvent` containing text, company snapshots, active index, opponent snapshot, and guard/focus/slowing values in `effects`.
5. The controller waits for A/confirmation before advancing each event. It renders the event's vitality values, so a later attack does not appear to have happened before its message.
6. After all events and the terminal result are acknowledged, the controller commits company state, use counts, supplies, credits, recruitment, the peer flag, or recovery to the field save.

Event snapshots do not share mutable companions, charge maps, or effect records with one another or the final state. Earned experience and level changes enter the company before their corresponding messages are snapshotted. They are presentation data, not another battle simulation. Invalid actions produce their explanation without spending a turn. The historical log retains fourteen messages, while `events` is reset for each resolution.

Species are immutable templates. A `Companion` has its own UID, species ID, level, experience, vitality, and optional remaining-use map. `learnedMoves` caps the learned set at four. `chargesFor` applies full defaults for absent legacy values. `availableMoves` keeps exhausted choices visible until every learned technique is empty, then supplies Strain. `maxUses` centralizes allowances and per-technique overrides; `healCompanion` restores vitality and all learned uses.

Temporary guard, focus, slowing, observation familiarity, escape attempts, participants, and messages belong to battle state. Only healthy participants share earned experience. Recruitment odds depend primarily on missing vitality and slowing; escape odds depend on tempo and prior failures. The rules and equations are documented in [combat.md](combat.md).

The battle engine returns a willing opponent; the controller adds it to one of six company slots or the roost and provides arrival rest. Showcase results are discarded. There is no engine physics, server simulation, global event bus, or runtime network dependency.

## Compatible version-one saves

The storage key remains `cromonsters.field-save.v1` with `version: 1`. Saves contain map and tile position, optional facing, company and reserve instances, optional technique counts, seen/recruited species, visits, discoveries, supplies, chits, trial flags, mute, and steps.

The handheld revision is an additive change. Earlier version-one saves lacking `player.facing` or companion `charges` remain valid. The renderer defaults direction to south and the rules read absent technique counts as full. These defaults do not erase progress or refill a technique count already present. New companions have explicit full counts. Rest and later battle results persist normal counts.

Validation rejects unknown species, duplicate UIDs, invalid maps or blocked positions, malformed collections, invalid levels/experience/vitality, bad supplies or flags, invalid directions, parties over six, unknown/unlearned technique keys, and negative or excessive use counts. It validates against the same roster, world, and progression functions used in play.

Persistence occurs between field actions and after battle results. **Active battles are not serialized.** Reloading returns to the pre-encounter snapshot, including its recorded sighting. Saves belong to the exact browser origin; development and preview ports are separate. JSON and storage exceptions are caught, and failed writes allow in-memory play with a visible notice. Unknown schema versions still require an explicit migration policy.

## Developer isolation

`?dev=1` enables the specimen workbench and a sandbox banner. It begins from a normal-save snapshot but skips ordinary persistence. A test battle creates independent selected-species companions, full technique uses, and separate supplies at a level from 1 to 50. All thirty species appear, including the four absent from ordinary encounter tables. The workbench displays base stats and progression and provides all five map jumps.

Its sole intentional normal-save mutation is the explicitly confirmed reset, which removes only the game's storage key. Normal play has no developer controls. All reference plates remain available in the regular journal.

## Data and art extension

Add a species with a stable ID, valid stats and progression, portrait, dossier, roster-index entry, and encounter or explicit showcase availability. Keep existing IDs when changing display names. The journal and workbench enumerate `ROSTER`; independent tests maintain the required-animal list. The current progression learns two techniques at level one and one each at levels four and seven. A future move-replacement interface should be an explicit extension of the four-technique rule.

To add an area, extend `MapId` and world definitions, including spawn, tiles, encounters, objects, and reciprocal transitions. Add renderer treatment where needed. The validator reads map IDs and dimensions from world data. `FIELD_IDS` and `trialChecklist` define the assignment and should not grow merely because an optional area is added. Tile codes remain `T` trees, `~` deep water, `#` buildings, `=` paths, `g` encounter grass, `f` flowers, and `.` ordinary ground.

Creature pixel portraits are static local assets under `public/art/pixel/`. Original source and reference artwork remain separate from game rules; see [art direction](art-direction.md) for regeneration and replacement. Do not introduce network-based asset loading. Evolution remains unimplemented; any future transformation should reconcile species, stats, learned moves, and saved use counts in the pure core first.

## Verification

Vitest covers roster completeness, identifiers, stats, move references, art/documentation, encounters, map dimensions and reachability, battle damage/order/effects, invitation chances, retreat, switching, experience, use exhaustion, healing, Strain, ordered event snapshots, six-member saves, and compatibility with older saves.

Run `npm run format:check`, `npm run lint`, `npm run test`, and `npm run build`. Browser checks use `npm run test:e2e` and locally installed Google Chrome. They exercise visible completion, input, journal/showcase access, company/reserve behavior, supplies, and recovery. Current execution results belong in [verification.md](../verification.md); unit checks cannot establish rendered usability.

Playwright starts or reuses Vite on port 5173 by default. `CROMON_PRODUCTION=1` uses production preview port 4173 after a build. Reports and failure artifacts go beneath `artifacts/`. Screen-reader announcements, blocked storage, long sessions, and large reserves remain useful manual release checks.
