// src/modulos/funcionario/funcionarioModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Funcionario = sequelize.define('Funcionario', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  cargo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salario: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  timestamps: true, // cria createdAt e updatedAt
  tableName: 'funcionarios', // nome da tabela no banco
});

module.exports = Funcionario;

