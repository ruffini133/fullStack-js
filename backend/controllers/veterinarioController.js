import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";

const registrar = async (req, res) => {
	// Cuando se envia informacion a una api de express, se almacena en req.body

	const { email, nombre } = req.body;

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

		// Enviar Email de Confirmacion
		emailRegistro({
			email,
			nombre,
			token: veterinarioGuardado.token,
		});

		res.json(veterinarioGuardado);
	} catch (error) {
		console.log(error);
	}
};

const perfil = (req, res) => {
	const { veterinario } = req;

	res.json(veterinario);
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
};

const autenticar = async (req, res) => {
	const { email, password } = req.body;

	// Comprobar si el usuario existe
	const usuario = await Veterinario.findOne({ email });

	if (!usuario) {
		const error = new Error("El usuario no existe");
		return res.status(404).json({ msg: error.message });
	}

	// Comprobar si el usuario esta confirmado
	if (!usuario.confirmado) {
		const error = new Error("Tu cuenta no ha sido confirmada");
		return res.status(403).json({ msg: error.message });
	}

	// Revisar el password
	if (await usuario.comprobarPassword(password)) {
		// Autenticar
		res.json({
			_id: usuario.id,
			nombre: usuario.nombre,
			email: usuario.email,
			token: generarJWT(usuario.id),
		});
	} else {
		return res.status(403).json({ msg: "Password Incorrecto" });
	}
};

const olvidePassword = async (req, res) => {
	const { email } = req.body;

	const existeVeterinario = await Veterinario.findOne({ email });
	if (!existeVeterinario) {
		const error = new Error("El usuario no existe");
		return res.status(400).json({ msg: error.message });
	}

	try {
		existeVeterinario.token = generarId();
		await existeVeterinario.save();

		// Enviar Email con instrucciones
		emailOlvidePassword({
			email,
			nombre: existeVeterinario.nombre,
			token: existeVeterinario.token,
		});

		res.json({
			msg: "Se ha enviado un correo para reestablecer tu contraseña",
		});
	} catch (error) {
		console.log(error);
	}
};

const comprobarToken = async (req, res) => {
	const { token } = req.params;

	const tokenValido = await Veterinario.findOne({ token });

	if (tokenValido) {
		// El token es valido el usuario existe
		res.json({ msg: "Token Valido y el usuario existe" });
	} else {
		const error = new Error("Token no válido");
		return res.status(400).json({ msg: error.message });
	}
};

const nuevoPassword = async (req, res) => {
	const { token } = req.params;
	const { password } = req.body;

	const veterinario = await Veterinario.findOne({ token });

	if (!veterinario) {
		const error = new Error("Hubo un error");
		return res.status(400).json({ msg: error.message });
	}

	try {
		veterinario.token = null;
		veterinario.password = password;
		await veterinario.save();
		res.json({ msg: "Contraseña actualizada correctamente" });
	} catch (error) {
		console.log(error);
	}
};

const actualizarPerfil = async (req, res) => {
	const veterinario = await Veterinario.findById(req.params.id);

	if (!veterinario) {
		const error = new Error("Hubo un error");
		return res.status(404).json({ msg: error.message });
	}

	const { email } = req.body;
	if (veterinario.email !== req.body.email) {
		const existeEmail = await Veterinario.findOne({ email });
		if (existeEmail) {
			const error = new Error("El correo ya esta registrado");
			return res.status(400).json({ msg: error.message });
		}
	}

	try {
		veterinario.nombre = req.body.nombre;

		veterinario.email = req.body.email;

		veterinario.web = req.body.web;

		veterinario.telefono = req.body.telefono;

		const veterinarioActualizado = await veterinario.save();
		res.json(veterinarioActualizado);
	} catch (error) {
		console.log(error);
	}
};

const actualizarPassword = async (req, res) => {
	// Leemos los datos
	const { id } = req.veterinario;
	const { pwd_actual, pwd_nuevo } = req.body;
	// Comprobamos qu el veterinario exista
	const veterinario = await Veterinario.findById(id);
	if (!veterinario) {
		const error = new Error("Hubo un error");
		return res.status(400).json({ msg: error.message });
	}
	// Comprobamos el password
	if (await veterinario.comprobarPassword(pwd_actual)) {
		// Almacenamos el nuevo password
		veterinario.password = pwd_nuevo;
		await veterinario.save();
		res.json({ msg: "Password Actualizado Correctamente" });
	} else {
		const error = new Error("El Password Actual es Incorrecto");
		return res.status(400).json({ msg: error.message });
	}
};

export {
	registrar,
	perfil,
	confirmar,
	autenticar,
	olvidePassword,
	comprobarToken,
	nuevoPassword,
	actualizarPerfil,
	actualizarPassword,
};
