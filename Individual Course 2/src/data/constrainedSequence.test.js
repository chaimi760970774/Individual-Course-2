// 运行：npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { PART1_VIDEOS } from "./part1Data.js";
import { generateByBacktracking } from "./constrainedSequence.js";

test("1000 sequences: all 16 videos, no duplicates, adjacent differ in character and version", () => {
  const allIds = PART1_VIDEOS.map(v => v.id).sort();
  const distinct = new Set();

  for (let n = 0; n < 1000; n++) {
    const seq = generateByBacktracking(PART1_VIDEOS, ["character", "version"]);
    assert.ok(seq, "no sequence found");
    assert.equal(seq.length, 16);
    assert.deepEqual(seq.map(v => v.id).sort(), allIds);
    for (let i = 1; i < seq.length; i++) {
      assert.notEqual(seq[i].character, seq[i - 1].character, `same character at ${i}`);
      assert.notEqual(seq[i].version, seq[i - 1].version, `same version at ${i}`);
    }
    distinct.add(seq.map(v => v.id).join(","));
  }

  // 顺序应该是动态随机的，而不是总产生同几种
  assert.ok(distinct.size > 990, `only ${distinct.size} distinct orders`);
});
