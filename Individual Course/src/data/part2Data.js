// Part A — Shadow
export const PART2A_GROUPS = [
  {
    id: "a1",
    strategy: "NP",
    label: "Neutral / Proposing",
    videos: [
      { id: "p2a_1", shadow: "hard", fileId: "https://firebasestorage.googleapis.com/v0/b/individual-course.firebasestorage.app/o/Part2-A-Shadow%2FCamila_NP_HardShadow.mp4?alt=media&token=59eac3df-8c76-4c22-9972-da63120c2d69" },
      { id: "p2a_2", shadow: "soft", fileId: "https://firebasestorage.googleapis.com/v0/b/individual-course.firebasestorage.app/o/Part2-A-Shadow%2FCamila_NP_SoftShadow.mp4?alt=media&token=725b7d44-e151-4f26-9938-114644e25539" },
      { id: "p2a_3", shadow: "none", fileId: "https://firebasestorage.googleapis.com/v0/b/individual-course.firebasestorage.app/o/Part2-A-Shadow%2FCamila_NP_NoShadow.mp4?alt=media&token=1b8b4af5-b30c-4239-a2c7-b2ab79a7c024" },
    ],
  },
  {
    id: "a2",
    strategy: "HD",
    label: "Hostile / Dominant",
    videos: [
      { id: "p2a_4", shadow: "hard", fileId: "https://firebasestorage.googleapis.com/v0/b/individual-course.firebasestorage.app/o/Part2-A-Shadow%2FCamila_HD_HardShadow.mp4?alt=media&token=38592bf5-4e6c-4755-a763-58580aa58ef1" },
      { id: "p2a_5", shadow: "soft", fileId: "https://firebasestorage.googleapis.com/v0/b/individual-course.firebasestorage.app/o/Part2-A-Shadow%2FCamila_HD_SoftShadow.mp4?alt=media&token=13376624-2c65-4246-9b76-349b774d285b" },
      { id: "p2a_6", shadow: "none", fileId: "https://firebasestorage.googleapis.com/v0/b/individual-course.firebasestorage.app/o/Part2-A-Shadow%2FCamila_HD_NoShadow.mp4?alt=media&token=4e8e48bd-0f1d-45fd-89da-d7339f443ff9" },
    ],
  },
  {
    id: "a3",
    strategy: "FD",
    label: "Friendly / Dominant",
    videos: [
      { id: "p2a_7", shadow: "hard", fileId: "https://firebasestorage.googleapis.com/v0/b/individual-course.firebasestorage.app/o/Part2-A-Shadow%2FCamila_FD_HardShadow.mp4?alt=media&token=cf43abcc-3825-42ed-9e55-694fd6e97169" },
      { id: "p2a_8", shadow: "soft", fileId: "https://firebasestorage.googleapis.com/v0/b/individual-course.firebasestorage.app/o/Part2-A-Shadow%2FCamila_FD_SoftShadow.mp4?alt=media&token=caacd86b-5e60-490b-bcdc-4602907e02c5" },
      { id: "p2a_9", shadow: "none", fileId: "https://firebasestorage.googleapis.com/v0/b/individual-course.firebasestorage.app/o/Part2-A-Shadow%2FCamila_FD_NoShadow.mp4?alt=media&token=49116356-987f-414a-90fa-d57ffb2f8eea" },
    ],
  },
];

// Part B — Fidelity & Mismatch
export const PART2B_VIDEOS = [
  { id: "p2b_1",  fidelity: "high",         strategy: "NP", fileId: "https://firebasestorage.googleapis.com/v0/b/individual-course.firebasestorage.app/o/Part2-B-Fidelity%20%26%20Mismatch%2FCamila_NP_HighFi.mp4?alt=media&token=ef395990-2a1a-46a6-800c-876a32a04581" },
  { id: "p2b_2",  fidelity: "low_original", strategy: "NP", fileId: "https://firebasestorage.googleapis.com/v0/b/individual-course.firebasestorage.app/o/Part2-B-Fidelity%20%26%20Mismatch%2FCamila_NP_LowFi1.mp4?alt=media&token=6cdeb9a9-8a4b-41a7-bb87-4c143fe371f0" },
  { id: "p2b_3",  fidelity: "low_new",      strategy: "NP", fileId: "https://firebasestorage.googleapis.com/v0/b/individual-course.firebasestorage.app/o/Part2-B-Fidelity%20%26%20Mismatch%2FCamila_NP_LowFi.mp4?alt=media&token=208d3bd2-7099-437e-9c25-b4941c264c25" },
  { id: "p2b_4",  fidelity: "mismatch",     strategy: "NP", fileId: "https://firebasestorage.googleapis.com/v0/b/individual-course.firebasestorage.app/o/Part2-B-Fidelity%20%26%20Mismatch%2FCamila_NP_LowA.mp4?alt=media&token=f6282b6b-9c0b-4ffc-9cf0-4f1761b406b9" },
  { id: "p2b_5",  fidelity: "high",         strategy: "HD", fileId: "https://firebasestorage.googleapis.com/v0/b/individual-course.firebasestorage.app/o/Part2-B-Fidelity%20%26%20Mismatch%2FCamila_HD_HighFi.mp4?alt=media&token=52909826-1468-4284-9767-f57eb653f8bf" },
  { id: "p2b_6",  fidelity: "low_original", strategy: "HD", fileId: "https://firebasestorage.googleapis.com/v0/b/individual-course.firebasestorage.app/o/Part2-B-Fidelity%20%26%20Mismatch%2FCamila_HD_LowFi1.mp4?alt=media&token=90c406ec-7ce9-4c38-ae7a-3f72472511ff" },
  { id: "p2b_7",  fidelity: "low_new",      strategy: "HD", fileId: "https://firebasestorage.googleapis.com/v0/b/individual-course.firebasestorage.app/o/Part2-B-Fidelity%20%26%20Mismatch%2FCamila_HD_LowFi.mp4?alt=media&token=f9df7744-9513-45dd-a852-aaa6613c6fe4" },
  { id: "p2b_8",  fidelity: "mismatch",     strategy: "HD", fileId: "https://firebasestorage.googleapis.com/v0/b/individual-course.firebasestorage.app/o/Part2-B-Fidelity%20%26%20Mismatch%2FCamila_HD_LowA.mp4?alt=media&token=68acdac9-679a-4e24-bb5c-f18f49678bef" },
  { id: "p2b_9",  fidelity: "high",         strategy: "FD", fileId: "https://firebasestorage.googleapis.com/v0/b/individual-course.firebasestorage.app/o/Part2-B-Fidelity%20%26%20Mismatch%2FCamila_FD_HighFi.mp4?alt=media&token=79da682b-a068-409c-9a3c-970d9aa1a482" },
  { id: "p2b_10", fidelity: "low_original", strategy: "FD", fileId: "https://firebasestorage.googleapis.com/v0/b/individual-course.firebasestorage.app/o/Part2-B-Fidelity%20%26%20Mismatch%2FCamila_FD_LowFi1.mp4?alt=media&token=68f38c60-7fb2-4201-9877-91bde03a26d5" },
  { id: "p2b_11", fidelity: "low_new",      strategy: "FD", fileId: "https://firebasestorage.googleapis.com/v0/b/individual-course.firebasestorage.app/o/Part2-B-Fidelity%20%26%20Mismatch%2FCamila_FD_LowFi.mp4?alt=media&token=d15d1743-5c42-4060-9c66-9e253137e7e0" },
  { id: "p2b_12", fidelity: "mismatch",     strategy: "FD", fileId: "https://firebasestorage.googleapis.com/v0/b/individual-course.firebasestorage.app/o/Part2-B-Fidelity%20%26%20Mismatch%2FCamila_FD_LowA.mp4?alt=media&token=e709a968-a3c0-4914-b1c1-8d7cb03da418" },
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