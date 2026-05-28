import { useState, useRef } from "react";

export function DebriefView({ questions, answers, submitted, onChange, onSubmit }) {
  if (submitted) {
    return (
      <div className="debrief">
        <div className="debrief__done">
          <div className="debrief__done-icon">🎉</div>
          <h1 className="debrief__done-title">Thank you for participating!</h1>
          <p className="debrief__done-desc">
            Your responses have been recorded. You may now close this window.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="debrief">
      <div className="debrief__container">

        {/* Header */}
        <div className="debrief__header">
          <h1 className="debrief__title">Debrief Questionnaire</h1>
          <p className="debrief__subtitle">
            Thank you for completing the experiment! Please take a moment to answer
            the following questions. Your honest responses are greatly appreciated.
          </p>
        </div>

        {/* Questions */}
        <div className="debrief__questions">
          {questions.map((q, idx) => (
            <div key={q.id} className="debrief__question">
              <p className="debrief__question-text">
                <span className="debrief__question-num">Q{idx + 1}.</span> {q.question}
              </p>

              {/* Text */}
              {q.type === "text" && (
                <textarea
                  className="debrief__textarea"
                  placeholder="Your answer..."
                  value={answers[q.id]}
                  onChange={e => onChange(q.id, e.target.value)}
                />
              )}

              {/* Yes/No + optional text */}
              {q.type === "yesno_text" && (
                <div>
                  <div className="debrief__yesno">
                    {["Yes", "No"].map(opt => (
                      <button
                        key={opt}
                        onClick={() => onChange(q.id, { ...answers[q.id], yesno: opt })}
                        className={`debrief__yesno-btn ${answers[q.id]?.yesno === opt ? "debrief__yesno-btn--active" : ""}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {answers[q.id]?.yesno === "Yes" && (
                    <textarea
                      className="debrief__textarea debrief__textarea--followup"
                      placeholder={q.followUp}
                      value={answers[q.id]?.text}
                      onChange={e => onChange(q.id, { ...answers[q.id], text: e.target.value })}
                    />
                  )}
                </div>
              )}

              {/* Yes/No + ranking */}
              {q.type === "yesno_ranking" && (
                <div>
                  <div className="debrief__yesno">
                    {["Yes", "No"].map(opt => (
                      <button
                        key={opt}
                        onClick={() => onChange(q.id, { ...answers[q.id], yesno: opt })}
                        className={`debrief__yesno-btn ${answers[q.id]?.yesno === opt ? "debrief__yesno-btn--active" : ""}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {answers[q.id]?.yesno === "Yes" && (
                    <div className="debrief__ranking">
                      <p className="debrief__ranking-hint">{q.followUp} (drag to reorder)</p>
                      <DragRanking
                        items={answers[q.id]?.ranking}
                        onChange={newOrder => onChange(q.id, { ...answers[q.id], ranking: newOrder })}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Choice */}
              {q.type === "choice" && (
                <div className="debrief__choices">
                  {q.options.map(opt => (
                    <button
                      key={opt}
                      onClick={() => onChange(q.id, opt)}
                      className={`debrief__choice-btn ${answers[q.id] === opt ? "debrief__choice-btn--active" : ""}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {/* 1-7 Scale */}
              {q.type === "scale7" && (
                <div>
                  {q.hint && <p className="debrief__scale-hint">{q.hint}</p>}
                  <div className="debrief__scale">
                    {Array.from({ length: 7 }, (_, i) => i + 1).map(n => (
                      <button
                        key={n}
                        onClick={() => onChange(q.id, n)}
                        className={`debrief__scale-btn ${answers[q.id] === n ? "debrief__scale-btn--active" : ""}`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Submit */}
        <button className="debrief__submit" onClick={onSubmit}>
          Submit →
        </button>

      </div>
    </div>
  );
}

// Drag ranking component
function DragRanking({ items, onChange }) {
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);
  const [dragging, setDragging] = useState(null);

  function handleDragStartACB(item) {
    dragItem.current = item;
    setDragging(item);
  }

  function handleDragOverACB(e, item) {
    e.preventDefault();
    dragOverItem.current = item;
  }

  function handleDropACB() {
    const newOrder = [...items];
    const fromIdx = newOrder.indexOf(dragItem.current);
    const toIdx = newOrder.indexOf(dragOverItem.current);
    newOrder.splice(fromIdx, 1);
    newOrder.splice(toIdx, 0, dragItem.current);
    onChange(newOrder);
    setDragging(null);
  }

  return (
    <div className="debrief__drag-list">
      {items.map((item, idx) => (
        <div
          key={item}
          draggable
          onDragStart={() => handleDragStartACB(item)}
          onDragOver={e => handleDragOverACB(e, item)}
          onDrop={handleDropACB}
          onDragEnd={() => setDragging(null)}
          className={`debrief__drag-item ${dragging === item ? "debrief__drag-item--dragging" : ""}`}
        >
          <span className="debrief__drag-rank">#{idx + 1}</span>
          <span className="debrief__drag-label">{item}</span>
          <span className="debrief__drag-handle">⠿</span>
        </div>
      ))}
    </div>
  );
}
