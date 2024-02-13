import Veterinario from "../models/Veterinario.js";

const registrar = async (req, res) => {
	// Cuando se envia informacion a una api de express, se almacena en req.body

	const { email } = req.body;

	// Prevenir usuarios duplicados
	const existeUsuario = await Veterinario.findOne({ email });

	if (existeUsuario) {
		const error = new Error("El correo ya esta registrado");
		return res.status(400).json({ msg: error.message });
	}

	try {
		// Guardar un Nuevo Veterinario
		const veterinario = new Veterinario(req.body);
		// Usamos un await para esperar a que se guarde el veterinario y no se ejecuten las siguientes lineas de codigo
		const veterinarioGuardado = await veterinario.save();

		res.json(veterinarioGuardado);
	} catch (error) {
		console.log(error);
	}
};

const perfil = (req, res) => {
	res.json({ msg: "Mostrando Perfil" });
};

export { registrar, perfil };
