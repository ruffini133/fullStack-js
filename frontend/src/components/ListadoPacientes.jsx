import usePacientes from "../hooks/usePacientes";

const ListadoPacientes = () => {
  const { pacientes } = usePacientes();
  console.log(pacientes);

  return (
    <>
      {pacientes.length ? (
        <>
          <h2 className="text-center text-3xl font-black">Listado Pacientes</h2>
          <p className="mb-10 mt-5 text-center text-xl">
            Administra tus {""}
            <span className="font-bold text-indigo-600">Pacientes y Citas</span>
          </p>
        </>
      ) : (
        <>
          <h2 className="text-center text-3xl font-black">No Hay Pacientes</h2>
          <p className="mb-10 mt-5 text-center text-xl">
            Comienza agregando pacientes {""}
            <span className="font-bold text-indigo-600">
              y aparecerán en este lugar
            </span>
          </p>
        </>
      )}
    </>
  );
};

export default ListadoPacientes;
