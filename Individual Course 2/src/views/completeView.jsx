export function CompleteView({ completedCount, totalVideos, onExport }) {
  const pct = Math.round((completedCount / totalVideos) * 100);
  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
    }}>
      <div style={{
        background: "#fff", borderRadius: 20, padding: "52px 56px",
        maxWidth: 480, width: "90%", textAlign: "center",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: "#0f172a", margin: "0 0 12px" }}>
          Experiment Complete!
        </h1>
        <p style={{ fontSize: 15, color: "#64748b", margin: "0 0 28px" }}>
          You rated <strong>{completedCount}</strong> of <strong>{totalVideos}</strong> videos.
        </p>
        <div style={{
          background: "#f0fdf4", borderRadius: 12, padding: "16px 20px",
          marginBottom: 32, display: "flex", alignItems: "center", gap: 16,
        }}>
          <div style={{ flex: 1, height: 10, background: "#dcfce7", borderRadius: 5, overflow: "hidden" }}>
            <div style={{
              height: "100%", width: `${pct}%`,
              background: "linear-gradient(90deg, #16a34a, #22c55e)", borderRadius: 5,
            }} />
          </div>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#15803d" }}>{pct}%</span>
        </div>
        <button
          onClick={onExport}
          style={{
            width: "100%", padding: "14px 0", borderRadius: 12,
            background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
            color: "#fff", fontWeight: 700, fontSize: 16, border: "none",
            cursor: "pointer", boxShadow: "0 4px 16px rgba(37,99,235,0.4)",
          }}
        >
          ↓ Download Results (CSV)
        </button>
      </div>
    </div>
  );
}