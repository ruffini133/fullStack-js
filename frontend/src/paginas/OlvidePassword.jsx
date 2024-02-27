import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta.jsx";
import clienteAxios from "../config/axios";

const OlvidePassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || email.length < 6) {
      setAlerta({ msg: "El Email es Obligatorio", error: true });
    }

    try {
      const { data } = await clienteAxios.post("veterinarios/olvide-password", {
        email,
      });

      setAlerta({ msg: data.msg });
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div className="text-6xl font-black text-indigo-600">
        <h1>
          Recupera el Acceso a tu
          <span className="text-black"> Cuenta</span>
        </h1>
      </div>

      <div className="mt-20 rounded-xl bg-white px-5 py-10 shadow-lg md:mt-5">
        {msg && <Alerta alerta={alerta} />}

        <form onSubmit={handleSubmit}>
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

          <input
            type="submit"
            value="Recuperar Cuenta"
            className="mt-10 w-full rounded-xl bg-indigo-700 px-10 py-3 font-bold uppercase text-white hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="my-5 block text-center text-gray-500" to="/">
            ¿Ya tienes una cuenta? Inicia Sesión
          </Link>
          <Link className="my-5 block text-center text-gray-500" to="/">
            ¿Ya tienes una cuenta? Inicia Sesión
          </Link>
        </nav>
      </div>
    </>
  );
};

export default OlvidePassword;
