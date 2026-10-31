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
    ready: true,
    intro: 'The right call depends on the animal and what is wrong. Here is who handles what.',
    sections: [
      {
        steps: [
          {
            title: 'Animal control',
            text: 'For stray, loose, or aggressive animals, and for hurt strays you cannot safely handle. Search for your city or county name plus "animal control". If there is none, call the police non-emergency line.',
          },
          {
            title: 'Local animal shelter or humane society',
            text: 'For a found pet report, a microchip scan, and advice about what to do next. Owners often check here first.',
          },
          {
            title: 'Emergency vet',
            text: 'For a hurt or very sick animal. Call ahead so they can get ready, and ask what they do for strays.',
          },
          {
            title: 'Wildlife rescue',
            text: 'For wild animals such as raccoons, foxes, and birds. Search for "wildlife rehabilitator" plus your state, or call your state wildlife agency.',
          },
          {
            title: '911',
            text: 'Only if a person is in danger or has been bitten. If you were bitten, get medical care right away.',
          },
        ],
      },
      {
        heading: 'What to tell them',
        bullets: [
          'Exactly where the animal is, with a street name or landmark.',
          'What kind of animal it is, how big, and what color.',
          'What is wrong, and whether it is in danger right now.',
          'Whether it is friendly, scared, or aggressive.',
          'Your phone number, in case they need to call you back.',
        ],
      },
      {
        heading: 'Good to know',
        bullets: [
          'If your city has a 311 line, it can often connect you to animal services.',
          'Use the Shelters tab in this app to find shelters near you.',
          'Poison hotline numbers are on the Emergency page.',
        ],
      },
    ],
  },
  {
    slug: 'make-a-shelter',
    title: 'Make a temporary shelter',
    summary: 'Keep an animal warm and dry until help arrives.',
    ready: true,
    intro: 'A shelter is a short-term fix. It does not replace a vet, a shelter, or a home.',
    sections: [
      {
        heading: 'For tonight, indoors',
        steps: [
          {
            title: 'Pick a safe room',
            text: 'Use a bathroom, laundry room, or garage with the door closed, or a crate or carrier. Remove anything dangerous, like cleaning products or antifreeze.',
          },
          {
            title: 'Add a soft bed',
            text: 'Put down towels or a blanket you do not mind losing.',
          },
          {
            title: 'Add water, and a toilet spot for cats',
            text: 'Use a shallow bowl of fresh water. For a cat, add a shallow tray with litter or soil.',
          },
          {
            title: 'Keep it quiet',
            text: 'Keep the room warm, calm, and dim. Check on the animal, but do not crowd it.',
          },
        ],
      },
      {
        heading: 'Outdoors in cold weather',
        steps: [
          {
            title: 'Start with a plastic tote',
            text: 'Use a storage tote with a lid. Cut a doorway about 6 inches wide in one side, a few inches up from the bottom.',
          },
          {
            title: 'Insulate it',
            text: 'Line the walls, floor, and lid with foam insulation board to hold in heat.',
          },
          {
            title: 'Fill it with straw',
            text: 'Use straw, not hay. Do not use blankets or towels, because they soak up moisture and turn cold.',
          },
          {
            title: 'Set it up',
            text: 'Lift it off the ground on a pallet or bricks. Put it against a wall with the door facing away from the wind.',
          },
          {
            title: 'Check it often',
            text: 'Replace the straw when it gets wet.',
          },
        ],
        note: 'For a dog, use a sturdy crate or dog house big enough to stand and turn around in. Block the wind and add straw.',
      },
      {
        heading: 'In hot weather',
        bullets: [
          'Give it shade, a cool place to lie down, and plenty of fresh water.',
          'Never leave an animal in a parked car.',
        ],
      },
    ],
  },
  {
    slug: 'food-and-water',
    title: 'Food and water',
    summary: 'What to offer and what to avoid.',
    ready: true,
    intro: 'Water first, then a small amount of food. If the animal is hurt, skip the food and call a vet.',
    sections: [
      {
        steps: [
          {
            title: 'Offer fresh water',
            text: 'Use a shallow bowl of clean water. Do not force the animal to drink.',
          },
          {
            title: 'Offer a small amount of food',
            text: 'Plain dog or cat food is best. A very thin animal should eat small amounts several times a day, because a big meal can make it sick.',
          },
          {
            title: 'No pet food? Keep it plain',
            text: 'For a dog, a small portion of plain cooked chicken and rice works for a day or two. For a cat, a small portion of plain cooked chicken. No seasoning.',
          },
          {
            title: 'Skip milk',
            text: 'Many cats and dogs cannot digest cow milk.',
          },
        ],
      },
      {
        heading: 'Never give',
        bullets: [
          'Chocolate',
          'Grapes and raisins',
          'Onions and garlic',
          'Sugar-free gum or candy (xylitol)',
          'Alcohol',
          'Cooked bones',
        ],
      },
      {
        heading: 'Call a vet instead if',
        bullets: [
          'The animal is hurt, vomiting, or very sleepy.',
          'It is a newborn kitten or puppy. They need special formula and care.',
        ],
      },
    ],
  },
]
