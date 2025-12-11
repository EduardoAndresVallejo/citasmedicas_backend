import Doctor from "../models/Doctor.js";
import generarId from "../helpers/generarid.js";
import generarJWT from "../helpers/generarJWT.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";
import Paciente from "../models/Pacientes.js";
import { Op } from "sequelize";

const registrar = async (req, res) => {
  const { email, nombre, dnidoctor } = req.body;

  //prevenir usuarios duplicados
  const existeUsario = await Doctor.findOne({
    where: {
      [Op.or]: [{ email }, { dnidoctor }],
    },
  });

  if (existeUsario) {
    const error = new Error("usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    //guardar Doctores
    const doctores = new Doctor(req.body);
    const doctoresGuardados = await doctores.save();

    // enviar el email
    emailRegistro({
      email,
      nombre,
      token: doctoresGuardados.token,
    });

    res.json(doctoresGuardados);
  } catch (error) {
    console.log(error);
  }
};

const perfil = (req, res) => {
  const { doctor } = req;
  res.json(doctor);
};

const obtenerPacientes = async (req, res) => {
  const pacientes = await Paciente.findAll({
    where: { dnidoctor: req.doctor.dnidoctor },
  });
  res.json(pacientes);
};

const confirmar = async (req, res) => {
  const { token } = req.body;

  const usuarioConfirmar = await Doctor.findOne({ where: { token } });

  if (!usuarioConfirmar) {
    const error = new Error("Token no valido");
    return res.status(404).json({ msg: error.message });
  }

  try {
    usuarioConfirmar.token = null;
    usuarioConfirmar.confirmado = true;
    await usuarioConfirmar.save();

    res.json({ msg: "Usuario confirmado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const authenticar = async (req, res) => {
  const { dnidoctor, password } = req.body;

  const usuario = await Doctor.findOne({ where: { dnidoctor } });

  if (!usuario) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  // comprobar si el usuario esta confirmado
  if (!usuario.confirmado) {
    const error = new Error("tu cuenta no ha sido confirmada");
    return res.status(403).json({ msg: error.message });
  }

  // revisar password
  if (await usuario.verificarPassword(password)) {
    res.json({
      id: usuario.id,
      nombre: usuario.nombre,
      dnidoctor: usuario.dnidoctor,
      token: generarJWT(usuario.id),
    });
  } else {
    const error = new Error("El password es incorrecto");
    return res.status(403).json({ msg: error.message });
  }
};

const olvidePassword = async (req, res) => {
  const { email } = req.body;

  const existeDotor = await Doctor.findOne({ where: { email } });

  if (!existeDotor) {
    const error = new Error("El Usuario no existe");
    return res.status(400).json({ msg: error.message });
  }

  try {
    existeDotor.token = generarId();
    await existeDotor.save();

    emailOlvidePassword({
      email,
      nombre: existeDotor.nombre,
      token: existeDotor.token,
    });

    res.json({ smg: "Hemos enviado un email con las instrucciones" });
  } catch (error) {
    console.log(error);
  }
};

const comprobarToken = async (req, res) => {
  const { token } = req.body;

  const tokenValido = await Doctor.findOne({ where: { token } });

  if (tokenValido) {
    res.json({ msg: "Token valido y el usuario existe" });
  } else {
    const error = new Error("Token no valido");
    return res.status(400).json({ msg: error.message });
  }
};
const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const doctor = await Doctor.findOne({ where: { token } });

  if (!doctor) {
    const error = new Error("Hubo un error");
    return res.status(400).json({ msg: error.message });
  }

  try {
    doctor.token = null;
    doctor.password = password;
    await doctor.save();
    res.json({ msg: "Password modificado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

export {
  registrar,
  authenticar,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil,
  obtenerPacientes
};
