import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

export function Header() {
  const navigate = useNavigate();
  const mySwal = withReactContent(Swal);

  const SwalNavigator = () => {
    return mySwal
      .fire({
        text: "¿Donde quieres ir?",
        showCancelButton: true,
        confirmButtonText: "Inicio",
        cancelButtonText: "Ingresar",
        confirmButtonColor: "#0d6efd",
        backdrop: `#212121ee`,
        background: "#dedede",
      })
      .then((res) => {
        if (res.isConfirmed) navigate("/");
      });
  };

  const handleDisconnect = () => {
    localStorage.clear();
    navigate("/login");
    SwalNavigator();
  };

  const handleDelete = async () => {
    mySwal
      .fire({
        icon: "question",
        title: "¿Deseas eliminar la cuenta?",
        html: <p>Esta acción no se puede revertir</p>,
        background: "#212121",
        showDenyButton: true,
        confirmButtonText: "Si, la quiero eliminar",
        denyButtonText: "No, quiero conservarla",
        confirmButtonColor: "#dc3741",
        denyButtonColor: "#7066e0",
      })
      .then(async (res) => {
        if (res.isConfirmed) {
          try {
            await axios.delete(
              `${process.env.REACT_APP_BACKEND_URL}${localStorage.userId}`
            );
          } catch (error) {
            console.log(`Error! ${error}`);
          }
          localStorage.clear();
          mySwal
            .fire({
              icon: "success",
              title: "La cuenta ha sido eliminada",
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
              background: "#212121",
            })
            .then(() => {
              navigate("/login");
              SwalNavigator();
            });
        } else {
          mySwal.fire({
            icon: "info",
            title: "La cuenta continua activa",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            background: "#212121",
          });
        }
      });
  };

  const burgerMenu = () => {
    document.querySelector("#navbarSupportedContent").classList.toggle("show");
  };

  return (
    <div className="position-sticky vw-100">
      <nav className="navbar navbar-expand-sm bg-secondary navbar-dark px-3">
        <div className="d-flex align-items-center">
          <Link to="/" className="nav-link navbar-brand">
            <img width="25px" src={require("../../img/pokeball.png")} alt="" />
          </Link>
        </div>

        <button className="navbar-toggler" type="button" onClick={burgerMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="w-100 navbar-nav justify-content-between">
            <div>
              <li className="nav-item active"></li>
            </div>
            <div className="d-flex flex-end gap-2 justify-content-center">
              {localStorage.userId ? (
                <>
                  <li className="nav-item mx-1">
                    <button
                      onClick={handleDisconnect}
                      className="shadow btn btn-outline-warning rounded-pill"
                    >
                      Desconectar
                    </button>
                  </li>
                  <li className="nav-item mx-1">
                    <button
                      className="shadow btn btn-outline-danger rounded-pill"
                      onClick={handleDelete}
                    >
                      Eliminar cuenta
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item mx-1">
                    <Link
                      to="/login"
                      className="shadow btn btn-primary rounded-pill"
                    >
                      Ingresar
                    </Link>
                  </li>
                  <li className="nav-item mx-1">
                    <Link
                      to="/register"
                      className="shadow btn btn-outline-light rounded-pill"
                    >
                      Registrar
                    </Link>
                  </li>
                </>
              )}
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
}
