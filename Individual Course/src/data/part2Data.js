// Part A — Shadow
export const PART2A_GROUPS = [
  {
    id: "a1",
    strategy: "NP",
    label: "Neutral / Proposing",
    videos: [
      { id: "p2a_1", shadow: "hard", fileId: "PLACEHOLDER_NP_HARD" },
      { id: "p2a_2", shadow: "soft", fileId: "PLACEHOLDER_NP_SOFT" },
      { id: "p2a_3", shadow: "none", fileId: "PLACEHOLDER_NP_NONE" },
    ],
  },
  {
    id: "a2",
    strategy: "HD",
    label: "Hostile / Dominant",
    videos: [
      { id: "p2a_4", shadow: "hard", fileId: "PLACEHOLDER_HD_HARD" },
      { id: "p2a_5", shadow: "soft", fileId: "PLACEHOLDER_HD_SOFT" },
      { id: "p2a_6", shadow: "none", fileId: "PLACEHOLDER_HD_NONE" },
    ],
  },
  {
    id: "a3",
    strategy: "FD",
    label: "Friendly / Dominant",
    videos: [
      { id: "p2a_7", shadow: "hard", fileId: "PLACEHOLDER_FD_HARD" },
      { id: "p2a_8", shadow: "soft", fileId: "PLACEHOLDER_FD_SOFT" },
      { id: "p2a_9", shadow: "none", fileId: "PLACEHOLDER_FD_NONE" },
    ],
  },
];

// Part B — Fidelity & Mismatch
export const PART2B_VIDEOS = [
  { id: "p2b_1",  fidelity: "high",         strategy: "NP", fileId: "PLACEHOLDER_B_NP_HIGH" },
  { id: "p2b_2",  fidelity: "low_original", strategy: "NP", fileId: "PLACEHOLDER_B_NP_LOW_ORIG" },
  { id: "p2b_3",  fidelity: "low_new",      strategy: "NP", fileId: "PLACEHOLDER_B_NP_LOW_NEW" },
  { id: "p2b_4",  fidelity: "mismatch",     strategy: "NP", fileId: "PLACEHOLDER_B_NP_MISMATCH" },
  { id: "p2b_5",  fidelity: "high",         strategy: "HD", fileId: "PLACEHOLDER_B_HD_HIGH" },
  { id: "p2b_6",  fidelity: "low_original", strategy: "HD", fileId: "PLACEHOLDER_B_HD_LOW_ORIG" },
  { id: "p2b_7",  fidelity: "low_new",      strategy: "HD", fileId: "PLACEHOLDER_B_HD_LOW_NEW" },
  { id: "p2b_8",  fidelity: "mismatch",     strategy: "HD", fileId: "PLACEHOLDER_B_HD_MISMATCH" },
  { id: "p2b_9",  fidelity: "high",         strategy: "FD", fileId: "PLACEHOLDER_B_FD_HIGH" },
  { id: "p2b_10", fidelity: "low_original", strategy: "FD", fileId: "PLACEHOLDER_B_FD_LOW_ORIG" },
  { id: "p2b_11", fidelity: "low_new",      strategy: "FD", fileId: "PLACEHOLDER_B_FD_LOW_NEW" },
  { id: "p2b_12", fidelity: "mismatch",     strategy: "FD", fileId: "PLACEHOLDER_B_FD_MISMATCH" },
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