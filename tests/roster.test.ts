import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { ROSTER, STARTERS, getCromon } from '../src/data/roster';
import { MOVES, getMove } from '../src/data/moves';

const REQUIRED_ANIMALS = [
  'Gray wolf',
  'Moose',
  'North American beaver',
  'Eastern box turtle',
  'Little brown bat',
  'Great horned owl',
  'Timber rattlesnake',
  'Spotted salamander',
  'Giant Pacific octopus',
  'Moon jelly',
  'Monarch butterfly',
  'Luna moth',
  'Seventeen-year cicada',
  'Common green darner',
  'Black-and-yellow garden spider',
  'Green anole',
  'American bullfrog',
  'American alligator',
  'Common loon',
  'Broad-winged hawk',
  'Ruby-throated hummingbird',
  'Great blue heron',
  'American bison',
  'Humpback whale',
  'Alligator gar',
  'Manta ray',
  'Atlantic horseshoe crab',
  'American lobster',
  'Lined seahorse',
  'Ochre sea star',
] as const;
const REQUIRED_SECTIONS = [
  'Cromon Name',
  'Real-World Inspiration',
  'Name Origin and Wordplay',
  'Real Biology and Ecology',
  'Fantasy Elaboration',
  'Visual Design',
  'Silhouette and Identifying Features',
  'Temperament and Behavior',
  'Habitat in the Game',
  'Affinity or Classification',
  'Battle Role',
  'Base Stats',
  'Move Set',
  'Signature Technique',
  'Strengths and Weaknesses',
  'Encounter Level and Rarity',
  'Design Thought Process',
  'Distinction Between Fact and Fiction',
  'Future Art or Animation Notes',
];

describe('the initial thirty Cromon', () => {
  it('covers the independent required animal list once each, in the assigned order', () => {
    expect(ROSTER).toHaveLength(30);
    expect(ROSTER.map((species) => species.animal)).toEqual(REQUIRED_ANIMALS);
    for (const animal of REQUIRED_ANIMALS) {
      expect(
        ROSTER.filter((species) => species.animal === animal),
        animal,
      ).toHaveLength(1);
    }
  });

  it('uses unique sequential identifiers and unique names', () => {
    expect(new Set(ROSTER.map((species) => species.id)).size).toBe(30);
    expect(ROSTER.map((species) => species.id)).toEqual(
      Array.from({ length: 30 }, (_, index) => String(index + 1).padStart(3, '0')),
    );
    expect(new Set(ROSTER.map((species) => species.name.toLowerCase().trim())).size).toBe(30);
    expect(ROSTER.every((species) => species.name.trim().length > 3)).toBe(true);
  });

  it.each(ROSTER)('$id $name has valid stats and usable progression', (species) => {
    for (const [stat, value] of Object.entries(species.stats)) {
      expect(Number.isInteger(value), stat).toBe(true);
      expect(value, stat).toBeGreaterThan(0);
      expect(value, stat).toBeLessThanOrEqual(100);
    }
    expect(['Anchor', 'Skitter', 'Signal']).toContain(species.affinity);
    expect(species.moves.filter((entry) => entry.level === 1).length).toBeGreaterThanOrEqual(2);
    expect(species.moves.some((entry) => entry.level > 1)).toBe(true);
    expect(species.moves.map((entry) => entry.level)).toEqual(
      species.moves.map((entry) => entry.level).sort((a, b) => a - b),
    );
    for (const entry of species.moves) {
      expect(Number.isInteger(entry.level)).toBe(true);
      expect(entry.level).toBeGreaterThan(0);
      expect(MOVES[entry.moveId], entry.moveId).toBeDefined();
    }
    expect(MOVES[species.signature]).toBeDefined();
    expect(species.moves.some((entry) => entry.moveId === species.signature)).toBe(true);
  });

  it('gives every species a distinct registered signature', () => {
    expect(new Set(ROSTER.map((species) => species.signature)).size).toBe(30);
    for (const species of ROSTER) {
      expect(getMove(species.signature).id).toBe(species.signature);
    }
  });

  it('validates every shared and signature technique', () => {
    for (const [key, move] of Object.entries(MOVES)) {
      expect(move.id).toBe(key);
      expect(Number.isFinite(move.power)).toBe(true);
      expect(move.power).toBeGreaterThanOrEqual(0);
      expect(move.accuracy).toBeGreaterThan(0);
      expect(move.accuracy).toBeLessThanOrEqual(1);
      expect(Number.isInteger(move.priority)).toBe(true);
      expect(['none', 'guard', 'heal', 'slow', 'focus']).toContain(move.effect);
      expect(['Anchor', 'Skitter', 'Signal']).toContain(move.affinity);
    }
  });

  it('keeps the three starters within the roster and covers the approach cycle', () => {
    expect(STARTERS).toEqual(['003', '005', '021']);
    expect(STARTERS.map((id) => getCromon(id).affinity).sort()).toEqual(
      ['Anchor', 'Signal', 'Skitter'].sort(),
    );
  });

  it.each(ROSTER)(
    '$id $name has all nineteen dossier sections and an original portrait',
    (species) => {
      const path = new URL(
        '../docs/cromon/' + species.id + '-' + species.name.toLowerCase() + '.md',
        import.meta.url,
      );
      const dossier = readFileSync(path, 'utf8');
      REQUIRED_SECTIONS.forEach((section, index) => {
        expect(dossier).toContain('## ' + (index + 1) + '. ' + section);
      });
      expect(dossier).toContain(species.animal);
      expect(existsSync(new URL('../public/art/' + species.id + '.svg', import.meta.url))).toBe(
        true,
      );
    },
  );

  it('rejects unknown species and techniques clearly', () => {
    expect(() => getCromon('031')).toThrow('Unknown Cromon');
    expect(() => getMove('missing-technique')).toThrow('Unknown technique');
  });
});
