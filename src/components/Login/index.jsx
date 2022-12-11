import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export function Login() {
  const [usuarios, setUsuarios] = useState([]);
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);

  const getUsers = async () => {
    const res = await axios.get(process.env.REACT_APP_BACKEND_URL);
    setUsuarios(res.data);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    usuarios.forEach((usuario) => {
      if (usuario.email === correo && usuario.password === password) {
        localStorage.userId = usuario.id;
        localStorage.userNick = usuario.nick;
        localStorage.team = usuario.team;
        navigate("/");
      }
    });
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h1>Ingresa con tus datos</h1>
      <form
        className="d-flex flex-column align-items-center"
        onSubmit={handleLogin}
        autoComplete="off"
      >
        <input
          type="email"
          value={correo}
          placeholder="Email"
          onChange={(e) => {
            setCorreo(e.target.value);
          }}
          className="form-control m-1"
        />
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="form-control m-1"
        />
        <div>
          <button type="submit" className="btn btn-primary m-3 rounded-pill">
            Ingresar
          </button>
          <Link to="/" className="btn btn-outline-info m-3 rounded-pill">
            Volver
          </Link>
        </div>
      </form>
    </div>
  );
}
