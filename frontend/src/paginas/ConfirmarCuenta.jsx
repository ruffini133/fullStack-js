import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";
import { useState } from "react";

const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/confirmar/${id}`;
        const { data } = await clienteAxios(url);
        setCuentaConfirmada(true);
        setAlerta({ msg: data.msg, error: false });
      } catch (error) {
        console.error("Error:", error); // Depuración
        setAlerta({ msg: error.response.data.msg, error: true });
      }

      setCargando(false);
    };
    confirmarCuenta();
  }, []);

  return (
    <>
      <div className="text-6xl font-black text-indigo-600">
        <h1>
          Confirma tu Cuenta y Comienza a administrar tus
          <span className="text-black"> Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 rounded-xl bg-white px-5 py-10 shadow-lg md:mt-5">
        {!cargando && <Alerta alerta={alerta} />}

        {cuentaConfirmada && (
          <Link className="my-5 block text-center text-gray-500" to="/">
            Iniciar Sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmarCuenta;
