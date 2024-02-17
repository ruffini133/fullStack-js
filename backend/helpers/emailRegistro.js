import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {
	const transporter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
	});
	const { email, nombre, token } = datos;

	// Enviar Email

	const info = await transporter.sendMail({
		from: "APV - Administración de Pacientes Veterinaria",
		to: email,
		subject: "Confirma tu cuenta",
		text: "Comprueba tu cuenta",
		html: `<p>Hola: ${nombre}, comprueba tu cuenta en APV.</p>
        </p>Confirma tu cuenta haciendo click en el siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Confirmar Cuenta</a>
        </p>
        `,
	});

	console.log("Mensaje Enviado: %s", info.messageId);
};

export default emailRegistro;
