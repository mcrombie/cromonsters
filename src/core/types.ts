export type Affinity = 'Anchor' | 'Skitter' | 'Signal';
export type Stats = { vitality: number; force: number; guard: number; tempo: number };
export type MoveEffect = 'guard' | 'heal' | 'slow' | 'focus' | 'none';
export interface Technique {
  id: string;
  name: string;
  affinity: Affinity;
  power: number;
  accuracy: number;
  priority: number;
  effect: MoveEffect;
  description: string;
  maxUses?: number;
}
export interface Cromon {
  id: string;
  name: string;
  animal: string;
  affinity: Affinity;
  role: string;
  habitat: string;
  range: string;
  biology: string;
  fantasy: string;
  personality: string;
  description: string;
  color: string;
  stats: Stats;
  moves: { level: number; moveId: string }[];
  signature: string;
  rarity: 'common' | 'uncommon' | 'visitor';
}
export interface Companion {
  uid: string;
  speciesId: string;
  level: number;
  xp: number;
  hp: number;
  /** Missing entries in older version-one saves start with their full allowance. */
  charges?: Record<string, number>;
}
export type Direction = 'north' | 'east' | 'south' | 'west';
export type MapId = 'town' | 'forest' | 'meadow' | 'wetland' | 'inlet';
export interface Supplies {
  invitations: number;
  salves: number;
}
export interface SaveData {
  version: 1;
  player: { map: MapId; x: number; y: number; facing?: Direction };
  party: Companion[];
  reserve: Companion[];
  seen: string[];
  recruited: string[];
  visited: MapId[];
  discoveries: string[];
  supplies: Supplies;
  credits: number;
  starterChosen: boolean;
  peerWon: boolean;
  completed: boolean;
  muted: boolean;
  steps: number;
}
export interface Encounter {
  speciesId: string;
  weight: number;
  minLevel: number;
  maxLevel: number;
}
export type ObjectKind = 'guide' | 'heal' | 'shop' | 'peer' | 'note' | 'discovery' | 'transition';
export interface MapObject {
  id: string;
  kind: ObjectKind;
  x: number;
  y: number;
  label: string;
  text: string;
  target?: MapId;
}
export interface WorldMap {
  id: MapId;
  name: string;
  subtitle: string;
  palette: { ground: number; foliage: number; accent: number; water: number };
  tiles: string[];
  objects: MapObject[];
  encounters: Encounter[];
  spawn: { x: number; y: number };
  observation: string;
}
export type BattleKind = 'wild' | 'peer' | 'showcase';
export type BattleResult = 'victory' | 'recruited' | 'defeat' | 'fled' | null;
export interface BattleEvent {
  text: string;
  party: Companion[];
  active: number;
  enemy: Companion;
  effects?: Pick<
    BattleState,
    'playerGuard' | 'enemyGuard' | 'playerFocus' | 'enemyFocus' | 'playerSlow' | 'enemySlow'
  >;
}
export interface BattleState {
  kind: BattleKind;
  party: Companion[];
  active: number;
  enemy: Companion;
  supplies: Supplies;
  round: number;
  bond: number;
  escapeAttempts?: number;
  participants?: string[];
  playerGuard: boolean;
  enemyGuard: boolean;
  playerSlow: number;
  enemySlow: number;
  playerFocus: boolean;
  enemyFocus: boolean;
  log: string[];
  events?: BattleEvent[];
  result: BattleResult;
}
export type BattleAction =
  | { type: 'move'; moveId: string }
  | { type: 'switch'; index: number }
  | { type: 'observe' }
  | { type: 'invite' }
  | { type: 'salve' }
  | { type: 'flee' };
