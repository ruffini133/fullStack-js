import nodemailer from "nodemailer";

const emailOlvidePassword = async (datos) => {
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
		subject: "Restablece tu contraseña en APV",
		text: "Restablece tu contraseña en APV",
		html: `<p>Hola: ${nombre}, has solicitado restablecer tu contaseña.</p>

        <:>Haz click en el siguiente enlace para restablecer tu contraseña:
        <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Restablecer Password</a>
        </p>
        `,
	});

	console.log("Mensaje Enviado: %s", info.messageId);
};

export default emailOlvidePassword;
