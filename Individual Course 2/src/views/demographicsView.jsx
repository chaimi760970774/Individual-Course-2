

export function DemographicsView({ form, errors, isComplete, onChange, onSubmit }) {
  return (
    <div className="demo">
      <div className="demo__card">
        <div className="demo__header">
          <div className="demo__icon">📋</div>
          <h1 className="demo__title">Basic Information</h1>
          <p className="demo__subtitle">
            Please fill in the following information before starting the experiment.
            Your data will be kept confidential.
          </p>
        </div>

        <div className="demo__form">
          {/* Participant ID / Name */}
          <div className="demo__field">
            <label className="demo__label">
              Participant Name / ID <span className="demo__required">*</span>
            </label>
            <input
              className={`demo__input ${errors.participantId ? "demo__input--error" : ""}`}
              type="text"
              placeholder="Enter your name or participant ID"
              value={form.participantId}
              onChange={e => onChange("participantId", e.target.value)}
            />
            {errors.participantId && (
              <span className="demo__error">{errors.participantId}</span>
            )}
          </div>

          {/* Age */}
          <div className="demo__field">
            <label className="demo__label">
              Age <span className="demo__required">*</span>
            </label>
            <input
              className={`demo__input ${errors.age ? "demo__input--error" : ""}`}
              type="number"
              placeholder="Enter your age"
              min="1"
              max="120"
              value={form.age}
              onChange={e => onChange("age", e.target.value)}
            />
            {errors.age && (
              <span className="demo__error">{errors.age}</span>
            )}
          </div>

          {/* Gender */}
          <div className="demo__field">
            <label className="demo__label">
              Gender <span className="demo__required">*</span>
            </label>
            <div className="demo__gender-options">
              {["Male", "Female", "Non-binary", "Prefer not to say"].map(option => (
                <button
                  key={option}
                  onClick={() => onChange("gender", option)}
                  className={`demo__gender-btn ${form.gender === option ? "demo__gender-btn--active" : ""}`}
                >
                  {option}
                </button>
              ))}
            </div>
            {errors.gender && (
              <span className="demo__error">{errors.gender}</span>
            )}
          </div>
        </div>

        <button
          onClick={onSubmit}
          className={`demo__submit ${isComplete ? "demo__submit--active" : ""}`}
        >
          Continue to Experiment →
        </button>
      </div>
    </div>
  );
}
