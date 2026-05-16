import * as formidable from "formidable";
import { normalizeFields, cleanupUploadedFiles } from "../utils/utils.js";

// Valida tamaño maximo 200 KB
// Valida tipos permitido jpeg, png o webp

const MAX_FILE_SIZE = 200 * 1024; // 200 KB
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export const formidableValidate = async (req, res, next) => {
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
        console.error("No se ha adjuntado ningun fichero");
        res.status(400).json({ error: "No se ha adjuntado ningun fichero" });
        return;
      }

      if (!files.dogImage) {
        console.error("Propiedad dogImage no encontrada");
        res.status(400).json({ error: "Propiedad DogName no encontrada" });
        return;
      }

      const file = files.dogImage[0];

      if (!ALLOWED_TYPES.has(files.dogImage[0].mimetype)) {
        cleanupUploadedFiles(file);
        return res.status(415).json({ error: "Tipo de archivo no válido" });
      }

      const size = files.dogImage[0].size || 0;

      if (size > MAX_FILE_SIZE) {
        cleanupUploadedFiles(file);
        return res.status(413).json({ error: "Tamaño de archivo excesivo" });
      }

      // Se añaden los datos normalizado al objeto req para luego leerlos facilmente en el controlador
      req.norm = normalizeFields(fields);
      req.files = files;
      next();
    });
  } catch (error) {
    console.error("Error al validar los ficheros ", error);
  }
};
