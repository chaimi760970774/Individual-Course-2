import { PART1_DIMENSIONS, SCALE_SIZE } from "/src/data/experimentData.js";
import { LikertScaleView } from "/src/views/likertScaleView.jsx";
import { VideoPlayerView } from "/src/views/videoPlayerView.jsx";
import { ProgressBarView } from "/src/views/progressBarView.jsx";


export function Part1View({
  currentVideo, currentIndex, totalVideos, videoOrder,
  currentRatings, isCurrentRated, completedCount,
  ratings, submitting, submitError, onRating, onNext, onPrev, onNavigate,
}) {
  const canNext = isCurrentRated && !submitting;
  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Segoe UI', system-ui, sans-serif", display: "flex", flexDirection: "column" }}>

      {/* Header */}
      <header style={{
        background: "#0f172a", color: "#fff", padding: "0 32px", height: 56,
        display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0,
      }}>
        <span style={{ fontSize: 15, fontWeight: 600 }}>Video Rating Study</span>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span style={{ fontSize: 13, color: "#94a3b8" }}>{completedCount}/{totalVideos} rated</span>
        </div>
      </header>

      {/* Progress bar */}
      <div style={{ background: "#1e293b", padding: "12px 32px", display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ fontSize: 12, color: "#64748b", flexShrink: 0 }}>Progress</span>
        <ProgressBarView
          currentIndex={currentIndex}
          videoOrder={videoOrder}
          ratings={ratings}
          onNavigate={onNavigate}
        />
        <span style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0", flexShrink: 0, minWidth: 48, textAlign: "right" }}>
          {currentIndex + 1}/{totalVideos}
        </span>
      </div>

      {/* Main */}
      <div style={{
        flex: 1, display: "flex", justifyContent: "center",
        padding: "28px 24px", gap: 28, maxWidth: 1100, margin: "0 auto", width: "100%",
      }}>
        {/* Left: video + nav */}
        <div style={{ flex: "0 0 52%", minWidth: 0 }}>
          <VideoPlayerView fileId={currentVideo.fileId} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 20 }}>
            <button
              onClick={onPrev}
              disabled={currentIndex === 0}
              style={{
                width: 44, height: 44, borderRadius: 12,
                border: "1.5px solid #e2e8f0",
                background: currentIndex === 0 ? "#f8fafc" : "#fff",
                color: currentIndex === 0 ? "#cbd5e1" : "#1e293b",
                cursor: currentIndex === 0 ? "not-allowed" : "pointer",
                fontSize: 18,
              }}
            >‹</button>
            <span style={{ fontSize: 15, fontWeight: 500, color: "#64748b", minWidth: 60, textAlign: "center" }}>
              {currentIndex + 1} / {totalVideos}
            </span>
            <button
              onClick={onNext}
              disabled={!canNext}
              style={{
                padding: "12px 28px", borderRadius: 12, border: "none",
                background: canNext ? "linear-gradient(135deg, #2563eb, #1d4ed8)" : "#e2e8f0",
                color: canNext ? "#fff" : "#94a3b8",
                fontWeight: 700, fontSize: 14,
                cursor: canNext ? "pointer" : "not-allowed",
                boxShadow: canNext ? "0 4px 12px rgba(37,99,235,0.3)" : "none",
              }}
            >
              {submitting ? "Submitting..." : currentIndex === totalVideos - 1 ? "Finish →" : "Next →"}
            </button>
          </div>
          {!isCurrentRated && (
            <p style={{ textAlign: "center", fontSize: 12, color: "#f59e0b", marginTop: 10 }}>
              ⚠ Please rate all four dimensions before continuing
            </p>
          )}
          {submitError && (
            <p style={{ textAlign: "center", fontSize: 12, color: "#dc2626", marginTop: 10 }}>
              ⚠ Your responses could not be saved. Please check your internet connection and click "Finish" to try again.
            </p>
          )}
        </div>

        {/* Right: rating panel */}
        <div style={{
          flex: "0 0 44%", minWidth: 0, background: "#fff", borderRadius: 16,
          padding: "28px 32px", boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
          border: "1px solid #e2e8f0", alignSelf: "flex-start",
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: "0 0 4px" }}>Rate this video</h2>
          <p style={{ fontSize: 13, color: "#94a3b8", margin: "0 0 24px" }}>Use the scale 1–7 for each dimension</p>

          {PART1_DIMENSIONS.map(dim => (
            <LikertScaleView
              key={dim.key}
              label={dim.label}
              //desc={dim.desc}
              //tooltip={dim.tooltip}  
              value={currentRatings[dim.key]}
              onRating={value => onRating(dim.key, value)}
            />
          ))}

          {/* Mini summary */}
          <div style={{ marginTop: 8, padding: "14px 16px", background: "#f8fafc", borderRadius: 10, border: "1px solid #e2e8f0" }}>
            <div style={{ fontSize: 12, color: "#64748b", marginBottom: 10, fontWeight: 600 }}>Current ratings</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 16px" }}>
              {PART1_DIMENSIONS.map(dim => (
                <div key={dim.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: "#64748b" }}>{dim.label_short}</span>
                  <div style={{ display: "flex", gap: 3 }}>
                    {Array.from({ length: SCALE_SIZE }, (_, i) => (
                      <div key={i} style={{
                        width: 6, height: 6, borderRadius: "50%",
                        background: currentRatings[dim.key] && i < currentRatings[dim.key] ? "#2563eb" : "#e2e8f0",
                      }} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}