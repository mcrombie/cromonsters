# Cromon roster

The initial roster has **exactly 30 species**, one original Cromon for each requested source animal. These are design counterparts, not biological species renamed for a field guide. Each dossier separates observed biology from invented powers and links its biological references.

All thirty are viewable in the **Margin Notes** from the beginning, with encounter and companionship state tracked separately. The developer showcase can load any of the thirty as a test opponent and adjust its level. **26 species** occur in the four wilderness encounter tables; Dewlapp, Scutapult, Rumbison, and Needlegape are showcase sanctuary visitors in this slice.

| No. | Cromon                            | Source animal                  | Approach | Game habitat                                                      | Gameplay role                     |
| --- | --------------------------------- | ------------------------------ | -------- | ----------------------------------------------------------------- | --------------------------------- |
| 001 | [Choiruff](001-choiruff.md)       | Gray wolf                      | Signal   | Russetwalk, deep leaf trail                                       | Pack caller and accurate finisher |
| 002 | [Palmarch](002-palmarch.md)       | Moose                          | Skitter  | Sluicefen, willow margins                                         | Long-stride disruptor             |
| 003 | [Weirwhittle](003-weirwhittle.md) | North American beaver          | Anchor   | Sluicefen streams; Latchleaf starter station                      | Construction defender; starter    |
| 004 | [Hingeamble](004-hingeamble.md)   | Eastern box turtle             | Anchor   | Russetwalk, damp leaf litter                                      | Patient defensive closer          |
| 005 | [Pipistitch](005-pipistitch.md)   | Little brown bat               | Signal   | Russetwalk stream canopy; Latchleaf starter station               | Perception and focus; starter     |
| 006 | [Hushruft](006-hushruft.md)       | Great horned owl               | Signal   | Russetwalk, hollow-tree overlook                                  | Quiet tempo controller            |
| 007 | [Knurlattle](007-knurlattle.md)   | Timber rattlesnake             | Anchor   | Russetwalk sun patches; Bellwether Field rocky edge               | Warning-based control striker     |
| 008 | [Dapploom](008-dapploom.md)       | Spotted salamander             | Anchor   | Russetwalk rotting logs; Sluicefen shaded pools                   | Moisture recovery duelist         |
| 009 | [Pleatacle](009-pleatacle.md)     | Giant Pacific octopus          | Skitter  | Farcurrent Strand research pools; Foldwater visitor               | Flexible feint specialist         |
| 010 | [Bellilt](010-bellilt.md)         | Moon jelly                     | Signal   | Farcurrent Strand sheltered inlet                                 | Gentle pulse controller           |
| 011 | [Pennamber](011-pennamber.md)     | Monarch butterfly              | Skitter  | Bellwether Field, goldenrod and asters                            | Sustained travel skirmisher       |
| 012 | [Veilmorrow](012-veilmorrow.md)   | Luna moth                      | Signal   | Russetwalk canopy; Bellwether Field woodland edge                 | Protective decoy caller           |
| 013 | [Septendrum](013-septendrum.md)   | Seventeen-year cicada          | Signal   | Bellwether Field brood patch; Foldwater early emergence           | Low-tempo sonic breaker           |
| 014 | [Aeroveer](014-aeroveer.md)       | Common green darner            | Skitter  | Bellwether Field air lanes; Sluicefen pond edge                   | Priority pursuit specialist       |
| 015 | [Zigzib](015-zigzib.md)           | Black-and-yellow garden spider | Anchor   | Bellwether Field, aster stems                                     | Web geometry controller           |
| 016 | [Dewlapp](016-dewlapp.md)         | Green anole                    | Signal   | Farcurrent Strand warm conservatory; Foldwater visitor            | Display-based focus duelist       |
| 017 | [Bellowgout](017-bellowgout.md)   | American bullfrog              | Signal   | Sluicefen open pond                                               | Resonant burst attacker           |
| 018 | [Scutapult](018-scutapult.md)     | American alligator             | Skitter  | Farcurrent Strand warm sanctuary channel; Foldwater visitor       | Ambush priority bruiser           |
| 019 | [Tremoloon](019-tremoloon.md)     | Common loon                    | Signal   | Sluicefen deep channel; Farcurrent Strand passage                 | Call-and-dive defender            |
| 020 | [Kettleswoop](020-kettleswoop.md) | Broad-winged hawk              | Anchor   | Bellwether Field ridge thermals                                   | Thermal-position defender         |
| 021 | [Thrumble](021-thrumble.md)       | Ruby-throated hummingbird      | Skitter  | Bellwether Field flowers; Latchleaf starter station               | Hovering precision; starter       |
| 022 | [Stiltscribe](022-stiltscribe.md) | Great blue heron               | Anchor   | Sluicefen shallows; Farcurrent Strand mud edge                    | Patient precision breaker         |
| 023 | [Rumbison](023-rumbison.md)       | American bison                 | Skitter  | Farcurrent Strand meadow sanctuary; Foldwater visitor             | Momentum burst specialist         |
| 024 | [Choruswake](024-choruswake.md)   | Humpback whale                 | Signal   | Farcurrent Strand offshore Foldwater window                       | Resonant recovery support         |
| 025 | [Needlegape](025-needlegape.md)   | Alligator gar                  | Anchor   | Farcurrent Strand freshwater sanctuary channel; Foldwater visitor | Armored high-force ambusher       |
| 026 | [Kitespan](026-kitespan.md)       | Manta ray                      | Anchor   | Farcurrent Strand warm Foldwater window                           | Current-shelter defender          |
| 027 | [Hingehaven](027-hingehaven.md)   | Atlantic horseshoe crab        | Anchor   | Farcurrent Strand sandy shallows                                  | Safe-stance recovery defender     |
| 028 | [Clackadier](028-clackadier.md)   | American lobster               | Anchor   | Farcurrent Strand rocky pools                                     | Asymmetric claw bruiser           |
| 029 | [Curlcourier](029-curlcourier.md) | Lined seahorse                 | Skitter  | Farcurrent Strand eelgrass beds                                   | Stationary precision opportunist  |
| 030 | [Ochreprise](030-ochreprise.md)   | Ochre sea star                 | Anchor   | Farcurrent Strand cold research pool; Foldwater visitor           | Adhesive recovery specialist      |

## Coverage validation

`tests/roster.test.ts` contains an independent literal list of all thirty required animal names, so removing an animal or duplicating one fails the test even if the roster’s total remains thirty.

- [x] Exactly thirty records and identifiers 001 through 030.
- [x] Exactly one occurrence of every required source animal.
- [x] Unique identifiers and case-insensitive names.
- [x] Positive, finite, integer base stats.
- [x] Existing move references, two immediate techniques, and future progression.
- [x] A unique registered signature for each species.
- [x] Thirty individual dossiers, each with all nineteen required sections.
- [x] Thirty original SVG portrait files.

Run `npm test -- tests/roster.test.ts` from the project root. Encounter validation and playable-species coverage are also checked in `tests/world.test.ts`; battle tests exercise the full roster separately.

## Reading the classification

**Anchor → Skitter → Signal → Anchor** is a small tactical cycle. Anchor uses a stable position, Skitter exploits timing and movement, and Signal reads or alters a pattern. This is not a diet, habitat, or elemental classification: a hawk can be Anchor and a bison can be Skitter.

The source called “Manta ray” is represented specifically by the giant manta ray, _Mobula birostris_. The moon jelly entry acknowledges the _Aurelia_ species complex rather than assigning every similar jelly one universal range. The eastern box turtle entry refers to _Terrapene carolina carolina_. The cicada entry uses _Magicicada septendecim_, one of the seventeen-year periodical cicadas.

## Geography and season

The Foldwater seam is a fictional meeting of distant habitats at Farcurrent Strand. Pacific octopuses and ochre sea stars remain Pacific animals in their real-world documentation. Southern reptiles and the bison have explicit sanctuary visitor status. Marine companions remain in suitable water and bring a small Foldwater presence to land practice; neither a ribbon nor a backpack physically contains a whale.

The setting’s early-autumn palette does not imply every source species normally appears there in that season. Septendrum’s emergence is a stated Foldwater disturbance. Tremoloon’s placeholder retains conspicuous breeding markings for recognition; its dossier explains the real seasonal plumage change.

The dossiers paraphrase a small amount of ecological background from university, aquarium, and NOAA species accounts; all names, powers, dialogue, battle roles, and design reasoning are original. The luna moth dossier also cites the published acoustic-deflection study informing its tail-based guard.
