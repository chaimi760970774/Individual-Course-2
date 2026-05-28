// 共用的维度定义
export const PART1_DIMENSIONS = [
  { key: "valence",      label: "Valence",         desc: "Positive & Pleasant", tooltip: "xxxx" },
  { key: "trustworthy",  label: "Trustworthiness",  desc: "Reliable & Clear",   tooltip: "xxxx" },
  { key: "relationship", label: "Relationship",     desc: "Social Connection",   tooltip: "xxxx" },
  { key: "dominance",    label: "Dominance",        desc: "Dominant",            tooltip: "xxxx" },
];


export const PART2B_DIMENSIONS = [
  { key: "valence",    label: "I felt positive and pleasant during the interaction with this agent." },
  { key: "trust",      label: "I perceive the agent as reliable and its intentions as clear." },
  { key: "social",     label: "The agent appeared to be interested in establishing a close social connection with me." },
  { key: "autonomy",   label: "The agent respected my freedom of action." },
  { key: "humanlike",  label: "The agent appeared human-like rather than artificial." },
  { key: "eerie",      label: "This agent's overall presentation felt eerie or unnatural." },
  { key: "voicematch", label: "The agent's voice quality matched its visual appearance." },
];

export const SCALE_SIZE = 5;

// 共用工具函数
export function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function createEmptyRatings() {
  const r = {};
  PART1_DIMENSIONS.forEach(d => { r[d.key] = null; });
  return r;
}