# Roadmap

The slice contains a complete assignment, one settlement, four habitats, thirty original Cromon, battles and voluntary invitations, and local saves. The owner's first playtest requested more serious graphics and a closer original-handheld gameplay rhythm. The current revision establishes that baseline while retaining the roster, ecological setting, and original terminology.

Delivered in this revision: a four-shade 320×240 scrolling field with 16-pixel tiles; four-direction, three-frame walking; A/B/START controls; focused menus in place of the dashboard; original pixel portraits; Fight/Pack/Company/Run; one-message-at-a-time results with vitality snapshots; six company slots; four learned techniques and persistent use counts; weakening/status-based invitations; tempo-based retreat; participant experience; and compatible first-build saves.

The next three milestones deepen the existing slice before adding substantial geography.

## 1. Deepen battle decisions and creature animation

Add manual selection after an active companion is exhausted, small human opponent teams, and a clear technique-replacement prompt when future progression exceeds four learned techniques. Give every species a few original action or idle poses and add species-specific AI preferences that make the documented role visible. Keep feedback brief and preserve the confirm-to-advance rhythm.

Tune damage, guard/recovery, use allowances, invitations, and tempo from complete playthroughs with all three starters. The new familiar mechanics provide a baseline for the owner to identify which rules should diverge later. Maintain the original three-approach cycle unless a separate design decision changes it.

**Acceptance:** every species remains identifiable in front and rear views; techniques and vitality changes have clear feedback; ordinary early attack exchanges generally last four to six rounds; each starter can finish the assignment without excessive rest loops; reduced-motion and mute settings cover new effects; human team and forced-switch cases have meaningful rule and browser tests.

## 2. Add companion-assisted exploration

Build on the saved branch, vane, spillway, and tide-lens observations with one useful companion-assisted action per area. Add small optional traversal choices, habitat-specific encounter presentation, and observations that reflect construction, perception, or positioning. Offer the four sanctuary-only species a compact visiting-naturalist sequence while stating their real ranges honestly.

Preserve direct walking and optional Area Map assistance. Keep one town and four compact areas until the added interactions justify expanding geography. Interiors should serve an existing character or recovery function rather than add empty rooms.

**Acceptance:** each habitat gains a useful discovery or optional shortcut; collision changes survive reload and have tested transitions; return paths stay safe; the original assignment remains compact and completable with any starter; all thirty species have an ordinary or explicitly staged encounter route.

## 3. Harden saves, accessibility, and local release packaging

Move growing controller workflows into feature modules. Add save export/import, explicit supported-version migrations, and clear local startup packaging. Decide whether mid-battle resume belongs in a later schema. Extend completion, keyboard, directional movement, showcase, reserve, supply, and recovery checks with storage failures, longer sessions, and developer-reset isolation.

Audit screen-reader announcements, focus after each battle message, large reserve navigation, small-window scaling, held-key release, and reduced-motion behavior. Keep the interface readable within its restrained palette.

**Acceptance:** a documented fresh-install-to-ending browser check passes; first-build and later supported saves preserve progress and technique counts through upgrades; export/import round-trips correctly; developer sessions cannot overwrite normal progress; the installed release makes no runtime external network requests.

## Later possibilities

After these milestones, consider another compact assignment, additional human opponents, richer ecological observations, carefully scoped transformations, and further habitats. A full campaign, large open world, league structure, multiplayer, breeding, crafting, and extensive evolution trees remain outside the current commitment. New mechanics should improve the existing play loop before enlarging the assignment.

## Current deliberate limits

There are five fixed compact maps without interiors or swimming. Observations grant discoveries, rewards, and persistent visual changes without changing collision. Four species remain journal/showcase residents. Battles have one opponent, automatic replacement after company exhaustion, shared AI, three approaches, and three temporary effects. Creature art remains original replaceable pixel placeholders, with limited animation. The game interprets handheld play in a modern browser; it does not emulate original hardware. Audio is synthesized chimes without a soundtrack.

Saves remain local to one browser origin and omit active battles. No backend, online account, cloud save, service worker, or licensed third-party game assets are required. Executed checks and remaining verification gaps are recorded in [verification.md](verification.md).
