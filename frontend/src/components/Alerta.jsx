const Alerta = ({ alerta }) => {
  return (
    <div
      className={`${alerta.error ? "from-red-400 to-red-600" : "from-indigo-400 to-indigo-600"} rounded-xl bg-gradient-to-r p-3 text-center font-bold uppercase text-white`}
    >
      {alerta.msg}
    </div>
  );
};

export default Alerta;
