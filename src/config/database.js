require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || 'postgres',
    logging: console.log, // ativar logs para debug
  }
);

sequelize.authenticate()
  .then(() => console.log('✅ Conexão com o banco de dados estabelecida!'))
  .catch(err => console.error('❌ Erro na conexão:', err));

module.exports = sequelize;
