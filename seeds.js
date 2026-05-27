import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
import { hastPassword } from "./utils/auth.js";
import { validateUser } from "./utils/validators.js";
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

    const { success: valirAdmin, errors: adminMessage } = validateUser({
      name: process.env.USER_ADMIN_NAME,
      password: process.env.USER_ADMIN_PASSWORD,
      email: process.env.USER_ADMIN_EMAIL,
      role: process.env.USER_ADMIN_ROLE,
    });

    if (!valirAdmin) {
      console.error("Admin no valido ", adminMessage);
      process.exit(-1);
    }

    let { success: validEditor, errors: editorMessage } = validateUser({
      name: process.env.USER_EDITOR_NAME,
      password: process.env.USER_EDITOR_PASSWORD,
      email: process.env.USER_EDITOR_EMAIL,
      role: process.env.USER_EDITOR_ROLE,
    });
    if (!validEditor) {
      console.error("editor no valido ", editorMessage);
      process.exit(-1);
    }

    const newUsers = [];

    newUsers.push({
      name: process.env.USER_ADMIN_NAME,
      password: process.env.USER_ADMIN_PASSWORD,
      email: process.env.USER_ADMIN_EMAIL,
      role: process.env.USER_ADMIN_ROLE,
    });
    newUsers.push({
      name: process.env.USER_EDITOR_NAME,
      password: process.env.USER_EDITOR_PASSWORD,
      email: process.env.USER_EDITOR_EMAIL,
      role: process.env.USER_EDITOR_ROLE,
    });

    const result = await usersCol.insertMany(newUsers);

    console.log(`${result.insertedCount} usuarios insertados.`);
  } catch (error) {
    console.error("Error al conectar con bbdd ", error);
  } finally {
    await client.close();
  }
}

insertUsers();
