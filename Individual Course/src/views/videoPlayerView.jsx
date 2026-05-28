import { useState, useRef } from "react";

export function VideoPlayerView({ fileId }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  function handlePlayPauseACB() {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  }

  function handleFullscreenACB() {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen();
    }
  }

  function handleEndedACB() {
    setPlaying(false);
  }

  return (
    <div className="video-player">
      <video
        ref={videoRef}
        key={fileId}
        onEnded={handleEndedACB}
        style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
      >
        <source src={fileId} type="video/mp4" />
      </video>

      {/* Controls bottom right */}
      <div style={{
        position: "absolute", bottom: 12, right: 12,
        display: "flex", gap: 8,
      }}>
        {/* Play/Pause */}
        <button
          onClick={handlePlayPauseACB}
          style={{
            background: "rgba(0,0,0,0.65)",
            color: "#fff", border: "none",
            borderRadius: 8, padding: "7px 14px",
            cursor: "pointer", fontSize: 15,
            backdropFilter: "blur(4px)",
            transition: "background 0.15s ease",
          }}
          onMouseOver={e => e.currentTarget.style.background = "rgba(37,99,235,0.85)"}
          onMouseOut={e => e.currentTarget.style.background = "rgba(0,0,0,0.65)"}
        >
          {playing ? "⏸" : "▶"}
        </button>

        {/* Fullscreen */}
        <button
          onClick={handleFullscreenACB}
          style={{
            background: "rgba(0,0,0,0.65)",
            color: "#fff", border: "none",
            borderRadius: 8, padding: "7px 14px",
            cursor: "pointer", fontSize: 15,
            backdropFilter: "blur(4px)",
            transition: "background 0.15s ease",
          }}
          onMouseOver={e => e.currentTarget.style.background = "rgba(37,99,235,0.85)"}
          onMouseOut={e => e.currentTarget.style.background = "rgba(0,0,0,0.65)"}
        >
          ⛶
        </button>
      </div>
    </div>
  );
}
