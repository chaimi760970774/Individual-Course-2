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

  return rows;
}

// 把评分行导出为 CSV 并下载
export function downloadResultsCSV(rows, filename = "results.csv") {
  if (rows.length === 0) return;
  const headers = Object.keys(rows[0]);
  const csv = [
    headers.join(","),
    ...rows.map(r => headers.map(h => JSON.stringify(r[h] ?? "")).join(",")),
  ].join("\n");

  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
