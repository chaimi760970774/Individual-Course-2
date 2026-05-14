export const SHADOW_TYPES = [
  { key: "hard", label: "Hard Shadow" },
  { key: "soft", label: "Soft Shadow" },
  { key: "none", label: "No Shadow"   },
];

// 视频顺序会在 Presenter 里被打乱
export const PART2_GROUPS = [
  {
    id: 1,
    strategy: "NP",
    label: "Neutral / Proposing",
    videos: [
      { id: "p2_1", shadow: "hard", fileId: "PLACEHOLDER_NP_HARD" },
      { id: "p2_2", shadow: "soft", fileId: "PLACEHOLDER_NP_SOFT" },
      { id: "p2_3", shadow: "none", fileId: "PLACEHOLDER_NP_NONE" },
    ],
  },
  {
    id: 2,
    strategy: "HD",
    label: "Hostile / Dominant",
    videos: [
      { id: "p2_4", shadow: "hard", fileId: "PLACEHOLDER_HD_HARD" },
      { id: "p2_5", shadow: "soft", fileId: "PLACEHOLDER_HD_SOFT" },
      { id: "p2_6", shadow: "none", fileId: "PLACEHOLDER_HD_NONE" },
    ],
  },
  {
    id: 3,
    strategy: "FD",
    label: "Friendly / Dominant",
    videos: [
      { id: "p2_7", shadow: "hard", fileId: "PLACEHOLDER_FD_HARD" },
      { id: "p2_8", shadow: "soft", fileId: "PLACEHOLDER_FD_SOFT" },
      { id: "p2_9", shadow: "none", fileId: "PLACEHOLDER_FD_NONE" },
    ],
  },
];