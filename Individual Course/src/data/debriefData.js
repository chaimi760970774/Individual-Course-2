export const DEBRIEF_QUESTIONS = [
  {
    id: "q1",
    type: "text",
    question: "What do you think the purpose of this study was?",
  },
  {
    id: "q2",
    type: "yesno_text",
    question: "Did you experience any discomfort, dizziness, fatigue, or any other negative effects during the study?",
    followUp: "Please describe.",
  },
  {
    id: "q3",
    type: "text",
    question: "Does the character's gender affect your perception of politeness?",
  },
  {
    id: "q4",
    type: "text",
    question: "Do the appearances of different characters affect how you perceive different polite behaviors? If yes, please describe what caused these differences in perception.",
  },
  {
    id: "q5",
    type: "choice",
    question: "Do you think the agent's resemblance is closer to a biological human, or a synthetic entity such as a dummy or mannequin?",
    options: ["Biological human", "Synthetic entity", "Somewhere in between"],
  },
  {
    id: "q6",
    type: "scale7",
    question: "On a scale from 1 to 7, how would you rate your usual preference for cool color tones?",
    hint: "1 = strongly dislike cool tones, 7 = strongly like cool tones",
  },
  {
    id: "q7",
    type: "choice",
    question: "In daily life, do you associate environments with cool color tones more with professionalism or with hostility?",
    options: ["Professionalism", "Hostility", "Neither", "Both equally"],
  },
  {
    id: "q8",
    type: "yesno_text",
    question: "Did you notice any changes in image quality, such as aliasing/jagged edges or a plastic-like appearance?",
    followUp: "Please describe.",
  },
  {
    id: "q9",
    type: "yesno_text",
    question: "Do highly realistic 3D characters make you feel psychologically cautious, uneasy, or uncomfortable?",
    followUp: "Please describe.",
  },
  {
    id: "q10",
    type: "yesno_text",
    question: "Do roughly made or low-quality 3D characters cause you to feel biased against them or lose interest in interacting with them?",
    followUp: "Please describe.",
  },
  {
    id: "q11",
    type: "text",
    question: "For the same character, does a different hairstyle affect your first impression of her personality? If yes, please describe how.",
  },
  {
    id: "q12",
    type: "yesno_ranking",
    question: "When the character gives instructions, does her hairstyle affect how polite you perceive her behavior to be?",
    followUp: "Please rank the hairstyles from lowest to highest in perceived politeness.",
    rankOptions: ["Long hair", "Medium hair", "Short hair"],
  },
  {
    id: "q13",
    type: "text",
    question: "Is there anything else you would like to add? For example, what aspects do you think should be improved? Please be as specific as possible.",
  },
];