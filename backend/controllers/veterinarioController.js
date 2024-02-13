const registrar = (req, res) => {
	// Cuando se envia informacion a una api de express, se almacena en req.body

	console.log(req.body);
	const { email, password } = req.body;

	res.json({ msg: "Registrando Usuario" });
};

const perfil = (req, res) => {
	res.json({ msg: "Mostrando Perfil" });
};

export { registrar, perfil };
