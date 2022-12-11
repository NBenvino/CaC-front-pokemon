import * as yup from "yup";

// min 5 caracteres, 1 mayúscula, 1 minúscula, 1 numero
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Se requieren mínimo 5 caracteres")
    .required("Obligatorio"),
  email: yup
    .string()
    .email("Contraseña invalida")
    .required("Campo obligatorio"),
  password: yup
    .string()
    .min(8, "Se necesitan mínimo 8 caracteres")
    .matches(passwordRules, {
      message: "Contraseña débil",
    })
    .required("Campo obligatorio"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "No coincide con la contraseña")
    .required("Campo obligatorio"),
});
