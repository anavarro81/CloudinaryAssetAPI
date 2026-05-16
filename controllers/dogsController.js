import { normalizeFields, cleanupUploadedFiles } from "../utils/utils.js";
import { uploadImage, listImages } from "../services/cloudinary.js";

export const uploadPhoto = async (req, res, next) => {
  console.log("req.norm ", req.norm);
  console.log("req.files ", req.files);

  const file = req.files.dogImage[0]

  try {
    if (!req.files.dogImage[0]) {
      
      return res.status(400).json({ message: "Fichero no recibido" });
    }
    const { dogName, description } = req.norm;
    const file = req.files.dogImage[0];

    uploadImage(file.filepath, {
      name: dogName || "",
      description: description || "",
    });

    return res.status(200).json({ status: "Foto subida correctamente" });
  } catch (error) {
    console.error("Error al subir la imagen ", error);
    await cleanupUploadedFiles(file)
    return res.status(500).json({ message: error });
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
