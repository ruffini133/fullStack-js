import express from "express";
const router = express.Router();
import {
	agregarPaciente,
	obtenerPacientes,
} from "../controllers/pacienteController";

router.route("/").post(agregarPaciente).get(obtenerPacientes);

export default router;
