import cors from "cors";
import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import cloudinary from "./config/index.js";
import { uploadImage, listImages } from "./services/cloudinary.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

// Se incluye un endpoint /health para comprobar el estado del servidor
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.post("/dogs/photos", async (req, res) => {
  const { dogName = "Mascota", description } = req.body;

  let context =
    `nombre=${dogName}` + `${description ? `|description=${description}` : ""}`;

  const { success, data, error } = await uploadImage("./dog1.jpg", context);

  if (success) {
    console.log("Foto subida ", data);
    res.status(200).json({ status: "Foto subida correctamente" });
  } else {
    console.error("Error al subir la foto ", error);
    res.status(400).json({ status: "Error al subir la foto" });
  }
});

app.get("/dogs", async (req, res) => {
  const { success, data, error } = await listImages();

  console.log("success ", success);

  if (success) {
    console.log("data ", data.resources);
    res.status(200).json({ success, data });
  } else {
    console.log("error al descargar las imagenes ", error);
    res.status(400).json({ success, error });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on PORT: ${process.env.PORT}`);
});
