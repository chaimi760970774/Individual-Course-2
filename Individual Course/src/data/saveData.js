import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { PART2B_DIMENSIONS } from "./part2Data.js";

// 保存 Part1 数据
export async function savePart1Results(participantInfo, videoOrder, ratings, dimensions) {
  const rows = videoOrder.map((v, idx) => ({
    order: idx + 1,
    participant: v.participant,
    strategy: v.strategy,
    videoId: v.id,
    ...Object.fromEntries(dimensions.map(d => [d.key, ratings[v.id]?.[d.key] ?? null])),
  }));

  await addDoc(collection(db, "part1_results"), {
    participantInfo,
    ratings: rows,
    completedAt: serverTimestamp(),
  });
}

// 保存 Part2 数据
export async function savePart2Results(participantInfo, groupOrder, ratingsA, rankingsA, videoOrder, ratingsB) {
  const partARows = groupOrder.map((g, idx) => ({
    order: idx + 1,
    strategy: g.strategy,
    ranking: rankingsA[g.id] ?? [],
    videos: g.videos.map(v => ({
      videoId: v.id,
      shadow: v.shadow,
      rating: ratingsA[v.id] ?? null,
    })),
  }));

  const partBRows = videoOrder.map((v, idx) => ({
    order: idx + 1,
    strategy: v.strategy,
    fidelity: v.fidelity,
    videoId: v.id,
    ...Object.fromEntries(PART2B_DIMENSIONS.map(d => [d.key, ratingsB[v.id]?.[d.key] ?? null])),
  }));

  await addDoc(collection(db, "part2_results"), {
    participantInfo,
    partA: partARows,
    partB: partBRows,
    completedAt: serverTimestamp(),
  });
}

// 保存 Part3 数据
export async function savePart3Results(participantInfo, videoOrder, ratings, dimensions) {
  const rows = videoOrder.map((v, idx) => ({
    order: idx + 1,
    hair: v.hair,
    strategy: v.strategy,
    videoId: v.id,
    ...Object.fromEntries(dimensions.map(d => [d.key, ratings[v.id]?.[d.key] ?? null])),
  }));

  await addDoc(collection(db, "part3_results"), {
    participantInfo,
    ratings: rows,
    completedAt: serverTimestamp(),
  });
}

// 保存 Debrif 数据
export async function saveDebriefResults(participantInfo, answers) {
  await addDoc(collection(db, "debrief_results"), {
    participantInfo,
    answers,
    completedAt: serverTimestamp(),
  });
}