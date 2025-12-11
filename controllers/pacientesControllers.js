import Paciente from "../models/Pacientes.js";
import Doctor from "../models/Doctor.js";

const agregarPaciente = async (req, res) => {
  const paciente = new Paciente(req.body);
  paciente.doctoresId = req.doctores.id;
  try {
    const pacienteAlmacenado = await paciente.save();
    res.json(pacienteAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const doctoresDisponibles = async (req, res) => {
  try {
    const doctores = await Doctor.findAll({
      attributes: ["id", "nombre","dnidoctor" ]   // 👈 Ahora envía ID + nombre
    });

    res.json(doctores);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error obteniendo los doctores" });
  }
};

const obtenerPacientes = async (req, res) => {
  const pacientes = await Paciente.findAll({
    where: { doctoresId: req.doctores.id },
  });
  res.json(pacientes);
};

const obtenerPaciente = async (req, res) => {
  const { id } = req.params;
  const paciente = await Paciente.findByPk(id);

  if (!paciente) {
    res.status(404).json({ msg: "No encontrado" });
  }

  if (paciente.doctoresId !== req.doctores.id) {
    return res.json({ msg: "Accion no valida" });
  }
};

const actualizarPaciente = async (req, res) => {
  const { id } = req.params;
  const paciente = await Paciente.findByPk(id);

  if (!paciente) {
    res.status(404).json({ msg: "No encontrado" });
  }

  if (paciente.doctoresId !== req.doctores.id) {
    return res.json({ msg: "Accion no valida" });
  }

  paciente.nombre = req.body.nombre || paciente.nombre;
  paciente.email = req.body.email || paciente.email;
  paciente.fecha_cita = req.body.fecha_cita || paciente.fecha_cita;
  paciente.sintomas = req.body.sintomas || paciente.sintomas;
  try {
    const pacienteActualizado = await paciente.save();
    res.json(pacienteActualizado);
  } catch (error) {
    console.log(error);
  }
};

const eliminarPaciente = async (req, res) => {
  const { id } = req.params;
  const paciente = await Paciente.findByPk(id);

  if (!paciente) {
    res.status(404).json({ msg: "No encontrado" });
  }

  if (paciente.doctoresId !== req.doctores.id) {
    return res.json({ msg: "Accion no valida" });
  }

  try {
    await paciente.destroy();
    res.json({ msg: "paciente eliminado" });
  } catch (error) {
    console.log(error);
  }
};

export {
  agregarPaciente,
  obtenerPacientes,
  obtenerPaciente,
  actualizarPaciente,
  eliminarPaciente,
  doctoresDisponibles
};
