import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
dotenv.config();
const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.use(cors());
app.use(express.json());
app.use(helmet());

// Se incluye un endpoint /health para comprobar el estado del servidor
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.post("/dogs/photos", (req, res) => {
  const { dogName = "Mascota", description } = req.body;

  console.log("description ", description);

  let context = `nombre=${dogName}` + `${description ? `|description=${description}` : ""}`;

  console.log("contexto ", context);

  try {
    // Sube la imagen a la carpeta indica foder.
    cloudinary.uploader
      .upload("dog2.jpg", {
        resource_type: "image",
        public_id: "dog2",
        overwrite: true,
        context,
        notification_url: "https://mysite.example.com/notify_endpoint",
        folder: "recentUploads",
      })
      .then((result) => console.log("foto insertada correctamente"));
  } catch (error) {
    console.log("error al subir la imagen ", error);
  }

  res.status(200).json({ status: "Foto subida correctamente" });
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
