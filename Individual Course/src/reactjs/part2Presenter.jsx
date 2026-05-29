import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PART2A_GROUPS, PART2B_VIDEOS, PART2B_DIMENSIONS } from "/src/data/part2Data.js";
import { savePart2Results } from "/src/data/saveData.js";
import { getPart2AOrder, getPart2BOrder } from "/src/data/monteCarloRandomization.js";
import { IntroView } from "/src/views/introView.jsx";
import { Part2View } from "/src/views/part2View.jsx";

function Part2() {
  const navigate = useNavigate();

  const [phase, setPhase] = useState(() =>
    localStorage.getItem("part2_phase") ?? "intro"
  );

  // Part A state
  const [groupOrder, setGroupOrder] = useState([]);
  const [loadingA, setLoadingA] = useState(true);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(() => {
    const saved = localStorage.getItem("part2a_currentIndex");
    return saved ? parseInt(saved) : 0;
  });
  const [ratingsA, setRatingsA] = useState(() => {
    const saved = localStorage.getItem("part2a_ratings");
    return saved ? JSON.parse(saved) : {};
  });
  const [rankingsA, setRankingsA] = useState(() => {
    const saved = localStorage.getItem("part2a_rankings");
    return saved ? JSON.parse(saved) : {};
  });

  // Part B state
  const [videoOrder, setVideoOrder] = useState([]);
  const [loadingB, setLoadingB] = useState(true);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(() => {
    const saved = localStorage.getItem("part2b_currentIndex");
    return saved ? parseInt(saved) : 0;
  });
  const [ratingsB, setRatingsB] = useState(() => {
    const saved = localStorage.getItem("part2b_ratings");
    return saved ? JSON.parse(saved) : {};
  });

  // 初始化 Part A 顺序
  useEffect(() => {
    const saved = localStorage.getItem("part2a_groupOrder");
    if (saved) {
      setGroupOrder(JSON.parse(saved));
      setLoadingA(false);
    } else {
      const order = getPart2AOrder(PART2A_GROUPS);
      setGroupOrder(order);
      setLoadingA(false);
    }
  }, []);

  // 初始化 Part B 顺序
  useEffect(() => {
    const saved = localStorage.getItem("part2b_videoOrder");
    if (saved) {
      setVideoOrder(JSON.parse(saved));
      setLoadingB(false);
    } else {
      getPart2BOrder(PART2B_VIDEOS).then(order => {
        setVideoOrder(order);
        setLoadingB(false);
      });
    }
  }, []);

  // 同步到 localStorage
  useEffect(() => { localStorage.setItem("part2_phase", phase); }, [phase]);
  useEffect(() => {
    if (groupOrder.length > 0)
      localStorage.setItem("part2a_groupOrder", JSON.stringify(groupOrder));
  }, [groupOrder]);
  useEffect(() => { localStorage.setItem("part2a_currentIndex", String(currentGroupIndex)); }, [currentGroupIndex]);
  useEffect(() => { localStorage.setItem("part2a_ratings", JSON.stringify(ratingsA)); }, [ratingsA]);
  useEffect(() => { localStorage.setItem("part2a_rankings", JSON.stringify(rankingsA)); }, [rankingsA]);
  useEffect(() => {
    if (videoOrder.length > 0)
      localStorage.setItem("part2b_videoOrder", JSON.stringify(videoOrder));
  }, [videoOrder]);
  useEffect(() => { localStorage.setItem("part2b_currentIndex", String(currentVideoIndex)); }, [currentVideoIndex]);
  useEffect(() => { localStorage.setItem("part2b_ratings", JSON.stringify(ratingsB)); }, [ratingsB]);

  if (loadingA || loadingB)
    return <div style={{ padding: 40, textAlign: "center", fontFamily: "sans-serif" }}>Preparing experiment...</div>;

  // Part A computed
  const totalGroups = groupOrder.length;
  const currentGroup = groupOrder[currentGroupIndex];
  const currentRatingsA = currentGroup.videos.reduce((acc, v) => {
    acc[v.id] = ratingsA[v.id] ?? null;
    return acc;
  }, {});
  const currentRankingA = rankingsA[currentGroup.id] ?? currentGroup.videos.map(v => v.id);
  const isGroupComplete =
    currentGroup.videos.every(v => ratingsA[v.id] != null) &&
    rankingsA[currentGroup.id] != null;
  const completedGroupsCount = groupOrder.filter(g =>
    g.videos.every(v => ratingsA[v.id] != null) && rankingsA[g.id] != null
  ).length;

  // Part B computed
  const totalVideos = videoOrder.length;
  const currentVideo = videoOrder[currentVideoIndex];
  const currentRatingsB = ratingsB[currentVideo?.id] ?? {};
  const isBRated = PART2B_DIMENSIONS.every(d => currentRatingsB[d.key] != null);
  const completedVideosCount = videoOrder.filter(v =>
    PART2B_DIMENSIONS.every(d => ratingsB[v.id]?.[d.key] != null)
  ).length;

  function handlerStartACB() { setPhase("partA"); }

  function handlerRatingAACB(videoId, value) {
    setRatingsA(prev => ({ ...prev, [videoId]: value }));
  }

  function handlerRankingAACB(groupId, newOrder) {
    setRankingsA(prev => ({ ...prev, [groupId]: newOrder }));
  }

  function handlerNextAACB() {
    if (currentGroupIndex < totalGroups - 1) {
      setCurrentGroupIndex(i => i + 1);
    } else {
      setPhase("partB");
      setCurrentVideoIndex(0);
    }
  }

  function handlerPrevAACB() {
    if (currentGroupIndex > 0) setCurrentGroupIndex(i => i - 1);
  }

  function handlerRatingBACB(dimension, value) {
    setRatingsB(prev => ({
      ...prev,
      [currentVideo.id]: { ...prev[currentVideo.id], [dimension]: value },
    }));
  }

  async function handlerNextBACB() {
    if (currentVideoIndex < totalVideos - 1) {
      setCurrentVideoIndex(i => i + 1);
    } else {
      const participantInfo = JSON.parse(localStorage.getItem("participantInfo") ?? "{}");
      await savePart2Results(participantInfo, groupOrder, ratingsA, rankingsA, videoOrder, ratingsB);
      ["part2_phase","part2a_groupOrder","part2a_currentIndex","part2a_ratings","part2a_rankings",
       "part2b_videoOrder","part2b_currentIndex","part2b_ratings"].forEach(k => localStorage.removeItem(k));
      navigate("/part3");
    }
  }

  function handlerPrevBACB() {
    if (currentVideoIndex > 0) setCurrentVideoIndex(i => i - 1);
  }

  if (phase === "intro")
    return (
      <IntroView
        title="Part 2 — Shadow & Fidelity"
        description="In this part, you will first compare three videos side by side and rank them by perceived politeness. Then you will watch individual videos and rate them on several dimensions."
        videoCount={21}
        onStart={handlerStartACB}
      />
    );

  return (
    <Part2View
      phase={phase}
      currentGroup={currentGroup}
      currentGroupIndex={currentGroupIndex}
      totalGroups={totalGroups}
      groupOrder={groupOrder}
      currentRatingsA={currentRatingsA}
      currentRankingA={currentRankingA}
      isGroupComplete={isGroupComplete}
      completedGroupsCount={completedGroupsCount}
      rankingsA={rankingsA}
      ratingsA={ratingsA}
      onRatingA={handlerRatingAACB}
      onRankingA={handlerRankingAACB}
      onNextA={handlerNextAACB}
      onPrevA={handlerPrevAACB}
      currentVideo={currentVideo}
      currentVideoIndex={currentVideoIndex}
      totalVideos={totalVideos}
      videoOrder={videoOrder}
      currentRatingsB={currentRatingsB}
      isBRated={isBRated}
      completedVideosCount={completedVideosCount}
      ratingsB={ratingsB}
      onRatingB={handlerRatingBACB}
      onNextB={handlerNextBACB}
      onPrevB={handlerPrevBACB}
    />
  );
}

export { Part2 };