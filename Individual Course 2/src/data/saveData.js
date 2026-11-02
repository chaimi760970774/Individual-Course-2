import { API_URL } from "./api.js";

// 每个视频一行
function buildPart1Rows(videoOrder, ratings, dimensions) {
  return videoOrder.map((v, idx) => ({
    trialIndex: idx + 1,
    videoId: v.id,
    character: v.character,
    version: v.version,
    ...Object.fromEntries(dimensions.map(d => [d.key, ratings[v.id]?.[d.key] ?? null])),
  }));
}

// 保存 Part1 数据（completedAt 由服务端生成），失败时抛出错误
export async function savePart1Results(participantInfo, videoOrder, ratings, dimensions) {
  const rows = buildPart1Rows(videoOrder, ratings, dimensions);

  const res = await fetch(`${API_URL}/api/results/part1`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ participantInfo, videoOrder: videoOrder.map(v => v.id), ratings: rows }),
  });
  if (!res.ok) throw new Error(`Saving Part1 results failed: ${res.status}`);
}
