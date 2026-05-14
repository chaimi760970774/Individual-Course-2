import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PART2_GROUPS } from "/src/data/part2Data.js";
import { shuffleArray } from "/src/data/experimentData.js";
import { Part2View } from "/src/views/part2View.jsx";
import { IntroView } from "/src/views/introView.jsx";

function Part2() {
  const navigate = useNavigate();

  const [phase, setPhase] = useState("intro");  // ← 移进来

  const [groupOrder] = useState(() =>
    shuffleArray(PART2_GROUPS).map(group => ({
      ...group,
      videos: shuffleArray(group.videos),
    }))
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [ratings, setRatings] = useState({});
  const [rankings, setRankings] = useState({});

  const totalGroups = groupOrder.length;
  const currentGroup = groupOrder[currentIndex];

  const currentRatings = currentGroup.videos.reduce((acc, v) => {
    acc[v.id] = ratings[v.id] ?? null;
    return acc;
  }, {});

  const currentRanking = rankings[currentGroup.id] ?? currentGroup.videos.map(v => v.id);

  const isCurrentComplete =
    currentGroup.videos.every(v => ratings[v.id] != null) &&
    rankings[currentGroup.id] != null;

  const completedCount = groupOrder.filter(g =>
    g.videos.every(v => ratings[v.id] != null) && rankings[g.id] != null
  ).length;

  function handlerStartACB() {  // ← 移进来
    setPhase("experiment");
  }

  function handlerRatingACB(videoId, value) {
    setRatings(prev => ({ ...prev, [videoId]: value }));
  }

  function handlerRankingACB(groupId, newOrder) {
    setRankings(prev => ({ ...prev, [groupId]: newOrder }));
  }

  function handlerNextACB() {
    if (currentIndex < totalGroups - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      navigate("/part3");
    }
  }

  function handlerPrevACB() {
    if (currentIndex > 0) setCurrentIndex(i => i - 1);
  }

  function handlerNavigateACB(idx) {
    if (idx >= 0 && idx < totalGroups) setCurrentIndex(idx);
  }

  if (phase === "intro")
    return (
      <IntroView
        title="Part 2 — Shadow Comparison"
        description="xxxx"
        videoCount={9}
        onStart={handlerStartACB}
      />
    );

  return (
    <Part2View
      currentGroup={currentGroup}
      currentIndex={currentIndex}
      totalGroups={totalGroups}
      groupOrder={groupOrder}
      currentRatings={currentRatings}
      currentRanking={currentRanking}
      isCurrentComplete={isCurrentComplete}
      completedCount={completedCount}
      rankings={rankings}
      ratings={ratings}
      onRating={handlerRatingACB}
      onRanking={handlerRankingACB}
      onNext={handlerNextACB}
      onPrev={handlerPrevACB}
      onNavigate={handlerNavigateACB}
    />
  );
}

export { Part2 };