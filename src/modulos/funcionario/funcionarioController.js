// src/modulos/funcionario/funcionarioController.js
const Funcionario = require('./funcionarioModel');

const listarFuncionarios = async (req, res) => {
  try {
    const funcionarios = await Funcionario.findAll();
    return res.status(200).json(funcionarios);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao listar funcionários.' });
  }
};

const detalharFuncionario = async (req, res) => {
  const { id } = req.params;
  try {
    const funcionario = await Funcionario.findByPk(id);
    if (!funcionario) {
      return res.status(404).json({ erro: 'Funcionário não encontrado.' });
    }
    return res.status(200).json(funcionario);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao buscar o funcionário.' });
  }
};

const criarFuncionario = async (req, res) => {
  const { nome, cpf, email, cargo, salario } = req.body;
  try {
    const novoFuncionario = await Funcionario.create({ nome, cpf, email, cargo, salario });
    return res.status(201).json(novoFuncionario);
  } catch (error) {
    console.error('Erro ao criar funcionário:', error);
    return res.status(400).json({ erro: 'Erro ao criar funcionário.' });
  }
};

const atualizarFuncionario = async (req, res) => {
  const { id } = req.params;
  const { nome, cpf, email, cargo, salario } = req.body;
  try {
    const funcionario = await Funcionario.findByPk(id);
    if (!funcionario) {
      return res.status(404).json({ erro: 'Funcionário não encontrado.' });
    }
    await funcionario.update({ nome, cpf, email, cargo, salario });
    return res.status(200).json(funcionario);
  } catch (error) {
    return res.status(400).json({ erro: 'Erro ao atualizar funcionário.' });
  }
};

const excluirFuncionario = async (req, res) => {
  try {
    await Funcionario.destroy({ where: {}, truncate: true });
    return res.status(200).json({ msg: 'Todos os funcionários foram excluídos.' });
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao excluir funcionários.' });
  }
};

// Função nova para excluir funcionário por ID
const excluirFuncionarioPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const funcionario = await Funcionario.findByPk(id);
    if (!funcionario) {
      return res.status(404).json({ erro: 'Funcionário não encontrado.' });
    }
    await funcionario.destroy();
    return res.status(200).json({ msg: 'Funcionário excluído com sucesso.' });
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao excluir funcionário.' });
  }
};

module.exports = {
  listarFuncionarios,
  detalharFuncionario,
  criarFuncionario,
  atualizarFuncionario,
  excluirFuncionario,
  excluirFuncionarioPorId, // exporta a nova função
};
