import nodemailer from 'nodemailer'

const emailRegistro = async (datos) => {
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
        subject: 'Comprueba tu cuenta en APC',
        text: 'Comprueba tu cuenta en APC',
        html: `<p>Hola ${nombre}, comprueba tu cuenta en APC. </p>
            <p> Tu cuenta ya esta lista, solo debes comprobarla en el siguiente enlace:
            <a href="${process.env.FRONTEND_URL}/confirmar"> Comprobar Cuenta </a> </p>
            <h1> token: ${token} </h1>

            <p> Si tu no creaste esta cuenta puedes ignorar este mensaje</p>

        `
    })

    console.log("Mensaje enviado: %s", info.messageId)
}

export default emailRegistro