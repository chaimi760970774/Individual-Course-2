import { DIMENSIONS } from "/src/data/experimentData.js";

export function IntroView({ onStart }) {
  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
    }}>
      <div style={{
        background: "#fff", borderRadius: 20, padding: "52px 56px",
        maxWidth: 520, width: "90%", textAlign: "center",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: "#0f172a", margin: "0 0 12px" }}>
          Video Rating Experiment
        </h1>
        <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.7, margin: "0 0 32px" }}>
          You will watch <strong>28 short video clips</strong> in random order.
          Rate each on four dimensions using the 1–5 scale.
        </p>
        <div style={{
          background: "#f8fafc", borderRadius: 12, padding: "20px 24px",
          textAlign: "left", marginBottom: 32,
        }}>
          {DIMENSIONS.map((d, i) => (
            <div key={d.key} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "8px 0",
              borderBottom: i < DIMENSIONS.length - 1 ? "1px solid #e2e8f0" : "none",
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                background: ["#dbeafe","#dcfce7","#fef9c3","#fce7f3"][i],
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, fontWeight: 700,
                color: ["#1d4ed8","#15803d","#a16207","#be185d"][i],
                flexShrink: 0,
              }}>{i + 1}</div>
              <div>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>{d.label}</span>
                <span style={{ fontSize: 13, color: "#94a3b8", marginLeft: 8 }}>{d.desc}</span>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={onStart}
          style={{
            width: "100%", padding: "14px 0", borderRadius: 12,
            background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
            color: "#fff", fontWeight: 700, fontSize: 16, border: "none",
            cursor: "pointer", boxShadow: "0 4px 16px rgba(37,99,235,0.4)",
          }}
        >
          Begin Experiment
        </button>
      </div>
    </div>
  );
}