import AdminNav from "../components/AdminNav";
const CambiarPassword = () => {
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
    </>
  );
};

export default CambiarPassword;
