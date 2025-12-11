import nodemailer from "nodemailer";

const emailOlvidePassword = async (datos) => {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "56dc26f33ad288",
      pass: "54c3f924a6a96a",
    },
  });

  const { email, nombre, token } = datos;
  console.log(token);

  const info = await transport.sendMail({
    from: "APC - Administrador de Citas Medicas",
    to: email,
    subject: "Restablece tu Contraseña",
    text: "Restablece tu Contraseña",
    html: `<div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
  <div style="
      max-width: 520px; 
      margin: auto; 
      background: #ffffff; 
      padding: 25px; 
      border-radius: 12px; 
      box-shadow: 0 3px 10px rgba(0,0,0,0.1);
    ">
    
    <h2 style="color: #d9534f; text-align: center; margin-top: 0;">
      Restablecer contraseña 🔐
    </h2>

    <p style="font-size: 15px; color: #333;">
      Hola <strong>${nombre}</strong>, recibimos una solicitud para restablecer tu contraseña en <strong>APC</strong>.
    </p>

    <p style="font-size: 15px; color: #333;">
      Haz clic en el siguiente botón para continuar con el proceso:
    </p>

    <p style="text-align: center; margin: 30px 0;">
      <a href="${process.env.FRONTEND_URL}/olvide_password/nuevopassword"
         style="
            background-color: #d9534f;
            color: white;
            padding: 12px 22px;
            border-radius: 6px;
            text-decoration: none;
            font-size: 16px;
            display: inline-block;
            font-weight: bold;
         ">
        Restablecer Contraseña
      </a>
    </p>

    <p style="font-size: 15px; color: #333;">
      <strong>Tu token de recuperación:</strong>
    </p>

    <div style="
        background: #f8d7da; 
        padding: 12px; 
        border-radius: 6px; 
        font-size: 14px; 
        font-family: monospace;
        text-align: center;
        color: #721c24;
        letter-spacing: 1px;
      ">
      ${token}
    </div>

    <p style="font-size: 14px; color: #666; margin-top: 25px;">
      Si tú no solicitaste este cambio, puedes ignorar este mensaje de forma segura.
    </p>

    <p style="text-align: center; font-size: 13px; color: #999; margin-top: 20px;">
      © ${new Date().getFullYear()} APC — Seguridad y Protección de Datos.
    </p>

  </div>
</div>


        `,
  });

  console.log("Mensaje enviado: %s", info.messageId);
};

export default emailOlvidePassword;
