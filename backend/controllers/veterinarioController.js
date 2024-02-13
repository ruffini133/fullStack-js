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

const confirmar = async (req, res) => {
	const { token } = req.params;

	const usuarioConfirmar = await Veterinario.findOne({ token });

	if (!usuarioConfirmar) {
		const error = new Error("Token no válido");
		return res.status(404).json({ msg: error.message });
	}

	try {
		usuarioConfirmar.token = null;
		usuarioConfirmar.confirmado = true;
		await usuarioConfirmar.save();
		res.json({ msg: "Usuario Confirmado Correctamente" });
	} catch (error) {
		console.log(error);
	}

	console.log(usuarioConfirmar);
};

export { registrar, perfil, confirmar };
