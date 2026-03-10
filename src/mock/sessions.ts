import { Session } from '../types';

export const mockSessions: Session[] = [
  // Mathematics sessions
  {
    id: 'ses1',
    lessonId: 'l1',
    sessionNumber: 1,
    topic: 'Introduction to Algebra',
    date: '2024-01-10',
    summary:
      'We covered the fundamentals of algebraic expressions including variables, constants, and basic operations. Students practised solving simple linear equations and learned to identify like terms. By the end of the session, the student could solve one-step equations confidently.',
    duration: '45 min',
  },
  {
    id: 'ses2',
    lessonId: 'l1',
    sessionNumber: 2,
    topic: 'Quadratic Equations',
    date: '2024-01-17',
    summary:
      'This session focused on quadratic equations, exploring both the factorisation method and the quadratic formula. We worked through multiple examples and identified the discriminant to determine the nature of roots. The student showed strong analytical thinking throughout the session.',
    duration: '45 min',
  },
  {
    id: 'ses3',
    lessonId: 'l1',
    sessionNumber: 3,
    topic: 'Geometry: Triangles & Circles',
    date: '2024-01-24',
    summary:
      "We explored properties of triangles including congruence and similarity theorems, then moved to circle geometry covering chords, arcs, and tangents. The student solved a series of proof-based problems to reinforce conceptual understanding. Today's session boosted spatial reasoning skills significantly.",
    duration: '45 min',
  },
  // Physics sessions
  {
    id: 'ses4',
    lessonId: 'l2',
    sessionNumber: 1,
    topic: "Newton's Laws of Motion",
    date: '2024-01-11',
    summary:
      "We revisited Newton's three laws of motion with real-world examples such as car acceleration and rocket propulsion. The student used free body diagrams to analyse forces on objects. Calculations involving net force, mass, and acceleration were practised extensively.",
    duration: '45 min',
  },
  {
    id: 'ses5',
    lessonId: 'l2',
    sessionNumber: 2,
    topic: 'Work, Energy & Power',
    date: '2024-01-18',
    summary:
      'This session covered the concepts of work done by a force, kinetic and potential energy, and the work–energy theorem. We derived the formula for power and applied it to practical scenarios. The student understood the conservation of mechanical energy through guided problem solving.',
    duration: '45 min',
  },
  {
    id: 'ses6',
    lessonId: 'l2',
    sessionNumber: 3,
    topic: 'Waves and Sound',
    date: '2024-01-25',
    summary:
      'We studied transverse and longitudinal waves, frequency, wavelength, and the relationship to wave speed. The Doppler effect was explained using animated examples and practical sound scenarios. The student completed wave calculation problems with good accuracy by the end of the session.',
    duration: '45 min',
  },
  // English sessions
  {
    id: 'ses7',
    lessonId: 'l3',
    sessionNumber: 1,
    topic: 'Essay Writing Fundamentals',
    date: '2024-01-12',
    summary:
      'We explored the structure of a well-written essay including introduction, body paragraphs, and conclusion. The student learned to craft topic sentences and support them with evidence. A short practice essay was reviewed together and improved with constructive feedback.',
    duration: '45 min',
  },
  {
    id: 'ses8',
    lessonId: 'l3',
    sessionNumber: 2,
    topic: 'Grammar: Tenses and Voice',
    date: '2024-01-19',
    summary:
      'This session focused on tense consistency in writing and the active versus passive voice. We corrected common grammatical errors through targeted exercises. By the end, the student could identify and fix voice and tense issues in sample paragraphs independently.',
    duration: '45 min',
  },
  {
    id: 'ses9',
    lessonId: 'l3',
    sessionNumber: 3,
    topic: 'Poetry Analysis',
    date: '2024-01-26',
    summary:
      "We analysed two poems studying tone, imagery, metaphor, and structural choices. The student wrote a short analytical paragraph comparing both poems' themes. This session significantly developed the student's ability to interpret figurative language in literary texts.",
    duration: '45 min',
  },
  // Chemistry sessions
  {
    id: 'ses10',
    lessonId: 'l4',
    sessionNumber: 1,
    topic: 'Periodic Table & Elements',
    date: '2024-01-13',
    summary:
      'We explored the structure of the periodic table focusing on periods, groups, and the properties that change across them. The student memorised the first 20 elements and their symbols through interactive quizzes. Trends in atomic radius, electronegativity, and ionisation energy were discussed.',
    duration: '45 min',
  },
  {
    id: 'ses11',
    lessonId: 'l4',
    sessionNumber: 2,
    topic: 'Chemical Bonding',
    date: '2024-01-20',
    summary:
      'This session covered ionic, covalent, and metallic bonding with detailed diagrams and electron dot structures. We compared the physical properties of ionically and covalently bonded compounds. The student constructed Lewis dot structures for several molecules to reinforce the concept.',
    duration: '45 min',
  },
  {
    id: 'ses12',
    lessonId: 'l4',
    sessionNumber: 3,
    topic: 'Acids, Bases & Salts',
    date: '2024-01-27',
    summary:
      'We studied the pH scale, properties of acids and bases, and neutralisation reactions. The student performed a virtual titration experiment and calculated the concentration of an unknown acid. Real-world examples like antacids and vinegar were used to make the concepts relatable.',
    duration: '45 min',
  },
  // Biology sessions
  {
    id: 'ses13',
    lessonId: 'l5',
    sessionNumber: 1,
    topic: 'Cell Structure & Function',
    date: '2024-01-14',
    summary:
      'We examined animal and plant cell structures using detailed labelled diagrams and compared their organelles. The function of each organelle was discussed with emphasis on the mitochondria and chloroplasts. The student drew well-labelled cell diagrams from memory by the end of the session.',
    duration: '45 min',
  },
  {
    id: 'ses14',
    lessonId: 'l5',
    sessionNumber: 2,
    topic: 'Genetics & Heredity',
    date: '2024-01-21',
    summary:
      "This session introduced Mendelian genetics, covering dominant and recessive traits, genotypes, and phenotypes. We used Punnett squares to predict offspring ratios for monohybrid crosses. The student solved multiple genetics problems and understood the logic behind Mendel's laws.",
    duration: '45 min',
  },
  {
    id: 'ses15',
    lessonId: 'l5',
    sessionNumber: 3,
    topic: 'Ecosystems & Food Chains',
    date: '2024-01-28',
    summary:
      'We explored ecosystems, biomes, food chains, and food webs including the flow of energy between trophic levels. The student identified producers, consumers, and decomposers in multiple ecosystem examples. The impact of human activities on biodiversity and ecosystem stability was also discussed.',
    duration: '45 min',
  },
];
