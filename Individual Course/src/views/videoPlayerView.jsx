import { useState, useEffect } from "react";

export function VideoPlayerView({ fileId }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { setLoaded(false); }, [fileId]);

  return (
    <div style={{
      width: "100%", aspectRatio: "16/9", background: "#0f172a",
      borderRadius: 12, overflow: "hidden", position: "relative",
      boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
    }}>
      {!loaded && (
        <div style={{
          position: "absolute", inset: 0, display: "flex",
          alignItems: "center", justifyContent: "center",
          background: "#0f172a", flexDirection: "column", gap: 12, zIndex: 2,
        }}>
          <div style={{
            width: 40, height: 40, border: "3px solid #334155",
            borderTopColor: "#2563eb", borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }} />
          <span style={{ color: "#64748b", fontSize: 13 }}>Loading video…</span>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}
      <iframe
        key={fileId}
        src={`https://drive.google.com/file/d/${fileId}/preview`}
        allow="autoplay"
        allowFullScreen
        onLoad={() => setLoaded(true)}
        style={{
          width: "100%", height: "100%", border: "none",
          opacity: loaded ? 1 : 0, transition: "opacity 0.3s ease",
        }}
      />
    </div>
  );
}