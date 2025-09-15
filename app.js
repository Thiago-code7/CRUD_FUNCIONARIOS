const express = require('express');
require('dotenv').config();

// Apenas rotas de funcionário
const funcionarioRotas = require('./src/modulos/funcionario/funcionarioRoutes');

const app = express();
app.use(express.json());

app.use('/funcionarios', funcionarioRotas);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

