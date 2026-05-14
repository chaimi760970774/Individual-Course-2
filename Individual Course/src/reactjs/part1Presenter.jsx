import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PART1_VIDEOS } from "/src/data/part1Data.js";
import { PART1_DIMENSIONS, shuffleArray, createEmptyRatings } from "/src/data/experimentData.js";
import { IntroView } from "/src/views/introView.jsx";
import { CompleteView } from "/src/views/completeView.jsx";
import { Part1View } from "/src/views/part1View.jsx";

function Part1() {
  const navigate = useNavigate();

  const [videoOrder] = useState(() => shuffleArray(PART1_VIDEOS));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ratings, setRatings] = useState(() =>
    Object.fromEntries(PART1_VIDEOS.map(v => [v.id, createEmptyRatings()]))
  );
  const [phase, setPhase] = useState("intro");

  const totalVideos = videoOrder.length;
  const currentVideo = videoOrder[currentIndex];
  const currentRatings = ratings[currentVideo?.id] ?? createEmptyRatings();
  const isCurrentRated = PART1_DIMENSIONS.every(d => currentRatings[d.key] !== null);
  const completedCount = videoOrder.filter(v =>
    PART1_DIMENSIONS.every(d => ratings[v.id]?.[d.key] !== null)
  ).length;

  function handlerStartACB() {
    setPhase("part1");
  }

  function handlerRatingACB(dimension, value) {
    setRatings(prev => ({
      ...prev,
      [currentVideo.id]: { ...prev[currentVideo.id], [dimension]: value },
    }));
  }

  function handlerNextACB() {
    if (currentIndex < totalVideos - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      navigate("/part2");
    }
  }

  function handlerPrevACB() {
    if (currentIndex > 0) setCurrentIndex(i => i - 1);
  }

  function handlerNavigateACB(idx) {
    if (idx >= 0 && idx < totalVideos) setCurrentIndex(idx);
  }

  function handlerExportACB() {
    const header = ["order", "participant", "strategy", "videoId", ...PART1_DIMENSIONS.map(d => d.key)];
    const rows = videoOrder.map((v, idx) => ({
      order: idx + 1,
      participant: v.participant,
      strategy: v.strategy,
      videoId: v.id,
      ...Object.fromEntries(PART1_DIMENSIONS.map(d => [d.key, ratings[v.id]?.[d.key] ?? ""])),
    }));
    const csv = [header, ...rows.map(r => header.map(k => r[k]))].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "part1_results.csv"; a.click();
    URL.revokeObjectURL(url);
  }


  if (phase === "intro")
  return (
    <IntroView
      title="Part 1 — Video Rating"
      description="xxxx"
      videoCount={28}
      onStart={handlerStartACB}
    />
  );

  return (
    <Part1View
      currentVideo={currentVideo}
      currentIndex={currentIndex}
      totalVideos={totalVideos}
      videoOrder={videoOrder}
      currentRatings={currentRatings}
      isCurrentRated={isCurrentRated}
      completedCount={completedCount}
      ratings={ratings}
      onRating={handlerRatingACB}
      onNext={handlerNextACB}
      onPrev={handlerPrevACB}
      onNavigate={handlerNavigateACB}
      onExport={handlerExportACB}
    />
  );
}

export { Part1 };
