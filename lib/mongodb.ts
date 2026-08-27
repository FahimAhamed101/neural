import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DB || "nueral";

declare global {
  // eslint-disable-next-line no-var
  var neuralMongoClientPromise: Promise<MongoClient> | undefined;
}

export async function getMongoDatabase() {
  if (!uri) return null;

  if (!global.neuralMongoClientPromise) {
    const client = new MongoClient(uri, { maxPoolSize: 10, serverSelectionTimeoutMS: 8_000 });
    global.neuralMongoClientPromise = client.connect();
  }

  const client = await global.neuralMongoClientPromise;
  return client.db(databaseName);
}
