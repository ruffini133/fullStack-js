import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const { cerrarSesion } = useAuth();

  return (
    <header className="bg-indigo-600 py-10">
      <div className="container mx-auto flex flex-col items-center justify-between lg:flex-row">
        <h1 className="text-center text-2xl font-bold text-indigo-200">
          Administrador de Pacientes de {""}{" "}
          <span className="font-black text-white">Veterinaria</span>
        </h1>

        <nav className="mt-5 flex flex-col items-center gap-4 lg:mt-0 lg:flex-row">
          <Link to="/admin" className="text-sm font-bold uppercase text-white">
            Pacientes
          </Link>
          <Link
            to="/admin/perfil"
            className="text-sm font-bold uppercase text-white"
          >
            Perfil
          </Link>

          <button
            type="button"
            className="text-sm font-bold uppercase text-white"
            onClick={cerrarSesion}
          >
            Cerrar Sesión
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
