import express from 'express'
const router = express.Router();
import { registrar, confirmar, olvidePassword, comprobarToken, authenticar, nuevoPassword, perfil, obtenerPacientes } 
from '../controllers/doctor.Controllers.js'

import checkAuthDoctor from '../middleware/doctorMiddleware.js';


router.post("/", registrar);
router.post("/confirmar", confirmar);
router.post("/login", authenticar);
router.post("/olvide-password", olvidePassword)
router.post("/olvide-password/probartoken", comprobarToken)
router.post("/olvide-password/nuevopassword/:token", nuevoPassword)


// //Area privada
router.get("/perfil",checkAuthDoctor, perfil);
router.route('/')
    .get(checkAuthDoctor, obtenerPacientes)
// router.put("/perfil/:id",checkAuth, actualizarPerfil)
// router.put('/actualizar-password', checkAuth, actualizarPassword)


export default router;
