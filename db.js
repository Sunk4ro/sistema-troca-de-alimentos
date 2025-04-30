const { Sequelize } = require('sequelize');

// Configurando a conexão com o banco MySQL
const sequelize = new Sequelize('troca_alimentos', 'dossantos2004', 'caio2004', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
