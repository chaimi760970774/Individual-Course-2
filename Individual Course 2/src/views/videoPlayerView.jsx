import { useState, useRef } from "react";

// 两个控制按钮共用：固定宽度，图标切换时宽度不变
const controlButtonStyle = {
  width: 48, height: 36, padding: 0,
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  background: "rgba(0,0,0,0.65)",
  color: "#fff", border: "none",
  borderRadius: 8,
  cursor: "pointer", fontSize: 15, lineHeight: 1,
  backdropFilter: "blur(4px)",
  transition: "background 0.15s ease",
};

export function VideoPlayerView({ fileId }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  function handlePlayPauseACB() {
    if (videoRef.current.paused) {
      videoRef.current.play().catch(err => console.warn("Video playback failed:", err));
    } else {
      videoRef.current.pause();
    }
  }

  function handleFullscreenACB() {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen();
    }
  }

  // 按钮状态跟随 <video> 的真实播放状态（包括播放失败、播完、全屏里暂停等情况）
  function handlePlayACB() {
    setPlaying(true);
  }

  function handlePauseACB() {
    setPlaying(false);
  }

  return (
    <div className="video-player">
      <video
        ref={videoRef}
        onPlay={handlePlayACB}
        onPause={handlePauseACB}
        onEnded={handlePauseACB}
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
          aria-label={playing ? "Pause" : "Play"}
          style={controlButtonStyle}
          onMouseOver={e => e.currentTarget.style.background = "rgba(37,99,235,0.85)"}
          onMouseOut={e => e.currentTarget.style.background = "rgba(0,0,0,0.65)"}
        >
          {playing ? "⏸" : "▶"}
        </button>

        {/* Fullscreen */}
        <button
          onClick={handleFullscreenACB}
          aria-label="Fullscreen"
          style={controlButtonStyle}
          onMouseOver={e => e.currentTarget.style.background = "rgba(37,99,235,0.85)"}
          onMouseOut={e => e.currentTarget.style.background = "rgba(0,0,0,0.65)"}
        >
          ⛶
        </button>
      </div>
    </div>
  );
}
