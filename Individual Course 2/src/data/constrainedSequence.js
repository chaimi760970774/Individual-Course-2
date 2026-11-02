// 纯函数（不依赖浏览器 / 后端），方便用 node --test 测试

// Fisher-Yates shuffle
export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// 检查序列是否满足约束：相邻两项在每个 constraintKey 上都不相同
export function satisfiesConstraints(sequence, constraintKeys) {
  for (let i = 1; i < sequence.length; i++) {
    for (const key of constraintKeys) {
      if (sequence[i][key] === sequence[i - 1][key]) {
        return false;
      }
    }
  }
  return true;
}

// 随机回溯搜索：每一步把候选打乱后依次尝试，违反约束就回退。
// 只要存在合法序列就一定能找到；不存在时返回 null
export function generateByBacktracking(items, constraintKeys) {
  const sequence = [];
  const used = new Array(items.length).fill(false);

  function extend() {
    if (sequence.length === items.length) return true;
    const last = sequence[sequence.length - 1];
    for (const i of shuffle(items.map((_, idx) => idx))) {
      if (used[i]) continue;
      if (last && constraintKeys.some(k => items[i][k] === last[k])) continue;
      used[i] = true;
      sequence.push(items[i]);
      if (extend()) return true;
      sequence.pop();
      used[i] = false;
    }
    return false;
  }

  return extend() ? sequence : null;
}
