import * as Yup from "yup";
export function initialValues() {
  return {
    email: "",
    password: "",
  };
}

export function validationSchema() {
  return Yup.object().shape({
    email: Yup.string().email("Correo inválido").required("Campo requerido"),
    password: Yup.string()
      .min(6, "Mínimo 6 caracteres")
      .required("Campo requerido"),
  });
}
