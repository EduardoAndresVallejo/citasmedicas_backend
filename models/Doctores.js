import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import bcrypt from "bcrypt";
import generarId from "../helpers/generarid.js";

const Doctores = sequelize.define("Doctores", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  telefono: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  web: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  token: {
    type: DataTypes.STRING,
    defaultValue: generarId(),
  },
  confirmado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: "Doctores",  // Nombre de la tabla en MySQL
  timestamps: true,       // Agrega createdAt y updatedAt
  hooks: {
    beforeCreate: async function (doctor) {
      // 🧩 Si el password no fue cambiado, no hagas nada
      if (!doctor.changed("password")) return;

      // 🧩 Evita volver a hashear si ya lo está
      if (doctor.password.startsWith("$2a$") || doctor.password.startsWith("$2b$")) return;

      const salt = await bcrypt.genSalt(10);
      doctor.password = await bcrypt.hash(doctor.password, salt);

    },
    
    beforeUpdate: async function (doctor) {
    if (!doctor.changed("password")) return;
    if (doctor.password.startsWith("$2a$") || doctor.password.startsWith("$2b$")) return;

    const salt = await bcrypt.genSalt(10);
    doctor.password = await bcrypt.hash(doctor.password, salt);
    }

  }
});

Doctores.prototype.verificarPassword = async function (passwordFormulario) {
  // this.password → es el password hasheado guardado en la base de datos
  return await bcrypt.compare(passwordFormulario, this.password);
};

export default Doctores;

