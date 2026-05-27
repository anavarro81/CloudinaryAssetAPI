import client from "../bd/bdConfig.js";
import { comparePassword } from "../utils/auth.js";
import { validateUser } from "../utils/validators.js";

export const login = async (req, res) => {
  const { name, password } = req.body;

  if (!name) {
    res
      .status(400)
      .json({ status: "KO", message: "El usuario es obligatorio" });
    return;
  }

  if (!password) {
    res
      .status(400)
      .json({ status: "KO", message: "La password es obligatoria" });
    return;
  }

    const resp = validateUser(req.body, 'login')

    if (!resp.success) {
      res
        .status(400)
        .json({ status: "KO", message: resp.errors });

    }

  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const users = db.collection("users");

    const usuario = await users.findOne({ name });

    if (!usuario) {
      res.status(401).json({ status: "KO", message: "No existe el usuario" });
      return;
    }

    if (!comparePassword(password, usuario.password)) {
      res
        .status(401)
        .json({ status: "KO", message: "Credenciales no validas" });
    }

    res.status(200).json({ id: usuario._id, name: usuario.name });
  } catch (error) {
    console.error("Error al recuperar el usuario ", error);
    res.status(500).json({ status: "KO", message: "Error en el login" });
  }
};
