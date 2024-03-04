import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/axios";
import { AuthProvider } from "../context/AuthProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    try {
      const { data } = await clienteAxios.post("/veterinarios/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);

      setAuth(data);

      navigate("/admin");
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div className="text-6xl font-black text-indigo-600">
        <h1>
          Inicia Sesión y Administra tus
          <span className="text-black"> Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 rounded-xl bg-white px-5 py-10 shadow-lg md:mt-5">
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-xl font-bold uppercase text-gray-600">
              Email
            </label>
            <input
              type="email"
              placeholder="Email de Registro"
              className="mt-3 w-full rounded-xl border bg-gray-50 p-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xl font-bold uppercase text-gray-600">
              Password
            </label>
            <input
              type="password"
              placeholder="Tu Password"
              className="mt-3 w-full rounded-xl border bg-gray-50 p-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Iniciar Sesión"
            className="mt-10 w-full rounded-xl bg-indigo-700 px-10 py-3 font-bold uppercase text-white hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link
            className="my-5 block text-center text-gray-500"
            to="/registrar"
          >
            ¿No tienes una cuenta? Regístrate
          </Link>
          <Link
            className="my-5 block text-center text-gray-500"
            to="/olvide-password"
          >
            Olvide mi Password
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Login;
