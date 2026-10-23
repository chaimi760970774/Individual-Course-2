import { API_URL } from "./api.js";

// ============================================================
// 工具函数
// ============================================================

// Fisher-Yates shuffle
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// 检查序列是否满足约束
function satisfiesConstraints(sequence, constraintKeys) {
  for (let i = 1; i < sequence.length; i++) {
    for (const key of constraintKeys) {
      if (sequence[i][key] === sequence[i - 1][key]) {
        return false;
      }
    }
  }
  return true;
}

// 贪心算法：逐步构建满足约束的序列
function buildSequenceGreedy(items, constraintKeys) {
  const remaining = [...items];
  const sequence = [];

  while (remaining.length > 0) {
    const last = sequence[sequence.length - 1];
    const candidates = remaining.filter(item => {
      if (!last) return true;
      return constraintKeys.every(k => item[k] !== last[k]);
    });

    if (candidates.length === 0) return null;

    const chosen = candidates[Math.floor(Math.random() * candidates.length)];
    sequence.push(chosen);
    remaining.splice(remaining.indexOf(chosen), 1);
  }

  return sequence;
}

// Monte Carlo：随机尝试 maxAttempts 次
function generateByMonteCarlo(items, constraintKeys, maxAttempts = 500) {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const candidate = shuffle(items);
    if (satisfiesConstraints(candidate, constraintKeys)) {
      return candidate;
    }
  }
  return null;
}

// 贪心：尝试 maxAttempts 次，失败就随机
function generateByGreedy(items, constraintKeys, maxAttempts = 100) {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const seq = buildSequenceGreedy(items, constraintKeys);
    if (seq) return seq;
  }
  console.warn("Greedy failed, using plain shuffle.");
  return shuffle(items);
}

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

  // 2. 生成 numCandidates 个候选序列（Monte Carlo）
  const candidates = [];
  for (let i = 0; i < numCandidates; i++) {
    const seq = generateByMonteCarlo(items, constraintKeys, 500);
    if (seq) candidates.push(seq);
  }

  if (candidates.length === 0) {
    console.warn("No valid Monte Carlo candidates, falling back to greedy.");
    candidates.push(generateByGreedy(items, constraintKeys));
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

// Part1: Monte Carlo，相邻视频的 motion 不重复
export async function getPart1Order(videos) {
  return await monteCarloRandomize(videos, ["motion"], "/api/orders/part1");
}
