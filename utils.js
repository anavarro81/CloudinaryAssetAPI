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
