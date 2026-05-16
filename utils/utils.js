import fs from "fs/promises";

export const sanitizeForContext = (str, max = 255) => {
  if (!str) return "";

  // Elimina saltos de linea, sustituye por espacio en blanco.
  // Sustituye caracteres especiales '|' y '=' por espacios.

  let s = String(str)
    .replace(/[\r\n]+/g, " ")
    .replace(/[|=]/g, " ")
    .trim();
  s = s.slice(0, max);
  return s;
};

export const normalizeFields = (fields) => {
  const out = {};

  for (const k in fields) {
    out[k] = Array.isArray(fields[k]) ? fields[k][0] : fields[k];
  }

  return out;
};

// Se limpian los archivos temporales que no se llegan a subir por no ser correctos
// Evita que se acumulen el el servidor y lo puedan saturar con el tiempo.
export const cleanupUploadedFiles = async (file) => {
  if (!file) return;

  const path = file.filepath || file.path;

  if (!path) return;

  try {
    await fs.unlink(f);
  } catch (_) {}
};
