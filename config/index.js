import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.CLOUD_NAME) {
  throw new Error("CLOUD_NAME no definida");
  process.exit(1);
}

if (!process.env.API_KEY) {
  throw new Error("API_KEY no definida");
  process.exit(1);
}

if (!process.env.API_SECRET) {
  throw new Error("API_SECRET no definida");
  process.exit(1);
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export default cloudinary;
