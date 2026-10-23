// Export Part1 results from MongoDB to a long-format CSV
// (one row per participant x video).
//
// Usage (from the server/ folder):
//   MONGODB_URI="mongodb+srv://..." node scripts/exportCsv.js
// Output: part1_results.csv in the current folder.

import { MongoClient } from 'mongodb';
import { writeFileSync } from 'node:fs';

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('Please set MONGODB_URI');
  process.exit(1);
}

const client = new MongoClient(uri);

function csvCell(v) {
  if (v === null || v === undefined) return '';
  const s = v instanceof Date ? v.toISOString() : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

try {
  await client.connect();
  const docs = await client.db().collection('part1_results')
    .find().sort({ completedAt: 1 }).toArray();

  const rows = [];
  for (const doc of docs) {
    const info = doc.participantInfo ?? {};
    for (const r of doc.ratings ?? []) {
      rows.push({
        participantId: info.participantId,
        age: info.age,
        gender: info.gender,
        completedAt: doc.completedAt,
        ...r,
      });
    }
  }

  const fixed = ['participantId', 'age', 'gender', 'completedAt', 'order', 'videoId', 'motion', 'condition'];
  const extra = [...new Set(rows.flatMap(Object.keys))].filter(k => !fixed.includes(k));
  const columns = [...fixed, ...extra];

  const csv = [
    columns.join(','),
    ...rows.map(row => columns.map(c => csvCell(row[c])).join(',')),
  ].join('\n');

  writeFileSync('part1_results.csv', '﻿' + csv);
  console.log(`Exported ${docs.length} participants, ${rows.length} rows -> part1_results.csv`);
} finally {
  await client.close();
}