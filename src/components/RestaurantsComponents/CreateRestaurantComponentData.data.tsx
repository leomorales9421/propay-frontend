import * as Yup from "yup";

export function initialValues() {
  return {
    name: "",
    address: "",
    phone: "",
    state: "",
    image: null,
  };
}

export function validationSchema() {
  return Yup.object().shape({
    name: Yup.string().required("Campo requerido"),
    address: Yup.string().required("Campo requerido"),
    phone: Yup.string().required("Campo requerido"),
    state: Yup.string().required("Campo requerido"),
  });
}
