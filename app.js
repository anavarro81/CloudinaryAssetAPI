import cors from "cors";
import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import cloudinary from "./config/index.js";
import { uploadImage } from "./services/cloudinary.js";

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

  const { success, message } = await uploadImage("./dog1.jpg", context);

  console.log("success ", success);
  console.log("message ", message);

  if (success) {
    console.log("Foto subida correctamente");
    console.log("datos de la foto ", message);
    res.status(200).json({ status: "Foto subida correctamente" });
  } else {
    console.error("Error al subir la foto ", message);
    res.status(400).json({ status: "Error al subir la foto" });
  }
});

// Descarga las imagenes de la carpeta: recentUploads
// const getImages = async () => {
//   try {
//     await cloudinary.search
//       .expression("folder: recentUploads")
//       .sort_by("public_id", "desc")
//       .max_results(3)
//       .execute()
//       .then((result) => console.log(result));
//   } catch (error) {
//     console.log("error al recuperar la imagen ", error);
//   }
// };

// getImages();

app.listen(process.env.PORT, () => {
  console.log(`Server running on PORT: ${process.env.PORT}`);
});
