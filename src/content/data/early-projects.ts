import type { Project } from "./projects";

// Earlier projects curated from Arnav's presentations, photographs and reports.
// Null years indicate that the source does not establish a reliable date.
export const earlyProjects: Project[] = [
  {
    slug: "solution-to-garbage",
    title: "Solution to Garbage",
    category: "Hardware & prototypes",
    date: "2022–2023",
    year: 2023,
    art: "blocks",
    image: "/assets/projects/solution-to-garbage/process-concept.jpeg",
    imageAlt:
      "Archived concept diagram connecting a waste-processing chamber, vacuum pump, power supply and downstream collection.",
    summary:
      "A school engineering exhibit exploring waste processing and material recovery.",
    description:
      "I worked on a waste-processing exhibit that connected a chamber-based treatment concept with ideas for collecting gases and reusing solid residue. The project grew through diagrams, a synopsis, presentations and a proposed business model. It was an early attempt to think about waste as a materials problem, rather than something that simply disappears after disposal.",
    contribution:
      "Helped develop and present the school exhibit, its process diagrams and its proposed applications with my team.",
    approach: [
      "Map the stages from waste input through treatment to separate output streams.",
      "Explore potential uses for recovered residue alongside the proposed processing system.",
      "Connect the exhibit to questions of energy input, emissions, operating cost and scale.",
    ],
    takeaway:
      "This is an archive of a student exhibit. The original title used 'pollution free'; the material here does not establish zero emissions, universal waste compatibility or commercially validated performance.",
    tech: [
      "Environmental engineering",
      "Process design",
      "Prototyping",
      "Resource recovery",
    ],
    gallery: [
      {
        src: "/assets/projects/solution-to-garbage/process-concept.jpeg",
        alt: "Original student process diagram for the waste-treatment exhibit.",
        caption:
          "The proposed process, preserved from the presentation; a concept diagram rather than a construction guide.",
      },
    ],
  },
  {
    slug: "green-power-house-plant",
    title: "Green Power House Plant",
    category: "Hardware & prototypes",
    date: "2021–2022",
    year: 2022,
    art: "network",
    image:
      "/assets/projects/green-power-house-plant/plant-experiment-cropped.jpeg",
    imageAlt: "Potted plants and connecting wires in the electrode experiment.",
    summary:
      "An early exploration of plants, soil, electrodes and electrical measurements.",
    description:
      "Green Power House Plant began with a question: could a planted system become part of how we think about energy? I assembled electrode experiments around potted plants, took multimeter readings and developed the work into school presentations. As part of Green Squad, I also presented the project for Smart India Hackathon Junior. A later Planet Saviors proposal explored pairing this direction with connected controls that reduce unnecessary electricity use.",
    contribution:
      "Led the Green Squad project, worked on the physical experiments and developed presentations around the idea. Contributed to the October 2022 Planet Saviors energy proposal.",
    approach: [
      "Build small electrode arrangements and document readings with a multimeter.",
      "Compare physical setups and explain the motivation through diagrams and demonstrations.",
      "Explore an additional 5G/IoT concept for monitoring and switching unnecessary electrical loads.",
    ],
    takeaway:
      "The photographs show early experiments and measurements. They do not establish sustained usable power, its source, or the national-scale generation estimates included in older pitches. The IoT extension was a proposal.",
    tech: [
      "Electrodes",
      "Electrical measurement",
      "Student research",
      "IoT concept",
    ],
    gallery: [
      {
        src: "/assets/projects/green-power-house-plant/plant-experiment-cropped.jpeg",
        alt: "Detail of the potted-plant electrode experiment.",
        caption: "The potted-plant setup, cropped to focus on the experiment.",
      },
      {
        src: "/assets/projects/green-power-house-plant/electrode-setup.jpeg",
        alt: "A potted plant connected to multimeter leads.",
        caption: "A closer view of the experimental setup.",
      },
    ],
  },
  {
    slug: "science-in-trash",
    title: "Science in Trash",
    category: "Hardware & prototypes",
    date: "2021",
    year: 2021,
    art: "blocks",
    image: "/assets/projects/science-in-trash/kit-box.jpeg",
    imageAlt:
      "The handmade Science in Trash activity kit in its decorated box.",
    summary:
      "A hands-on science kit built around everyday materials and learning by making.",
    description:
      "For Toycathon, we developed Science in Trash: a physical kit of simple models, reusable materials and illustrated activity manuals. The aim was to make scientific ideas tangible through activities such as balloon motion, spinning models and a small generator demonstration. The box brought those activities together into something a child could open, explore and build with.",
    contribution:
      "Worked with the school team on the kit, activity manuals, demonstrations and presentation. The archive includes the physical box and a recorded team walkthrough.",
    approach: [
      "Turn readily available materials into small, demonstrable science activities.",
      "Pair components with illustrated manuals and explanations of the ideas behind them.",
      "Present the kit as a connected learning experience rather than a collection of loose models.",
    ],
    takeaway:
      "The archive documents a student kit and Toycathon presentation. The original pricing and distribution ideas were proposals, not evidence of commercial sales or measured learning outcomes.",
    tech: [
      "Physical product design",
      "Science education",
      "Activity manuals",
      "Prototyping",
    ],
    gallery: [
      {
        src: "/assets/projects/science-in-trash/kit-box.jpeg",
        alt: "The closed Science in Trash kit box.",
        caption: "The handmade kit and packaging.",
      },
      {
        src: "/assets/projects/science-in-trash/kit-contents.jpeg",
        alt: "The opened kit containing simple materials and components.",
        caption: "Materials packed together for hands-on activities.",
      },
      {
        src: "/assets/projects/science-in-trash/activity-manuals.jpeg",
        alt: "A fan of printed Science in Trash activity booklets.",
        caption: "Illustrated manuals accompanying the activities.",
      },
      {
        src: "/assets/projects/science-in-trash/learning-models.jpeg",
        alt: "Several small models from the Science in Trash kit.",
        caption: "A selection of the physical learning models.",
      },
    ],
  },
  {
    slug: "atmospheric-water-harvesting",
    title: "Atmospheric Water Harvesting",
    category: "Hardware & prototypes",
    date: "2021",
    year: 2021,
    art: "cloud",
    image: "/assets/projects/atmospheric-water-harvesting/system-concept.png",
    imageAlt:
      "Student design diagram linking air condensation, water storage, filtration and a solar-assisted collection concept.",
    summary:
      "A student design exploring how moisture in the air could become a local water source.",
    description:
      "I developed a design and presentation around collecting atmospheric moisture, condensing it, storing the water and passing it through a proposed filtration stage. The concept also considered solar power and collecting rain or dew. It reflects an early interest in infrastructure that responds directly to everyday needs.",
    contribution:
      "Prepared the system illustrations, school presentation and narrated concept video.",
    approach: [
      "Map airflow, condensation, collection, filtration and storage as one system.",
      "Explore how a solar-assisted collection surface could support the design.",
      "Communicate the proposal through diagrams and a recorded presentation.",
    ],
    takeaway:
      "These materials document the proposed design. They do not establish drinking-water safety, collection yield or energy efficiency; those would require measurements and appropriate testing.",
    tech: [
      "System design",
      "Condensation concept",
      "Water collection",
      "Student research",
    ],
    gallery: [
      {
        src: "/assets/projects/atmospheric-water-harvesting/system-concept.png",
        alt: "Archived drawing of the atmospheric water collection concept.",
        caption:
          "The original concept drawing; labels and layout are preserved from the student presentation.",
      },
    ],
  },
  {
    slug: "aaryasat",
    title: "AARYASAT",
    category: "Aerospace concepts",
    date: "School-era concept",
    year: null,
    art: "network",
    summary:
      "A compact sensor-payload proposal that helped turn an interest in space into design questions.",
    description:
      "AARYASAT was my proposal for a small experimental payload to record environmental and motion data. I researched an Arduino-based sensor package, onboard storage and the constraints of a compact enclosure. The documents describe what I hoped to measure and how I wanted to organize the electronics.",
    contribution:
      "Wrote the concept proposal and prepared sensor and component research for a compact payload.",
    approach: [
      "Define measurements such as temperature, pressure, orientation and vibration.",
      "Research a microcontroller, motion sensors and microSD storage as possible building blocks.",
      "Consider payload volume, power and data collection before attempting a complete system.",
    ],
    takeaway:
      "This entry records a design concept, not a launched satellite or a flight-qualified payload. The archive does not establish a reliable project date or a completed flight test.",
    tech: ["Payload concept", "Arduino", "Sensor research", "Data logging"],
  },
];
