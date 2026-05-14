import "/src/part2.css";

export function SevenScaleView({ videoLabel, value, onRating }) {
  return (
    <div className="seven-scale">
      <div className="seven-scale__label">{videoLabel}</div>
      <div className="seven-scale__track">
        <span className="seven-scale__hint">Not at all polite</span>
        <div className="seven-scale__buttons">
          {Array.from({ length: 7 }, (_, i) => i + 1).map(n => (
            <button
              key={n}
              onClick={() => onRating(n)}
              className={`seven-scale__btn ${value === n ? "seven-scale__btn--active" : ""}`}
            >
              {n}
            </button>
          ))}
        </div>
        <span className="seven-scale__hint">Very polite</span>
      </div>
    </div>
  );
}
