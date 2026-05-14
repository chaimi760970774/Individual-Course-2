import { VideoPlayerView } from "/src/views/videoPlayerView.jsx";
import { SevenScaleView } from "/src/views/sevenScaleView.jsx";
import { RankingView } from "/src/views/rankingView.jsx";
import "/src/part2.css";

export function Part2View({
  currentGroup, currentIndex, totalGroups, groupOrder,
  currentRatings, currentRanking, isCurrentComplete,
  completedCount, rankings, ratings,
  onRating, onRanking, onNext, onPrev, onNavigate,
}) {
  return (
    <div className="part2">

      {/* Header */}
      <header className="part2__header">
        <span className="part2__title">Shadow Comparison</span>
        <span className="part2__count">{completedCount}/{totalGroups} completed</span>
      </header>

      {/* Progress dots */}
      <div className="part2__progress">
        <span className="part2__progress-label">Progress</span>
        <div className="part2__dots">
          {groupOrder.map((g, i) => {
            const done = g.videos.every(v => ratings[v.id] != null) && rankings[g.id] != null;
            const isCurrent = i === currentIndex;
            return (
              <button
                key={g.id}
                onClick={() => onNavigate(i)}
                className={`part2__dot ${isCurrent ? "part2__dot--current" : ""} ${done ? "part2__dot--done" : ""}`}
              />
            );
          })}
        </div>
        <span className="part2__progress-index">{currentIndex + 1}/{totalGroups}</span>
      </div>

      {/* Main content */}
      <main className="part2__main">

        {/* Three videos side by side */}
        <section className="part2__videos">
          {currentGroup.videos.map((video, idx) => (
            <div key={video.id} className="part2__video-col">
              <div className="part2__video-num">Video {idx + 1}</div>
              <VideoPlayerView fileId={video.fileId} />
              <SevenScaleView
                videoLabel={`Rate Video ${idx + 1}`}
                value={currentRatings[video.id]}
                onRating={value => onRating(video.id, value)}
              />
            </div>
          ))}
        </section>

        {/* Ranking section */}
        <section className="part2__ranking-section">
          <RankingView
            videos={currentGroup.videos}
            ranking={currentRanking}
            onRanking={newOrder => onRanking(currentGroup.id, newOrder)}
          />
        </section>

        {/* Navigation */}
        <div className="part2__nav">
          <button
            onClick={onPrev}
            disabled={currentIndex === 0}
            className="part2__nav-btn part2__nav-btn--prev"
          >
            ‹ Prev
          </button>
          <button
            onClick={onNext}
            disabled={!isCurrentComplete || currentIndex === totalGroups - 1}
            className={`part2__nav-btn part2__nav-btn--next ${isCurrentComplete ? "part2__nav-btn--active" : ""}`}
          >
            Next ›
          </button>
        </div>

        {!isCurrentComplete && (
          <p className="part2__warning">
            ⚠ Please rate all three videos before continuing
          </p>
        )}

      </main>
    </div>
  );
}