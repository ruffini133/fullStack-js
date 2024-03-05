import AdminNav from "../components/AdminNav";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";

const EditarPerfil = () => {
  const { auth, actualizarPerfil } = useAuth();
  const [perfil, setPerfil] = useState({});
  const [alerta, setAlerta] = useState({});

  useEffect(() => {
    setPerfil(auth);
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nombre, email } = perfil;

    if ([nombre, email].includes("")) {
      setAlerta({
        msg: "Email y Nombre son obligatorios",
        error: true,
      });

      return;
    }

    const resultado = await actualizarPerfil(perfil);
    setAlerta(resultado);
  };

  const { msg } = alerta;
  return (
    <>
      <AdminNav />

      <h2 className="text.3xl mt-10 text-center font-black">Editar Perfil</h2>
      <p className="mb-10 mt-5 text-center text-xl">
        Modifica tu {""}{" "}
        <span className="font-bold text-indigo-600">Informacion</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full rounded-lg bg-white p-5 shadow md:w-1/2">
          {msg && <Alerta alerta={alerta} />}

          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label htmlFor="" className="font-bold uppercase text-gray-600">
                Nombre
              </label>

              <input
                type="text"
                className="mt-5 w-full rounded-lg border bg-gray-50 p-2"
                name="nombre"
                value={perfil.nombre || ""}
                onChange={(e) =>
                  setPerfil({ ...perfil, [e.target.name]: e.target.value })
                }
              />
            </div>

            <div className="my-3">
              <label htmlFor="" className="font-bold uppercase text-gray-600">
                Sitio Web
              </label>

              <input
                type="text"
                className="mt-5 w-full rounded-lg border bg-gray-50 p-2"
                name="web"
                value={perfil.web || ""}
                onChange={(e) =>
                  setPerfil({ ...perfil, [e.target.name]: e.target.value })
                }
              />
            </div>

            <div className="my-3">
              <label htmlFor="" className="font-bold uppercase text-gray-600">
                Teléfono
              </label>

              <input
                type="text"
                className="mt-5 w-full rounded-lg border bg-gray-50 p-2"
                name="telefono"
                value={perfil.telefono || ""}
                onChange={(e) =>
                  setPerfil({ ...perfil, [e.target.name]: e.target.value })
                }
              />
            </div>

            <div className="my-3">
              <label htmlFor="" className="font-bold uppercase text-gray-600">
                Email
              </label>

              <input
                type="text"
                className="mt-5 w-full rounded-lg border bg-gray-50 p-2"
                name="email"
                value={perfil.email || ""}
                onChange={(e) =>
                  setPerfil({ ...perfil, [e.target.name]: e.target.value })
                }
              />
            </div>

            <input
              type="submit"
              value={"Guardar Cambios"}
              className="mt-5 w-full cursor-pointer rounded-lg bg-indigo-700 px-10 py-3 font-bold uppercase text-white transition duration-200 hover:bg-indigo-800"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default EditarPerfil;
