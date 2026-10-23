import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PART1_VIDEOS } from "/src/data/part1Data.js";
import { PART1_DIMENSIONS, createEmptyRatings } from "/src/data/experimentData.js";
import { savePart1Results } from "/src/data/saveData.js";
import { getPart1Order } from "/src/data/monteCarloRandomization.js";
import { IntroView } from "/src/views/introView.jsx";
import { Part1View } from "/src/views/part1View.jsx";

function Part1() {
  const navigate = useNavigate();

  const [videoOrder, setVideoOrder] = useState(() => {
    const saved = localStorage.getItem("part1_videoOrder");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(() => !localStorage.getItem("part1_videoOrder"));

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

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  // 初始化视频顺序（localStorage 里没有时才生成新顺序）
  useEffect(() => {
    if (localStorage.getItem("part1_videoOrder")) return;
    getPart1Order(PART1_VIDEOS).then(order => {
      setVideoOrder(order);
      setLoading(false);
    });
  }, []);

  // 同步到 localStorage
  useEffect(() => {
    if (videoOrder.length > 0)
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

  if (loading)
    return <div style={{ padding: 40, textAlign: "center", fontFamily: "sans-serif" }}>Preparing experiment...</div>;

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
      if (submitting) return;
      setSubmitting(true);
      setSubmitError(false);
      const participantInfo = JSON.parse(localStorage.getItem("participantInfo") ?? "{}");
      try {
        // 保存成功前不清理 localStorage，失败时可以重试
        const rows = await savePart1Results(participantInfo, videoOrder, ratings, PART1_DIMENSIONS);
        navigate("/complete", { state: { completedCount, totalVideos, ratings: rows } });
      } catch (err) {
        console.error(err);
        setSubmitError(true);
        setSubmitting(false);
      }
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
        videoCount={PART1_VIDEOS.length}
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
      submitting={submitting}
      submitError={submitError}
      onRating={handlerRatingACB}
      onNext={handlerNextACB}
      onPrev={handlerPrevACB}
      onNavigate={handlerNavigateACB}
    />
  );
}

export { Part1 };