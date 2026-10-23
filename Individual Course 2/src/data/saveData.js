import { API_URL } from "./api.js";

// 每个视频一行
function buildPart1Rows(videoOrder, ratings, dimensions) {
  return videoOrder.map((v, idx) => ({
    order: idx + 1,
    motion: v.motion,
    condition: v.condition,
    videoId: v.id,
    ...Object.fromEntries(dimensions.map(d => [d.key, ratings[v.id]?.[d.key] ?? null])),
  }));
}

// 保存 Part1 数据（completedAt 由服务端生成），失败时抛出错误
export async function savePart1Results(participantInfo, videoOrder, ratings, dimensions) {
  const rows = buildPart1Rows(videoOrder, ratings, dimensions);

  const res = await fetch(`${API_URL}/api/results/part1`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ participantInfo, ratings: rows }),
  });
  if (!res.ok) throw new Error(`Saving Part1 results failed: ${res.status}`);
}
