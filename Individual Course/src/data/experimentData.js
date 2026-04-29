export const VIDEO_DATA = [
  { id: 1,  fileId: "1DKUrebXAvrX7c14d9BFB95RUEtZAq7OF", participant: "Tony",   strategy: "FS" },
  { id: 2,  fileId: "1PcIiUeirYrdJaqvovU7bGWlpdteeJzO2", participant: "Susane", strategy: "NP" },
  { id: 3,  fileId: "1dGAWvMDl4MnDf4dt74jHbgJ3oylHrYzC", participant: "Carl",   strategy: "FD" },
  { id: 4,  fileId: "1DnIWpG414Xm8vWxNtLAatWXfP6VW0WEH", participant: "Emi",    strategy: "FS" },
  { id: 5,  fileId: "1AWIRedudDbjjn0kxAkLKLEJ0a__8Wq4e", participant: "Camila", strategy: "FD" },
  { id: 6,  fileId: "1coHj82vlkXaqU4yEYCTPhtmj68-bswC6", participant: "Susane", strategy: "HD" },
  { id: 7,  fileId: "1SUQGnt6o45xTw5WE60qqKdEunHgEJ74v", participant: "Kevin",  strategy: "FD" },
  { id: 8,  fileId: "18qRoK3I75ZEwBnLtnMj_UqvXMEuJfHoR", participant: "Tony",   strategy: "NP" },
  { id: 9,  fileId: "1JZQNXnhuckDPe9ydL3shxzn9QEgYeA8a", participant: "Carl",   strategy: "NP" },
  { id: 10, fileId: "1QQF3wSlONbOywiQFQCzw0VhVgSeUjZ7j", participant: "Emi",    strategy: "NP" },
  { id: 11, fileId: "1GRZlM5Ah_En158EnB6qIILefNhgLsvf-", participant: "Kevin",  strategy: "NP" },
  { id: 12, fileId: "1gyR66_D2-8Um-sGnu8aaXM98zq45hp35", participant: "Camila", strategy: "FS" },
  { id: 13, fileId: "1a8NQzesc08MW9fde6cmbuWxy6lL82BTu", participant: "Susane", strategy: "HS" },
  { id: 14, fileId: "13UvyT9W5mMtOB6HFtV3foSgInkGgwFH_", participant: "Kevin",  strategy: "FS" },
  { id: 15, fileId: "15LPt4sk6rdTetm6mdL0DCX8Gvf2-AciP", participant: "Camila", strategy: "BL" },
  { id: 16, fileId: "1nR05vxO1hsfAtkQTMybXzjszj-U8VG9L", participant: "Carl",   strategy: "HD" },
  { id: 17, fileId: "16MyNPklU3ZTl54pt0L0FKKiW0tDJOcfR", participant: "Emi",    strategy: "BL" },
  { id: 18, fileId: "18NgxtZ56Ccc-zEBkiSHMNAFUPN0RAS7L", participant: "Emi",    strategy: "HS" },
  { id: 19, fileId: "1zX5MDZUQVauUOX2iGV0kN1xRR2hcBrWb", participant: "Emi",    strategy: "HD" },
  { id: 20, fileId: "100F_lR1PdHY9lAY1g6ZfrddI0KBGHsvZ", participant: "Carl",   strategy: "HS" },
  { id: 21, fileId: "1u2hZHc-LRpwxf05_go3NF6nTch5DUDbd", participant: "Kevin",  strategy: "BL" },
  { id: 22, fileId: "1Uuv1kkZ_YOzjjcc4VdrxffK6ybQkUGMB", participant: "Camila", strategy: "HS" },
  { id: 23, fileId: "1w-c1L0glQiv_Pl0zHDMkJnllqdJQQk_m", participant: "Kevin",  strategy: "HS" },
  { id: 24, fileId: "1of_NtiQxFI3lDxSgmcRpGydykXCaBTBG", participant: "Carl",   strategy: "FS" },
  { id: 25, fileId: "1P-bOQG6ZZe4AKfE81jlE-ZwuCjjYW_iE", participant: "Tony",   strategy: "HD" },
  { id: 26, fileId: "1JWxsKgOsHvQbgsaq6e8bQ0AsvHvgb_MA", participant: "Camila", strategy: "HD" },
  { id: 27, fileId: "1IbRhEQJv5TAKf5XzOTBOPFrbf8Jo26_2", participant: "Camila", strategy: "NP" },
  { id: 28, fileId: "1cdVXgetgVjP6z8o8ZcDtsFekqombpa1N", participant: "Susane", strategy: "BL" },
];

export const DIMENSIONS = [
  { key: "valence",      label: "Valence",        desc: "Positive & Pleasant", tooltip: "xxxx" },
  { key: "trustworthy",  label: "Trustworthiness", desc: "Reliable & Clear",   tooltip: "xxxx" },
  { key: "relationship", label: "Relationship",    desc: "Social Connection",   tooltip: "xxxx" },
  { key: "dominance",    label: "Dominance",       desc: "Dominant",            tooltip: "xxxx" },
];

export const SCALE_SIZE = 5;

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
  DIMENSIONS.forEach(d => { r[d.key] = null; });
  return r;
}