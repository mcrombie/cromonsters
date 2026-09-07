/**
 * Optional pixel art QA. Install once:
 * npm install --prefix src/art/.render-tool --no-save --package-lock=false @resvg/resvg-js
 *
 * Regenerate the committed SVG/PNG portraits and both visual contact sheets from
 * the same editable source, preventing the QA preview from drifting from the game.
 */
await import('./.render-tool/node_modules/@resvg/resvg-js/index.js');
await import('./generate.mjs');
