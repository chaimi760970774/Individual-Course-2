// 共用的维度定义
export const PART1_DIMENSIONS = [
  { key: "valence",      label: "Valence",         desc: "Positive & Pleasant", tooltip: "xxxx" },
  { key: "trustworthy",  label: "Trustworthiness",  desc: "Reliable & Clear",   tooltip: "xxxx" },
  { key: "relationship", label: "Relationship",     desc: "Social Connection",   tooltip: "xxxx" },
  { key: "dominance",    label: "Dominance",        desc: "Dominant",            tooltip: "xxxx" },
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