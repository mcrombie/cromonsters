import type { SaveData } from '../core/types';
export function shell(save: SaveData, dev: boolean) {
  return `<div class="game-cabinet">
 <header class="masthead"><a class="wordmark" href="./">CROMONSTERS<span>!</span></a><span class="edition">FOLDWATER REACH / FIELD BUILD 02</span><button data-action="controls">Controls</button>${dev ? '<button data-action="developer">Developer</button>' : ''}</header>
 ${dev ? '<div class="dev-banner">DEVELOPER SESSION · NORMAL SAVE PROTECTED</div>' : ''}
 <main id="title-screen" class="title-screen"><div class="title-landscape" aria-hidden="true"></div><div class="title-copy"><span class="eyebrow">AN EXPEDITION INTO FOLDWATER REACH</span><h1>CROMONSTERS<span>!</span></h1><p>The season is turning.<br>Beyond the station, the wild is stirring.</p><button class="primary" data-action="begin">${save.starterChosen ? 'CONTINUE' : 'BEGIN EXPEDITION'}</button><button data-action="controls">HOW TO PLAY</button><span class="title-version">THE FOURFOLD RAMBLE · PROOF OF CONCEPT</span></div></main>
 <main id="play-screen" hidden>
  <div class="field-heading"><h1 id="map-name"></h1><span id="save-status"></span><p id="map-subtitle" class="sr-only"></p></div>
  <section class="world-column" aria-label="Exploration">
   <div class="map-frame"><div id="game-canvas" tabindex="0" aria-label="Exploration map. Arrow keys or WASD to walk. Face a person or landmark and press Enter to interact."></div><span class="map-corner">N ↑</span></div>
   <div id="field-message" class="field-message" role="status" aria-live="polite">Use the marked paths. Explore the grass to encounter Cromon.</div>
  </section>
  <aside class="field-sidebar" hidden><div id="trial-list"></div><div id="party-preview"></div><div id="landmarks"></div><div id="supply-preview"></div></aside>
 </main>
 <nav class="field-toolbar" aria-label="Game controls">
  <div class="direction-pad" aria-label="Movement controls"><button data-action="up" aria-label="Move north">↑</button><button data-action="left" aria-label="Move west">←</button><button data-action="down" aria-label="Move south">↓</button><button data-action="right" aria-label="Move east">→</button></div>
  <button data-action="interact" id="interact-button" class="action-a" aria-label="Confirm or interact">A <small>CONFIRM</small></button><button data-action="cancel" class="action-b">B <small>BACK</small></button>
  <button data-action="menu" class="start-button">START <small>MENU</small></button>
  <button data-action="mute" id="mute-button" class="mute-button">Sound on</button>
 </nav>
 <footer><span>ARROWS / WASD · MOVE</span><span>ENTER / Z · A &nbsp; ESC / X · B</span><span>AUTOSAVE</span></footer>
 <dialog id="panel" aria-label="Field menu"><div id="panel-content"></div><div class="dialog-utility"><button id="panel-mute" data-action="mute">Sound on · M</button><button id="panel-close" data-action="close" aria-label="Close panel">BACK [B]</button></div></dialog>
 </div>`;
}
