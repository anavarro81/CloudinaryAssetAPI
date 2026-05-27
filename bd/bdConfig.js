import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.BD_URI;
const dbName = process.env.DB_NAME;

if (!uri) {
  console.error("Uri no informada");
  throw new Error("Uri no informada");
}

if (!dbName) {
  console.error("Nombre de la base de datos no informada");
  throw new Error("Uri no informada");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export default client;
