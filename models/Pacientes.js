import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Paciente = sequelize.define(
  "pacientes",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fecha_cita: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    sintomas: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doctoresId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Doctores",
        key: "id",
      },
    },
    dnidoctor: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "Pacientes", // Nombre de la tabla en MySQL
    timestamps: true, // Agrega createdAt y updatedAt
  }
);

export default Paciente;
