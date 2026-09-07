import Phaser from 'phaser';
import { WORLD, MAP_WIDTH, MAP_HEIGHT } from '../data/world';
import { canOccupy, findPath } from '../core/world';
import type { MapId, MapObject } from '../core/types';
import {
  TILE,
  FIELD_COLORS,
  drawTerrain,
  drawTree,
  drawCabin,
  drawObject,
  drawDiscovery,
  makeWalkerTextures,
  type Facing,
} from './field-art';

export interface FieldBridge {
  position(): { map: MapId; x: number; y: number; facing?: Facing };
  discoveries(): string[];
  blocked(): boolean;
  face(direction: Facing): void;
  step(x: number, y: number): void;
  interact(object: MapObject): void;
}

type Point = { x: number; y: number };
type Stride = { from: Point; to: Point; map: MapId; started: number };
const STEP_MS = 160;
const directionFor = (dx: number, dy: number): Facing =>
  dx < 0 ? 'west' : dx > 0 ? 'east' : dy < 0 ? 'north' : 'south';

export class FieldScene extends Phaser.Scene {
  private bridge: FieldBridge;
  private drawnMap: MapId | null = null;
  private drawnDiscoveries = -1;
  private walker?: Phaser.GameObjects.Image;
  private people: { object: MapObject; image: Phaser.GameObjects.Image }[] = [];
  private route: Point[] = [];
  private destination?: MapObject;
  private held?: Point;
  private stride?: Stride;
  private facing: Facing = 'south';
  private walkingFrame = 1;

  constructor(bridge: FieldBridge) {
    super('field');
    this.bridge = bridge;
  }

  create() {
    makeWalkerTextures(this);
    this.cameras.main.setBounds(0, 0, MAP_WIDTH * TILE, MAP_HEIGHT * TILE);
    this.cameras.main.roundPixels = true;
    this.drawMap();
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (this.bridge.blocked()) return;
      pointer.updateWorldPoint(this.cameras.main);
      const x = Math.floor(pointer.worldX / TILE);
      const y = Math.floor(pointer.worldY / TILE);
      const person = this.people.find(({ image }) =>
        image.getBounds().contains(pointer.worldX, pointer.worldY),
      );
      const object =
        person?.object ??
        WORLD[this.bridge.position().map].objects.find((o) => o.x === x && o.y === y);
      this.walkTo(object?.x ?? x, object?.y ?? y, object);
    });
    this.game.events.on(Phaser.Core.Events.BLUR, this.releaseDirection, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.game.events.off(Phaser.Core.Events.BLUR, this.releaseDirection, this);
    });
  }

  walkTo(x: number, y: number, object?: MapObject) {
    if (this.bridge.blocked()) return;
    this.cancelRoute();
    const p = this.bridge.position();
    const start = this.stride?.to ?? p;
    if (!object) {
      this.route = findPath(p.map, start, { x, y });
      return;
    }
    // Approach landmarks from an adjacent square; face them before interaction.
    const choices = [
      [0, 1],
      [0, -1],
      [-1, 0],
      [1, 0],
    ]
      .map(([dx, dy]) => ({ x: x + dx, y: y + dy }))
      .filter((point) => canOccupy(p.map, point.x, point.y))
      .map((point) => ({ point, path: findPath(p.map, start, point) }))
      .filter(({ point, path }) => path.length || (point.x === start.x && point.y === start.y))
      .map((choice) => ({
        ...choice,
        cost: choice.path.reduce(
          (sum, point) =>
            sum + (WORLD[p.map].tiles[point.y][point.x] === '=' ? 1 : MAP_WIDTH * MAP_HEIGHT),
          0,
        ),
      }))
      .sort((a, b) => a.cost - b.cost);
    if (!choices.length) return;
    this.route = choices[0].path;
    this.destination = object;
    if (!this.route.length && !this.stride) this.arrive();
  }

  cancelRoute() {
    this.route = [];
    this.destination = undefined;
    this.releaseDirection();
  }

  holdDirection(dx: number, dy: number) {
    if (this.bridge.blocked() || Math.abs(dx) + Math.abs(dy) !== 1) return;
    this.route = [];
    this.destination = undefined;
    this.held = { x: dx, y: dy };
    if (!this.stride) this.tryStep(dx, dy);
  }

  releaseDirection() {
    this.held = undefined;
  }

  isMoving() {
    return !!this.stride;
  }

  move(dx: number, dy: number) {
    if (this.bridge.blocked() || Math.abs(dx) + Math.abs(dy) !== 1) return;
    this.cancelRoute();
    if (!this.stride) this.tryStep(dx, dy);
  }

  private face(direction: Facing) {
    this.facing = direction;
    this.bridge.face(direction);
    this.syncWalker(0);
  }

  private tryStep(dx: number, dy: number) {
    const p = this.bridge.position();
    this.face(directionFor(dx, dy));
    const x = p.x + dx,
      y = p.y + dy;
    if (!canOccupy(p.map, x, y)) return;
    this.stride = { from: { x: p.x, y: p.y }, to: { x, y }, map: p.map, started: this.time.now };
    this.syncWalker(this.walkingFrame);
  }

  update(time: number) {
    const p = this.bridge.position();
    if (this.drawnMap !== p.map || this.drawnDiscoveries !== this.bridge.discoveries().length) {
      this.cancelRoute();
      this.stride = undefined;
      this.drawMap();
    }
    if (this.bridge.blocked()) {
      this.cancelRoute();
      this.stride = undefined;
      this.placeWalker(p);
      this.syncWalker(0);
      return;
    }
    if (this.stride) {
      const stride = this.stride;
      // Recovery and developer jumps can replace the saved position mid-stride.
      if (p.map !== stride.map || p.x !== stride.from.x || p.y !== stride.from.y) {
        this.stride = undefined;
        this.cancelRoute();
        this.placeWalker(p);
      } else {
        const progress = Math.min(1, (time - stride.started) / STEP_MS);
        this.placeWalker({
          x: stride.from.x + (stride.to.x - stride.from.x) * progress,
          y: stride.from.y + (stride.to.y - stride.from.y) * progress,
        });
        this.syncWalker(progress < 0.7 ? this.walkingFrame : 0);
        if (progress < 1) return;
        this.stride = undefined;
        this.walkingFrame = this.walkingFrame === 1 ? 2 : 1;
        this.bridge.step(stride.to.x, stride.to.y);
        this.syncWalker(0);
        if (this.bridge.blocked() || this.bridge.position().map !== stride.map) {
          this.cancelRoute();
          return;
        }
        if (!this.route.length && this.destination) this.arrive();
      }
    } else this.placeWalker(p);
    if (this.bridge.blocked()) return;
    if (this.held) this.tryStep(this.held.x, this.held.y);
    else if (this.route.length) {
      const next = this.route.shift()!;
      const current = this.bridge.position();
      this.tryStep(next.x - current.x, next.y - current.y);
    } else this.syncWalker(0);
    this.facePeople();
  }

  private arrive() {
    if (!this.destination || this.bridge.blocked()) return;
    const object = this.destination;
    this.destination = undefined;
    const p = this.bridge.position();
    this.face(directionFor(object.x - p.x, object.y - p.y));
    this.bridge.interact(object);
  }

  private placeWalker(point: Point) {
    this.walker?.setPosition(Math.round(point.x * TILE + 8), Math.round(point.y * TILE + 16));
    this.walker?.setDepth(point.y * TILE + 17);
  }

  private syncWalker(frame: number) {
    this.walker?.setTexture(`walker-${this.facing}-${frame}`).setFlipX(this.facing === 'west');
    const canvas = this.game.canvas;
    canvas.dataset.facing = this.facing;
    canvas.dataset.moving = String(!!this.stride);
    canvas.dataset.map = this.bridge.position().map;
    canvas.dataset.tileX = String(this.bridge.position().x);
    canvas.dataset.tileY = String(this.bridge.position().y);
  }

  private facePeople() {
    const p = this.bridge.position();
    for (const { object, image } of this.people) {
      const dx = p.x - object.x,
        dy = p.y - object.y;
      const facing =
        Math.abs(dx) + Math.abs(dy) > 3
          ? 'south'
          : Math.abs(dx) > Math.abs(dy)
            ? directionFor(dx, 0)
            : directionFor(0, dy);
      image.setTexture(`${object.kind}-${facing}-0`).setFlipX(facing === 'west');
    }
  }

  private drawMap() {
    this.children.removeAll(true);
    this.people = [];
    const p = this.bridge.position(),
      map = WORLD[p.map];
    this.drawnMap = map.id;
    this.drawnDiscoveries = this.bridge.discoveries().length;
    this.facing = p.facing ?? 'south';
    drawTerrain(this.add.graphics().setDepth(-1), map);
    for (let y = 0; y < MAP_HEIGHT; y++)
      for (let x = 0; x < MAP_WIDTH; x++) {
        if (map.tiles[y][x] === 'T')
          drawTree(this.add.graphics().setDepth(y * TILE + 16), x * TILE, y * TILE, x * 7 + y * 3);
      }
    if (map.id === 'town') {
      for (const [x, y, variant] of [
        [5, 3, 0],
        [15, 2, 1],
        [17, 11, 2],
      ]) {
        drawCabin(this.add.graphics().setDepth((y + 3) * TILE), x * TILE, y * TILE, variant);
      }
    }
    for (const object of map.objects) {
      const g = this.add.graphics().setDepth(object.y * TILE + 16);
      if (object.kind === 'discovery')
        drawDiscovery(g, object, map.id, this.bridge.discoveries().includes(object.id));
      drawObject(g, object);
      if (object.kind === 'guide' || object.kind === 'peer') {
        const image = this.add
          .image(object.x * TILE + 8, object.y * TILE + 16, `${object.kind}-south-0`)
          .setOrigin(0.5, 1)
          .setDepth(object.y * TILE + 17);
        this.people.push({ object, image });
      }
    }
    this.walker = this.add.image(0, 0, `walker-${this.facing}-0`).setOrigin(0.5, 1);
    this.placeWalker(p);
    this.syncWalker(0);
    this.cameras.main.startFollow(this.walker, true, 1, 1);
    this.cameras.main.centerOn(this.walker.x, this.walker.y);
    this.facePeople();
  }
}

export function createField(parent: string, bridge: FieldBridge) {
  const scene = new FieldScene(bridge);
  const game = new Phaser.Game({
    type: Phaser.CANVAS,
    parent,
    width: 320,
    height: 240,
    backgroundColor: FIELD_COLORS[0],
    pixelArt: true,
    roundPixels: true,
    scene: [scene],
    audio: { noAudio: true },
    input: { keyboard: false },
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  });
  return { game, scene };
}
