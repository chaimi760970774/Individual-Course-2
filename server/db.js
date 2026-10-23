import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);
let db;

export async function connectDB() {
  await client.connect();
  // database name comes from the URI path, or MONGODB_DB if set (handy for Atlas URIs without a path)
  db = client.db(process.env.MONGODB_DB);
  console.log('MongoDB connected');
}

export function getDb() {
  return db;
}
