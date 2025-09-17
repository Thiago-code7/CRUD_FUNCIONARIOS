const API_URL = 'http://localhost:3001/funcionarios';

document.getElementById('form-funcionario').addEventListener('submit', async (e) => {
  e.preventDefault();

  const funcionario = {
    nome: document.getElementById('nome').value,
    cpf: document.getElementById('cpf').value,
    email: document.getElementById('email').value,
    cargo: document.getElementById('cargo').value,
    salario: parseFloat(document.getElementById('salario').value)
  };

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(funcionario)
  });

  if (response.ok) {
    alert('Funcionário cadastrado!');
    document.getElementById('form-funcionario').reset();
    listarFuncionarios();
  } else {
    alert('Erro ao cadastrar funcionário.');
  }
});

async function listarFuncionarios() {
  const res = await fetch(API_URL);
  const funcionarios = await res.json();

  const lista = document.getElementById('lista-funcionarios');
  lista.innerHTML = '';

  funcionarios.forEach(f => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${f.nome}</strong> - ${f.cargo} - R$ ${f.salario.toFixed(2)}<br>
      ${f.email} | ${f.cpf}
      <button onclick="excluirFuncionario(${f.id})">Excluir</button>
    `;
    lista.appendChild(li);
  });
}

async function excluirFuncionario(id) {
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (response.ok) {
    alert('Funcionário excluído.');
    listarFuncionarios();
  } else {
    alert('Erro ao excluir.');
  }
}

listarFuncionarios();
