import cloudinary from "../config/index.js";

export const uploadImage = async (file, context) => {
  console.log("Estoy en uploadImage");

  try {
    // Sube la imagen a la carpeta indica foder.
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "image",
      public_id: "dog2",
      overwrite: true,
      context,
      notification_url: "https://mysite.example.com/notify_endpoint",
      folder: "recentUploads",
    });
    console.log("result ", result);

    return { success: true, message: result };
  } catch (err) {
    console.error("error en upload", err);
    return {
      success: false,
      message: err?.error?.message || err?.message || "Unknown error",
    };
  }
};
