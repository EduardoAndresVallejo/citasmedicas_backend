import jwt from 'jsonwebtoken'
import Doctores from '../models/Doctores.js'

const checkAuth = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.doctores = await Doctores.findByPk(decoded.id, {
                attributes: ["id", "nombre", "email", "telefono"]
            });

            if (!req.doctores) {
                return res.status(404).json({ msg: "Doctor no encontrado" });
            }

            return next(); // ✔ Solo pasa si todo está bien

        } catch (error) {
            return res.status(403).json({ msg: "Token no válido" });
        }
    }

    // ❌ Si no hay token o no comienza con Bearer
    return res.status(403).json({ msg: "Token no válido o inexistente" });
};




export default checkAuth