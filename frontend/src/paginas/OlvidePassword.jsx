import { Link } from "react-router-dom";

const OlvidePassword = () => {
  return (
    <>
      <div className="text-6xl font-black text-indigo-600">
        <h1>
          Recupera el Acceso a tu
          <span className="text-black"> Cuenta</span>
        </h1>
      </div>

      <div className="mt-20 rounded-xl bg-white px-5 py-10 shadow-lg md:mt-5">
        <form>
          <div>
            <label className="mt-5 block text-xl font-bold uppercase text-gray-600">
              Email
            </label>
            <input
              type="email"
              placeholder="Email de Registro"
              className="mt-3 w-full rounded-xl border bg-gray-50 p-3"
            />
          </div>

          <input
            type="submit"
            value="Recuperar Cuenta"
            className="mt-10 w-full rounded-xl bg-indigo-700 px-10 py-3 font-bold uppercase text-white hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="my-5 block text-center text-gray-500" to="/">
            ¿Ya tienes una cuenta? Inicia Sesión
          </Link>
          <Link className="my-5 block text-center text-gray-500" to="/">
            ¿Ya tienes una cuenta? Inicia Sesión
          </Link>
        </nav>
      </div>
    </>
  );
};

export default OlvidePassword;
