export interface RingData {
  title: string;
  description: string;
  visuals: string;
}

export const ringInfo: Record<string, RingData> = {
  science: {
    title: "Science",
    description: "What we know about the climate system and how we came to know it.",
    visuals: "01",
  },
  impacts: {
    title: "Impacts",
    description: "How climate change is affecting people, ecosystems and the natural world.",
    visuals: "02",
  },
  economics: {
    title: "Economics",
    description: "The incentives, costs and capital flows that determine how fast the net zero transition happens.",
    visuals: "03",
  },
  "political-economy": {
    title: "Political Economy",
    description: "How power, interests and competing priorities shape what gets done – and what gets delayed.",
    visuals: "04",
  },
  governance: {
    title: "Governance",
    description: "The rules, institutions and accountability mechanisms that seek to coordinate action.",
    visuals: "05",
  },
  solutions: {
    title: "Solutions",
    description: "How the transition is built – reducing emissions, removing carbon, improving resilience and deploying clean technologies at scale.",
    visuals: "06",
  },
  energy: {
    title: "Energy",
    description: "The system at the heart of the transition – how clean energy and electrification can transform how we power, move and build.",
    visuals: "07",
  },
  you: {
    title: "You",
    description: "How your choices, voice and influence can accelerate progress.",
    visuals: "08",
  },
};
