import { useState } from "react";

export function VideoPlayerView({ fileId }) {
  return (
    <div className="video-player">
      <video
        key={fileId}
        controls
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      >
        <source src={fileId} type="video/mp4" />
      </video>
    </div>
  );
}