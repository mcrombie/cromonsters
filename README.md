# Cromonsters!

An original monster-collecting RPG proof of concept built with TypeScript, Vite, and Phaser 3. Take an autumn field assignment through Foldwater Reach: choose a companion, explore four habitats, meet thirty original Cromon, practice techniques, and invite wildlife to travel with you.

The current iteration follows player feedback requesting a more serious visual tone and a more familiar original-handheld gameplay rhythm. A restrained four-shade world, directional walking sprites, a scrolling camera, and focused menus replace the first build's illustrated dashboard. The creature names, ecological setting, voluntary companionship, and biology-based designs remain original.

This is an affectionate genre parody and homage. **Cromonsters! is not affiliated with Nintendo, Game Freak, Creatures, or The Pokémon Company.** Its code, creatures, writing, maps, assets, terminology, and interface artwork are original. No extracted game files, copied franchise sprites, music, fonts, or other proprietary assets are included. No open-source license has been added.

## Run locally

Use Node.js **22.12 or newer** and npm. From this directory:

```powershell
npm install
npm run dev
```

Open the local address printed by Vite, normally `http://127.0.0.1:5173`. Installation requires internet access; the installed game uses no backend, account, API key, remote assets, or external services. Keep the local server running while playing. Opening `index.html` directly is not supported.

| Command                | Purpose                                                     |
| ---------------------- | ----------------------------------------------------------- |
| `npm run dev`          | Start the local development server                          |
| `npm run test`         | Run Vitest rules and data checks                            |
| `npm run test:watch`   | Watch and rerun tests                                       |
| `npm run test:e2e`     | Run Playwright browser checks using installed Google Chrome |
| `npm run lint`         | Run ESLint                                                  |
| `npm run format`       | Apply Prettier                                              |
| `npm run format:check` | Check formatting without editing                            |
| `npm run build`        | Type-check and create `dist/`                               |
| `npm run preview`      | Serve the production build, normally on port 4173           |

## Play the Fourfold Ramble

Begin in **Latchleaf** with Pathwarden Nella Quill. Choose **Weirwhittle** the construction-minded beaver, **Pipistitch** the listening bat, or **Thrumble** the precise hummingbird. Your kit starts with eight invitation ribbons, four broth wraps, and thirty field chits.

Open **START → Assignment** to check progress, then speak to Nella when the report is ready:

1. Visit **Russetwalk**, **Bellwether Field**, **Sluicefen**, and **Farcurrent Strand**.
2. Make the environmental observation at each habitat's `!` landmark.
3. Record six different Cromon through field sightings, encounters, and your starter.
4. Welcome two different wild species in addition to your starter.
5. Win fieldwalker **Kit's friendly bout** in Bellwether Field.
6. Return to Nella for **Proof of Concept Complete**. Exploration remains available afterward.

Face a person, sign, or landmark and press **A** to interact. Gravel paths are safe; walking through encounter grass can start a battle. **START → Area Map** provides optional landmark routing and **Search Nearby Habitat** when you want a direct encounter.

Battles begin with **Fight / Pack / Company / Run**. Fight opens up to four techniques. Confirm advances one message at a time, with vitality changing at the corresponding result. Techniques have limited uses that persist between encounters; Kettle rest restores them.

To recruit, reduce a wild Cromon's vitality, then choose **Pack → Invitation ribbon**. Slowing also helps. **Study opponent** offers a gentler turn and a modest familiarity bonus; three studies do not guarantee agreement. The current chance is shown before the attempt and is capped at 95%. A fully exhausted opponent cannot be recruited. Failed invitations spend a ribbon and allow an opposing action.

Up to six companions travel in your **walking company**; the **home roost** keeps the rest. Switching uses a turn. Healthy companions that took the field share earned experience. Running from wild encounters depends on tempo and improves after failures, with a guaranteed third attempt if the company remains able to act. Kit's agreed bout must be finished.

The Kettle House restores vitality and technique uses for the entire company and reserve for free. Moss & Sundries sells supplies and can top up an empty kit to two ribbons and one broth wrap. Defeat returns everyone safely to Latchleaf without losing field progress. Kit rests the company before a bout.

## Controls and access

| Action                             | Keyboard / interface                                 |
| ---------------------------------- | ---------------------------------------------------- |
| Move and face a direction          | Arrow keys or WASD; hold to walk                     |
| A: interact, confirm, advance text | Z, Enter, or Space                                   |
| B: back, cancel, open field menu   | X or Escape                                          |
| Open field menu                    | Visible **START** button; X / Escape while exploring |
| Journal / company / pack / mute    | J / C / P / M                                        |
| Navigate menus                     | Arrow keys, Tab, or Shift+Tab                        |
| Optional route assistance          | **START → Area Map**, or click a map destination     |
| Touch movement and actions         | Visible direction pad, A, B, and START               |

The player turns even when facing a blocked tile and uses three original frames in each of four directions. The field is a native **320×240** viewport with **16-pixel tiles** and a following camera. Integer-size enlargement is preferred; constrained windows retain the aspect ratio and crisp pixel rendering.

The Controls screen is available from the title, header, and field menu. Names, approach labels, status words, exact vitality, visible invitation chances, and focus outlines supplement the four-shade palette. Original synthesized chimes obey the visible mute control; **M works inside menus and battles**. Menus use ordinary DOM buttons for keyboard focus and activation.

## Included in this slice

- One starting settlement and four compact 25-by-17-tile wilderness maps, each with distinct terrain, encounters, an observation, an item reward, a note, and a safe return route.
- Thirty original Cromon, pixel portraits, a complete **Margin Notes** journal, and thirty individual design dossiers. **Twenty-six** species occur in ordinary encounter tables; four sanctuary visitors remain available in the developer showcase.
- Three strategic **approaches**: Anchor catches Skitter, Skitter outpaces Signal, and Signal reads Anchor. Techniques use reliability, priority, damage, and limited guard, focus, slowing, or recovery effects.
- Six company slots, up to four learned techniques, persistent technique uses, last-effort Strain, voluntary invitations, participant experience, leveling, reserve management, supplies, healing, and one human opponent.
- A complete introductory assignment and ending screen, with continued exploration.
- Compatible version-one local saves and an isolated developer sandbox.

The setting draws on hardwood forests, meadows, wetlands, and coastal ecology. The fictional **Foldwater seam** explains distant-water visitors. Actual animal ranges remain separate from fantasy in the journal and [roster dossiers](docs/cromon/README.md). The setting does not borrow generalized Indigenous imagery or invented traditions.

## Saves and developer showcase

Progress autosaves under `cromonsters.field-save.v1`; **START → Save** also stores it explicitly. Saves belong to the browser and exact site origin. Changing between `localhost` and `127.0.0.1`, changing ports, or clearing browser data changes which save is available.

**Existing first-build saves remain usable.** The version and storage key are unchanged. Older companions with no saved technique counts start with full uses, and a missing facing direction defaults to south. Existing progress, inventory, companions, and discoveries are preserved. New saves additionally store facing and remaining technique uses. Malformed or unsupported saves are rejected.

Battles are not saved mid-turn. Reloading returns to the field snapshot before the encounter, including its recorded sighting. If browser storage is blocked, play continues in memory and the interface reports that saving is unavailable.

Open `http://127.0.0.1:5173/?dev=1` and select **Developer**. The **Specimen workbench** lets you:

- View all thirty species, their base stats, biology, actual ranges, and technique progression.
- Select any species and a level from 1 to 50, then start a real mirror battle.
- Jump to any of the five maps.
- Reset the normal local save through explicit confirmation inside the workbench.

The sandbox begins from a snapshot of the normal save but does not overwrite it. Showcase battles use independent companions and supplies; results do not affect the assignment. Developer controls and the sandbox banner appear only with `?dev=1`. The ordinary journal includes all thirty reference plates.

## Project structure

```text
src/core/              Pure battle, progression, save, map, and trial rules
src/data/              Roster, techniques, maps, encounters, dialogue, items
src/game/FieldScene.ts  Grid movement, directional interaction, scrolling camera
src/game/field-art.ts   Original four-shade terrain and human sprite generation
src/game/audio.ts       Local synthesized chimes
src/ui/shell.ts         Title, handheld frame, and A/B/START controls
src/ui/battle-panel.ts  Battle scene and four-command menu presentation
src/ui/panels.ts        Journal, company, and controls panels
src/main.ts            Application flow and event-by-event battle playback
src/handheld.css       Current restrained handheld interface styling
src/art/               Original creature art sources and QA tools
public/art/            Creature portraits, landscape, and reference art
tests/                 Vitest data, rules, save, and map checks
e2e/                   Playwright browser playthrough and showcase checks
docs/cromon/           Index and one design dossier per Cromon
docs/design/           World, encounters, starters, combat, art, architecture
```

## Testing and extending

Run the project's checks before reviewing a change:

```powershell
npm run format:check
npm run lint
npm run test
npm run build
npm run test:e2e
```

Vitest checks roster completeness, uniqueness, stats, moves, documentation and art, encounters, map reachability, damage, turn order, approaches, recruitment, experience, and saves. Battle/save regressions cover technique use spending, exhaustion, Strain, Kettle recovery, six-member saves, legacy saves, escape attempts, participant experience, and ordered presentation snapshots.

Playwright covers the visible game loop and rendered controls, including completion, keyboard play, showcase battles, company management, supplies, healing, and recovery. Use [the verification record](docs/verification.md) for the executed checks and their results; pure tests alone do not establish browser usability. The browser configuration uses locally installed **Google Chrome**, with artifacts under `artifacts/`.

To exercise the production build instead of the development server:

```powershell
npm run build
$env:CROMON_PRODUCTION = '1'
npm run test:e2e
Remove-Item Env:CROMON_PRODUCTION
```

This uses preview port 4173. Removing the environment variable restores development-server mode on port 5173.

To add a Cromon after the fixed thirty-species slice, add a stable record to `src/data/roster.ts`, reference or define techniques in `src/data/moves.ts`, add its pixel portrait, dossier, and index entry, and provide an encounter or explicit showcase availability. Follow the existing level 1 / 1 / 4 / 7 progression and four-technique cap unless intentionally extending the learning system. Update the independent test manifest only when expanding scope; retain coverage of all original source animals. The journal and workbench enumerate the roster automatically.

To add a wilderness area, extend `MapId` and `src/data/world.ts` with a valid spawn, tiles, encounters, objects, and reciprocal transitions. The save validator reads map IDs and dimensions from world data and checks walkability. Add terrain treatment in `field-art.ts` if needed. Change `FIELD_IDS` and `trialChecklist` only when extending the assignment. Add reachability and encounter checks, then update world and encounter documentation. Incompatible save changes require an explicit migration policy.

## Known limits and next work

This remains a short vertical slice with original placeholder art, small maps, one human opponent, shared AI, and no full campaign. Creature animation is limited; the presentation is a modern browser interpretation of handheld play, not hardware emulation. Company replacement after exhaustion is automatic, and human bouts currently field a single opponent.

Environmental observations preserve visual changes and rewards but do not gate traversal or rebuild collision. Water encounters abstract shoreline meetings; there are no interiors or swimming. Four sanctuary species remain showcase-only. Roost management is available from the field menu. There is no soundtrack, evolution, crafting, breeding, multiplayer, service worker, cloud save, or mid-battle persistence.

The next three milestones are **deeper battle decisions and creature animation**, **companion-assisted exploration**, and **save, accessibility, and release hardening**. See the [roadmap](docs/roadmap.md), [game design](docs/design/game-design.md), and [architecture](docs/design/technical-architecture.md).
