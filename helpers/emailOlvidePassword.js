import nodemailer from 'nodemailer'

const emailOlvidePassword = async (datos) => {
    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "56dc26f33ad288",
            pass: "54c3f924a6a96a"
        }
    });

    const {email, nombre, token} = datos

    const info = await transport.sendMail({
        from: "APC - Administrador de Citas Medicas",
        to: email,
        subject: 'Restablece tu Contraseña',
        text: 'Restablece tu Contraseña',
        html: `<p>Hola ${nombre}, has solicitado restablecer tu contraseña. </p>
            <p> Sigue el siguiente enlace para generar una nueva contraseña:
            <a href="${process.env.FRONTEND_URL}/olvide_password/nuevopassword"> Restablecer contraseña</a> </p>
            <h1> token: ${token} </h1>

            <p> Si tu no creaste esta cuenta puedes ignorar este mensaje</p>

        `
    })

    console.log("Mensaje enviado: %s", info.messageId)
}

export default emailOlvidePassword