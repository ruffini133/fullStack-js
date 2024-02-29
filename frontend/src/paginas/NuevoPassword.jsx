import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`);
        setAlerta({ msg: "Coloca tu Nuevo Password" });
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: "Hubo un error con el enlace",
          error: true,
        });
      }
    };
    comprobarToken();
  }, []);

  const HandleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlerta({
        msg: "El password debe tener al menos 6 caracteres",
        error: true,
      });
      return;
    }

    try {
      const url = `/veterinarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });

      setPasswordModificado(true);

      setAlerta({
        msg: data.msg,
      });
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
          Restablece tu Password y Recupera el Acceso a tus
          <span className="text-black"> Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 rounded-xl bg-white px-5 py-10 shadow-lg md:mt-5">
        <div className="my-5">
          {msg && <Alerta alerta={alerta} />}

          {tokenValido && (
            <>
              <form onSubmit={HandleSubmit}>
                <label className="mt-5 block text-xl font-bold uppercase text-gray-600">
                  Nuevo Password
                </label>

                <input
                  type="password"
                  placeholder="Ingresa tu Nuevo Password"
                  className="mt-3 w-full rounded-xl border bg-gray-50 p-3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <input
                  type="submit"
                  value="Restablecer Password"
                  className="mt-10 w-full rounded-xl bg-indigo-700 px-10 py-3 font-bold uppercase text-white hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                />
              </form>
            </>
          )}
        </div>

        {passwordModificado && (
          <Link className="my-5 block text-center text-gray-500" to="/">
            Iniciar Sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default NuevoPassword;
