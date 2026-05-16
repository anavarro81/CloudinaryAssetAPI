import cloudinary from "../config/index.js";

export const uploadImage = async (file, context) => {
  if (!file) return { success: false, error: "fichero no informada" };

  try {
    // Sube la imagen a la carpeta indica foder.
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "image",
      public_id: `dog${Date.now()}`,
      overwrite: true,
      context,
      notification_url: "https://mysite.example.com/notify_endpoint",
      folder: "recentUploads",
      timeout: 60000,
    });

    return { success: true, data: result };
  } catch (err) {
    return {
      success: false,
      error: err?.error?.message || err?.message || "Unknown error",
    };
  }
};

export const listImages = async (folder = "recentUploads") => {
  try {
    const res = await cloudinary.search
      .expression(`folder: ${folder}`)
      .sort_by("public_id", "desc")
      .max_results(10)
      .with_field("context")
      .execute();

    const resources = (res.resources || []).map((r) => {
      return {
        id: r.asset_id,
        url: r.secure_url,
        alt: "foto de perro",
        title: r.context?.name ?? "Foto de perro",
        description: r.context?.description ?? "Descripción de perro",
      };
    });

    return { success: true, data: { resources } };
  } catch (err) {
    console.error("Error al recuperar las fotos de los perros ", err);
    return {
      success: false,
      error: err?.error?.message || err?.message || "Unknown error",
    };
  }
};
