import type { Cromon } from '../core/types';

/** One species per requested animal, in the original assignment order. */
export const ROSTER: Cromon[] = [
  {
    id: '001',
    name: 'Choiruff',
    animal: 'Gray wolf',
    affinity: 'Signal',
    role: 'Pack caller and accurate finisher',
    habitat: 'Russetwalk, deep leaf trail',
    range:
      'Northern North America and parts of Eurasia; greatly reduced from its historical range.',
    biology:
      'Gray wolves use scent, posture, and vocal calls to communicate. Family groups cooperate in caring for pups and obtaining food.',
    fantasy:
      'Its layered cheek ruff holds several delayed versions of its own voice, letting one wolf rehearse a whole chorus.',
    personality: 'Earnest, sociable, and distressed by anyone walking out of formation.',
    description:
      'Its layered cheek ruff holds several delayed versions of its own voice, letting one wolf rehearse a whole chorus.',
    color: '#84999f',
    stats: {
      vitality: 31,
      force: 11,
      guard: 7,
      tempo: 10,
    },
    moves: [
      {
        level: 1,
        moveId: 'signal-nudge',
      },
      {
        level: 1,
        moveId: 'sig-001',
      },
      {
        level: 4,
        moveId: 'sidestep',
      },
      {
        level: 7,
        moveId: 'signal-surge',
      },
    ],
    signature: 'sig-001',
    rarity: 'uncommon',
  },
  {
    id: '002',
    name: 'Palmarch',
    animal: 'Moose',
    affinity: 'Skitter',
    role: 'Long-stride disruptor',
    habitat: 'Sluicefen, willow margins',
    range: 'Boreal and northern temperate forests of North America, Europe, and Asia.',
    biology:
      'Moose browse woody plants and aquatic vegetation. Their long legs help them move through snow and wetlands; males grow broad palmate antlers.',
    fantasy:
      'Its antlers sweep reeds into temporary lanes that let its improbably long strides interrupt an opponent.',
    personality:
      'Unhurried until it needs to be somewhere else; regards path signs as personal suggestions.',
    description:
      'Its antlers sweep reeds into temporary lanes that let its improbably long strides interrupt an opponent.',
    color: '#a58562',
    stats: {
      vitality: 36,
      force: 10,
      guard: 6,
      tempo: 12,
    },
    moves: [
      {
        level: 1,
        moveId: 'skitter-nudge',
      },
      {
        level: 1,
        moveId: 'sig-002',
      },
      {
        level: 4,
        moveId: 'brace',
      },
      {
        level: 7,
        moveId: 'skitter-surge',
      },
    ],
    signature: 'sig-002',
    rarity: 'uncommon',
  },
  {
    id: '003',
    name: 'Weirwhittle',
    animal: 'North American beaver',
    affinity: 'Anchor',
    role: 'Construction defender; starter',
    habitat: 'Sluicefen streams; Latchleaf starter station',
    range: 'Much of North America, especially freshwater habitats with woody vegetation.',
    biology:
      'North American beavers cut woody plants and build dams and lodges. Their broad scaly tails help in swimming and produce warning slaps.',
    fantasy:
      'It taps its paddle tail against the ground to fold loose twigs into a small, temporary weir.',
    personality:
      'Helpful and meticulous; will repair a bench while someone is still sitting on it.',
    description:
      'It taps its paddle tail against the ground to fold loose twigs into a small, temporary weir.',
    color: '#b88350',
    stats: {
      vitality: 32,
      force: 9,
      guard: 12,
      tempo: 6,
    },
    moves: [
      {
        level: 1,
        moveId: 'anchor-nudge',
      },
      {
        level: 1,
        moveId: 'sig-003',
      },
      {
        level: 4,
        moveId: 'read-room',
      },
      {
        level: 7,
        moveId: 'anchor-surge',
      },
    ],
    signature: 'sig-003',
    rarity: 'common',
  },
  {
    id: '004',
    name: 'Hingeamble',
    animal: 'Eastern box turtle',
    affinity: 'Anchor',
    role: 'Patient defensive closer',
    habitat: 'Russetwalk, damp leaf litter',
    range:
      'Eastern United States; the eastern box turtle is a subspecies of the common box turtle.',
    biology:
      'Eastern box turtles live mainly on land. Their hinged lower shell can close over the openings, and they eat varied plant and animal foods.',
    fantasy:
      'Shell seams briefly align like a folding door, redirecting the force of its own small shove into a protective stance.',
    personality: 'Courteous, stubborn, and never convinced that a deadline is a real object.',
    description:
      'Shell seams briefly align like a folding door, redirecting the force of its own small shove into a protective stance.',
    color: '#c29b40',
    stats: {
      vitality: 30,
      force: 7,
      guard: 14,
      tempo: 5,
    },
    moves: [
      {
        level: 1,
        moveId: 'anchor-nudge',
      },
      {
        level: 1,
        moveId: 'sig-004',
      },
      {
        level: 4,
        moveId: 'read-room',
      },
      {
        level: 7,
        moveId: 'anchor-surge',
      },
    ],
    signature: 'sig-004',
    rarity: 'common',
  },
  {
    id: '005',
    name: 'Pipistitch',
    animal: 'Little brown bat',
    affinity: 'Signal',
    role: 'Perception and focus; starter',
    habitat: 'Russetwalk stream canopy; Latchleaf starter station',
    range: 'Much of North America, including forest and freshwater habitats.',
    biology:
      'Little brown bats use echolocation to find flying insects. They roost socially and may hibernate in caves or mines.',
    fantasy:
      'Returning echoes appear as short pale stitches between the veins of its wing membranes, outlining an opening for the next strike.',
    personality:
      'Inquisitive and precise; checks an empty cupboard twice because the echo sounded interesting.',
    description:
      'Returning echoes appear as short pale stitches between the veins of its wing membranes, outlining an opening for the next strike.',
    color: '#987caa',
    stats: {
      vitality: 26,
      force: 10,
      guard: 8,
      tempo: 11,
    },
    moves: [
      {
        level: 1,
        moveId: 'signal-nudge',
      },
      {
        level: 1,
        moveId: 'sig-005',
      },
      {
        level: 4,
        moveId: 'sidestep',
      },
      {
        level: 7,
        moveId: 'signal-surge',
      },
    ],
    signature: 'sig-005',
    rarity: 'common',
  },
  {
    id: '006',
    name: 'Hushruft',
    animal: 'Great horned owl',
    affinity: 'Signal',
    role: 'Quiet tempo controller',
    habitat: 'Russetwalk, hollow-tree overlook',
    range: 'Widespread across the Americas in varied wooded and open habitats.',
    biology:
      'Great horned owls are nocturnal predators. Their feather tufts are not ears; their actual ears and facial structures help them locate sounds.',
    fantasy:
      'Its facial feathers dampen a tiny pocket of sound, making rivals hesitate when their own footsteps vanish.',
    personality: 'Attentive, dryly amused, and inclined to listen before answering.',
    description:
      'Its facial feathers dampen a tiny pocket of sound, making rivals hesitate when their own footsteps vanish.',
    color: '#a48b69',
    stats: {
      vitality: 29,
      force: 10,
      guard: 9,
      tempo: 8,
    },
    moves: [
      {
        level: 1,
        moveId: 'signal-nudge',
      },
      {
        level: 1,
        moveId: 'sig-006',
      },
      {
        level: 4,
        moveId: 'sidestep',
      },
      {
        level: 7,
        moveId: 'signal-surge',
      },
    ],
    signature: 'sig-006',
    rarity: 'uncommon',
  },
  {
    id: '007',
    name: 'Knurlattle',
    animal: 'Timber rattlesnake',
    affinity: 'Anchor',
    role: 'Warning-based control striker',
    habitat: 'Russetwalk sun patches; Bellwether Field rocky edge',
    range: 'Eastern United States, with a fragmented present distribution.',
    biology:
      'Timber rattlesnakes are venomous ambush predators. They detect heat with facial pits and use a keratin rattle as a warning; rattle segments do not reliably measure age.',
    fantasy:
      'Its rattle rolls a patterned vibration through the ground, making nearby feet miss the beat.',
    personality:
      'Reserved and clear about boundaries; prefers a warning that works to an argument.',
    description:
      'Its rattle rolls a patterned vibration through the ground, making nearby feet miss the beat.',
    color: '#b8a36b',
    stats: {
      vitality: 28,
      force: 12,
      guard: 10,
      tempo: 6,
    },
    moves: [
      {
        level: 1,
        moveId: 'anchor-nudge',
      },
      {
        level: 1,
        moveId: 'sig-007',
      },
      {
        level: 4,
        moveId: 'read-room',
      },
      {
        level: 7,
        moveId: 'anchor-surge',
      },
    ],
    signature: 'sig-007',
    rarity: 'uncommon',
  },
  {
    id: '008',
    name: 'Dapploom',
    animal: 'Spotted salamander',
    affinity: 'Anchor',
    role: 'Moisture recovery duelist',
    habitat: 'Russetwalk rotting logs; Sluicefen shaded pools',
    range:
      'Eastern North America, including southern Canada and much of the eastern United States.',
    biology:
      'Spotted salamanders spend much of their lives under cover and breed in woodland pools. Their skin needs moisture; salamanders can regenerate some damaged body structures.',
    fantasy:
      'Its yellow spots gather cool mist into a soft patch that restores battle vitality without replacing limbs during combat.',
    personality:
      'Gentle and private; arrives at group activities slightly damp and exactly on time.',
    description:
      'Its yellow spots gather cool mist into a soft patch that restores battle vitality without replacing limbs during combat.',
    color: '#596c79',
    stats: {
      vitality: 31,
      force: 8,
      guard: 10,
      tempo: 7,
    },
    moves: [
      {
        level: 1,
        moveId: 'anchor-nudge',
      },
      {
        level: 1,
        moveId: 'sig-008',
      },
      {
        level: 4,
        moveId: 'read-room',
      },
      {
        level: 7,
        moveId: 'anchor-surge',
      },
    ],
    signature: 'sig-008',
    rarity: 'common',
  },
  {
    id: '009',
    name: 'Pleatacle',
    animal: 'Giant Pacific octopus',
    affinity: 'Skitter',
    role: 'Flexible feint specialist',
    habitat: 'Farcurrent Strand research pools; Foldwater visitor',
    range:
      'Temperate North Pacific, from western North America around the northern Pacific to Japan; not native to the Atlantic.',
    biology:
      'Giant Pacific octopuses have eight sucker-lined arms, flexible bodies, and skin that changes color and texture. They shelter in dens and hunt marine animals.',
    fantasy:
      'Its skin patterns fold into offset pleats, making the next arm movement difficult to predict.',
    personality:
      'Resourceful and mischievous; opens the sample jar, then thoughtfully replaces the label.',
    description:
      'Its skin patterns fold into offset pleats, making the next arm movement difficult to predict.',
    color: '#cf795e',
    stats: {
      vitality: 30,
      force: 10,
      guard: 7,
      tempo: 12,
    },
    moves: [
      {
        level: 1,
        moveId: 'skitter-nudge',
      },
      {
        level: 1,
        moveId: 'sig-009',
      },
      {
        level: 4,
        moveId: 'brace',
      },
      {
        level: 7,
        moveId: 'skitter-surge',
      },
    ],
    signature: 'sig-009',
    rarity: 'visitor',
  },
  {
    id: '010',
    name: 'Bellilt',
    animal: 'Moon jelly',
    affinity: 'Signal',
    role: 'Gentle pulse controller',
    habitat: 'Farcurrent Strand sheltered inlet',
    range:
      'Moon jellies occur widely in coastal seas; Aurelia contains several similar species whose ranges differ.',
    biology:
      'Moon jellies pulse a translucent bell and capture small drifting food with stinging cells. Four rounded internal reproductive structures are often visible.',
    fantasy:
      'Four pale internal loops ring at slightly different rates, sending a wobbling pulse through nearby water or Foldwater mist.',
    personality: 'Serene and easily distracted by its own reflection.',
    description:
      'Four pale internal loops ring at slightly different rates, sending a wobbling pulse through nearby water or Foldwater mist.',
    color: '#abbdcb',
    stats: {
      vitality: 28,
      force: 8,
      guard: 8,
      tempo: 9,
    },
    moves: [
      {
        level: 1,
        moveId: 'signal-nudge',
      },
      {
        level: 1,
        moveId: 'sig-010',
      },
      {
        level: 4,
        moveId: 'sidestep',
      },
      {
        level: 7,
        moveId: 'signal-surge',
      },
    ],
    signature: 'sig-010',
    rarity: 'common',
  },
  {
    id: '011',
    name: 'Pennamber',
    animal: 'Monarch butterfly',
    affinity: 'Skitter',
    role: 'Sustained travel skirmisher',
    habitat: 'Bellwether Field, goldenrod and asters',
    range:
      'Native to the Americas; migratory North American populations link breeding regions with overwintering areas in Mexico or coastal California.',
    biology:
      'Monarch caterpillars feed on milkweeds. Adults drink nectar, and some populations undertake long seasonal migrations across multiple generations.',
    fantasy:
      'Amber wing panels store a little warmth from flower stops, releasing it as a restorative gust during a sharp turn.',
    personality: 'Determined, sociable at flowers, and always looking toward the next hill.',
    description:
      'Amber wing panels store a little warmth from flower stops, releasing it as a restorative gust during a sharp turn.',
    color: '#d89549',
    stats: {
      vitality: 27,
      force: 8,
      guard: 6,
      tempo: 13,
    },
    moves: [
      {
        level: 1,
        moveId: 'skitter-nudge',
      },
      {
        level: 1,
        moveId: 'sig-011',
      },
      {
        level: 4,
        moveId: 'brace',
      },
      {
        level: 7,
        moveId: 'skitter-surge',
      },
    ],
    signature: 'sig-011',
    rarity: 'common',
  },
  {
    id: '012',
    name: 'Veilmorrow',
    animal: 'Luna moth',
    affinity: 'Signal',
    role: 'Protective decoy caller',
    habitat: 'Russetwalk canopy; Bellwether Field woodland edge',
    range: 'Eastern North America, from southern Canada through the eastern United States.',
    biology:
      'Luna moth adults have pale green wings, long hindwing tails, and reduced mouthparts. Their tails can divert attacks by echolocating bats away from the body.',
    fantasy:
      'The trailing tails hold a delayed echo of each wingbeat, drawing one incoming blow away from its body.',
    personality:
      'Quiet, nocturnal, and inclined to make an entrance after everyone has stopped talking.',
    description:
      'The trailing tails hold a delayed echo of each wingbeat, drawing one incoming blow away from its body.',
    color: '#a8c48f',
    stats: {
      vitality: 25,
      force: 8,
      guard: 10,
      tempo: 10,
    },
    moves: [
      {
        level: 1,
        moveId: 'signal-nudge',
      },
      {
        level: 1,
        moveId: 'sig-012',
      },
      {
        level: 4,
        moveId: 'sidestep',
      },
      {
        level: 7,
        moveId: 'signal-surge',
      },
    ],
    signature: 'sig-012',
    rarity: 'uncommon',
  },
  {
    id: '013',
    name: 'Septendrum',
    animal: 'Seventeen-year cicada',
    affinity: 'Signal',
    role: 'Low-tempo sonic breaker',
    habitat: 'Bellwether Field brood patch; Foldwater early emergence',
    range: 'Eastern and central United States, with geographically distinct seventeen-year broods.',
    biology:
      'Seventeen-year periodical cicadas develop underground feeding on root fluids. Adults emerge in synchronized broods, and males make loud calls using tymbals.',
    fantasy:
      'Its folded back plates save one tiny beat per underground season; the accumulated rhythm is released as a startling single knock.',
    personality: 'Patient about everything except being asked whether it overslept.',
    description:
      'Its folded back plates save one tiny beat per underground season; the accumulated rhythm is released as a startling single knock.',
    color: '#a56f4d',
    stats: {
      vitality: 30,
      force: 13,
      guard: 7,
      tempo: 5,
    },
    moves: [
      {
        level: 1,
        moveId: 'signal-nudge',
      },
      {
        level: 1,
        moveId: 'sig-013',
      },
      {
        level: 4,
        moveId: 'sidestep',
      },
      {
        level: 7,
        moveId: 'signal-surge',
      },
    ],
    signature: 'sig-013',
    rarity: 'uncommon',
  },
  {
    id: '014',
    name: 'Aeroveer',
    animal: 'Common green darner',
    affinity: 'Skitter',
    role: 'Priority pursuit specialist',
    habitat: 'Bellwether Field air lanes; Sluicefen pond edge',
    range:
      'Widespread in North America, with migratory movements extending into parts of Central America and the Caribbean.',
    biology:
      'Common green darners are large dragonflies with aquatic predatory juveniles. Adults hunt flying insects, and some populations migrate seasonally.',
    fantasy:
      'Its four wings sketch short-lived arrows in the air that pull its next turn into place.',
    personality: 'Alert and restless; circles back to check that everyone is still following.',
    description:
      'Its four wings sketch short-lived arrows in the air that pull its next turn into place.',
    color: '#75a68a',
    stats: {
      vitality: 26,
      force: 11,
      guard: 5,
      tempo: 14,
    },
    moves: [
      {
        level: 1,
        moveId: 'skitter-nudge',
      },
      {
        level: 1,
        moveId: 'sig-014',
      },
      {
        level: 4,
        moveId: 'brace',
      },
      {
        level: 7,
        moveId: 'skitter-surge',
      },
    ],
    signature: 'sig-014',
    rarity: 'common',
  },
  {
    id: '015',
    name: 'Zigzib',
    animal: 'Black-and-yellow garden spider',
    affinity: 'Anchor',
    role: 'Web geometry controller',
    habitat: 'Bellwether Field, aster stems',
    range: 'Much of North and Central America, especially sunny gardens, fields, and edges.',
    biology:
      'Black-and-yellow garden spiders build orb webs, often with a conspicuous zigzag silk band. They detect prey through web vibrations.',
    fantasy:
      'Its zigzag band holds a single elastic angle, briefly catching a rival whose movement crosses the line.',
    personality: 'Methodical and tolerant of visitors who respect the guide strings.',
    description:
      'Its zigzag band holds a single elastic angle, briefly catching a rival whose movement crosses the line.',
    color: '#c6b746',
    stats: {
      vitality: 27,
      force: 9,
      guard: 11,
      tempo: 7,
    },
    moves: [
      {
        level: 1,
        moveId: 'anchor-nudge',
      },
      {
        level: 1,
        moveId: 'sig-015',
      },
      {
        level: 4,
        moveId: 'read-room',
      },
      {
        level: 7,
        moveId: 'anchor-surge',
      },
    ],
    signature: 'sig-015',
    rarity: 'common',
  },
  {
    id: '016',
    name: 'Dewlapp',
    animal: 'Green anole',
    affinity: 'Signal',
    role: 'Display-based focus duelist',
    habitat: 'Farcurrent Strand warm conservatory; Foldwater visitor',
    range: 'Native to the southeastern United States; introduced to several other places.',
    biology:
      'Green anoles climb with adhesive toe pads and communicate with body postures and an extendable dewlap. Their color varies with condition and surroundings.',
    fantasy:
      'Its dewlap briefly displays a diagram of its intended feint, so confidently that a rival watches the wrong detail.',
    personality: 'Expressive, proud, and surprisingly considerate when asked to lower its voice.',
    description:
      'Its dewlap briefly displays a diagram of its intended feint, so confidently that a rival watches the wrong detail.',
    color: '#87b478',
    stats: {
      vitality: 25,
      force: 10,
      guard: 7,
      tempo: 12,
    },
    moves: [
      {
        level: 1,
        moveId: 'signal-nudge',
      },
      {
        level: 1,
        moveId: 'sig-016',
      },
      {
        level: 4,
        moveId: 'sidestep',
      },
      {
        level: 7,
        moveId: 'signal-surge',
      },
    ],
    signature: 'sig-016',
    rarity: 'visitor',
  },
  {
    id: '017',
    name: 'Bellowgout',
    animal: 'American bullfrog',
    affinity: 'Signal',
    role: 'Resonant burst attacker',
    habitat: 'Sluicefen open pond',
    range:
      'Native to eastern North America; introduced widely elsewhere, sometimes with harmful ecological effects.',
    biology:
      'American bullfrogs inhabit permanent fresh water and eat a wide variety of prey. Males produce deep advertisement calls; their large external eardrums are conspicuous.',
    fantasy: 'Its throat sac shapes a single globule of sound that bursts like a dropped bucket.',
    personality: 'Boisterous but easily embarrassed by an accidental squeak.',
    description:
      'Its throat sac shapes a single globule of sound that bursts like a dropped bucket.',
    color: '#7e9d66',
    stats: {
      vitality: 34,
      force: 12,
      guard: 6,
      tempo: 7,
    },
    moves: [
      {
        level: 1,
        moveId: 'signal-nudge',
      },
      {
        level: 1,
        moveId: 'sig-017',
      },
      {
        level: 4,
        moveId: 'sidestep',
      },
      {
        level: 7,
        moveId: 'signal-surge',
      },
    ],
    signature: 'sig-017',
    rarity: 'common',
  },
  {
    id: '018',
    name: 'Scutapult',
    animal: 'American alligator',
    affinity: 'Skitter',
    role: 'Ambush priority bruiser',
    habitat: 'Farcurrent Strand warm sanctuary channel; Foldwater visitor',
    range: 'Southeastern United States, especially freshwater wetlands and slow waters.',
    biology:
      'American alligators have broad snouts, powerful swimming tails, and armored back scutes. They ambush prey and can move in sudden short bursts.',
    fantasy:
      'Its back scutes flex like a row of shallow springs, converting a still pose into one sudden sliding lunge.',
    personality: 'Patient, observant, and offended when its careful stillness is called laziness.',
    description:
      'Its back scutes flex like a row of shallow springs, converting a still pose into one sudden sliding lunge.',
    color: '#698876',
    stats: {
      vitality: 35,
      force: 12,
      guard: 7,
      tempo: 9,
    },
    moves: [
      {
        level: 1,
        moveId: 'skitter-nudge',
      },
      {
        level: 1,
        moveId: 'sig-018',
      },
      {
        level: 4,
        moveId: 'brace',
      },
      {
        level: 7,
        moveId: 'skitter-surge',
      },
    ],
    signature: 'sig-018',
    rarity: 'visitor',
  },
  {
    id: '019',
    name: 'Tremoloon',
    animal: 'Common loon',
    affinity: 'Signal',
    role: 'Call-and-dive defender',
    habitat: 'Sluicefen deep channel; Farcurrent Strand passage',
    range:
      'Breeds on northern North American lakes and winters mainly on North American coasts, with some Atlantic populations reaching Europe.',
    biology:
      'Common loons dive for fish using feet set far back on the body. Their calls carry over water, and their breeding plumage has striking black-and-white patterns.',
    fantasy:
      'Its checker marks briefly double into a reflected bird, letting its real body slip beneath one incoming attack.',
    personality:
      'Sincere and a little theatrical; sings to check who is listening across the water.',
    description:
      'Its checker marks briefly double into a reflected bird, letting its real body slip beneath one incoming attack.',
    color: '#6f8e9b',
    stats: {
      vitality: 31,
      force: 9,
      guard: 11,
      tempo: 7,
    },
    moves: [
      {
        level: 1,
        moveId: 'signal-nudge',
      },
      {
        level: 1,
        moveId: 'sig-019',
      },
      {
        level: 4,
        moveId: 'sidestep',
      },
      {
        level: 7,
        moveId: 'signal-surge',
      },
    ],
    signature: 'sig-019',
    rarity: 'uncommon',
  },
  {
    id: '020',
    name: 'Kettleswoop',
    animal: 'Broad-winged hawk',
    affinity: 'Anchor',
    role: 'Thermal-position defender',
    habitat: 'Bellwether Field ridge thermals',
    range:
      'Breeds in eastern North American forests; many migrate through Central America to winter in South America.',
    biology:
      'Broad-winged hawks hunt from forest perches and migrate in large soaring groups called kettles. Rising warm air helps them gain altitude.',
    fantasy:
      'Its broad wings cup a small pocket of rising air into a stable platform before it settles into a guarded glide.',
    personality:
      'Practical and cooperative; waits for the right updraft rather than arguing with the wind.',
    description:
      'Its broad wings cup a small pocket of rising air into a stable platform before it settles into a guarded glide.',
    color: '#ac8761',
    stats: {
      vitality: 28,
      force: 9,
      guard: 12,
      tempo: 8,
    },
    moves: [
      {
        level: 1,
        moveId: 'anchor-nudge',
      },
      {
        level: 1,
        moveId: 'sig-020',
      },
      {
        level: 4,
        moveId: 'read-room',
      },
      {
        level: 7,
        moveId: 'anchor-surge',
      },
    ],
    signature: 'sig-020',
    rarity: 'uncommon',
  },
  {
    id: '021',
    name: 'Thrumble',
    animal: 'Ruby-throated hummingbird',
    affinity: 'Skitter',
    role: 'Hovering precision; starter',
    habitat: 'Bellwether Field flowers; Latchleaf starter station',
    range: 'Breeds in eastern North America and winters mainly in Mexico and Central America.',
    biology:
      'Ruby-throated hummingbirds hover while feeding on nectar and also eat tiny arthropods. Males have an iridescent red throat whose appearance depends on light.',
    fantasy:
      'Its throat patch marks a precise airborne beat, letting it stop and jab within a thumb-sized space.',
    personality:
      'Energetic and particular; inspects every flower as though reviewing a restaurant.',
    description:
      'Its throat patch marks a precise airborne beat, letting it stop and jab within a thumb-sized space.',
    color: '#71a69a',
    stats: {
      vitality: 25,
      force: 10,
      guard: 7,
      tempo: 14,
    },
    moves: [
      {
        level: 1,
        moveId: 'skitter-nudge',
      },
      {
        level: 1,
        moveId: 'sig-021',
      },
      {
        level: 4,
        moveId: 'brace',
      },
      {
        level: 7,
        moveId: 'skitter-surge',
      },
    ],
    signature: 'sig-021',
    rarity: 'common',
  },
  {
    id: '022',
    name: 'Stiltscribe',
    animal: 'Great blue heron',
    affinity: 'Anchor',
    role: 'Patient precision breaker',
    habitat: 'Sluicefen shallows; Farcurrent Strand mud edge',
    range:
      'Much of North and Central America and parts of the Caribbean; also reaches northern South America.',
    biology:
      'Great blue herons stalk shallow water and seize prey with a rapid bill strike. They fly with the neck folded and have long legs for wading.',
    fantasy:
      'Its bill draws a fine line over the water, marking the one angle where its next strike will not splash.',
    personality: 'Deliberate and exacting; refuses to sign a notebook until the ink has dried.',
    description:
      'Its bill draws a fine line over the water, marking the one angle where its next strike will not splash.',
    color: '#879aa5',
    stats: {
      vitality: 28,
      force: 13,
      guard: 10,
      tempo: 6,
    },
    moves: [
      {
        level: 1,
        moveId: 'anchor-nudge',
      },
      {
        level: 1,
        moveId: 'sig-022',
      },
      {
        level: 4,
        moveId: 'read-room',
      },
      {
        level: 7,
        moveId: 'anchor-surge',
      },
    ],
    signature: 'sig-022',
    rarity: 'uncommon',
  },
  {
    id: '023',
    name: 'Rumbison',
    animal: 'American bison',
    affinity: 'Skitter',
    role: 'Momentum burst specialist',
    habitat: 'Farcurrent Strand meadow sanctuary; Foldwater visitor',
    range:
      'Historically widespread in North American grasslands and some woodlands; present herds occupy scattered managed and wild ranges.',
    biology:
      'American bison graze and have a prominent shoulder hump, shaggy forequarters, and short horns. Despite their size they can run quickly.',
    fantasy:
      'Its loose shoulder mane gathers the rustle of grass into a rolling cushion that kicks its first stride forward.',
    personality:
      'Companionable and enthusiastic; has a poor estimate of how wide a gate ought to be.',
    description:
      'Its loose shoulder mane gathers the rustle of grass into a rolling cushion that kicks its first stride forward.',
    color: '#9c7655',
    stats: {
      vitality: 38,
      force: 13,
      guard: 6,
      tempo: 10,
    },
    moves: [
      {
        level: 1,
        moveId: 'skitter-nudge',
      },
      {
        level: 1,
        moveId: 'sig-023',
      },
      {
        level: 4,
        moveId: 'brace',
      },
      {
        level: 7,
        moveId: 'skitter-surge',
      },
    ],
    signature: 'sig-023',
    rarity: 'visitor',
  },
  {
    id: '024',
    name: 'Choruswake',
    animal: 'Humpback whale',
    affinity: 'Signal',
    role: 'Resonant recovery support',
    habitat: 'Farcurrent Strand offshore Foldwater window',
    range:
      'Oceans worldwide; populations migrate between feeding and breeding areas, including the North Atlantic and North Pacific.',
    biology:
      'Humpback whales are baleen whales with long pectoral fins. They feed on small schooling animals, and males produce complex patterned songs.',
    fantasy:
      'Its song smooths Foldwater ripples into a calm breathing interval. A small watery presence visits battle while its full body remains offshore.',
    personality: 'Warm, curious, and politely willing to repeat a verse for people taking notes.',
    description:
      'Its song smooths Foldwater ripples into a calm breathing interval. A small watery presence visits battle while its full body remains offshore.',
    color: '#6e92a4',
    stats: {
      vitality: 37,
      force: 8,
      guard: 8,
      tempo: 9,
    },
    moves: [
      {
        level: 1,
        moveId: 'signal-nudge',
      },
      {
        level: 1,
        moveId: 'sig-024',
      },
      {
        level: 4,
        moveId: 'sidestep',
      },
      {
        level: 7,
        moveId: 'signal-surge',
      },
    ],
    signature: 'sig-024',
    rarity: 'visitor',
  },
  {
    id: '025',
    name: 'Needlegape',
    animal: 'Alligator gar',
    affinity: 'Anchor',
    role: 'Armored high-force ambusher',
    habitat: 'Farcurrent Strand freshwater sanctuary channel; Foldwater visitor',
    range:
      'Lower Mississippi basin and Gulf coastal drainages of the southern United States and northeastern Mexico.',
    biology:
      'Alligator gars have broad tooth-filled snouts and hard ganoid scales. Their vascularized swim bladders allow them to take air from the surface.',
    fantasy:
      'Its overlapping scales hold a straight pressure seam that snaps forward when it opens its broad jaws.',
    personality:
      'Unflappable and economical; considers one successful motion a full afternoon of work.',
    description:
      'Its overlapping scales hold a straight pressure seam that snaps forward when it opens its broad jaws.',
    color: '#92966c',
    stats: {
      vitality: 34,
      force: 14,
      guard: 11,
      tempo: 5,
    },
    moves: [
      {
        level: 1,
        moveId: 'anchor-nudge',
      },
      {
        level: 1,
        moveId: 'sig-025',
      },
      {
        level: 4,
        moveId: 'read-room',
      },
      {
        level: 7,
        moveId: 'anchor-surge',
      },
    ],
    signature: 'sig-025',
    rarity: 'visitor',
  },
  {
    id: '026',
    name: 'Kitespan',
    animal: 'Manta ray',
    affinity: 'Anchor',
    role: 'Current-shelter defender',
    habitat: 'Farcurrent Strand warm Foldwater window',
    range:
      'Giant manta rays occupy tropical, subtropical, and some temperate ocean waters worldwide; they are not routine cool woodland-inlet residents.',
    biology:
      'Giant manta rays are filter feeders. Their broad pectoral fins propel them, and their cephalic lobes help guide plankton-rich water toward the mouth.',
    fantasy:
      'Its cephalic lobes gather two little currents and spread them into a protective sheet beneath its wings.',
    personality:
      'Curious and welcoming; offers excellent shade and no comment on anyone’s swimming ability.',
    description:
      'Its cephalic lobes gather two little currents and spread them into a protective sheet beneath its wings.',
    color: '#708f9f',
    stats: {
      vitality: 33,
      force: 7,
      guard: 13,
      tempo: 9,
    },
    moves: [
      {
        level: 1,
        moveId: 'anchor-nudge',
      },
      {
        level: 1,
        moveId: 'sig-026',
      },
      {
        level: 4,
        moveId: 'read-room',
      },
      {
        level: 7,
        moveId: 'anchor-surge',
      },
    ],
    signature: 'sig-026',
    rarity: 'visitor',
  },
  {
    id: '027',
    name: 'Hingehaven',
    animal: 'Atlantic horseshoe crab',
    affinity: 'Anchor',
    role: 'Safe-stance recovery defender',
    habitat: 'Farcurrent Strand sandy shallows',
    range:
      'Atlantic and Gulf coasts of North America, from northeastern United States toward the Yucatan Peninsula.',
    biology:
      'Atlantic horseshoe crabs are chelicerates, not true crabs. Their long tail spine helps right the body, and book gills beneath the abdomen exchange gases.',
    fantasy:
      'The hinge between its shell sections rocks like a small shelter roof, pulling a restoring wash underneath.',
    personality:
      'Steady and accommodating; will patiently right an overturned bucket for no reward.',
    description:
      'The hinge between its shell sections rocks like a small shelter roof, pulling a restoring wash underneath.',
    color: '#a19879',
    stats: {
      vitality: 32,
      force: 7,
      guard: 13,
      tempo: 6,
    },
    moves: [
      {
        level: 1,
        moveId: 'anchor-nudge',
      },
      {
        level: 1,
        moveId: 'sig-027',
      },
      {
        level: 4,
        moveId: 'read-room',
      },
      {
        level: 7,
        moveId: 'anchor-surge',
      },
    ],
    signature: 'sig-027',
    rarity: 'common',
  },
  {
    id: '028',
    name: 'Clackadier',
    animal: 'American lobster',
    affinity: 'Anchor',
    role: 'Asymmetric claw bruiser',
    habitat: 'Farcurrent Strand rocky pools',
    range:
      'Northwestern Atlantic coast, principally from Labrador to the northeastern United States and farther south offshore.',
    biology:
      'American lobsters have a large crushing claw and a narrower cutting claw. They grow by molting and use chemical senses to investigate food and other lobsters.',
    fantasy:
      'Its two claws click different notes; the narrow claw measures a gap before the broad claw closes it with a tidy thump.',
    personality: 'Businesslike and easily pleased by a well-fitted lid.',
    description:
      'Its two claws click different notes; the narrow claw measures a gap before the broad claw closes it with a tidy thump.',
    color: '#977b62',
    stats: {
      vitality: 29,
      force: 13,
      guard: 11,
      tempo: 6,
    },
    moves: [
      {
        level: 1,
        moveId: 'anchor-nudge',
      },
      {
        level: 1,
        moveId: 'sig-028',
      },
      {
        level: 4,
        moveId: 'read-room',
      },
      {
        level: 7,
        moveId: 'anchor-surge',
      },
    ],
    signature: 'sig-028',
    rarity: 'common',
  },
  {
    id: '029',
    name: 'Curlcourier',
    animal: 'Lined seahorse',
    affinity: 'Skitter',
    role: 'Stationary precision opportunist',
    habitat: 'Farcurrent Strand eelgrass beds',
    range:
      'Western Atlantic coastal waters, including the eastern United States, Gulf of Mexico, and Caribbean region.',
    biology:
      'Lined seahorses hold vegetation with a prehensile tail and suck small prey through a tubular snout. Males brood developing young in a pouch.',
    fantasy:
      'Its tail stores a single loop of current; releasing the loop sends a precise little parcel of water to the chosen opening.',
    personality:
      'Gentle and dependable; delivers found objects to the wrong desk with great confidence.',
    description:
      'Its tail stores a single loop of current; releasing the loop sends a precise little parcel of water to the chosen opening.',
    color: '#bba16a',
    stats: {
      vitality: 25,
      force: 11,
      guard: 8,
      tempo: 11,
    },
    moves: [
      {
        level: 1,
        moveId: 'skitter-nudge',
      },
      {
        level: 1,
        moveId: 'sig-029',
      },
      {
        level: 4,
        moveId: 'brace',
      },
      {
        level: 7,
        moveId: 'skitter-surge',
      },
    ],
    signature: 'sig-029',
    rarity: 'uncommon',
  },
  {
    id: '030',
    name: 'Ochreprise',
    animal: 'Ochre sea star',
    affinity: 'Anchor',
    role: 'Adhesive recovery specialist',
    habitat: 'Farcurrent Strand cold research pool; Foldwater visitor',
    range:
      'Rocky intertidal shores of the northeastern Pacific, from Alaska to Baja California; not native to the Atlantic.',
    biology:
      'Ochre sea stars use many tube feet to grip surfaces and handle prey such as mussels. They are important rocky-shore predators and can regenerate damaged arms over time.',
    fantasy:
      'Its tube feet stitch a temporary star-shaped grip into a ripple, recovering vitality while holding its position.',
    personality:
      'Persistent and quietly curious; finishes one task before deciding which direction was forward.',
    description:
      'Its tube feet stitch a temporary star-shaped grip into a ripple, recovering vitality while holding its position.',
    color: '#bd865e',
    stats: {
      vitality: 31,
      force: 8,
      guard: 12,
      tempo: 5,
    },
    moves: [
      {
        level: 1,
        moveId: 'anchor-nudge',
      },
      {
        level: 1,
        moveId: 'sig-030',
      },
      {
        level: 4,
        moveId: 'read-room',
      },
      {
        level: 7,
        moveId: 'anchor-surge',
      },
    ],
    signature: 'sig-030',
    rarity: 'visitor',
  },
];

export const STARTERS = ['003', '005', '021'] as const;

export function getCromon(id: string): Cromon {
  const species = ROSTER.find((entry) => entry.id === id);
  if (!species) throw new Error(`Unknown Cromon: ${id}`);
  return species;
}
