import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { registerSchema } from "../../schemas";
import { CustomInput } from "../CustomInput";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export function Register() {
  const mySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const onSubmit = async ({ username, email, password }) => {
    try {
      await axios.post(process.env.REACT_APP_BACKEND_URL, {
        nick: username,
        email: email,
        password: password,
        team: JSON.stringify([0, 0, 0, 0, 0, 0]),
      });
      mySwal.fire({
        icon: "success",
        background: "#212121",
        title: <strong>Registro exitoso!</strong>,
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={registerSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <h1 className="d-flex justify-content-center m-3">
            Formulario de registro
          </h1>
          <div className="row  mb-4">
            <div className="col">
              <CustomInput
                label="Nombre de usuario"
                name="username"
                type="text"
                className="form-control m-1"
              />
            </div>
            <div className="col">
              <CustomInput
                label="Email"
                name="email"
                type="text"
                className="form-control m-1"
              />
            </div>
          </div>
          <div className="row  mb-4">
            <div className="col">
              <CustomInput
                label="Contraseña"
                name="password"
                type="password"
                className="form-control m-1"
              />
            </div>
          </div>
          <div className="row  mb-4">
            <div className="col">
              <CustomInput
                label="Confirmar contraseña"
                name="confirmPassword"
                type="password"
                className="form-control m-1"
              />
            </div>
          </div>
          <div className=" m-2 d-flex justify-content-center">
            <button
              className="btn btn-primary mr-4 px-3"
              disabled={isSubmitting}
              type="submit"
            >
              Registrar
            </button>
          </div>
          <div className=" m-2 d-flex justify-content-center">
            <Link to="/" className="btn btn-outline-info px-4">
              Volver
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
}
