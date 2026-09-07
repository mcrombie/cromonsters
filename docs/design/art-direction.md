# Art direction

The revised identity is a quiet, four-shade handheld naturalist adventure. Woodland textures, adult animal proportions, small facial features, and dense silhouettes give the world a more serious tone. The limited palette and deliberate pixel grid recall early portable games while the creatures, setting, scene composition, typography, and artwork remain original.

## Four inks

| Use                                               | Color     |
| ------------------------------------------------- | --------- |
| Deep ink, silhouettes and text                    | `#202a24` |
| Bark, shadow and middle-dark texture              | `#52634a` |
| Foliage, reflected light and middle-light texture | `#93a078` |
| Pale sky, highlights and interface paper          | `#d5dab5` |

Transparency is the only additional portrait value. Ink separation must survive without hue: the lightest/darkest pair carries text, while body forms use all four shades. Sparse fixed stippling suggests fur, feathers, membranes, scales, and atmospheric distance. Stippling is clipped to authored surfaces; it must not erase an animal's silhouette or identifying marks.

## Creature plates

All thirty portraits were redrawn on a native **80 × 72 pixel grid**. These are new drawings with new anatomy and poses, rather than palette filters over the earlier illustrations. Most vertebrates use a tense side profile or three-quarter pose. Heads occupy a modest portion of the body; eyes are small pixel marks with no large round catchlights or smiling mouths. The invertebrates retain their own anatomy without human expressions.

Choiruff has a long ribcage and muzzle, layered cheek fur, and weight-bearing legs. Palmarch has a narrow adult barrel, long legs, drooping muzzle, and palmate antlers. Weirwhittle has a low adult body, small eye, and crosshatched paddle tail. Pipistitch has a very small furred body between finger-supported wings. Hushruft uses heavy brows, feather barring, and a tall perched silhouette. Scutapult has a long low trunk and broad snout. Rumbison has a high shoulder mane and a lowered head; it is distinct from the long-legged moose.

The six birds have different neck, wing, bill, leg, and tail structures. The two butterflies/moths, cicada, and darner preserve six legs; Zigzib has eight. Pleatacle has eight separately composed arm paths. Bellilt's four internal loops are anatomical inspiration, not eyes. Hingehaven has a domed prosoma and straight telson. Clackadier has unequal claws and four pairs of walking legs. Ochreprise has five thick asymmetric arms with a reticulate spine texture.

Fantasy flourishes are restrained: pale echo stitches in Pipistitch's membranes, Choiruff's layered echo ruff, Weirwhittle's measured twig, Dapploom's mist beads, Zigzib's zigzag web, and the marine visitors' displaced ripples. A profile should read as its source animal before the flourish becomes apparent. Portrait scale is a field-guide convention; it does not claim that a whale is physically the size of a hummingbird.

Most source portraits **face right**. In battle, show the player's lower-left portrait unmirrored and mirror the upper-right opponent so they face one another. Symmetrical wing-spread and dorsal plates tolerate either direction. Dedicated rear and attack poses are a future art milestone; the current sprites are static field plates.

## World and title

The overhead world uses four-direction player frames, walking steps, original pixel tiles, and denser environmental structure. Hardwood canopy, bark, ferns, leaf litter, meadow grasses, marsh reeds, and tidal water distinguish the compact areas. Terrain silhouettes and movement cues matter more than decorative noise. Avoid rounded cards, pastel blocks, and oversized emoji-style faces in the game surface.

The title landscape is a new **320 × 96 pixel** dusk composition: layered hardwood trees frame a wooden station, a narrow path leads from its door, and a winding tidal river catches the remaining light. Near silhouettes have more contrast than distant canopy. All scene elements are composed locally from original polygons and pixel lines.

## Assets and reproducibility

- `public/art/001.svg` through `030.svg`: native 80 × 72 transparent pixel portraits, with descriptive titles and crisp-edged rect runs. The numeric IDs preserve every existing roster association and documentation link.
- `public/art/pixel/001.png` through `030.png`: matching 80 × 72 PNG exports used by the game. Their pixels use the same four inks plus transparency. They are committed assets; playing or building does not require an image renderer.
- `public/art/landscape.svg` and `public/art/pixel/landscape.png`: the native 320 × 96 dusk composition.
- `public/art/contact-sheet.html` and `contact-sheet.png`: a complete roster review. Open `/art/contact-sheet.html` in the development server. `landscape-preview.png` is a larger QA export.
- `src/art/generate.mjs`: the editable source. Each species has a separately labeled drawing function; small drawing primitives rasterize hand-authored coordinates directly onto the pixel grid. Sparse texture uses a fixed hash, so rebuilding never changes a portrait randomly.
- `src/art/render-preview.mjs`: optional shortcut for generating the same assets with local Resvg tooling.

Run `node src/art/generate.mjs` after editing the drawing source. SVG generation works with Node alone. For PNG and contact-sheet regeneration, install the optional renderer first:

```powershell
npm install --prefix src/art/.render-tool --no-save --package-lock=false @resvg/resvg-js
node src/art/generate.mjs
```

Preserve the ID, native dimensions, transparent background, four inks, and silhouette when replacing a portrait. Draw distinct pose assets for rear views, strikes, and recovery rather than stretching a single image. Display raster assets with `image-rendering: pixelated`; prefer integer magnification when space permits.

## Accessibility and review

The player sprite turns immediately even when movement is blocked, making facing and the interaction target visible. Keyboard focus and selection remain text-backed. Names, affinity labels, status text, techniques, and image alternatives carry semantic information independently of color. Battle feedback should be brief and readable, and reduced-motion preferences should suppress movement effects. Audio remains optional and locally synthesized.

Review all thirty plates together for silhouette overlap, clipped appendages, body proportions, species coverage, and consistent pixel density. Inspect them again inside the actual battle and journal layouts at desktop and narrow widths. The current scope uses static original placeholder sprites, with full animation and anatomically distinct rear poses deferred to the roadmap.

No photographs, third-party art, extracted game assets, traced franchise sprites, copied fonts, or proprietary sound recordings are inputs. No additional license is granted by this document.
