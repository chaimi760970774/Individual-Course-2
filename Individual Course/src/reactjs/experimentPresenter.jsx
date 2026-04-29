import { useState, useCallback } from "react";
import { VIDEO_DATA, DIMENSIONS, shuffleArray, createEmptyRatings } from "/src/data/experimentData.js";
import { IntroView } from "/src/views/introView.jsx";
import { CompleteView } from "/src/views/completeView.jsx";
import { ExperimentView } from "/src/views/experimentView.jsx";

function Experiment() {
  const [videoOrder] = useState(() => shuffleArray(VIDEO_DATA));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ratings, setRatings] = useState(() =>
    Object.fromEntries(VIDEO_DATA.map(v => [v.id, createEmptyRatings()]))
  );
  const [phase, setPhase] = useState("intro");

  const totalVideos = videoOrder.length;
  const currentVideo = videoOrder[currentIndex];
  const currentRatings = ratings[currentVideo?.id] ?? createEmptyRatings();
  const isCurrentRated = DIMENSIONS.every(d => currentRatings[d.key] !== null);
  const completedCount = videoOrder.filter(v =>
    DIMENSIONS.every(d => ratings[v.id]?.[d.key] !== null)
  ).length;

  function handlerStartACB() {
    setPhase("experiment");
  }

  function handlerRatingACB(dimension, value) {
    setRatings(prev => ({
      ...prev,
      [currentVideo.id]: { ...prev[currentVideo.id], [dimension]: value },
    }));
  }

  function handlerNextACB() {
    if (currentIndex < totalVideos - 1) setCurrentIndex(i => i + 1);
    else setPhase("complete");
  }

  function handlerPrevACB() {
    if (currentIndex > 0) setCurrentIndex(i => i - 1);
  }

  function handlerNavigateACB(idx) {
    if (idx >= 0 && idx < totalVideos) setCurrentIndex(idx);
  }

  function handlerExportACB() {
    const header = ["order", "participant", "strategy", "videoId", ...DIMENSIONS.map(d => d.key)];
    const rows = videoOrder.map((v, idx) => ({
      order: idx + 1,
      participant: v.participant,
      strategy: v.strategy,
      videoId: v.id,
      ...Object.fromEntries(DIMENSIONS.map(d => [d.key, ratings[v.id]?.[d.key] ?? ""])),
    }));
    const csv = [header, ...rows.map(r => header.map(k => r[k]))].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "experiment_results.csv"; a.click();
    URL.revokeObjectURL(url);
  }

  if (phase === "intro")
    return <IntroView onStart={handlerStartACB} />;

  if (phase === "complete")
    return (
      <CompleteView
        completedCount={completedCount}
        totalVideos={totalVideos}
        onExport={handlerExportACB}
      />
    );

  return (
    <ExperimentView
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

export { Experiment };