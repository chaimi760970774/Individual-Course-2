import { PART1_DIMENSIONS } from "/src/data/experimentData.js";

export function ProgressBarView({ currentIndex, videoOrder, ratings }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap" }}>
      {videoOrder.map((v, i) => {
        const rated = PART1_DIMENSIONS.every(d => ratings[v.id]?.[d.key] !== null);
        const isCurrent = i === currentIndex;
        return (
          <button
            key={v.id}
            
            title={`Video ${i + 1}`}
            style={{
              width: isCurrent ? 22 : 10, height: 10,
              borderRadius: 5, border: "none", cursor: "pointer",
              background: isCurrent ? "#2563eb" : rated ? "#86efac" : "#e2e8f0",
              transition: "all 0.2s ease", padding: 0, flexShrink: 0,
            }}
          />
        );
      })}
    </div>
  );
}