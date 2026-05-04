import cors from "cors";
import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import cloudinary from "./config/index.js";
import { uploadImage, listImages } from "./services/cloudinary.js";
import { sanitizeForContext, normalizeFields } from "./utils.js";
import * as formidable from "formidable";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

// Se incluye un endpoint /health para comprobar el estado del servidor
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.post("/dogs/photos", (req, res, next) => {
  const form = new formidable.IncomingForm();

  try {
    form.on("error", (err) => {
      console.error("error en form ", err);
      next(err);
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }

      if (Object.keys(files).length === 0) {
        res.status(400).json({ error: "No se ha adjuntado ningun fichero" });
      }

      // Se normalizan los nombre de los archivos, pueden llegan dentro de un array
      const norm = normalizeFields(fields);
      const { dogName, description } = norm;

      console.log("norm ", norm);

      uploadImage(files.dogImage[0].filepath, {
        name: dogName || "",
        description: description || "",
      });

      res.status(200).json({ status: "Foto subida correctamente" });
    });
  } catch (error) {
    console.log("error al hacer el parse ", error);
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
