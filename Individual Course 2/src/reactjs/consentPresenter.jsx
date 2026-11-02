import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ConsentView } from "/src/views/consentView.jsx";
import { API_URL } from "/src/data/api.js";

function Consent() {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  // 后台唤醒 Render 上休眠的后端，不等待结果
  useEffect(() => {
    fetch(`${API_URL}/api/health`).catch(err => {
      console.warn("Backend wake-up request failed:", err);
    });
  }, []);

  function handlerContinueACB() {
    if (!agreed) return;
    localStorage.setItem("consent", JSON.stringify({
      consent: true,
      consentTimestamp: new Date().toISOString(),
    }));
    navigate("/demographics");
  }

  return (
    <ConsentView
      agreed={agreed}
      onToggle={setAgreed}
      onContinue={handlerContinueACB}
    />
  );
}

export { Consent };
