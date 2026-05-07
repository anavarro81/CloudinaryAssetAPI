import cors from "cors";
import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import cloudinary from "./config/index.js";
import { uploadImage, listImages } from "./services/cloudinary.js";
import { sanitizeForContext, normalizeFields } from "./utils.js";
import * as formidable from "formidable";
import router from "./routes/dog.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

// Se incluye un endpoint /health para comprobar el estado del servidor
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

console.log("Estoy en app");

app.use("/dogs", router);



app.listen(process.env.PORT, () => {
  console.log(`Server running on PORT: ${process.env.PORT}`);
});
