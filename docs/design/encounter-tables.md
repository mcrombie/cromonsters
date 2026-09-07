# Encounter tables

`src/data/world.ts` is the source of truth. Every wilderness table totals **100 weight units**, so its weights are also percentages conditional on starting an encounter in that map. Levels are chosen uniformly across the listed inclusive range. Species-level journal rarity is descriptive; the area's table determines the actual probability.

Walking on a `g` grass tile can trigger a wild encounter when the cumulative step count is divisible by four, with a 65% check at that step. Gravel, flower, and ordinary ground tiles do not make this random check. **START → Area Map → Search Nearby Habitat** starts an encounter immediately using the same area's weighted table, including on its safe paths. There is no time-of-day, season simulation, or water-traversal requirement.

## Russetwalk · hardwood forest

| ID  | Cromon     | Source animal      | Weight / chance | Level |
| --- | ---------- | ------------------ | --------------- | ----- |
| 004 | Hingeamble | Eastern box turtle | 24%             | 2–4   |
| 005 | Pipistitch | Little brown bat   | 20%             | 2–4   |
| 008 | Dapploom   | Spotted salamander | 22%             | 2–4   |
| 006 | Hushruft   | Great horned owl   | 10%             | 2–4   |
| 007 | Knurlattle | Timber rattlesnake | 8%              | 2–4   |
| 012 | Veilmorrow | Luna moth          | 12%             | 2–4   |
| 001 | Choiruff   | Gray wolf          | 4%              | 3–5   |

The fallen-branch observation independently records Dapploom without requiring an encounter roll. Choiruff is the rare trail encounter.

## Bellwether Field · meadow

| ID  | Cromon      | Source animal                  | Weight / chance | Level |
| --- | ----------- | ------------------------------ | --------------- | ----- |
| 011 | Pennamber   | Monarch butterfly              | 24%             | 2–4   |
| 013 | Septendrum  | Seventeen-year cicada          | 19%             | 2–4   |
| 014 | Aeroveer    | Common green darner            | 22%             | 2–4   |
| 015 | Zigzib      | Black-and-yellow garden spider | 17%             | 2–4   |
| 021 | Thrumble    | Ruby-throated hummingbird      | 12%             | 2–4   |
| 020 | Kettleswoop | Broad-winged hawk              | 6%              | 3–5   |

The listening-vane observation records Pennamber. Kit's scripted opponent is **Choiruff, level 3** and is separate from this wild table. Septendrum's availability is a fantasy field-study abstraction, not a claim that real seventeen-year cicadas emerge every autumn.

## Sluicefen · wetland

| ID  | Cromon      | Source animal         | Weight / chance | Level |
| --- | ----------- | --------------------- | --------------- | ----- |
| 003 | Weirwhittle | North American beaver | 24%             | 2–4   |
| 017 | Bellowgout  | American bullfrog     | 25%             | 2–4   |
| 019 | Tremoloon   | Common loon           | 18%             | 2–4   |
| 022 | Stiltscribe | Great blue heron      | 18%             | 2–4   |
| 002 | Palmarch    | Moose                 | 7%              | 3–5   |
| 008 | Dapploom    | Spotted salamander    | 8%              | 2–4   |

The spillway observation records Stiltscribe. Dapploom also appears in Russetwalk; repeated availability does not create another roster species.

## Farcurrent Strand · tidal inlet

| ID  | Cromon      | Source animal           | Weight / chance | Level |
| --- | ----------- | ----------------------- | --------------- | ----- |
| 010 | Bellilt     | Moon jelly              | 22%             | 2–4   |
| 027 | Hingehaven  | Atlantic horseshoe crab | 24%             | 2–4   |
| 028 | Clackadier  | American lobster        | 20%             | 2–4   |
| 029 | Curlcourier | Lined seahorse          | 14%             | 2–4   |
| 024 | Choruswake  | Humpback whale          | 4%              | 3–5   |
| 009 | Pleatacle   | Giant Pacific octopus   | 6%              | 2–4   |
| 026 | Kitespan    | Manta ray               | 4%              | 2–4   |
| 030 | Ochreprise  | Ochre sea star          | 6%              | 2–4   |

The tide-lens observation records Hingehaven. The **Foldwater seam** explains the Pacific octopus, Pacific sea star, unusual ray visitors, and practical contact with enormous marine companions. Encounters are shoreline meetings represented in a compact battle panel, not a literal claim that all of these animals live in one shallow pool. Actual ranges remain explicit in each journal entry.

## Sanctuary and showcase

| ID  | Cromon     | Source animal      | Availability in this slice                       |
| --- | ---------- | ------------------ | ------------------------------------------------ |
| 016 | Dewlapp    | Green anole        | Journal reference plate; developer mirror battle |
| 018 | Scutapult  | American alligator | Journal reference plate; developer mirror battle |
| 023 | Rumbison   | American bison     | Journal reference plate; developer mirror battle |
| 025 | Needlegape | Alligator gar      | Journal reference plate; developer mirror battle |

Their sanctuary status is documented fiction, not an additional explorable map. Open `?dev=1` to use **Developer → Specimen workbench**. All thirty species, including the four above, can be selected at levels 1–50 and used on both sides of a real test battle. Showcase battles cannot recruit companions or advance the normal field assignment.

The union of ordinary encounter tables contains **26 unique species**; the four listed showcase-only species bring the roster to exactly 30. `tests/world.test.ts` validates encounter references, positive weights, level ranges, and at least fifteen exploration species. `tests/roster.test.ts` independently validates the complete required source-animal roster, IDs, names, stats, moves, documentation, and portraits.
