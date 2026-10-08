export type Project = {
  slug: string;
  title: string;
  category: string;
  date: string;
  year: number;
  summary: string;
  description: string;
  contribution: string;
  approach: string[];
  takeaway: string;
  tech: string[];
  github?: string;
  liveUrl?: string;
  youtubeId?: string;
  credit?: string;
  image?: string;
  imageAlt?: string;
  gallery?: { src: string; alt: string; caption: string }[];
  art: "map" | "wave" | "network" | "cloud" | "voice" | "blocks" | "ball";
};
export const projects: Project[] = [
  {
    slug: "bhu-dhrishti",
    gallery: [
      {
        src: "/assets/projects/bhu-dhrishti/city-explorer.png",
        alt: "BhuDrishti city explorer showing a cadastral map, a 3D district and selected parcel details.",
        caption:
          "City explorer: land parcels and vertical property in one view",
      },
    ],
    title: "Bhu_dhrishti",
    category: "Spatial systems",
    date: "2026",
    year: 2026,
    art: "map",
    summary:
      "Land, vertical property, and history connected in one virtual city.",
    description:
      "A spatial registry demonstration linking persistent land parcels to versioned 3D units. Explore a synthetic district, inspect floors, and follow a property through occupation, damage, vacancy, and redevelopment.",
    contribution:
      "Worked on the connected city and registry project, bringing spatial exploration and temporal property records into one application.",
    approach: [
      "Connect an SVG cadastral map and Three.js city to a shared parcel model.",
      "Preserve historical units across the 2026, 2028, 2029, and 2031 lifecycle snapshots.",
      "Validate rectangular geometry, export CityJSON, and record administrative reviews in SQLite with hash-linked audit events.",
    ],
    takeaway:
      "A land parcel can persist while its structures change. This is a synthetic demonstration, not an official registry or a legal ownership determination.",
    tech: ["React", "TypeScript", "Three.js", "Express", "SQLite", "CityJSON"],
    github: "https://github.com/Arnav2580/SIH_ULPIN",
    liveUrl: "https://bhudrishti-4d.onrender.com/",
    youtubeId: "nq5pvwIKaYo",
  },
  {
    slug: "necklink",
    gallery: [
      {
        src: "/assets/projects/necklink/command-center.png",
        alt: "NeckLink command center with corridor risks, weather, vehicle tracking and a Northeast India map.",
        caption: "Command center: corridor risk and accessibility intelligence",
      },
    ],
    title: "NeckLink",
    category: "Spatial systems",
    date: "2026",
    year: 2026,
    art: "network",
    summary:
      "Connecting corridor risk, routing, and field reports in Northeast India.",
    description:
      "A logistics and accessibility prototype combining mapped corridors, risk-weighted routing, vehicle tracking, and offline incident reports. Demonstration scenarios connect rainfall, disruption, alerts, and rerouting.",
    contribution:
      "Worked on a connected logistics-intelligence prototype spanning a map dashboard, dispatch API, and Python risk and routing service.",
    approach: [
      "Score disruption risk with a Random Forest trained on synthetic terrain and weather examples.",
      "Compare distance-based and risk-weighted routes using a NetworkX corridor graph.",
      "Connect geofencing, simulated hazard scenarios, and an IndexedDB field-report queue with backend synchronization.",
    ],
    takeaway:
      "The project demonstrates how signals can flow into operational decisions. Synthetic training and hazard scenarios do not establish real-world forecasting or emergency-warning accuracy.",
    tech: [
      "React",
      "Leaflet",
      "Express",
      "PostGIS",
      "FastAPI",
      "scikit-learn",
      "NetworkX",
    ],
    github: "https://github.com/Arnav2580/NeckLink",
    liveUrl: "https://necklink.onrender.com/",
    youtubeId: "8bmRGq05lz8",
  },
  {
    slug: "agentx",
    title: "AgentX",
    category: "AI & systems",
    date: "2026",
    year: 2026,
    art: "network",
    summary: "A review layer for AI-generated content and terminal commands.",
    description:
      "AI Hallucination Juror combines a content-review workflow with Command Shield. It exposes verdicts through a FastAPI backend, MCP tools, a terminal interface, and editor and browser integrations.",
    contribution:
      "Worked on a local verification system connecting technical-content review, command analysis, and verdict history across developer interfaces.",
    approach: [
      "Request five review perspectives in one batched Gemini call, with a correction pass for blocked content.",
      "Inspect commands with patterns, package-registry and OSV lookups, and model reasoning.",
      "Store review history in SQLite and surface results through CLI, extensions, HTTP, and MCP.",
    ],
    takeaway:
      "Review adds evidence and friction before trusting generated output. Model-assisted verdicts remain fallible; five perspectives in one call are not five independent models.",
    tech: [
      "Python",
      "FastAPI",
      "Gemini",
      "MCP",
      "SQLite",
      "Textual",
      "TypeScript",
    ],
    github: "https://github.com/Arnav2580/agentx",
  },
  {
    slug: "porter-intelligence",
    title: "Porter Intelligence",
    category: "AI & systems",
    date: "2026",
    year: 2026,
    art: "map",
    summary:
      "From trip signals to reviewable logistics cases and operational intelligence.",
    description:
      "A logistics analytics platform connecting trip ingestion, behavioral fraud scoring, case review, driver intelligence, route efficiency, and demand forecasting. A React dashboard sits above FastAPI, PostgreSQL, and Redis Streams.",
    contribution:
      "Worked on a full-stack logistics-intelligence system connecting feature engineering, model scoring, and analyst workflows.",
    approach: [
      "Normalize trip events and build a 44-feature behavioral input for XGBoost scoring.",
      "Separate clear, watchlist, and action tiers, with reviewable cases and shadow-mode controls.",
      "Expose driver, route, demand, and operational analytics through dashboard and API surfaces.",
    ],
    takeaway:
      "A risk score becomes useful when analysts can inspect it and follow a case through review. Repository benchmarks and demo data are not evidence of a live commercial deployment.",
    tech: [
      "Python",
      "FastAPI",
      "XGBoost",
      "React",
      "PostgreSQL",
      "Redis Streams",
    ],
    github: "https://github.com/Arnav2580/porter-intelligence",
  },
  {
    slug: "crowdcast",
    title: "CrowdCast",
    category: "AI & systems",
    date: "Sep — Oct 2025",
    year: 2025,
    art: "map",
    summary: "Turning a city's signals into a sense of where people will be.",
    description:
      "A Bengaluru crowd-demand experiment that uses hotel-booking signals as a proxy for demand. A FastAPI endpoint aggregates scraped hotel features and passes them to a saved prediction model.",
    contribution:
      "Built a predictive pipeline and application connecting scraped demand signals with crowd scoring and an AI assistant.",
    approach: [
      "Collect hotel signals for a selected date using Selenium.",
      "Aggregate features and align them with the saved model inputs.",
      "Present predictions through a React interface with map and assistant components.",
    ],
    takeaway:
      "Hotel demand is a proxy, not a direct count of people. Scraper availability, feature quality, and model validation constrain the result.",
    tech: ["Python", "XGBoost", "FastAPI", "React", "Leaflet"],
    github: "https://github.com/Arnav2580/CrowdCast",
  },
  {
    slug: "probabilistic-ml",
    image: "/assets/projects/probabilistic-ml/uncertainty-results.jpeg",
    imageAlt:
      "Original portfolio figure comparing GP kernel metrics and GP and Bayesian linear regression calibration.",
    title: "Probabilistic ML & Uncertainty",
    category: "Research",
    date: "2025 — 2026",
    year: 2026,
    art: "wave",
    summary: "A model can be accurate. But does it know when it is uncertain?",
    description:
      "An experimental extension studying Bayesian Linear Regression and Gaussian Processes under in-distribution and out-of-distribution conditions.",
    contribution:
      "Extended the original project with reproducible experiments, explicit distribution splits, calibration measures, and visual diagnostics.",
    approach: [
      "Deterministic data generation and reproducible evaluation.",
      "Compare RMSE, negative log likelihood, predictive interval coverage, and calibration.",
      "Study how kernel choices change uncertainty under distribution shift.",
    ],
    takeaway:
      "Good calibration on familiar data does not guarantee reliable uncertainty when the distribution changes.",
    tech: [
      "Python",
      "Bayesian inference",
      "Gaussian Processes",
      "scikit-learn",
    ],
    credit:
      "Original project by Mukul Kashyap; experimental enhancements by Arnav Goyal.",
    github: "https://github.com/Arnav2580/probabilistic-ml-uncertainty",
  },
  {
    slug: "neuro-symbolic-reasoning",
    image: "/assets/projects/neuro-symbolic-reasoning/accuracy-comparison.jpeg",
    imageAlt:
      "Original portfolio chart comparing neural and symbolic accuracy on IID and compositional expressions.",
    title: "Neuro-Symbolic Reasoning",
    category: "Research",
    date: "2025 — 2026",
    year: 2026,
    art: "network",
    summary:
      "Exploring the space between learning patterns and understanding structure.",
    description:
      "A controlled experiment comparing an LSTM baseline and a deterministic symbolic executor on synthetic Boolean expressions.",
    contribution:
      "Designed a compact comparison of compositional generalization using shallow training expressions and deeper evaluation expressions.",
    approach: [
      "Generate structured Boolean expressions and explicit evaluation splits.",
      "Compare neural predictions with a parser-based symbolic pipeline.",
      "Inspect generalization under deeper nesting and composition.",
    ],
    takeaway:
      "Explicit structure can help systematic generalization. The symbolic result depends on clean tokens and exact parsing assumptions; it is not a general claim of superiority.",
    tech: ["Python", "LSTM", "Symbolic reasoning", "Evaluation"],
    github:
      "https://github.com/Arnav2580/neuro-symbolic-compositional-reasoning",
  },
  {
    slug: "secure-data-pipeline",
    image: "/assets/projects/secure-data-pipeline/lambda-trigger.png",
    imageAlt: "S3 trigger connected to the ingestion Lambda.",
    gallery: [
      {
        src: "/assets/projects/secure-data-pipeline/s3-upload.png",
        alt: "S3 confirms a successful sample JSON upload.",
        caption: "S3 confirms a successful sample JSON upload.",
      },
      {
        src: "/assets/projects/secure-data-pipeline/lambda-trigger.png",
        alt: "An S3 event trigger connected to the ingestion Lambda.",
        caption: "An S3 event trigger connected to the ingestion Lambda.",
      },
      {
        src: "/assets/projects/secure-data-pipeline/dynamodb-records.png",
        alt: "Four sample records displayed in DynamoDB.",
        caption: "Four sample records displayed in DynamoDB.",
      },
      {
        src: "/assets/projects/secure-data-pipeline/iam-permissions.png",
        alt: "IAM permissions for S3, DynamoDB, KMS and CloudWatch Logs.",
        caption: "IAM permissions for S3, DynamoDB, KMS and CloudWatch Logs.",
      },
      {
        src: "/assets/projects/secure-data-pipeline/https-bucket-policy.png",
        alt: "S3 bucket policy denying insecure transport, with public access blocked.",
        caption:
          "S3 bucket policy denying insecure transport, with public access blocked.",
      },
      {
        src: "/assets/projects/secure-data-pipeline/kms-encryption.png",
        alt: "Customer-managed KMS key configuration for the pipeline.",
        caption: "Customer-managed KMS key configuration for the pipeline.",
      },
      {
        src: "/assets/projects/secure-data-pipeline/cloudwatch-metrics.png",
        alt: "CloudWatch duration, invocation and error metrics during testing.",
        caption:
          "CloudWatch duration, invocation and error metrics during testing.",
      },
    ],
    title: "Secure S3 Data Pipeline",
    category: "Cloud & engineering",
    date: "2026",
    year: 2026,
    art: "cloud",
    summary: "From a file upload to an auditable, encrypted data pipeline.",
    description:
      "An educational serverless data ingestion architecture connecting S3, Lambda, and DynamoDB with explicit access and encryption controls.",
    contribution:
      "Built and documented an event-driven pipeline with least-privilege roles, encryption, and audit logging.",
    approach: [
      "Read a JSON array from the first S3 event record.",
      "Keep records containing device_id, timestamp, and value, then write them to DynamoDB.",
      "Configure HTTPS-only S3 access, scoped IAM permissions, KMS encryption, and audit logging.",
    ],
    takeaway:
      "The sample implements a focused ingestion path. Its field-presence check is not full schema validation, and cloud deployment and service configuration are separate from the code.",
    tech: ["AWS", "S3", "Lambda", "DynamoDB", "IAM", "KMS"],
    github: "https://github.com/Arnav2580/secure-s3-data-ingestion-pipeline",
  },
  {
    slug: "momo-ai",
    title: "MOMO_AI",
    category: "AI & systems",
    date: "Sep 2025",
    year: 2025,
    art: "voice",
    summary: "An experiment in a more natural conversation with your computer.",
    description:
      "A collaborative multimodal assistant connecting wake-word detection, speech recognition, language models, and voice output.",
    contribution:
      "Contributed AI/ML components, data-processing experiments, debugging, and architectural refinement in a collaborative fork.",
    approach: [
      "Detect a wake word, capture speech, and transcribe it with faster-whisper.",
      "Route requests through Gemini and developer-command modules.",
      "Return spoken responses using ElevenLabs, with desktop UI and session handling.",
    ],
    takeaway:
      "Voice interaction ties together audio timing, transcription, command handling, and feedback. The expressive 3D avatar remains an extension rather than a completed integrated feature.",
    tech: ["Python", "faster-whisper", "Gemini", "ElevenLabs", "openWakeWord"],
    credit:
      "Collaborative project; this fork documents Arnav's contributions and experiments.",
    github: "https://github.com/Arnav2580/MOMO_AI",
  },
  {
    slug: "infinitydex",
    title: "InfinityDEX",
    category: "Blockchain",
    date: "Dec 2024",
    year: 2024,
    art: "blocks",
    summary:
      "An event registration flow inside Telegram, with a simulated certificate.",
    description:
      "A Telegram Mini App prototype for event registration and a simulated digital certificate. The current React implementation demonstrates the interaction without minting an NFT.",
    contribution:
      "Worked on the event-registration concept and prototype interface in a team project.",
    approach: [
      "Expand the interface inside Telegram through its Web App SDK.",
      "Register a visitor in local React state.",
      "Display a fixed sample certificate ID to demonstrate the intended experience.",
    ],
    takeaway:
      "A working interface can explain a product idea before its blockchain infrastructure exists. Certificate issuance here is simulated, not independently verifiable.",
    tech: ["React", "JavaScript", "Telegram Web Apps"],
    credit: "Team project with Abhishek Shukla and Priyanka Mandloi.",
    github: "https://github.com/Arnav2580/InfinityDEX",
  },
  {
    slug: "coinplay",
    youtubeId: "Yzdlr-dC4uk",
    image: "/assets/projects/coinplay/dream-team.png",
    imageAlt: "CoinPlay fantasy football dream team arranged on a pitch.",
    gallery: [
      {
        src: "/assets/projects/coinplay/dream-team.png",
        alt: "Fantasy football dream team on a green pitch",
        caption: "Gameweek dream team",
      },
      {
        src: "/assets/projects/coinplay/player-martinez.png",
        alt: "Emiliano Martinez player statistics dialog",
        caption: "Player statistics",
      },
      {
        src: "/assets/projects/coinplay/login.png",
        alt: "CoinPlay login dialog",
        caption: "Account login",
      },
      {
        src: "/assets/projects/coinplay/fpl-login.png",
        alt: "Fantasy Premier League ID login form",
        caption: "Connect a fantasy team",
      },
      {
        src: "/assets/projects/coinplay/selected-team.png",
        alt: "Selected fantasy football squad on the pitch",
        caption: "Selected squad",
      },
      {
        src: "/assets/projects/coinplay/player-verbruggen.png",
        alt: "Bart Verbruggen player statistics dialog",
        caption: "Exploring player performance",
      },
      {
        src: "/assets/projects/coinplay/add-players.png",
        alt: "Player selection table for building a squad",
        caption: "Build your team",
      },
      {
        src: "/assets/projects/coinplay/upcoming-matches.png",
        alt: "CoinPlay upcoming football match listings",
        caption: "Upcoming matches",
      },
      {
        src: "/assets/projects/coinplay/contests.png",
        alt: "Contest selection with entry fees and prize pools",
        caption: "Contest selection",
      },
      {
        src: "/assets/projects/coinplay/add-cash.png",
        alt: "Add Cash screen with wallet connection controls",
        caption: "Wallet interface",
      },
      {
        src: "/assets/projects/coinplay/wallet-connected.png",
        alt: "Wallet connection state and network selection screen",
        caption: "Connected wallet screen",
      },
      {
        src: "/assets/projects/coinplay/wallet-networks.png",
        alt: "Wallet network dropdown in the Add Cash screen",
        caption: "Network selection",
      },
    ],
    title: "CoinPlay",
    category: "Blockchain",
    date: "Dec 2024",
    year: 2024,
    art: "ball",
    summary: "A fantasy football prototype exploring Web3 wallet interactions.",
    description:
      "A fantasy-sports interface prototype with sport tabs, match listings, and contest detail screens. The concept explores Bitcoin-connected gaming; the published application currently demonstrates the browsing experience.",
    contribution:
      "Worked on a fantasy-gaming prototype with match discovery and contest interfaces.",
    approach: [
      "Browse static match data through sport categories.",
      "Navigate into match and contest details with React Router.",
      "Present sample entry fees, prize pools, and availability.",
    ],
    takeaway:
      "The published repository demonstrates the browsing frontend. The supplied screenshots and walkthrough also document team-building and wallet interfaces; they do not establish live payment processing or contest settlement.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    github: "https://github.com/Arnav2580/Coin-Play",
  },
  {
    slug: "automatic-doorbell",
    title: "Touch-free Doorbell",
    category: "Hardware & prototypes",
    date: "Apr 2020",
    year: 2020,
    art: "blocks",
    summary: "An early student prototype: ring the bell without touching it.",
    description:
      "During the COVID-19 period, I built an automatic doorbell that could ring when someone brought a hand near it. The idea came from an everyday shared surface and a simple question: could this interaction happen without contact?",
    contribution:
      "Developed the student prototype and demonstrated its touch-free interaction.",
    approach: [
      "Start with a familiar interaction: a visitor ringing a doorbell.",
      "Build a prototype that responds to a nearby hand instead of a button press.",
      "Demonstrate the idea and explain its purpose through a recording.",
    ],
    takeaway:
      "A small early experiment in turning an everyday problem into something tangible. Local coverage in April 2020 encouraged me to keep building and presenting my ideas.",
    tech: ["Hardware prototyping", "Touch-free interaction"],
    youtubeId: "EYC0nVegbFI",
    image: "/assets/honors/automatic-doorbell/press-feature.webp",
    imageAlt:
      "Local coverage showing Arnav and his automatic doorbell prototype in April 2020",
  },
];
