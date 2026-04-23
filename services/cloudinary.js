import cloudinary from "../config/index.js";

export const uploadImage = async (file, context) => {


  if (!file) return {success: false, error: "fichero no informada"} 


  try {
    // Sube la imagen a la carpeta indica foder.
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "image",
      public_id: `dog${Date.now()}`,
      overwrite: true,
      context,
      notification_url: "https://mysite.example.com/notify_endpoint",
      folder: "recentUploads",
    });
    console.log("result ", result);

    return { success: true, data: result };
  } catch (err) {
    console.error("error en upload", err);
    return {
      success: false,
      error: err?.error?.message || err?.message || "Unknown error",
    };
  }
};
