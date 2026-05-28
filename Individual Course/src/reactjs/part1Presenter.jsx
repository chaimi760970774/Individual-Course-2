import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PART1_VIDEOS } from "/src/data/part1Data.js";
import { PART1_DIMENSIONS, shuffleArray, createEmptyRatings } from "/src/data/experimentData.js";
import { savePart1Results } from "/src/data/saveData.js";
import { IntroView } from "/src/views/introView.jsx";
import { Part1View } from "/src/views/part1View.jsx";

function Part1() {
  const navigate = useNavigate();

  const [videoOrder] = useState(() => {
    const saved = localStorage.getItem("part1_videoOrder");
    return saved ? JSON.parse(saved) : shuffleArray(PART1_VIDEOS);
  });

  const [currentIndex, setCurrentIndex] = useState(() => {
    const saved = localStorage.getItem("part1_currentIndex");
    return saved ? parseInt(saved) : 0;
  });

  const [ratings, setRatings] = useState(() => {
    const saved = localStorage.getItem("part1_ratings");
    return saved ? JSON.parse(saved) : Object.fromEntries(PART1_VIDEOS.map(v => [v.id, createEmptyRatings()]));
  });

  const [phase, setPhase] = useState(() => {
    return localStorage.getItem("part1_phase") ?? "intro";
  });

  // 同步到 localStorage
  useEffect(() => {
    localStorage.setItem("part1_videoOrder", JSON.stringify(videoOrder));
  }, [videoOrder]);

  useEffect(() => {
    localStorage.setItem("part1_currentIndex", String(currentIndex));
  }, [currentIndex]);

  useEffect(() => {
    localStorage.setItem("part1_ratings", JSON.stringify(ratings));
  }, [ratings]);

  useEffect(() => {
    localStorage.setItem("part1_phase", phase);
  }, [phase]);

  const totalVideos = videoOrder.length;
  const currentVideo = videoOrder[currentIndex];
  const currentRatings = ratings[currentVideo?.id] ?? createEmptyRatings();
  const isCurrentRated = PART1_DIMENSIONS.every(d => currentRatings[d.key] !== null);
  const completedCount = videoOrder.filter(v =>
    PART1_DIMENSIONS.every(d => ratings[v.id]?.[d.key] !== null)
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

  async function handlerNextACB() {
    if (currentIndex < totalVideos - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      const participantInfo = JSON.parse(localStorage.getItem("participantInfo") ?? "{}");
      await savePart1Results(participantInfo, videoOrder, ratings, PART1_DIMENSIONS);
      // 清除 part1 的缓存
      localStorage.removeItem("part1_videoOrder");
      localStorage.removeItem("part1_currentIndex");
      localStorage.removeItem("part1_ratings");
      localStorage.removeItem("part1_phase");
      navigate("/part2");
    }
  }

  function handlerPrevACB() {
    if (currentIndex > 0) setCurrentIndex(i => i - 1);
  }

  function handlerNavigateACB(idx) {
    if (idx >= 0 && idx < totalVideos) setCurrentIndex(idx);
  }

  if (phase === "intro")
    return (
      <IntroView
        title="Part 1 — Video Rating"
        description="In this part, you will watch short video clips of virtual characters performing different social interactions. After each video, please rate your perception on the scales provided."
        videoCount={16}
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
    />
  );
}

export { Part1 };
