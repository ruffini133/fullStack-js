import { useState } from "react";

import Formulario from "../components/Formulario";
import ListadoPacientes from "../components/ListadoPacientes";

const AdministrarPacientes = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  return (
    <div className="flex flex-col md:flex-row">
      <button
        type="button"
        className="mb-10 rounded-md bg-indigo-600 px-4 py-2 text-sm font-bold uppercase text-white hover:bg-indigo-700 md:hidden"
        onClick={() => {
          setMostrarFormulario(!mostrarFormulario);
        }}
      >
        {mostrarFormulario ? "Ocultar Formulario" : "Mostar Formulario"}
      </button>
      <div
        className={`${mostrarFormulario ? "block" : "hidden"} flex flex-col md:block md:w-1/2 lg:w-2/5`}
      >
        <Formulario />
      </div>

      <div className="md:w-1/2 lg:w-3/5">
        <ListadoPacientes />
      </div>
    </div>
  );
};

export default AdministrarPacientes;
