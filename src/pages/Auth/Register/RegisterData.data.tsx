import * as Yup from "yup";

export function initialValues() {
  return {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
    country: "ve",
    phone: "",
  };
}

export function validationSchema() {
  return Yup.object().shape({
    firstName: Yup.string()
      .required("Campo requerido")
      .min(2, "Mínimo 2 caracteres"),

    lastName: Yup.string()
      .required("Campo requerido")
      .min(2, "Mínimo 2 caracteres"),

    email: Yup.string().email("Correo inválido").required("Campo requerido"),

    password: Yup.string()
      .min(6, "Mínimo 6 caracteres")
      .required("Campo requerido"),

    repeatPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
      .required("Campo requerido"),

    country: Yup.string().required("Campo requerido"),

    phone: Yup.string()
      .matches(/^[0-9]{7,15}$/, "Número inválido")
      .required("Campo requerido"),
  });
}
