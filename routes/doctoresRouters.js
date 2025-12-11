import express from 'express'
const router = express.Router();
import { registrar, perfil, confirmar, authenticar, olvidePassword, comprobarToken, nuevoPassword, actualizarPerfil, actualizarPassword } from '../controllers/doctores.Controllers.js'
import checkAuth from '../middleware/authMiddleware.js'


router.post("/", registrar);
router.post("/confirmar", confirmar);
router.post("/login", authenticar);
router.post("/olvide-password", olvidePassword)
router.post("/olvide-password/probartoken", comprobarToken)
router.post("/olvide-password/nuevopassword/:token", nuevoPassword)


//Area privada
router.get("/perfil",checkAuth, perfil);
router.put("/perfil/:id",checkAuth, actualizarPerfil)
router.put('/actualizar-password', checkAuth, actualizarPassword)


export default router;
