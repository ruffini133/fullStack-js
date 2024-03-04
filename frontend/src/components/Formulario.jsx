import { useState, useEffect } from "react";
import Alerta from "./Alerta";
import usePacientes from "/src/hooks/usePacientes.jsx";
const Formulario = () => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [id, setId] = useState(null);

  const [alerta, setAlerta] = useState({});

  const { guardarPaciente, paciente } = usePacientes();

  useEffect(() => {
    if (paciente?.nombre) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
      setId(paciente._id);
    }
  }, [paciente]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar
    if ([nombre, propietario, email, fecha, sintomas].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    guardarPaciente({ nombre, propietario, email, fecha, sintomas, id });
    setAlerta({
      msg: "Guardado Correctamente",
    });
    setNombre("");
    setPropietario("");
    setEmail("");
    setFecha("");
    setSintomas("");
    setId("");
  };
  const { msg } = alerta;
  return (
    <>
      <h2 className="text-center text-3xl font-black">
        Administrador de Pacientes
      </h2>
      <p className="mb-10 mt-5 text-center text-xl">
        Añade tus {""}
        <span className="font-bold text-indigo-600">
          Pacientes y Administralos
        </span>
      </p>

      {msg && <Alerta alerta={alerta} />}

      <form
        className="mb-10 rounded-xl bg-white px-5 py-10 shadow-lg transition-colors duration-300 ease-in-out hover:shadow-2xl lg:mb-0"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label htmlFor="nombre" className="font-bold uppercase text-gray-700">
            Nombre Mascota
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Nombre de la Mascota"
            className="mt-2 w-full rounded-md border-2 p-3 placeholder-gray-400"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="propietario"
            className="font-bold uppercase text-gray-700"
          >
            Nombre Propietario
          </label>
          <input
            id="propietario"
            type="text"
            placeholder="Nombre del Propietario"
            className="mt-2 w-full rounded-md border-2 p-3 placeholder-gray-400"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="font-bold uppercase text-gray-700">
            Email Propietario
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email del Propietario"
            className="mt-2 w-full rounded-md border-2 p-3 placeholder-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="fecha" className="font-bold uppercase text-gray-700">
            Fecha Alta
          </label>
          <input
            id="fecha"
            type="date"
            className="mt-2 w-full rounded-md border-2 p-3 placeholder-gray-400"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="sintomas"
            className="font-bold uppercase text-gray-700"
          >
            Síntomas
          </label>
          <textarea
            id="sintomas"
            placeholder="Describe los Síntomas"
            className="mt-2 w-full rounded-md border-2 p-3 placeholder-gray-400"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>

        <input
          type="submit"
          className="w-full cursor-pointer rounded-md bg-indigo-600 p-3 font-bold uppercase text-white transition-colors duration-300 ease-in-out hover:bg-indigo-700"
          value={id ? "Guardar Cambios" : "Agregar Paciente"}
        />
      </form>
    </>
  );
};

export default Formulario;
