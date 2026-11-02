import { API_URL } from "./api.js";
import { generateByBacktracking } from "./constrainedSequence.js";

// ============================================================
// 计算平衡分数（between-participant）
// ============================================================

function calculateBalanceScore(candidateOrder, existingOrders) {
  if (existingOrders.length === 0) return 0;

  const positionCounts = {};
  for (const order of existingOrders) {
    order.forEach((videoId, pos) => {
      const key = `${videoId}_${pos}`;
      positionCounts[key] = (positionCounts[key] || 0) + 1;
    });
  }

  let score = 0;
  candidateOrder.forEach((videoId, pos) => {
    const key = `${videoId}_${pos}`;
    score += positionCounts[key] || 0;
  });

  return score;
}

// ============================================================
// Monte Carlo Randomization 主函数（用于 Part1）
// ============================================================

async function monteCarloRandomize(items, constraintKeys, ordersPath, numCandidates = 1000) {
  // 1. 从后端（MongoDB）读取已有参与者的顺序
  let existingOrders = [];
  try {
    const res = await fetch(`${API_URL}${ordersPath}`, { signal: AbortSignal.timeout(60000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const docs = await res.json();
    docs.forEach(data => {
      if (data.videoOrder) existingOrders.push(data.videoOrder);
    });
  } catch (err) {
    console.warn("Could not read existing orders from server:", err);
  }

  // 2. 生成 numCandidates 个满足约束的随机候选序列（随机回溯，保证合法）
  const candidates = [];
  for (let i = 0; i < numCandidates; i++) {
    const seq = generateByBacktracking(items, constraintKeys);
    if (!seq) throw new Error("No sequence satisfies the constraints");
    candidates.push(seq);
  }

  // 3. 选择平衡分数最低的候选序列
  let bestSequence = candidates[0];
  let bestScore = Infinity;
  const existingIdOrders = existingOrders.map(order => order.map(v => v.id ?? v));

  for (const candidate of candidates) {
    const candidateIds = candidate.map(v => v.id ?? v);
    const score = calculateBalanceScore(candidateIds, existingIdOrders);
    if (score < bestScore) {
      bestScore = score;
      bestSequence = candidate;
    }
  }

  // 4. 存到后端（createdAt 由服务端生成）
  try {
    const res = await fetch(`${API_URL}${ordersPath}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ videoOrder: bestSequence.map(v => v.id ?? v) }),
      signal: AbortSignal.timeout(60000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  } catch (err) {
    console.warn("Could not save order to server:", err);
  }

  return bestSequence;
}

// ============================================================
// 入口函数
// ============================================================

// Part1: 16 个视频，相邻视频的角色和版本都不能相同
export async function getPart1Order(videos) {
  return await monteCarloRandomize(videos, ["character", "version"], "/api/orders/part1");
}
