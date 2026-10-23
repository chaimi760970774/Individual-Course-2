import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PART1_VIDEOS } from "/src/data/part1Data.js";
import { CompleteView } from "/src/views/completeView.jsx";

function Complete() {
  const location = useLocation();
  const { completedCount = 0, totalVideos = PART1_VIDEOS.length } = location.state ?? {};

  // 实验结束：清理进度和被试信息
  useEffect(() => {
    localStorage.removeItem("part1_videoOrder");
    localStorage.removeItem("part1_currentIndex");
    localStorage.removeItem("part1_ratings");
    localStorage.removeItem("part1_phase");
    localStorage.removeItem("participantInfo");
  }, []);

  return (
    <CompleteView
      completedCount={completedCount}
      totalVideos={totalVideos}
    />
  );
}

export { Complete };
