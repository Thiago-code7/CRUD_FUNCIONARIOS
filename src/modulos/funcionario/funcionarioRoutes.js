const path = require('path');
const express = require('express');
const router = express.Router();
const funcionarioController = require('./funcionarioController');

// Logs de debug (opcional)
console.log('>> Caminho do controller:', path.resolve(__dirname, './funcionarioController'));
console.log('>> Propriedades do controller:', Object.keys(funcionarioController));

const verificarFunc = (fn, nome) => {
  if (typeof fn !== 'function') {
    console.error(`Erro: Função ${nome} não encontrada ou não é uma função.`);
    return (req, res) => res.status(500).json({ erro: `Função ${nome} não implementada` });
  }
  return fn;
};

// Rotas abertas (sem autenticação/autorização)
router.get('/', verificarFunc(funcionarioController.listarFuncionarios, 'listarFuncionarios'));

router.get('/:id', verificarFunc(funcionarioController.detalharFuncionario, 'detalharFuncionario'));

router.post('/', verificarFunc(funcionarioController.criarFuncionario, 'criarFuncionario'));

router.put('/:id', verificarFunc(funcionarioController.atualizarFuncionario, 'atualizarFuncionario'));

router.delete('/', verificarFunc(funcionarioController.excluirFuncionario, 'excluirFuncionario')); // Apagar todos

// (Opcional) deletar um funcionário específico por ID
router.delete('/:id', verificarFunc(funcionarioController.excluirFuncionarioPorId, 'excluirFuncionarioPorId'));

module.exports = router;
