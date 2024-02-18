import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");

  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Resetea la alerta al inicio para limpiar alertas previas.
    setAlerta({});

    if ([nombre, email, password, repetirPassword].includes("")) {
      setAlerta({ msg: "Hay campos vacíos", error: true });
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({ msg: "Las contraseñas no coinciden", error: true });
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: "La contraseña debe tener al menos 6 caracteres",
        error: true,
      });
      return;
    }

    try {
      const datos = { nombre, email, password };
      const respuesta = await clienteAxios.post("/veterinarios", datos); // Pasa el objeto como segundo parámetro
      setAlerta({
        msg: "Usuario creado correctamente, Revisa tu email",
        error: false,
      });
      console.log(respuesta);
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div className="text-6xl font-black text-indigo-600">
        <h1>
          Crea tu Cuenta y Administra tus
          <span className="text-black"> Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 rounded-xl bg-white px-5 py-10 shadow-lg md:mt-5">
        {msg && <Alerta alerta={alerta} />}

        <form onSubmit={handleSubmit}>
          <div className="">
            <label className="block text-xl font-bold uppercase text-gray-600">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Tu Nombre"
              className="mt-3 w-full rounded-xl border bg-gray-50 p-3"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div>
            <label className="mt-5 block text-xl font-bold uppercase text-gray-600">
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
            <label className="mt-5 block text-xl font-bold uppercase text-gray-600">
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

          <div>
            <label className="mt-5 block text-xl font-bold uppercase text-gray-600">
              Repetir Password
            </label>
            <input
              type="password"
              placeholder="Repite tu Password"
              className="mt-3 w-full rounded-xl border bg-gray-50 p-3"
              value={repetirPassword}
              onChange={(e) => setRepetirPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Crear Cuenta"
            className="mt-10 w-full rounded-xl bg-indigo-700 px-10 py-3 font-bold uppercase text-white hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="my-5 block text-center text-gray-500" to="/">
            ¿Ya tienes una cuenta? Inicia Sesión
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

export default Registrar;
