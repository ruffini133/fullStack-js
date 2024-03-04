import usePacientes from "../hooks/usePacientes";

const Paciente = ({ paciente }) => {
  const { setEdicion, eliminarPaciente } = usePacientes();

  const { email, fecha, nombre, propietario, sintomas, _id } = paciente;

  const formatearFecha = (fecha) => {
    const nuevaFecha = new Date(fecha);

    return new Intl.DateTimeFormat("es-MX", { dateStyle: "long" }).format(
      nuevaFecha,
    );
  };

  return (
    <div className="mx-5 my-10 rounded-xl bg-white px-5 py-10 shadow-md">
      <p className="my-2 font-bold uppercase text-indigo-700">
        Nombre: {""}
        <span className="font-normal normal-case text-black">{nombre}</span>
      </p>

      <p className="my-2 font-bold uppercase text-indigo-700">
        Propietario: {""}
        <span className="font-normal normal-case text-black">
          {propietario}
        </span>
      </p>

      <p className="my-2 font-bold uppercase text-indigo-700">
        Email de Contacto: {""}
        <span className="font-normal normal-case text-black">{email}</span>
      </p>

      <p className="my-2 font-bold uppercase text-indigo-700">
        Fecha de Alta: {""}
        <span className="font-normal normal-case text-black">
          {formatearFecha(fecha)}
        </span>
      </p>

      <p className="my-2 font-bold uppercase text-indigo-700">
        Sintomas: {""}
        <span className="font-normal normal-case text-black">{sintomas}</span>
      </p>

      <div className="my-5 flex justify-between">
        <button
          type="button"
          className="rounded-lg bg-indigo-600 px-10 py-2 font-bold uppercase text-white hover:bg-indigo-700"
          onClick={() => setEdicion(paciente)}
        >
          Editar
        </button>

        <button
          type="button"
          className="rounded-lg bg-red-600 px-10 py-2 font-bold uppercase text-white hover:bg-red-700"
          onClick={() => eliminarPaciente(_id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Paciente;
