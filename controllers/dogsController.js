import * as formidable from "formidable";
import { normalizeFields } from "../utils.js";
import { uploadImage, listImages } from "../services/cloudinary.js";

export const uploadPhoto = (req, res, next) => {
  console.log("Entro en uploadPhoto");

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

      // Se normalizan los nombre de los archivos, pueden llegan dentro de un array
      const norm = normalizeFields(fields);
      const { dogName, description } = norm;

      if (Object.keys(files).length === 0) {
        console.error("No se ha adjuntado ningun fichero");
        res.status(400).json({ error: "No se ha adjuntado ningun fichero" });
        return;
      }

      uploadImage(files.dogImage[0].filepath, {
        name: dogName || "",
        description: description || "",
      });

      res.status(200).json({ status: "Foto subida correctamente" });
    });
  } catch (error) {
    console.log("error al hacer el parse ", error);
  }
};

export const getDogImages = async (req, res, next) => {
  const { success, data, error } = await listImages();

  if (success) {
    res.status(200).json({ success, data });
  } else {
    console.log("error al descargar las imagenes ", error);
    res.status(400).json({ success, error });
  }
};
