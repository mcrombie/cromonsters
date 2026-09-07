# Handheld revision verification

Verified locally on September 7, 2026, using Node.js 24.15.0 on Windows and Playwright's installed Google Chrome channel.

| Check                                | Result                             |
| ------------------------------------ | ---------------------------------- |
| Dependency installation              | Existing local installation reused |
| Prettier                             | All project files pass             |
| ESLint                               | Pass; zero errors or warnings      |
| Vitest                               | 135 tests pass across four suites  |
| TypeScript and Vite production build | Pass                               |
| Production browser acceptance        | Eight tests pass in 2.3 minutes    |

The browser acceptance suite runs against the built application, using its visible controls and actual combat rules. No completion flags, companions, or save fixtures are injected into the fresh-player playthrough. Tests seed the random-number generator for repeatable encounter and battle choices, then play through the normal menus. Recruitment tests weaken opponents before offering ribbons and replenish supplies through the shop.

1. A new player chooses a starter, explores every habitat, makes all four observations, invites two wild species, wins Kit's bout, and reaches **Proof of Concept Complete** using keyboard activation. Reloading preserves the completed checklist. This scenario also checks for browser console errors.
2. All thirty reference portraits load and all thirty species finish actual developer mirror battles. The level control is exercised at levels 4 and 12.
3. A 390-pixel-wide viewport supports keyboard starter choice, journal access, and mute with no horizontal document overflow.
4. A seventh companion enters the reserve; six-member company/roost transfers, leading-companion changes, purchases, free supply top-ups, whole-company healing, and reload persistence work.
5. Defeat returns a rested company to Latchleaf while preserving its journal records.
6. The 320×240 field turns in all four directions, supports held walking, and opens the compact field menu. Facing also changes when a wall prevents a step.
7. Fight, Pack, Company, and Run use separate command screens. Back leaves a submenu without consuming a turn; messages advance in order, technique uses persist, and retreat reaches the field.
8. Opening a menu while a direction is held cancels movement. Stale key repeats after closing it cause neither an unintended step nor an exception; a fresh press resumes normally, with field focus restored.

Vitest independently checks animal coverage and unique species, the nineteen required dossier sections, portraits, stats and techniques, encounter references, map reachability and safe gravel routing, affinity and damage calculations, order and effects, switching, invitations, experience, levels, serialization, and rejection of malformed or blocked-position saves. New regressions cover limited technique uses and Strain, six-member saves, older saves without uses or facing, retreat chances, participant-only experience, ordered vitality/experience/effect snapshots, NPC collision, and legacy positions on NPC tiles.

The supplied playtest recording was reviewed through sampled frames before revision. The thirty redrawn pixel portraits, title screen, settlement, battle screen, journal, coastal map, narrow layout, and completion screen were rendered and visually inspected. All thirty PNGs are distinct 80×72 images using four inks and binary transparency; the matching SVG files validate as XML. Reproducible screenshots are under `artifacts/revision/`, and the browser report is under `artifacts/browser-report/`. The original portrait contact sheet is included at `public/art/contact-sheet.png`.

To repeat the checks from the project directory:

```powershell
npm run format:check
npm run lint
npm test
npm run build
$env:CROMON_PRODUCTION = '1'
npm run test:e2e
```

The production browser tests use port 4173. Normal development uses port 5173. The tests launch headless Chrome and do not use or change an existing personal browser profile. Screen-reader behavior, other browser engines, and human listening evaluation of the synthesized chimes remain outside this verification run.
