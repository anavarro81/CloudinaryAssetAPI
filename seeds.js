import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
import { hastPassword } from "./utils/auth.js";
dotenv.config();

async function insertUsers() {
  const uri = process.env.BD_URI;
  const dbName = process.env.DB_NAME;

  if (!uri) {
    console.error("Uri no informada");
    return;
  }

  if (!dbName) {
    console.error("Nombre de la base de datos no informada");
    return;
  }

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await client.connect();
    const db = client.db(dbName);
    const usersCol = db.collection("users");

    const newUsers = [
      {
        name: "Antonio",
        password: await hastPassword("oZXn7qDn9qB3R0"),
        role: "admin",
      },
      {
        name: "Karlos",
        password: await hastPassword("jaQlVG0END3HWf"),
        role: "editor",
      },
    ];

    const result = await usersCol.insertMany(newUsers);

    console.log(`${result.insertedCount} usuarios insertados.`);
  } catch (error) {
    console.error("Error al conectar con bbdd ", error);
  } finally {
    await client.close();
  }
}

insertUsers();
