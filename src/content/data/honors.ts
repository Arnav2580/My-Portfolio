export type HonorMedia =
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "video"; src: string; poster?: string; caption?: string }
  | { type: "youtube"; videoId: string; poster?: string; caption?: string };

export type Honor = {
  id: string;
  title: string;
  date: string;
  category: string;
  organization: string;
  distinction: string;
  details: string[];
  media: HonorMedia[];
};

export const featuredSpeech = {
  videoId: "JSlKbFChGH8",
  poster: "/assets/honors/big-brainer/award-presentation.webp",
  title: "Engineering ideas. Entrepreneurial impact.",
  award: "Best Achiever and Big Brainer Award",
  date: "2025-10-11",
  topic:
    "How IoT, Cybersecurity & Blockchain Can Improve Human Life — And Why Entrepreneurship Is the Real Engine Behind It.",
  quote:
    "Engineering teaches you how to build products. Entrepreneurship teaches you how to build impact.",
  introduction:
    "I wanted this speech to leave my fellow engineers with a question: what problem will you choose to solve? At my college's departmental award ceremony, I spoke about technology, trust, and why the work of becoming an entrepreneur can begin while you are still a student.",
  paragraphs: [
    "I began with the problems we already recognise: corruption, unemployment and poverty. Then I asked what changes when we look at the trust and efficiency of the systems underneath them. That was the starting point for a conversation about IoT, cybersecurity and blockchain — tools whose value depends on the problems we use them to address.",
    "I discussed their potential in healthcare, agriculture and voting: connecting useful information, protecting it, and making processes more transparent. These technologies are not complete solutions on their own. The harder work is understanding people's needs and building something they can actually use and trust.",
    "Drawing on my experiences with Aerospacizm, Event Union and JEEVNI, I spoke about building while learning. You do not have to wait for graduation to notice a problem, test an idea or bring people together around it. That was the message I wanted to leave with the room: start with one problem worth solving, and take responsibility for the next step.",
    "Receiving the Best Achiever and Big Brainer Award from my department made the occasion personal. I am grateful to the faculty, mentors and peers who gave me the opportunity to share that journey — and who have encouraged me to keep building.",
  ],
};

// Dates retain source precision. Same-year entries with no known month stay in supplied order.
export const honors: Honor[] = [
  {
    id: "big-brainer-award",
    title: "Best Achiever and Big Brainer Award",
    date: "2025-10-11",
    category: "Award & keynote",
    organization: "Dayananda Sagar Academy of Technology and Management",
    distinction: "Departmental recognition",
    details: [featuredSpeech.introduction, ...featuredSpeech.paragraphs],
    media: [
      {
        type: "image",
        src: "/assets/honors/big-brainer/award-presentation.webp",
        alt: "Arnav receiving his departmental award at the Munnade event on 11 October 2025",
        caption: "The award presentation at my college.",
      },
    ],
  },
  {
    id: "speaking-sharing",
    title: "From zero to one: a conversation with MBA students",
    date: "2025",
    category: "Speaking",
    organization: "Harsha Institute of Management Studies",
    distinction: "Guest lecture",
    details: [
      "I delivered my first guest lecture at Harsha Institute of Management Studies, speaking to MBA students about taking a startup from zero to one and the fundamentals of fundraising.",
      "We discussed validating a need, testing a product, building traction and preparing a pitch deck. The questions from the room made it a conversation about the decisions behind a startup, not just the idea itself. KrowdKraft invited me to the session.",
      "A few years earlier, presenting my own science projects had been one of my biggest challenges. Being invited to share what I was learning with MBA students made that progress tangible.",
    ],
    media: [],
  },
  {
    id: "hackers-league",
    title: "Hackers League",
    date: "2024-10",
    category: "Hackathon",
    organization: "TON Society",
    distinction: "Day 1 · Moment of the day",
    details: [
      "I took part in the three-day Hackers League hackathon organised by TON Society. Our team explored blockchain and perpetual trading, a subject that was new to me at the time.",
      "Working with my teammates helped me understand the concepts and contribute to the project. I also received the Day 1 'moment of the day' recognition. The experience became an important part of how I learned to work through unfamiliar technical problems with a team.",
    ],
    media: [
      {
        type: "image",
        src: "/assets/honors/hackers-league/recognition.webp",
        alt: "Arnav receiving recognition at the TON hackathon",
        caption: "A moment from the TON hackathon.",
      },
    ],
  },
  {
    id: "bis-science-quiz",
    title: "BIS Quiz on Science & Standards",
    date: "2024-01-06",
    category: "Award",
    organization: "Bureau of Indian Standards, Dehradun",
    distinction: "Regional level · Second prize",
    details: [
      "I received second prize in the regional-level Quiz on Science & Standards organised by the Bureau of Indian Standards. The certificate records the competition date as 9 December 2023; the award presentation followed on 6 January 2024.",
      "At the presentation, I met Sudheer Bishnoi, Head of BIS Dehradun, and Dr. R. P. Singh, Director of the Indian Institute of Remote Sensing. Our conversations connected standards, scientific work and learning beyond the classroom.",
      "This recognition sat alongside my work with the Standards Club at S.D. Public School, where I helped encourage participation in standards-related activities and competitions.",
    ],
    media: [
      {
        type: "image",
        src: "/assets/honors/bis-science-quiz/award-presentation.webp",
        alt: "Arnav receiving his BIS science and standards quiz award",
        caption: "Award presentation, January 2024.",
      },
      {
        type: "image",
        src: "/assets/honors/bis-science-quiz/regional-second-prize-certificate.webp",
        alt: "BIS certificate recording second prize in the regional Quiz on Science and Standards on 9 December 2023",
        caption:
          "The certificate records the competition date and regional second prize.",
      },
    ],
  },
  {
    id: "science-championship",
    title: "Science Championship 2.0",
    date: "2023-11",
    category: "Award",
    organization: "USERC · Shivalik College of Engineering",
    distinction: "Team achievement",
    details: [
      "Our team from S.D. Public School won at Science Championship 2.0, organised by USERC at Shivalik College of Engineering in Dehradun.",
      "This was a shared achievement. The preparation, discussion and presentation belonged to the team, and the award photograph is a reminder of the people who were part of it.",
    ],
    media: [
      {
        type: "image",
        src: "/assets/honors/science-championship/team-award.webp",
        alt: "School team receiving an award on the Science Championship 2.0 stage",
        caption: "Our team at the award ceremony in Dehradun.",
      },
    ],
  },
  {
    id: "edu-odyssey",
    title: "Chandrayaan-3 and beyond",
    date: "2023-08",
    category: "Learning milestone",
    organization: "SPACE India · EDU ODYSSEY",
    distinction: "A conversation about space",
    details: [
      "Through EDU ODYSSEY: Chandrayaan 3 and Beyond, I had the opportunity to meet N. Raghu Meetei, identified in my event record as Deputy Director, DTDI, ISRO.",
      "I attended with a fellow student. For someone whose curiosity had already led to aerospace experiments, learning directly from a space professional brought the field closer to the work I wanted to understand. This was a learning opportunity, rather than a competition win.",
    ],
    media: [
      {
        type: "image",
        src: "/assets/honors/edu-odyssey/meeting-and-certificates.webp",
        alt: "Arnav and a fellow student with their certificates at the EDU ODYSSEY event",
        caption: "EDU ODYSSEY: Chandrayaan 3 and Beyond.",
      },
    ],
  },
  {
    id: "junior-academy",
    title: "Selected for The Junior Academy",
    date: "2022-09",
    category: "Selection",
    organization: "The New York Academy of Sciences",
    distinction: "International student collaboration",
    details: [
      "I was selected to join The Junior Academy of the New York Academy of Sciences while studying at S.D. Public School.",
      "The programme brought me into a team of six students from different countries, working on challenges connected to the UN Sustainable Development Goals. Ten-week projects and STEM mentorship gave me experience in research, communication and collaboration beyond my own school.",
    ],
    media: [],
  },
  {
    id: "smart-india-hackathon-junior",
    title: "Smart India Hackathon Junior",
    date: "2022-08",
    category: "Award",
    organization: "AICTE · Smart India Hackathon",
    distinction: "National-level win",
    details: [
      "Winning Smart India Hackathon Junior in 2022 was my first major national-level achievement. I was in tenth standard, and I had been working on the idea for around three years.",
      "The path included repeated setbacks, including reaching the final stages of competitions without winning. At the felicitation, the award felt like a visible result of work I had nearly given up on.",
      "It also marked a change in my ability to explain what I built. The project mattered, but learning to communicate its purpose had become part of the work.",
    ],
    media: [
      {
        type: "image",
        src: "/assets/honors/smart-india-hackathon/winner-presentation.webp",
        alt: "Arnav and school representatives receiving a Smart India Hackathon winner presentation",
        caption: "The felicitation for Smart India Hackathon Junior 2022.",
      },
    ],
  },
  {
    id: "toycathon",
    title: "Toycathon 2021",
    date: "2021-06",
    category: "Hackathon",
    organization: "Government of India · Toycathon",
    distinction: "Finalist team",
    details: [
      "Our team reached the final stage of the first Toycathon in 2021. The digital-edition finals took place from 22 to 24 June, with Meerut Institute of Engineering and Technology as a participating centre.",
      "The collage brings together the online participant session and local coverage of the event. It brings back the experience of presenting our idea alongside teams working on very different approaches to play and learning.",
    ],
    media: [
      {
        type: "image",
        src: "/assets/honors/toycathon/finals-and-press.webp",
        alt: "Collage of Toycathon 2021 finals, an online participant session and newspaper coverage",
        caption: "The June 2021 finals and coverage of the event.",
      },
    ],
  },
  {
    id: "tech-fair",
    title: "Tech Fair 2021",
    date: "2021-02",
    category: "Award",
    organization: "Shri Ram Group of Colleges, Muzaffarnagar",
    distinction: "District level · Second prize",
    details: [
      "We received second prize at the Tech Fair organised by Shri Ram Group of Colleges in Muzaffarnagar, representing S.D. Public School.",
      "It was an early milestone after difficult experiences in science competitions. I was learning that building the model and communicating the idea were two skills I needed to develop together.",
    ],
    media: [
      {
        type: "image",
        src: "/assets/honors/tech-fair/team-second-prize.webp",
        alt: "School team posing with their Tech Fair 2021 second-prize award",
        caption: "Our school team with the Tech Fair recognition.",
      },
    ],
  },
  {
    id: "agri-india-hackathon",
    title: "Agri India Hackathon",
    date: "2021-01",
    category: "Hackathon",
    organization: "ICAR-IARI",
    distinction: "Final-stage participation",
    details: [
      "I reached the final stage of Agri India Hackathon 2021 while studying at S.D. Public School, as recorded in my LinkedIn honors history.",
      "It was one of the early competitions through which I learned to take an idea beyond a classroom project and present it for evaluation.",
    ],
    media: [],
  },
  {
    id: "automatic-doorbell",
    title: "A touch-free doorbell, and my first local coverage",
    date: "2020-04-25",
    category: "In the press",
    organization: "Muzaffarnagar Ek Jhalak",
    distinction: "Student invention",
    details: [
      "During the COVID-19 period, I built a doorbell that could ring when someone brought a hand near it, without touching the bell. It began with a small, practical question about a shared everyday surface.",
      "A local report published on 25 April 2020 covered the idea and showed me alongside the prototype. Seeing something I had made receive attention outside school gave me confidence to keep experimenting. It made a small everyday problem feel like something I could take on through engineering.",
    ],
    media: [
      {
        type: "image",
        src: "/assets/honors/automatic-doorbell/press-feature.webp",
        alt: "Local news report dated 25 April 2020 showing Arnav and his touch-free doorbell prototype",
        caption: "The original local news clipping, April 2020.",
      },
      {
        type: "youtube",
        videoId: "EYC0nVegbFI",
        poster: "/assets/honors/automatic-doorbell/press-feature.webp",
        caption: "Watch the automatic doorbell demonstration.",
      },
    ],
  },
];

export function honorDate(date: string) {
  if (date.length === 4) return date;
  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
    ...(date.length === 10 ? { day: "numeric" as const } : {}),
  }).format(new Date(date + (date.length === 7 ? "-01" : "") + "T00:00:00Z"));
}
