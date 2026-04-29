import { SCALE_SIZE } from "/src/data/experimentData.js";
import { useState } from "react";


export function LikertScaleView({ label, desc, tooltip, value, onRating }) {
  const [showTip, setShowTip] = useState(false);
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: "#1a1a2e" }}>{label}</span>
        <span style={{ fontSize: 12, color: "#888", fontStyle: "italic" }}>{desc}</span>

        {/* Tooltip 图标 */}
        <div
          style={{ position: "relative", display: "inline-flex" }}
          onMouseEnter={() => setShowTip(true)}
          onMouseLeave={() => setShowTip(false)}
        >
          <div style={{
            width: 16, height: 16, borderRadius: "50%",
            background: "#e2e8f0", color: "#64748b",
            fontSize: 11, fontWeight: 700,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "help",
          }}>?</div>

          {/* 弹出解释框 */}
          {showTip && (
            <div style={{
              position: "absolute", left: 24, top: -8,
              background: "#1e293b", color: "#f1f5f9",
              fontSize: 12, lineHeight: 1.6,
              padding: "10px 14px", borderRadius: 8,
              width: 220, zIndex: 100,
              boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            }}>
              {tooltip}
              {/* 小箭头 */}
              <div style={{
                position: "absolute", left: -6, top: 12,
                width: 0, height: 0,
                borderTop: "6px solid transparent",
                borderBottom: "6px solid transparent",
                borderRight: "6px solid #1e293b",
              }} />
            </div>
          )}
        </div>
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