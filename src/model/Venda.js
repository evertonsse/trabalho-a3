const { DataTypes } = require("sequelize");
const db = require("../../db");

db.sync();

const Venda = db.define("venda", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  vendedor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codigoLoja: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  data: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  valor: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  }
}, { timestamps: false});


module.exports = Venda