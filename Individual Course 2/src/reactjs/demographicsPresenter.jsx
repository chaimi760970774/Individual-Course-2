import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DemographicsView } from "/src/views/demographicsView.jsx";

function Demographics() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    participantCode: "",
    age: "",
    gender: "",
  });
  const [errors, setErrors] = useState({});

  const isComplete =
    form.participantCode.trim() !== "" &&
    form.age !== "" &&
    form.gender !== "";

  function handlerChangeACB(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  }

  function handlerSubmitACB() {
    const participantCode = form.participantCode.trim();
    const newErrors = {};
    if (!participantCode) newErrors.participantCode = "Please enter your participant code";
    if (!form.age) newErrors.age = "Please enter your age";
    if (!form.gender) newErrors.gender = "Please select your gender";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // 清掉上一次的进度，但保留本次的知情同意
    const consent = JSON.parse(localStorage.getItem("consent"));
    localStorage.clear();
    localStorage.setItem("consent", JSON.stringify(consent));
    localStorage.setItem("participantInfo", JSON.stringify({ ...form, participantCode, ...consent }));
    navigate("/part1");
  }

  return (
    <DemographicsView
      form={form}
      errors={errors}
      isComplete={isComplete}
      onChange={handlerChangeACB}
      onSubmit={handlerSubmitACB}
    />
  );
}

export { Demographics };
