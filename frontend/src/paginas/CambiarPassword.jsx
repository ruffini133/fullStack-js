import { useState } from "react";

import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";

const CambiarPassword = () => {
  const [alerta, setAlerta] = useState({});
  const handleSubmit = (email) => {
    e.preventDefault();
  };

  const { msg } = alerta;
  return (
    <>
      <AdminNav />

      <h2 className="text.3xl mt-10 text-center font-black">
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
                type="text"
                className="mt-5 w-full rounded-lg border bg-gray-50 p-2"
                name="nombre"
                placeholder="Escribe tu password actual"
              />
            </div>

            <div className="my-3">
              <label htmlFor="" className="font-bold uppercase text-gray-600">
                Password Nuevo
              </label>

              <input
                type="text"
                className="mt-5 w-full rounded-lg border bg-gray-50 p-2"
                name="nombre"
                placeholder="Escribe tu Nuevo Password"
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
