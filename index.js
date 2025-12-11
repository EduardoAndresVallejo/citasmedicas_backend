import express from "express";
import dotenv from 'dotenv';
import cors from 'cors'
import morgan from "morgan";
import { conectarDB, sequelize} from './config/db.js';
import doctoresRouters from './routes/doctoresRouters.js'
import pacienteRouters from './routes/pacientesRouters.js'
import doctorRouters from './routes/doctorRouters.js'

const app = express()
app.use(express.json())

dotenv.config();

const main = async () => {
  await conectarDB();
};

const dominiosPermitidos = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (dominiosPermitidos.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  }
};

app.use(cors(corsOptions));
app.use(morgan('dev'))
main();

app.use("/api/doctores", doctoresRouters);
app.use("/api/pacientes", pacienteRouters);
app.use("/api/doctor", doctorRouters);

app.listen(4000, () => {
    console.log('Servidor funcionando en el puerto 4000')
});