import Phaser from 'phaser';
import type { MapId, MapObject, WorldMap } from '../core/types';

export const TILE = 16;
export const FIELD_COLORS = [0x202a24, 0x52634a, 0x93a078, 0xd5dab5] as const;
export type Facing = 'north' | 'east' | 'south' | 'west';
type Ink = 0 | 1 | 2 | 3;
type Graphics = Phaser.GameObjects.Graphics;
const rect = (g: Graphics, ink: Ink, x: number, y: number, w = 1, h = 1) =>
  g.fillStyle(FIELD_COLORS[ink]).fillRect(x, y, w, h);

/** Integer-only drawing keeps every mark on the native pixel grid. */
export function drawTerrain(g: Graphics, map: WorldMap) {
  for (let y = 0; y < map.tiles.length; y++) {
    for (let x = 0; x < map.tiles[y].length; x++) {
      const X = x * TILE,
        Y = y * TILE,
        tile = map.tiles[y][x];
      const salt = (x * 19 + y * 31) % 13;
      const sand = map.id === 'inlet';
      rect(g, sand || map.id === 'meadow' ? 3 : 2, X, Y, TILE, TILE);
      if (tile === '#') rect(g, 0, X, Y, TILE, TILE);
      else if (tile === '~') {
        rect(g, 1, X, Y, TILE, TILE);
        rect(g, 2, X + 2 + (salt % 3), Y + 3, 7, 1);
        rect(g, 3, X + 4 + (salt % 3), Y + 2, 3, 1);
        rect(g, 0, X + 9, Y + 11, 5, 1);
        rect(g, 2, X + 8, Y + 10, 5, 1);
        if (map.id === 'wetland' && salt < 4) {
          rect(g, 0, X + 3, Y + 8, 1, 7);
          rect(g, 2, X + 2, Y + 7, 1, 4);
          rect(g, 0, X + 6, Y + 10, 1, 5);
          rect(g, 3, X + 4, Y + 14, 4, 1);
        }
      } else if (tile === '=') {
        rect(g, 3, X, Y, TILE, TILE);
        const waterEdge = [
          map.tiles[y - 1]?.[x],
          map.tiles[y + 1]?.[x],
          map.tiles[y]?.[x - 1],
          map.tiles[y]?.[x + 1],
        ].includes('~');
        if (waterEdge && (map.id === 'wetland' || map.id === 'inlet')) {
          rect(g, 0, X, Y, TILE, TILE);
          for (let n = 0; n < 4; n++) {
            rect(g, 2, X + 1, Y + n * 4, 14, 3);
            rect(g, 3, X + 2, Y + n * 4, 12, 1);
            rect(g, 1, X + 3 + (n % 2) * 8, Y + n * 4 + 1, 1, 1);
          }
        } else {
          rect(g, 2, X + 2 + (salt % 5), Y + 5, 2, 1);
          rect(g, 2, X + 11, Y + 10 + (salt % 3), 2, 1);
          if (map.tiles[y - 1]?.[x] !== '=') {
            rect(g, 2, X, Y, TILE, 1);
            rect(g, 1, X + salt, Y, 2, 1);
          }
          if (map.tiles[y + 1]?.[x] !== '=') {
            rect(g, 2, X, Y + 15, TILE, 1);
            rect(g, 1, X + 11 - (salt % 7), Y + 15, 3, 1);
          }
          if (map.tiles[y]?.[x - 1] !== '=') rect(g, 2, X, Y, 1, TILE);
          if (map.tiles[y]?.[x + 1] !== '=') rect(g, 2, X + 15, Y, 1, TILE);
        }
      } else {
        rect(g, sand ? 2 : 1, X + 3 + (salt % 4), Y + 4, 1, 1);
        rect(g, 3, X + 11, Y + 12, 2, 1);
        if (tile === 'g') {
          if (sand) {
            rect(g, 2, X + 1, Y + 9, 6, 1);
            rect(g, 1, X + 3, Y + 8, 3, 1);
            rect(g, 2, X + 9, Y + 3, 5, 1);
            rect(g, 1, X + 11, Y + 12, 2, 2);
          } else
            for (const [a, b] of [
              [3, 8],
              [11, 13],
            ]) {
              rect(g, 1, X + a, Y + b - 3, 1, 4);
              rect(g, 1, X + a - 2, Y + b - 2, 1, 2);
              rect(g, 1, X + a + 2, Y + b - 3, 1, 2);
              rect(g, 1, X + a - 1, Y + b, 3, 1);
              rect(g, 3, X + a + 1, Y + b - 2, 1, 2);
            }
        }
        if (tile === 'f') drawUnderstory(g, X, Y, map.id, salt);
      }
    }
  }
}

function drawUnderstory(g: Graphics, x: number, y: number, map: MapId, salt: number) {
  if (map === 'forest' || map === 'wetland') {
    rect(g, 1, x + 5, y + 4, 1, 10);
    for (let n = 0; n < 4; n++) {
      const width = n < 2 ? n + 1 : 3;
      rect(g, 1, x + 5 - width, y + 5 + n * 2, width, 1);
      rect(g, 1, x + 6, y + 4 + n * 2, width, 1);
    }
    rect(g, 3, x + 12, y + 12, 1, 3);
    rect(g, 0, x + 10, y + 11, 5, 1);
    rect(g, 3, x + 11, y + 10, 3, 1);
  } else if (map === 'meadow') {
    rect(g, 1, x + 5, y + 5, 1, 10);
    rect(g, 2, x + 3, y + 4, 5, 2);
    rect(g, 1, x + 4, y + 2, 3, 1);
    rect(g, 1, x + 10, y + 9, 1, 6);
    rect(g, 2, x + 8, y + 7, 5, 2);
    rect(g, 1, x + 9, y + 6, 3, 1);
    rect(g, 2, x + 3, y + 11, 2, 1);
  } else if (map === 'inlet') {
    rect(g, 1, x + 2, y + 10, 10, 1);
    rect(g, 2, x + 4, y + 9, 7, 1);
    rect(g, 1, x + 8, y + 7, 2, 2);
    rect(g, 2, x + 4 + (salt % 4), y + 3, 3, 1);
  } else {
    rect(g, 1, x + 7, y + 8, 1, 5);
    rect(g, 3, x + 5, y + 5, 5, 3);
    rect(g, 1, x + 7, y + 6, 1, 1);
    rect(g, 1, x + 4, y + 10, 3, 1);
  }
}

export function drawTree(g: Graphics, x: number, y: number, variation: number) {
  rect(g, 1, x + 3, y + 13, 12, 3);
  rect(g, 0, x + 7, y + 5, 4, 11);
  rect(g, 2, x + 8, y + 7, 1, 8);
  rect(g, 0, x + 5, y + 14, 8, 1);
  rect(g, 0, x + 4, y - 5, 10, 3);
  rect(g, 0, x + 1, y - 2, 15, 10);
  rect(g, 0, x - 1, y + 1, 18, 5);
  rect(g, 0, x + 3, y + 8, 12, 3);
  rect(g, 1, x + 5, y - 4, 8, 14);
  rect(g, 1, x + 2, y - 1, 13, 8);
  rect(g, 1, x, y + 2, 15, 3);
  const clusters = [
    [5, -3, 4],
    [3, -1, 5],
    [1, 2, 4],
    [7, 1, 4],
    [10, -1, 3],
    [6, 5, 4],
    [11, 5, 3],
  ];
  for (const [a, b, w] of clusters) {
    rect(g, 2, x + a, y + b, w, 2);
    rect(g, variation % 3 === 0 ? 3 : 2, x + a + 1, y + b - 1, w - 2, 1);
  }
  for (let n = 0; n < 6; n++) {
    const a = 2 + ((variation * 3 + n * 5) % 12),
      b = ((variation + n * 3) % 9) - 1;
    rect(g, n % 3 === 0 ? 0 : 3, x + a, y + b, 1, 1);
  }
}

export function drawCabin(g: Graphics, x: number, y: number, variant: number) {
  const width = 80;
  rect(g, 0, x + 1, y + 17, width - 2, 31);
  rect(g, 2, x + 3, y + 19, width - 6, 27);
  for (let line = 0; line < 7; line++) {
    rect(g, 1, x + 3, y + 20 + line * 4, width - 6, 1);
    rect(g, 3, x + 4, y + 21 + line * 4, width - 8, 1);
    rect(g, 1, x + 10 + (line % 3) * 19, y + 22 + line * 4, 1, 2);
  }
  for (let row = 0; row < 7; row++) {
    const inset = Math.max(0, 6 - row);
    rect(g, 0, x + inset, y + row * 3, width - inset * 2, 3);
    rect(g, 1, x + inset + 2, y + row * 3 + 1, width - inset * 2 - 4, 1);
    for (let col = 0; col < 8; col++) {
      const offset = col * 10 + (row % 2) * 4 + 2;
      if (offset > inset && offset < width - inset - 2) rect(g, 2, x + offset, y + row * 3, 5, 1);
    }
  }
  rect(g, 0, x + 58, y, 7, 10);
  rect(g, 2, x + 59, y + 1, 5, 9);
  rect(g, 1, x + 59, y + 4, 5, 1);
  rect(g, 0, x, y + 20, width, 2);
  for (const at of [13, 57]) {
    rect(g, 0, x + at, y + 28, 11, 11);
    rect(g, 3, x + at + 1, y + 29, 9, 8);
    rect(g, 1, x + at + 5, y + 29, 1, 9);
    rect(g, 1, x + at + 1, y + 33, 9, 1);
    rect(g, 0, x + at - 1, y + 39, 13, 1);
  }
  rect(g, 0, x + 34, y + 27, 13, 21);
  rect(g, 1, x + 35, y + 28, 11, 18);
  rect(g, 2, x + 37, y + 29, 7, 15);
  rect(g, 1, x + 40, y + 29, 1, 15);
  rect(g, 0, x + 43, y + 37, 1, 2);
  rect(g, 3, x + 33, y + 46, 15, 1);
  rect(g, 0, x + 26, y + 23, 4, 5);
  rect(g, 3, x + 27, y + 24, 2, 3);
  if (variant === 1) rect(g, 1, x + 27, y + 25, 2, 1);
  if (variant === 2) rect(g, 1, x + 28, y + 24, 1, 2);
}

function icon(g: Graphics, rows: string[], x: number, y: number, ink: Ink) {
  rows.forEach((row, line) =>
    [...row].forEach((pixel, column) => {
      if (pixel === '#') rect(g, ink, x + column, y + line);
    }),
  );
}

export function drawObject(g: Graphics, o: MapObject) {
  if (o.kind === 'guide' || o.kind === 'peer') return;
  const x = o.x * TILE,
    y = o.y * TILE;
  rect(g, 1, x + 4, y + 14, 10, 1);
  rect(g, 0, x + 7, y + 5, 2, 10);
  rect(g, 2, x + 8, y + 6, 1, 8);
  rect(g, 0, x + 2, y, 13, 8);
  rect(g, 3, x + 3, y + 1, 11, 6);
  if (o.kind === 'transition') {
    const north = o.target === 'meadow',
      west = o.target === 'forest',
      east = o.target === 'wetland';
    icon(
      g,
      north
        ? ['..#..', '.###.', '#.#.#', '..#..', '..#..']
        : west
          ? ['..#..', '.#...', '#####', '.#...', '..#..']
          : east
            ? ['..#..', '...#.', '#####', '...#.', '..#..']
            : ['..#..', '..#..', '#.#.#', '.###.', '..#..'],
      x + 6,
      y + 1,
      0,
    );
  } else {
    const patterns = {
      heal: ['..#..', '..#..', '#####', '..#..', '..#..'],
      shop: ['.###.', '#....', '.###.', '....#', '.###.'],
      discovery: ['..#..', '..#..', '..#..', '.....', '..#..'],
      note: ['..#..', '.....', '..#..', '..#..', '..#..'],
    };
    icon(g, patterns[o.kind], x + 6, y + 1, 0);
  }
}

export function drawDiscovery(g: Graphics, o: MapObject, map: MapId, complete: boolean) {
  const x = (o.x + 2) * TILE,
    y = o.y * TILE;
  if (map === 'forest') {
    rect(g, 0, x, y + 8, 26, 7);
    rect(g, 1, x + 1, y + 9, 24, 5);
    rect(g, 2, x + 3, y + 9, 20, 1);
    rect(g, 3, x + 1, y + 10, 3, 3);
    rect(g, 0, x + 9, y + (complete ? 1 : 7), 17, 3);
    rect(g, 2, x + 10, y + (complete ? 1 : 7), 14, 1);
    if (complete) rect(g, 1, x + 12, y + 3, 2, 9);
  } else if (map === 'meadow') {
    rect(g, 0, x + 10, y - 7, 2, 23);
    rect(g, 2, x + 11, y - 6, 1, 21);
    rect(g, 0, x + 3, y - 6, 18, 2);
    icon(
      g,
      ['...#', '..##', '.###', '####', '.###', '..##', '...#'],
      x + (complete ? 1 : 17),
      y - 9,
      1,
    );
    rect(g, 0, x + 8, y + 5, 6, 5);
    rect(g, 3, x + 9, y + 6, 4, 3);
  } else if (map === 'wetland') {
    rect(g, 1, x - 1, y - 2, 29, 19);
    for (let row = 0; row < 4; row++) rect(g, 2, x + 1, y + row * 5, 26, 1);
    rect(g, 0, x + 2, y - 4, 3, 23);
    rect(g, 0, x + 23, y - 4, 3, 23);
    rect(g, 2, x + 3, y - 4, 1, 22);
    rect(g, 2, x + 24, y - 4, 1, 22);
    rect(g, 0, x + 4, y + (complete ? -3 : 7), 20, 5);
    rect(g, 3, x + 5, y + (complete ? -2 : 8), 18, 1);
    icon(
      g,
      ['..###..', '.#.#.#.', '#..#..#', '#######', '#..#..#', '.#.#.#.', '..###..'],
      x + 10,
      y - 10,
      0,
    );
  } else {
    rect(g, 1, x, y + 7, 27, 9);
    rect(g, 2, x + 3, y + 6, 22, 1);
    rect(g, 3, x + 5, y + 11, 9, 1);
    const lensY = y + (complete ? 4 : -5);
    icon(
      g,
      [
        '..######..',
        '.#......#.',
        '#..#..#..#',
        '#...##...#',
        '#...##...#',
        '#..#..#..#',
        '.#......#.',
        '..######..',
      ],
      x + 8,
      lensY,
      0,
    );
    rect(g, 0, x + 18, lensY + 7, 2, 4);
    rect(g, 0, x + 20, lensY + 10, 2, 3);
  }
}

/** Original 16×24 fieldworker: small head, long coat, boots, and a strapped pack. */
export function makeWalkerTextures(scene: Phaser.Scene) {
  for (const costume of ['walker', 'guide', 'peer']) {
    for (const facing of ['north', 'east', 'south', 'west'] as const) {
      for (let frame = 0; frame < 3; frame++) {
        const key = `${costume}-${facing}-${frame}`;
        if (scene.textures.exists(key)) continue;
        const g = scene.make.graphics({ x: 0, y: 0 });
        const stride = frame === 1 ? -1 : frame === 2 ? 1 : 0;
        const coat: Ink = costume === 'guide' ? 3 : costume === 'peer' ? 2 : 1;
        const trim: Ink = costume === 'guide' ? 1 : 2;
        rect(g, 1, 4, 22, 9, 1);
        if (facing === 'north' || facing === 'south') {
          // A shaped hairline, chin, and neck avoid a square helmet silhouette.
          rect(g, 0, 6, 1, 4, 1);
          rect(g, 0, 5, 2, 6, 4);
          rect(g, 0, 6, 6, 4, 2);
          rect(g, 1, 6, 2, 4, 3);
          rect(g, 2, 6, 2, 2, 1);
          rect(g, 3, 7, 8, 2, 1);
          if (facing === 'south') {
            rect(g, 3, 6, 4, 4, 3);
            rect(g, 0, 6, 5, 1, 1);
            rect(g, 0, 9, 5, 1, 1);
            rect(g, 2, 8, 6, 1, 1);
            rect(g, 3, 7, 7, 2, 1);
          } else rect(g, 1, 6, 4, 4, 3);
          // Tapered shoulders and hem, with sleeves hanging outside the coat.
          rect(g, 0, 5, 9, 6, 10);
          rect(g, 0, 4, 10, 8, 7);
          rect(g, coat, 5, 10, 6, 7);
          rect(g, coat, 6, 17, 4, 1);
          rect(g, trim, 5, 11, 1, 4);
          rect(g, 0, 3, 11 + stride, 2, 6);
          rect(g, 0, 11, 11 - stride, 2, 6);
          rect(g, coat, 3, 12 + stride, 1, 3);
          rect(g, coat, 12, 12 - stride, 1, 3);
          rect(g, 3, 3, 16 + stride, 1, 1);
          rect(g, 3, 12, 16 - stride, 1, 1);
          if (facing === 'north') {
            rect(g, 3, 5, 10, 1, 3);
            rect(g, 3, 10, 10, 1, 3);
            rect(g, 0, 7, 10, 3, 1);
            rect(g, 0, 6, 11, 5, 6);
            rect(g, 2, 7, 12, 3, 4);
            rect(g, 3, 7, 12, 3, 1);
            rect(g, 0, 8, 14, 1, 1);
          } else {
            rect(g, 3, 7, 10, 2, 2);
            rect(g, 0, 8, 12, 1, 6);
            rect(g, 0, 5, 16, 6, 1);
            // A diagonal satchel strap is distinct from the rear backpack.
            for (let n = 0; n < 5; n++) rect(g, 3, 5 + n, 10 + n, 1, 1);
            rect(g, 0, 9, 14, 3, 4);
            rect(g, 2, 10, 15, 1, 2);
            rect(g, 3, 10, 15, 1, 1);
          }
          rect(g, 0, 5, 19, 2, 3 + stride);
          rect(g, 0, 9, 19, 2, 3 - stride);
          rect(g, 1, 5, 19, 1, 2 + stride);
          rect(g, 1, 9, 19, 1, 2 - stride);
          rect(g, 0, 4, 21 + stride, 3, 1);
          rect(g, 0, 9, 21 - stride, 3, 1);
        } else {
          // East-facing geometry is mirrored by the image object for west.
          rect(g, 0, 7, 1, 3, 1);
          rect(g, 0, 6, 2, 5, 4);
          rect(g, 0, 7, 6, 4, 2);
          rect(g, 1, 7, 2, 3, 3);
          rect(g, 2, 7, 2, 2, 1);
          rect(g, 3, 8, 4, 3, 3);
          rect(g, 0, 10, 5, 1, 1);
          rect(g, 3, 11, 6, 1, 1);
          rect(g, 3, 8, 7, 2, 2);
          rect(g, 0, 6, 9, 5, 10);
          rect(g, 0, 5, 10, 7, 7);
          rect(g, coat, 6, 10, 5, 7);
          rect(g, coat, 7, 17, 3, 1);
          rect(g, 0, 3, 11, 3, 6);
          rect(g, 2, 4, 12, 1, 4);
          rect(g, 3, 4, 12, 1, 1);
          rect(g, 3, 6, 10, 1, 3);
          rect(g, 0, 8 + stride, 11, 2, 6);
          rect(g, trim, 8 + stride, 12, 1, 3);
          rect(g, 3, 8 + stride, 16, 2, 1);
          rect(g, 0, 6 + stride, 19, 2, 4);
          rect(g, 0, 9 - stride, 19, 2, 4);
          rect(g, 1, 6 + stride, 19, 1, 2);
          rect(g, 1, 9 - stride, 19, 1, 2);
          rect(g, 0, 7 + stride, 22, 2, 1);
          rect(g, 0, 10 - stride, 22, 2, 1);
        }
        g.generateTexture(key, 16, 24);
        g.destroy();
      }
    }
  }
}
