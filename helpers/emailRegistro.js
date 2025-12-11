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
    console.log(token)

    const info = await transport.sendMail({
        from: "APC - Administrador de Citas Medicas",
        to: email,
        subject: 'Comprueba tu cuenta en APC',
        text: 'Comprueba tu cuenta en APC',
        html: `<div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
  <div style="
      max-width: 520px; 
      margin: auto; 
      background: #ffffff; 
      padding: 25px; 
      border-radius: 12px; 
      box-shadow: 0 3px 10px rgba(0,0,0,0.1);
    ">
    
    <h2 style="color: #2b6cb0; text-align: center; margin-top: 0;">
      ¡Hola ${nombre}! 👋
    </h2>

    <p style="font-size: 15px; color: #333;">
      Tu cuenta en <strong>APC</strong> está casi lista. Solo falta un paso:
      debes confirmar tu correo para activar tu acceso.
    </p>

    <p style="text-align: center; margin: 30px 0;">
      <a href="${process.env.FRONTEND_URL}/confirmar" 
         style="
            background-color: #2b6cb0;
            color: white;
            padding: 12px 22px;
            border-radius: 6px;
            text-decoration: none;
            font-size: 16px;
            display: inline-block;
            font-weight: bold;
         ">
        Confirmar Cuenta
      </a>
    </p>

    <p style="font-size: 15px; color: #333;">
      <strong>Tu token de verificación:</strong>
    </p>

    <div style="
        background: #edf2f7; 
        padding: 12px; 
        border-radius: 6px; 
        font-size: 14px; 
        font-family: monospace;
        text-align: center;
        color: #2d3748;
        letter-spacing: 1px;
      ">
      ${token}
    </div>

    <p style="font-size: 14px; color: #666; margin-top: 25px;">
      Si no creaste esta cuenta, puedes ignorar este mensaje sin problema.
    </p>

    <p style="text-align: center; font-size: 13px; color: #999; margin-top: 20px;">
      © ${new Date().getFullYear()} APC — Todos los derechos reservados.
    </p>

  </div>
</div>
        `
    })

    console.log("Mensaje enviado: %s", info.messageId)
}

export default emailRegistro