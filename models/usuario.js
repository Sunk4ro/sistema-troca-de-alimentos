const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Importa a conexão com o banco de dados

const Usuario = sequelize.define('Usuario', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  // Garante que o email será único
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'usuarios', // Nome da tabela no banco de dados
  timestamps: false, // Se você não quer campos 'createdAt' e 'updatedAt'
});

module.exports = Usuario;
