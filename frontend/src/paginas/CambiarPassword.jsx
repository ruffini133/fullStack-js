import { useState } from "react";

import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";

const CambiarPassword = () => {
  const { guardarPassword } = useAuth();

  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState({
    pwd_actual: "",
    pwd_nuevo: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(password).some((campo) => campo === "")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });

      return;
    }

    if (password.pwd_nuevo.length < 6) {
      setAlerta({
        msg: "El password debe tener al menos 6 caracteres",
        error: true,
      });

      return;
    }

    const respuesta = await guardarPassword(password);

    setAlerta(respuesta);
  };

  const { msg } = alerta;
  return (
    <>
      <AdminNav />

      <h2 className="mt-10 text-center text-3xl font-black">
        Cambiar Password
      </h2>
      <p className="mb-10 mt-5 text-center text-xl">
        Modifica tu {""}{" "}
        <span className="font-bold text-indigo-600">Password</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full rounded-lg bg-white p-5 shadow md:w-1/2">
          {msg && <Alerta alerta={alerta} />}

          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label htmlFor="" className="font-bold uppercase text-gray-600">
                Password Actual
              </label>

              <input
                type="password"
                className="mt-5 w-full rounded-lg border bg-gray-50 p-2"
                name="pwd_actual"
                placeholder="Escribe tu password actual"
                onChange={(e) =>
                  setPassword({
                    ...password,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <div className="my-3">
              <label htmlFor="" className="font-bold uppercase text-gray-600">
                Password Nuevo
              </label>

              <input
                type="password"
                className="mt-5 w-full rounded-lg border bg-gray-50 p-2"
                name="pwd_nuevo"
                placeholder="Escribe tu Nuevo Password"
                onChange={(e) =>
                  setPassword({
                    ...password,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <input
              type="submit"
              value={"Actualizar Password"}
              className="mt-5 w-full cursor-pointer rounded-lg bg-indigo-700 px-10 py-3 font-bold uppercase text-white transition duration-200 hover:bg-indigo-800"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default CambiarPassword;
