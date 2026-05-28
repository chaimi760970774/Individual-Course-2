import { VideoPlayerView } from "/src/views/videoPlayerView.jsx";
import { SevenScaleView } from "/src/views/sevenScaleView.jsx";
import { RankingView } from "/src/views/rankingView.jsx";
import { PART2B_DIMENSIONS } from "/src/data/part2Data.js";

export function Part2View({
  phase,
  // Part A
  currentGroup, currentGroupIndex, totalGroups, groupOrder,
  currentRatingsA, currentRankingA, isGroupComplete,
  completedGroupsCount, rankingsA, ratingsA,
  onRatingA, onRankingA, onNextA, onPrevA,
  // Part B
  currentVideo, currentVideoIndex, totalVideos, videoOrder,
  currentRatingsB, isBRated, completedVideosCount, ratingsB,
  onRatingB, onNextB, onPrevB,
}) {
  return (
    <div className="part2">

      {/* Header */}
      <header className="part2__header">
        <span className="part2__title">
          {phase === "partA" ? "Part 2A — Shadow Comparison" : "Part 2B — Fidelity & Mismatch"}
        </span>
        <span className="part2__count">
          {phase === "partA"
            ? `${completedGroupsCount}/${totalGroups} completed`
            : `${completedVideosCount}/${totalVideos} completed`}
        </span>
      </header>

      {/* Progress dots */}
      <div className="part2__progress">
        <span className="part2__progress-label">Progress</span>
        <div className="part2__dots">
          {phase === "partA"
            ? groupOrder.map((g, i) => {
                const done = g.videos.every(v => ratingsA[v.id] != null) && rankingsA[g.id] != null;
                const isCurrent = i === currentGroupIndex;
                return (
                  <div
                    key={g.id}
                    className={`part2__dot ${isCurrent ? "part2__dot--current" : ""} ${done ? "part2__dot--done" : ""}`}
                  />
                );
              })
            : videoOrder.map((v, i) => {
                const done = PART2B_DIMENSIONS.every(d => ratingsB[v.id]?.[d.key] != null);
                const isCurrent = i === currentVideoIndex;
                return (
                  <div
                    key={v.id}
                    className={`part2__dot ${isCurrent ? "part2__dot--current" : ""} ${done ? "part2__dot--done" : ""}`}
                  />
                );
              })}
        </div>
        <span className="part2__progress-index">
          {phase === "partA"
            ? `${currentGroupIndex + 1}/${totalGroups}`
            : `${currentVideoIndex + 1}/${totalVideos}`}
        </span>
      </div>

      {/* Part A — three videos side by side */}
      {phase === "partA" && (
        <main className="part2__main">
          <div className="part2__videos">
            {currentGroup.videos.map((video, idx) => (
              <div key={video.id} className="part2__video-col">
                <div className="part2__video-num">Video {idx + 1}</div>
                <VideoPlayerView fileId={video.fileId} />
                <SevenScaleView
                  videoLabel={`Rate Video ${idx + 1}`}
                  value={currentRatingsA[video.id]}
                  onRating={value => onRatingA(video.id, value)}
                />
              </div>
            ))}
          </div>

          <div className="part2__ranking-section">
            <RankingView
              videos={currentGroup.videos.map((v, idx) => ({ ...v, label: `Video ${idx + 1}` }))}
              ranking={currentRankingA}
              onRanking={newOrder => onRankingA(currentGroup.id, newOrder)}
            />
          </div>

          <div className="part2__nav">
            <button
              onClick={onPrevA}
              disabled={currentGroupIndex === 0}
              className="part2__nav-btn part2__nav-btn--prev"
            >
              ‹ Prev
            </button>
            <button
              onClick={onNextA}
              disabled={!isGroupComplete}
              className={`part2__nav-btn part2__nav-btn--next ${isGroupComplete ? "part2__nav-btn--active" : ""}`}
            >
              {currentGroupIndex === totalGroups - 1 ? "Continue to Part 2B →" : "Next →"}
            </button>
          </div>

          {!isGroupComplete && (
            <p className="part2__warning">⚠ Please rate and rank all three videos before continuing</p>
          )}
        </main>
      )}

      {/* Part B — single video + 7 dimensions */}
      {phase === "partB" && (
        <main className="part2__main part2__main--b">
          <div className="part2b__layout">

            {/* Video */}
            <div className="part2b__video">
              <VideoPlayerView fileId={currentVideo.fileId} />
            </div>

            {/* Rating panel */}
            <div className="part2b__panel">
              <h2 className="part2b__panel-title">Rate this video</h2>
              <p className="part2b__panel-hint">Strongly Disagree → Strongly Agree (1–7)</p>

              {PART2B_DIMENSIONS.map((dim, idx) => (
                <div key={dim.key} className="part2b__dim">
                  <p className="part2b__dim-label">
                    <span className="part2b__dim-num">{idx + 1}.</span> {dim.label}
                  </p>
                  <div className="part2b__scale">
                    {Array.from({ length: 7 }, (_, i) => i + 1).map(n => (
                      <button
                        key={n}
                        onClick={() => onRatingB(dim.key, n)}
                        className={`part2b__scale-btn ${currentRatingsB[dim.key] === n ? "part2b__scale-btn--active" : ""}`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="part2__nav">
            <button
              onClick={onPrevB}
              disabled={currentVideoIndex === 0}
              className="part2__nav-btn part2__nav-btn--prev"
            >
              ‹ Prev
            </button>
            <button
              onClick={onNextB}
              disabled={!isBRated}
              className={`part2__nav-btn part2__nav-btn--next ${isBRated ? "part2__nav-btn--active" : ""}`}
            >
              {currentVideoIndex === totalVideos - 1 ? "Finish Part 2 →" : "Next →"}
            </button>
          </div>

          {!isBRated && (
            <p className="part2__warning">⚠ Please rate all dimensions before continuing</p>
          )}
        </main>
      )}
    </div>
  );
}
