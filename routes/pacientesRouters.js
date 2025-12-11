import express from "express"
const router = express.Router()

import { 
    agregarPaciente, 
    obtenerPacientes, 
    obtenerPaciente, 
    actualizarPaciente, 
    eliminarPaciente, 
    doctoresDisponibles 
} from "../controllers/pacientesControllers.js"

import checkAuth from '../middleware/authMiddleware.js'

// Rutas protegidas
router.route('/')
    .post(checkAuth, agregarPaciente)
    .get(checkAuth, obtenerPacientes)

// ⚠️ ESTA DEBE ESTAR PROTEGIDA TAMBIÉN
router.get("/doctor", doctoresDisponibles);

router.route('/:id')
    .get(checkAuth, obtenerPaciente)
    .put(checkAuth, actualizarPaciente)
    .delete(checkAuth, eliminarPaciente)

export default router
