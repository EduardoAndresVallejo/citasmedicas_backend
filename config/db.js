import { Sequelize } from 'sequelize'; 
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.DB_URL);


export const conectarDB = async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
    process.exit(1);
  }
};

export {sequelize}
   

 