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

VeterinarioSchema.pre("save", async function () {
	// evitamos que una contraseña hasheada se vuelva a hashear
	if (!this.isModified("password")) {
		next();
	}

	const salt = await bcrypt.genSaltSync(10);
	this.password = await bcrypt.hash(this.password, salt);
});

const Veterinario = mongoose.model("Veterinario", VeterinarioSchema);
export default Veterinario;
