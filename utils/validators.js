import Joi from "joi";

const validateEmail = Joi.string().email().required().message({
  "string.email": "El email debe ser una dirección de correo válida",
  "string.empty": "El email no puede estar vacío",
  "any.required": "El email es obligatorio",
});

const validatePassword = Joi.string()
  .pattern(new RegExp("^[a-zA-Z0-9]{6,10}$"))
  .required()
  .messages({
    "string.pattern.base":
      "La contraseña debe tener entre 6 y 10 caracteres alfanuméricos",
    "string.empty": "La contraseña no puede estar vacía",
    "any.required": "La contraseña es obligatoria",
  });

const registerSchema = Joi.object({
  email: validateEmail,
  password: validatePassword,
  role: Joi.string().valid("admin", "editor").required().messages({
    "any.only": 'El rol debe ser "admin" o "editor"',
  }),
});

const loginSchema = Joi.object({
  email: validateEmail,
  password: validatePassword,
});

export const validateUser = (user, type = "register") => {
  let error = "";

  if (type == "register") {
    const validacion = registerSchema.validate(user, { abortEarly: false });
    error = validacion.error;
  } else {
    const validacion = loginSchema.validate(user, { abortEarly: false });
    error = validacion.error;
  }

  if (!error) {
    return {
      success: true,
      message: type === "register" ? "Usuario registrado con exito " : "Login correcto"
    };
  }

  // En caso de error devuelve un array con los errores
  const errors = error.details.map((detail) => ({
    field: detail.context?.key || "unknown",
    message: detail.message,
  }));

  return { success: false, errors };
};
