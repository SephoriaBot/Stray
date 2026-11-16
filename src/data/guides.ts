export type GuideStep = { title: string; text: string; link?: { to: string; label: string } }

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
            link: { to: '/flyer', label: 'Make a flyer' },
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
  {
    slug: 'weather-shelter',
    title: 'Build a weather shelter',
    summary: 'A detailed outdoor shelter for cold, rain, wind, and heat.',
    ready: true,
    intro: 'This is a longer, step by step build for an animal that has to stay outside for a while. It is a bridge until the animal can go indoors, be claimed, or be taken in by a shelter.',
    sections: [
      {
        heading: 'Before you build',
        bullets: [
          'Smaller is warmer. An animal heats the inside with its own body, so a tight space holds heat better than a big one.',
          'Pick the shelter for the season. A winter shelter packed with insulation can turn into an oven in summer.',
          'Never trap an animal inside. It needs to be able to leave on its own.',
          'Check your local rules. Some cities limit feeding or outdoor structures for community cats.',
        ],
      },
      {
        heading: 'What you need for a cat shelter',
        bullets: [
          'One 18 to 20 gallon plastic storage tote with a lid',
          'Rigid foam insulation board, about 1 inch thick (found at hardware stores)',
          'Straw, not hay. Straw is hollow and stays dry. Hay holds moisture and gets moldy.',
          'A box cutter or utility knife, a pen, and a ruler',
          'Duct tape or strong waterproof tape',
          'Two bricks, a pallet, or a few blocks to lift it off the ground',
          'Optional: a heavy plastic flap for the door, such as a cut up shower curtain liner',
        ],
      },
      {
        heading: 'Build a cold weather cat shelter',
        steps: [
          {
            title: 'Cut the foam to fit',
            text: 'Cut foam boards to cover the floor, all four walls, and the lid. Trim each piece so it fits snugly inside the tote with no big gaps.',
          },
          {
            title: 'Cut the door in the tote',
            text: 'Mark a door about 6 inches wide and 6 inches tall on one short side, about 3 inches up from the bottom. A raised bottom edge keeps rain and snow from blowing in. Cut it out with the knife. A 6 inch door is big enough for a cat and keeps most larger animals out.',
          },
          {
            title: 'Cut the same door in the foam',
            text: 'Hold the foam wall piece against the cut tote wall, trace the door onto it, and cut it out. The two holes should line up.',
          },
          {
            title: 'Line the inside',
            text: 'Fit the foam pieces into the floor and walls. Tape the seams with duct tape so there are no cracks for cold air to get through. Put the last foam piece against the lid so the lid is insulated too.',
          },
          {
            title: 'Fill with straw',
            text: 'Stuff in a thick layer of loose straw, about 4 to 6 inches deep. Leave a small open space near the door so the cat can walk in and burrow into the straw. Fluff it and do not pack it down tight.',
          },
          {
            title: 'Close it up',
            text: 'Put the lid on and snap it shut. If your tote does not have snaps, put a brick or heavy rock on top so wind cannot flip it off.',
          },
          {
            title: 'Raise it off the ground',
            text: 'Set the tote on a pallet, bricks, or blocks so the floor is at least 2 to 3 inches up. The ground pulls heat out fast, and a raised floor stays drier.',
          },
          {
            title: 'Pick a good spot',
            text: 'Put it against a wall, a fence, or under a covered porch if you can. Point the door away from the wind and toward a spot the cat can see from, with an easy way out.',
          },
        ],
        note: 'Do not use blankets, towels, or fleece inside. They soak up moisture, freeze, and pull heat out of the animal. Straw is the safe choice.',
      },
      {
        heading: 'Add a door flap for wind and snow',
        steps: [
          {
            title: 'Cut a flap',
            text: 'Cut a rectangle of heavy plastic about 2 inches wider and taller than the door hole.',
          },
          {
            title: 'Tape the top edge',
            text: 'Tape only the top edge of the flap above the door on the outside. It should hang down and swing open when the animal pushes through.',
          },
          {
            title: 'Let the cat learn it',
            text: 'Tape the flap up out of the way for the first few days so the cat gets used to the shelter. Then lower it.',
          },
        ],
      },
      {
        heading: 'Rain and wind protection',
        bullets: [
          'Keep the door facing away from the direction the wind usually blows.',
          'Put a board, a piece of plywood, or a tarp over the shelter as a roof, and slope it so rain runs off. Leave air space between the tarp and the lid.',
          'Check that water is not pooling under the shelter. Move it to higher ground if it is.',
          'If you are in a snowy area, clear snow away from the door each day.',
        ],
      },
      {
        heading: 'A shelter for a dog',
        steps: [
          {
            title: 'Choose the right size',
            text: 'The dog should be able to stand up, turn around, and lie down. Anything much bigger is hard for the dog to keep warm.',
          },
          {
            title: 'Use a sturdy base',
            text: 'A dog house, a strong plastic crate, or a wooden box all work. Raise it on bricks or a pallet so the floor stays dry.',
          },
          {
            title: 'Block the wind',
            text: 'Hang a heavy plastic or rubber flap over the door. Face the door away from the wind. Cover the top with a tarp or a board.',
          },
          {
            title: 'Add straw',
            text: 'Fill the floor with a deep layer of straw. Replace it when it gets damp.',
          },
          {
            title: 'Bring the dog in if you can',
            text: 'A dog should not stay outside for long in freezing weather. Use the shelter while you wait for the owner, a shelter, or a foster.',
          },
        ],
      },
      {
        heading: 'A shelter for hot weather',
        steps: [
          {
            title: 'Take out the winter gear',
            text: 'Do not use foam insulation, straw, or a closed lid in summer. Heat gets trapped inside.',
          },
          {
            title: 'Make shade',
            text: 'Set up a tarp, an umbrella, or a board on poles to shade a spot on the ground, ideally under a tree or against the cool side of a building.',
          },
          {
            title: 'Let air move',
            text: 'Open at least two sides so air can pass through. Keep the animal off hot pavement or metal.',
          },
          {
            title: 'Give plenty of water',
            text: 'Use heavy bowls that will not tip over. Put out more than one, and refill them in the morning and evening. Keep them in the shade.',
          },
          {
            title: 'Offer a cool place to lie',
            text: 'A damp towel on the ground in the shade or a shallow dish of cool water can help. Do not use ice cold water or ice.',
          },
        ],
      },
      {
        heading: 'Check on it each day',
        bullets: [
          'Swap out wet or dirty straw right away.',
          'Look for leaks, cracks, and anything that has blown loose.',
          'Make sure the door is not blocked by snow, mud, or leaves.',
          'Keep fresh water close by. In freezing weather, use a deep bowl and bring fresh water out often, because it freezes.',
        ],
      },
      {
        heading: 'Do not use',
        bullets: [
          'Heat lamps. They are a fire risk and can burn an animal.',
          'Electric heating pads or cords outdoors. Animals chew cords, and water makes them dangerous.',
          'Hay, blankets, towels, or newspaper as bedding in cold weather.',
          'Anything with a closed door that locks the animal in.',
        ],
      },
      {
        heading: 'Signs the cold is hurting it',
        bullets: [
          'Shivering that will not stop, or the opposite: the animal has stopped shivering and is very sleepy.',
          'Cold ears, paws, or tail. They may look pale or gray.',
          'Slow walking, stiff movement, or stumbling.',
        ],
        note: 'If you see these signs, wrap the animal in dry towels and keep it somewhere warm and indoors. A water bottle filled with warm (not hot) water and wrapped in cloth can help. Call a vet right away.',
      },
      {
        heading: 'Signs the heat is hurting it',
        bullets: [
          'Heavy panting, drooling, or a bright red tongue and gums.',
          'Weakness, wobbling, vomiting, or collapse.',
          'Very hot skin, or no interest in water.',
        ],
        note: 'Move the animal into the shade or somewhere cool right away. Wet its paws and belly with cool (not ice cold) water and point a fan at it. Call a vet right away. Heatstroke can be fatal.',
      },
    ],
  },
  {
    slug: 'first-aid',
    title: 'Basic first aid',
    summary: 'Safe steps for bleeding, broken bones, poison, and more until a vet can help.',
    ready: true,
    intro: 'First aid only buys time. Keep yourself safe, keep the animal calm, and get it to a vet as soon as you can.',
    sections: [
      {
        heading: 'Stay safe first',
        bullets: [
          'A hurt animal is scared and in pain. Even a gentle one may bite or scratch.',
          'Move slowly, speak softly, and do not put your face near its mouth.',
          'If it growls, snaps, or hides, do not force it. Call animal control or a rescue for help.',
          'Never handle an animal that is acting strange, foaming at the mouth, or having trouble walking. It could have rabies.',
        ],
      },
      {
        heading: 'Pick it up safely',
        steps: [
          {
            title: 'Cover it with a towel or blanket',
            text: 'Lay a towel gently over the animal, including its head. Covering the eyes often calms it.',
          },
          {
            title: 'Support the whole body',
            text: 'Slide your hands under the chest and hips and lift it as one piece. Do not drag it or pull on a leg.',
          },
          {
            title: 'Put it in a box or carrier',
            text: 'Use a carrier, a sturdy box with air holes, or a laundry basket with a towel in the bottom. For a large dog, slide a board or a blanket under it and carry it with a helper.',
          },
          {
            title: 'Call ahead',
            text: 'Call the nearest vet or emergency clinic so they can get ready. Drive carefully and keep the car quiet.',
          },
        ],
      },
      {
        heading: 'Bleeding',
        steps: [
          {
            title: 'Press on the wound',
            text: 'Hold a clean cloth or gauze firmly against it. Do not lift it to check. If blood soaks through, add more cloth on top.',
          },
          {
            title: 'Keep pressing',
            text: 'Press steadily for at least 5 to 10 minutes. Head to a vet right away while you keep pressing.',
          },
          {
            title: 'Do not use a tight wrap',
            text: 'Do not tie anything tight around a leg or tail. It can cut off blood flow.',
          },
        ],
        note: 'Spurting blood, a wound that will not stop bleeding, or a deep wound is an emergency.',
      },
      {
        heading: 'Broken bones or a hit by a car',
        bullets: [
          'Keep the animal as still as you can. Do not try to straighten a leg.',
          'Cover it with a blanket to keep it warm.',
          'Move it on a flat surface like a board or a firm blanket.',
          'Even if it seems fine, take it to a vet. Injuries inside the body are not always easy to see.',
        ],
      },
      {
        heading: 'Poison',
        bullets: [
          'Call a vet or a poison hotline right away. The ASPCA Animal Poison Control Center is 888-426-4435 and the Pet Poison Helpline is 855-764-7661. They may charge a fee.',
          'Do not make the animal vomit unless a vet or a poison expert tells you to.',
          'If you can, take the package or a photo of what it ate.',
        ],
      },
      {
        heading: 'Seizure',
        bullets: [
          'Stay calm and keep your hands away from its mouth. It cannot swallow its tongue.',
          'Move away furniture and anything it could hit. Dim the lights and keep the room quiet.',
          'Note how long it lasts. Call a vet if it lasts more than 2 or 3 minutes, or if there is another one soon after.',
        ],
      },
      {
        heading: 'Choking',
        bullets: [
          'Signs include pawing at the mouth, gagging, and trouble breathing.',
          'If you can see the object and it is easy to reach, remove it carefully. Do not reach in blind.',
          'Rush to a vet if it is still struggling to breathe.',
        ],
      },
      {
        heading: 'Heat and cold',
        bullets: [
          'For heatstroke or heavy panting, move it into the shade and wet it with cool (not ice cold) water.',
          'For a cold, shivering animal, wrap it in dry towels and keep it somewhere warm indoors.',
          'See the weather shelter guide for more signs and steps.',
        ],
      },
      {
        heading: 'Do not',
        bullets: [
          'Give human medicine such as ibuprofen, acetaminophen, or aspirin. Many are poisonous to animals.',
          'Give food or water to an animal that is vomiting, very sleepy, or having a seizure.',
          'Wash a deep wound with harsh cleaners or hydrogen peroxide.',
          'Wait and see if it gets better when the injury looks serious.',
        ],
        note: 'If you get bitten or scratched, wash the wound with soap and water for several minutes and call a doctor, especially if you do not know whose animal it is.',
      },
    ],
  },
]