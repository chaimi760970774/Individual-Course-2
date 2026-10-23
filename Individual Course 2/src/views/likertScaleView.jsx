import { SCALE_SIZE } from "/src/data/experimentData.js";

export function LikertScaleView({ label, desc, value, onRating }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: "#1a1a2e" }}>{label}</span>
        <span style={{ fontSize: 12, color: "#888", fontStyle: "italic" }}>{desc}</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
        <span style={{ fontSize: 11, color: "#aaa", width: 32, textAlign: "center" }}>Not at<br/>all</span>
        <div style={{
          display: "flex", alignItems: "center", flex: 1,
          background: "#f4f5f7", borderRadius: 32, padding: "6px 8px",
        }}>
          {Array.from({ length: SCALE_SIZE }, (_, i) => i + 1).map(n => (
            <button
              key={n}
              onClick={() => onRating(n)}
              style={{
                flex: 1, height: 40, borderRadius: 24, border: "none", cursor: "pointer",
                background: value === n ? "linear-gradient(135deg, #2563eb, #1d4ed8)" : "transparent",
                color: value === n ? "#fff" : "#999",
                fontWeight: value === n ? 700 : 400,
                fontSize: 15,
                transform: value === n ? "scale(1.12)" : "scale(1)",
                boxShadow: value === n ? "0 2px 8px rgba(37,99,235,0.35)" : "none",
                transition: "all 0.18s ease",
              }}
            >
              {n}
            </button>
          ))}
        </div>
        <span style={{ fontSize: 11, color: "#aaa", width: 32, textAlign: "center" }}>Very<br/>much</span>
      </div>
    </div>
  );
}