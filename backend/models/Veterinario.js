import mongoose from "mongoose";
import bcrypt from "bcrypt";
import generarId from "../helpers/generarId.js";

const VeterinarioSchema = new mongoose.Schema({
	nombre: {
		type: String,
		required: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	telefono: {
		type: String,
		default: null,
		trim: true,
	},
	web: {
		type: String,
		default: null,
	},
	token: {
		type: String,
		default: generarId(),
	},
	confirmado: {
		type: Boolean,
		default: false,
	},
});

// Antes de guardar el veterinario, hashear la contraseña  y usar el middleware pre

VeterinarioSchema.pre("save", async function (next) {
	// evitamos que una contraseña hasheada se vuelva a hashear
	if (!this.isModified("password")) {
		next();
	}

	const salt = await bcrypt.genSaltSync(10);
	this.password = await bcrypt.hash(this.password, salt);
});

// Crear un metodo para autenticar el usuario

VeterinarioSchema.methods.comprobarPassword = async function (
	passwordFormulario
) {
	return await bcrypt.compare(passwordFormulario, this.password);
};

const Veterinario = mongoose.model("Veterinario", VeterinarioSchema);
export default Veterinario;
