import { useState, useRef } from "react";
import "/src/part2.css";

export function RankingView({ videos, ranking, onRanking }) {
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);
  const [dragging, setDragging] = useState(null);

  // ranking 是 videoId 的数组，代表排名顺序
  const orderedVideos = ranking.map(id => videos.find(v => v.id === id));

  function handleDragStartACB(id) {
    dragItem.current = id;
    setDragging(id);
  }

  function handleDragOverACB(e, id) {
    e.preventDefault();
    dragOverItem.current = id;
  }

  function handleDropACB() {
    const newOrder = [...ranking];
    const fromIdx = newOrder.indexOf(dragItem.current);
    const toIdx = newOrder.indexOf(dragOverItem.current);
    newOrder.splice(fromIdx, 1);
    newOrder.splice(toIdx, 0, dragItem.current);
    onRanking(newOrder);
    setDragging(null);
    dragItem.current = null;
    dragOverItem.current = null;
  }

  function handleDragEndACB() {
    setDragging(null);
  }

  return (
    <div className="ranking">
      <p className="ranking__instruction">
        Which character appeared most polite? Drag to rank the videos by perceived politeness (1st = most polite)
      </p>
      <div className="ranking__list">
        {orderedVideos.map((video, idx) => (
          <div
            key={video.id}
            draggable
            onDragStart={() => handleDragStartACB(video.id)}
            onDragOver={e => handleDragOverACB(e, video.id)}
            onDrop={handleDropACB}
            onDragEnd={handleDragEndACB}
            className={`ranking__item ${dragging === video.id ? "ranking__item--dragging" : ""}`}
          >
            <div className="ranking__rank">#{idx + 1}</div>
            <div className="ranking__info">
              <span className="ranking__shadow">{video.label}</span>
            </div>
            <div className="ranking__handle">⠿</div>
          </div>
        ))}
      </div>
    </div>
  );
}
