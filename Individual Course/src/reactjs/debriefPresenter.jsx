import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DEBRIEF_QUESTIONS } from "/src/data/debriefData.js";
import { saveDebriefResults } from "/src/data/saveData.js";
import { DebriefView } from "/src/views/debriefView.jsx";

function Debrief() {
  const navigate = useNavigate();

  const [answers, setAnswers] = useState(() =>
    Object.fromEntries(DEBRIEF_QUESTIONS.map(q => [q.id, getDefaultAnswer(q)]))
  );
  const [submitted, setSubmitted] = useState(false);

  function getDefaultAnswer(q) {
    if (q.type === "text") return "";
    if (q.type === "yesno_text") return { yesno: null, text: "" };
    if (q.type === "yesno_ranking") return { yesno: null, ranking: q.rankOptions ? [...q.rankOptions] : [] };
    if (q.type === "choice") return null;
    if (q.type === "scale7") return null;
    return "";
  }

  function handlerChangeACB(id, value) {
    setAnswers(prev => ({ ...prev, [id]: value }));
  }

  async function handlerSubmitACB() {
    const participantInfo = JSON.parse(localStorage.getItem("participantInfo") ?? "{}");
    await saveDebriefResults(participantInfo, answers);
    localStorage.removeItem("participantInfo");
    setSubmitted(true);
  }

  return (
    <DebriefView
      questions={DEBRIEF_QUESTIONS}
      answers={answers}
      submitted={submitted}
      onChange={handlerChangeACB}
      onSubmit={handlerSubmitACB}
    />
  );
}

export { Debrief };
