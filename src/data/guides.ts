export type GuideStep = { title: string; text: string }

export type GuideSection = {
  heading?: string
  steps?: GuideStep[]
  bullets?: string[]
  note?: string
}

export type Guide = {
  slug: string
  title: string
  summary: string
  ready: boolean
  intro: string
  sections: GuideSection[]
}

export const guides: Guide[] = [
  {
    slug: 'what-to-do-first',
    title: 'What to do first',
    summary: 'Approach safely, check for ID, and help the animal get home.',
    ready: true,
    intro: 'Most animals that look like strays have a home. These steps give the owner the best chance of finding it.',
    sections: [
      {
        steps: [
          {
            title: 'Look from a distance',
            text: 'Is it hurt, very thin, or acting strange? If so, use the emergency steps instead. A cat with a clipped ear tip has usually been neutered through a community cat program and may be doing fine outdoors.',
          },
          {
            title: 'Approach slowly and calmly',
            text: 'Crouch down, turn your body a little to the side, and speak softly. Let it come to you. Back away if it growls, hisses, or goes stiff. Do not chase it, corner it, or force it into a car.',
          },
          {
            title: 'Check for ID',
            text: 'Look for a collar and tag. If there is a phone number, call it.',
          },
          {
            title: 'Get it scanned for a microchip',
            text: 'Many vets, shelters, and pet supply stores will scan for a microchip for free. Call ahead. Move the animal in a carrier or on a leash.',
          },
          {
            title: 'Keep it safe for now',
            text: 'Use a closed room with water, a little food, and a blanket. Keep it away from your own pets and from children. Wash your hands after you handle it.',
          },
          {
            title: 'Take photos and notes',
            text: 'Take photos from several sides. Write down where and when you found it.',
          },
          {
            title: 'Report it',
            text: 'Call your local animal shelter or animal control and file a found pet report. Owners usually check there first. Ask how they handle found animals.',
          },
          {
            title: 'Spread the word',
            text: 'Post on neighborhood apps and local lost pet groups. Put up flyers within about a mile of where you found it. Leave one detail off the flyer, like a marking, so you can tell who the real owner is.',
          },
          {
            title: 'Plan the next step',
            text: 'If no one claims it, ask the shelter what your options are. Rules about holding found animals are different in every area, so check before you decide to keep it or place it.',
          },
        ],
      },
      {
        heading: 'Kittens and puppies',
        bullets: [
          'Kittens alone are often not abandoned. Their mother may be nearby finding food.',
          'Watch from a distance for a few hours before you take them in, unless they are in danger or look sick.',
        ],
      },
      {
        heading: 'Not a cat or a dog?',
        bullets: [
          'Do not handle wild animals such as raccoons, foxes, or birds.',
          'Call wildlife rescue or animal control.',
        ],
      },
    ],
  },
  {
    slug: 'who-to-call',
    title: 'Who to call',
    summary: 'Animal control, shelters, vets, and wildlife rescue.',
    ready: false,
    intro: '',
    sections: [],
  },
  {
    slug: 'make-a-shelter',
    title: 'Make a temporary shelter',
    summary: 'Keep an animal warm and dry until help arrives.',
    ready: false,
    intro: '',
    sections: [],
  },
  {
    slug: 'food-and-water',
    title: 'Food and water',
    summary: 'What to offer and what to avoid.',
    ready: false,
    intro: '',
    sections: [],
  },
]
