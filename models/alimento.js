const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Importando a conexão com o banco

// Definindo o modelo de Alimento
const Alimento = sequelize.define('Alimento', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
  },
});

module.exports = Alimento;


