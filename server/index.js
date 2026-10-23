import express from 'express';
import { connectDB, getDb } from './db.js';

const app = express();
app.use(express.json({ limit: '100kb' }));

// allow the separately-served frontend (GitHub Pages, different origin) to call this API
const allowedOrigins = (process.env.ALLOWED_ORIGIN ?? '')
  .split(',')
  .map(o => o.trim().replace(/\/+$/, ''))
  .filter(Boolean);
const localhostOrigin = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

function isAllowedOrigin(origin) {
  if (allowedOrigins.length > 0) return allowedOrigins.includes(origin);
  return localhostOrigin.test(origin);
}

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && isAllowedOrigin(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

const part1Orders = () => getDb().collection('part1_orders');
const part1Results = () => getDb().collection('part1_results');

// ---------- validation helpers ----------

const isPlainObject = v => typeof v === 'object' && v !== null && !Array.isArray(v);
const isShortString = (v, max = 200) => typeof v === 'string' && v.length <= max;
const isVideoId = v =>
  (Number.isInteger(v) && v >= 0) || (isShortString(v, 100) && v.length > 0);
const isRating = v => v === null || (Number.isInteger(v) && v >= 1 && v <= 7);
const isFieldName = k => /^[A-Za-z][A-Za-z0-9_]{0,49}$/.test(k);

const ROW_FIELDS = ['order', 'motion', 'condition', 'videoId'];

function validateVideoOrder(videoOrder) {
  if (!Array.isArray(videoOrder) || videoOrder.length === 0 || videoOrder.length > 100)
    return 'videoOrder must be a non-empty array';
  if (!videoOrder.every(isVideoId)) return 'videoOrder contains an invalid video id';
  if (new Set(videoOrder).size !== videoOrder.length) return 'videoOrder contains duplicates';
  return null;
}

function validateParticipantInfo(info) {
  if (!isPlainObject(info)) return 'participantInfo must be an object';
  if (!isShortString(info.participantId) || info.participantId.trim() === '')
    return 'participantInfo.participantId is required';
  if (!(isShortString(info.age, 10) || Number.isFinite(info.age)))
    return 'participantInfo.age is invalid';
  if (!isShortString(info.gender, 50)) return 'participantInfo.gender is invalid';
  return null;
}

function validateRatingRow(row) {
  if (!isPlainObject(row)) return 'each rating must be an object';
  if (!Number.isInteger(row.order) || row.order < 1) return 'rating.order is invalid';
  if (!isVideoId(row.videoId)) return 'rating.videoId is invalid';
  if (!isShortString(row.motion, 50) || !isShortString(row.condition, 50))
    return 'rating.motion and rating.condition must be strings';
  for (const [key, value] of Object.entries(row)) {
    if (ROW_FIELDS.includes(key)) continue;
    if (!isFieldName(key)) return `rating field "${key}" is not allowed`;
    if (!isRating(value)) return `rating.${key} must be an integer 1-7 or null`;
  }
  return null;
}

// ---------- routes ----------

// all existing Part1 video orders (used for the between-participant balance score)
app.get('/api/orders/part1', async (req, res) => {
  const all = await part1Orders()
    .find({}, { projection: { _id: 0, videoOrder: 1 } })
    .toArray();
  res.json(all);
});

// save a newly generated Part1 video order
app.post('/api/orders/part1', async (req, res) => {
  const videoOrder = req.body?.videoOrder;
  const error = validateVideoOrder(videoOrder);
  if (error) return res.status(400).json({ error });

  const result = await part1Orders().insertOne({ videoOrder, createdAt: new Date() });
  res.status(201).json({ id: result.insertedId });
});

// save Part1 results (same shape as the previous Firestore documents)
app.post('/api/results/part1', async (req, res) => {
  const { participantInfo, ratings } = req.body ?? {};

  const infoError = validateParticipantInfo(participantInfo);
  if (infoError) return res.status(400).json({ error: infoError });

  if (!Array.isArray(ratings) || ratings.length === 0 || ratings.length > 100)
    return res.status(400).json({ error: 'ratings must be a non-empty array' });
  for (const row of ratings) {
    const rowError = validateRatingRow(row);
    if (rowError) return res.status(400).json({ error: rowError });
  }

  const result = await part1Results().insertOne({
    participantInfo: {
      participantId: participantInfo.participantId,
      age: participantInfo.age,
      gender: participantInfo.gender,
    },
    ratings,
    completedAt: new Date(),
  });
  res.status(201).json({ id: result.insertedId });
});

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.use((req, res) => res.status(404).json({ error: 'Not found' }));

// malformed JSON -> 400, everything else -> 500
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed' || err.type === 'entity.too.large')
    return res.status(400).json({ error: 'Invalid request body' });
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const port = process.env.PORT ?? 3000;

await connectDB();
app.listen(port, () =>
  console.log(`Server on http://localhost:${port}`)
);
