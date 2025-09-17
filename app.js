const express = require('express');
const cors = require('cors'); // 👈 IMPORTA O CORS
require('dotenv').config();

const sequelize = require('./src/config/database');

// Importa o model para que o Sequelize saiba que deve criar essa tabela
require('./src/modulos/funcionario/funcionarioModel');

const funcionarioRotas = require('./src/modulos/funcionario/funcionarioRoutes');

const app = express();

app.use(cors()); // 👈 HABILITA O CORS
app.use(express.json());

app.use('/funcionarios', funcionarioRotas);

const PORT = process.env.PORT || 3001;

// Sincroniza os models com o banco criando/atualizando as tabelas
sequelize.sync({ alter: true })
  .then(() => {
    console.log('🗂️ Tabelas sincronizadas com o banco de dados!');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Erro ao sincronizar com o banco de dados:', err);
  });
