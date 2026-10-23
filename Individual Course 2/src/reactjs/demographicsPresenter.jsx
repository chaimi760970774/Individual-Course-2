import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DemographicsView } from "/src/views/demographicsView.jsx";

function Demographics() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    participantId: "",
    age: "",
    gender: "",
  });
  const [errors, setErrors] = useState({});

  const isComplete =
    form.participantId.trim() !== "" &&
    form.age !== "" &&
    form.gender !== "";

  function handlerChangeACB(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  }

  function handlerSubmitACB() {
    const newErrors = {};
    if (!form.participantId.trim()) newErrors.participantId = "Please enter your name or ID";
    if (!form.age) newErrors.age = "Please enter your age";
    if (!form.gender) newErrors.gender = "Please select your gender";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    localStorage.clear();
    localStorage.setItem("participantInfo", JSON.stringify(form));
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
