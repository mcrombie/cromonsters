import type { Encounter, MapId, MapObject, WorldMap } from '../core/types';
export const MAP_WIDTH = 25;
export const MAP_HEIGHT = 17;
const encounter = (speciesId: string, weight: number, minLevel = 2, maxLevel = 4): Encounter => ({
  speciesId,
  weight,
  minLevel,
  maxLevel,
});
const terrain = (id: MapId, objects: MapObject[]): string[] => {
  const grid: string[][] = Array.from({ length: MAP_HEIGHT }, (_, y) =>
    Array.from({ length: MAP_WIDTH }, (_, x) => {
      if (x === 0 || y === 0 || x === 24 || y === 16) return 'T';
      if (id === 'town') return (x * 3 + y * 7) % 17 === 0 ? 'f' : '.';
      if (id === 'inlet' && x > 17) return '~';
      if (id === 'wetland' && ((x < 7 && y < 8) || (x > 17 && y > 9))) return '~';
      if ((x * 7 + y * 3) % (id === 'forest' ? 7 : 17) === 0) return 'T';
      return (x + y) % 4 === 0 ? 'f' : 'g';
    }),
  );
  const path = (x: number, y: number) => {
    grid[y][x] = '=';
  };
  for (let x = 1; x < 24; x++) path(x, 10);
  for (let y = 1; y < 16; y++) path(12, y);
  for (const obj of objects) {
    for (let x = Math.min(obj.x, 12); x <= Math.max(obj.x, 12); x++) path(x, obj.y);
    for (let y = Math.min(obj.y, 10); y <= Math.max(obj.y, 10); y++) path(12, y);
  }
  if (id === 'town') {
    for (const [left, top, width] of [
      [5, 3, 5],
      [15, 2, 5],
      [17, 11, 5],
    ]) {
      for (let y = top; y < top + 3; y++)
        for (let x = left; x < left + width; x++) grid[y][x] = '#';
    }
    for (const obj of objects) grid[obj.y][obj.x] = '=';
  }
  return grid.map((row) => row.join(''));
};
const townObjects: MapObject[] = [
  {
    id: 'rowan',
    kind: 'guide',
    x: 8,
    y: 7,
    label: 'Warden Nella Quill',
    text: 'The Fourfold Ramble is simple: listen, look, and return with everyone you left with. Additional everyone is welcome.',
  },
  {
    id: 'rest',
    kind: 'heal',
    x: 16,
    y: 5,
    label: 'The Kettle House',
    text: 'A warm cup, a quiet bench, and a towel of implausible capacity. Your entire walking company and home roost are restored.',
  },
  {
    id: 'supplies',
    kind: 'shop',
    x: 18,
    y: 10,
    label: 'Moss & Sundries',
    text: 'Practical supplies for impractical wildlife. New walkers may always borrow two invitation ribbons and a broth wrap.',
  },
  {
    id: 'forest-gate',
    kind: 'transition',
    x: 3,
    y: 8,
    label: 'Russetwalk',
    target: 'forest',
    text: 'West · Hardwood forest',
  },
  {
    id: 'meadow-gate',
    kind: 'transition',
    x: 12,
    y: 2,
    label: 'Bellwether Field',
    target: 'meadow',
    text: 'North · Goldenrod meadow',
  },
  {
    id: 'wetland-gate',
    kind: 'transition',
    x: 21,
    y: 8,
    label: 'Sluicefen',
    target: 'wetland',
    text: 'East · Wetland boardwalk',
  },
  {
    id: 'inlet-gate',
    kind: 'transition',
    x: 12,
    y: 14,
    label: 'Farcurrent Strand',
    target: 'inlet',
    text: 'South · Tidal inlet',
  },
  {
    id: 'town-note',
    kind: 'note',
    x: 5,
    y: 11,
    label: 'Field station notice',
    text: 'Foldwater Reach sits beside a fold in the sea. Distant habitats briefly touch here. Visiting animals remain visitors; a Pacific sea star has not moved its real-world range.',
  },
];
const fieldObjects = (id: MapId, label: string, text: string, note: string): MapObject[] => [
  {
    id: id + '-return',
    kind: 'transition',
    x: 12,
    y: 15,
    label: 'Return to Latchleaf',
    target: 'town',
    text: 'Follow the marked path home. No encounters on the gravel.',
  },
  { id: id + '-discovery', kind: 'discovery', x: 12, y: 5, label, text },
  { id: id + '-note', kind: 'note', x: 6, y: 10, label: 'Naturalist observation', text: note },
];
const definitions: Omit<WorldMap, 'tiles'>[] = [
  {
    id: 'town',
    name: 'Latchleaf',
    subtitle: 'A small station. A rather large assignment.',
    palette: { ground: 0x889664, foliage: 0x365d45, accent: 0xda9761, water: 0x68949a },
    objects: townObjects,
    encounters: [],
    spawn: { x: 12, y: 10 },
    observation: 'Where the kettle is always on.',
  },
  {
    id: 'forest',
    name: 'Russetwalk',
    subtitle: 'Hardwood canopy · fallen leaves · damp little mysteries',
    palette: { ground: 0x72815a, foliage: 0x375644, accent: 0xd59456, water: 0x658b87 },
    objects: fieldObjects(
      'forest',
      'Lift the fallen branch',
      'You prop up the branch, opening a damp shelter without disturbing its residents. A Dapploom peeks out. Forest observation recorded; found two invitation ribbons.',
      'Box turtles use a hinged lower shell. They do not actually keep emergency biscuits in it. Hingeamble refuses to comment.',
    ),
    encounters: [
      encounter('004', 24),
      encounter('005', 20),
      encounter('008', 22),
      encounter('006', 10),
      encounter('007', 8),
      encounter('012', 12),
      encounter('001', 4, 3, 5),
    ],
    spawn: { x: 12, y: 14 },
    observation: '008',
  },
  {
    id: 'meadow',
    name: 'Bellwether Field',
    subtitle: 'Asters · goldenrod · a sky full of departures',
    palette: { ground: 0xb1a267, foliage: 0x777f49, accent: 0xe7b94f, water: 0x81a4a1 },
    objects: [
      ...fieldObjects(
        'meadow',
        'Turn the listening vane',
        'The vane catches the breeze; the migration counter clicks. A Pennamber pauses on the brass edge. Meadow observation recorded; found a broth wrap.',
        'Monarch migration spans generations. Our departure board simply says: SOUTH, MORE OR LESS.',
      ),
      {
        id: 'peer',
        kind: 'peer',
        x: 17,
        y: 8,
        label: 'Fellow walker Kit',
        text: 'I have color-coded my notes by how loudly I screamed. Want to compare field styles? A friendly bout; no paperwork for losing.',
      },
    ],
    encounters: [
      encounter('011', 24),
      encounter('013', 19),
      encounter('014', 22),
      encounter('015', 17),
      encounter('021', 12),
      encounter('020', 6, 3, 5),
    ],
    spawn: { x: 12, y: 14 },
    observation: '011',
  },
  {
    id: 'wetland',
    name: 'Sluicefen',
    subtitle: 'Still pools · reed beds · excellent mud',
    palette: { ground: 0x718a72, foliage: 0x376a5c, accent: 0xc2aa73, water: 0x517f87 },
    objects: fieldObjects(
      'wetland',
      'Turn the spillway wheel',
      'You ease the wheel a quarter turn. The boardwalk settles above the water and a Stiltscribe surveys the new shallows. Wetland observation recorded; found two invitation ribbons.',
      'Wetlands slow floodwater and shelter young wildlife. Please keep boots on the planks, unless you have registered as a pond.',
    ),
    encounters: [
      encounter('003', 24),
      encounter('017', 25),
      encounter('019', 18),
      encounter('022', 18),
      encounter('002', 7, 3, 5),
      encounter('008', 8),
    ],
    spawn: { x: 12, y: 14 },
    observation: '022',
  },
  {
    id: 'inlet',
    name: 'Farcurrent Strand',
    subtitle: 'Salt air · tide pools · improbable arrivals',
    palette: { ground: 0xb8ac85, foliage: 0x6d8d79, accent: 0xe1b778, water: 0x467e8b },
    objects: fieldObjects(
      'inlet',
      'Lower the tide lens',
      'The lens parts a curtain of foam. A Hingehaven shuffles beneath it. Inlet observation recorded; found a broth wrap. A distant song comes through the Foldwater seam.',
      'The Foldwater seam temporarily joins faraway coasts. Pacific visitors return through it. Sanctuary pages identify every animal’s actual range; geography still counts.',
    ),
    encounters: [
      encounter('010', 22),
      encounter('027', 24),
      encounter('028', 20),
      encounter('029', 14),
      encounter('024', 4, 3, 5),
      encounter('009', 6),
      encounter('026', 4),
      encounter('030', 6),
    ],
    spawn: { x: 12, y: 14 },
    observation: '027',
  },
];
export const WORLD = Object.fromEntries(
  definitions.map((map) => [map.id, { ...map, tiles: terrain(map.id, map.objects) }]),
) as Record<MapId, WorldMap>;
export const MAP_IDS = definitions.map((m) => m.id);
export const FIELD_IDS: MapId[] = ['forest', 'meadow', 'wetland', 'inlet'];
