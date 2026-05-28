// 共用的维度定义
export const PART1_DIMENSIONS = [
  { key: "valence",      label: "I felt positive and pleasant during the interaction with this agent.", label_short: "Valence" },
  { key: "trustworthy",  label: "I perceive the agent as reliable and its intentions as clear.", label_short: "Trustworthiness"},
  { key: "relationship", label: "The agent appeared to be interested in establishing a close social connection with me.", label_short: "Relationship"},
  { key: "dominance",    label: "The agent respected my freedom of action.", label_short: "Freedom" },
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

export const SCALE_SIZE = 7;

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