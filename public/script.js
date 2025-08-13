async function carregarAlunos() {
    const resposta = await fetch('/alunos', {method: 'GET'});
    const alunos = await resposta.json();
  
    const tbody = document.querySelector('#tabelaAlunos tbody');
    tbody.innerHTML = '';
  
    alunos.forEach(aluno => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${aluno.nome}</td>
        <td>${aluno.idade}</td>
        <td>${aluno.curso}</td>
        <td>${aluno.turma}</td>

        <td>
          <button onclick="removerAluno(${aluno.id})">Excluir</button>
          <button onclick="atualizarAluno(${aluno.id})">atualizar</button>
        </td>


      `;
      tbody.appendChild(tr);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#form-alunos').addEventListener('submit', async (event) => {
        event.preventDefault();
        const nome = document.getElementById('nome').value;
        const idade = document.getElementById('idade').value;   
        const curso = document.getElementById('curso').value;
        const turma = document.getElementById('turma').value;

        await fetch('/alunos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, idade, curso, turma })
        });

        event.target.reset();
        carregarAlunos();
    });

    carregarAlunos();
});


async function removerAluno(id) {   
    await fetch(`/alunos/${id}`, { method: 'DELETE' });
    carregarAlunos();
}

const atualizarAluno = async (id) => {
    const nome = prompt("Digite o novo nome:");
    const idade = prompt("Digite a nova idade:");
    const curso = prompt("Digite o novo curso:");
    const turma = prompt("Digite a nova turma:");

    if (nome && idade && curso && turma) {
        await fetch(`/alunos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, idade, curso, turma })
        });
        carregarAlunos();
    } else {
        alert("Todos os campos são obrigatórios.");
    }
};

carregarAlunos()

 //------------------------------------------------------------------------------------------------------

async function carregarProdutos() {
    const resposta = await fetch('/produtos', {method: 'GET'});
    const produtos = await resposta.json();
  
    const tbody = document.querySelector('#tabelaProdutos tbody');
    tbody.innerHTML = '';
  
    produtos.forEach(produto => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${produto.nome}</td>
        <td>${produto.preco}</td>
        <td>${produto.quantidade}</td>
        <td>${produto.categoria}</td>

        <td>
          <button onclick="removerProduto(${produto.id})">Excluir</button>
          <button onclick="atualizarProduto(${produto.id})">atualizar</button>
        </td>


      `;
      tbody.appendChild(tr);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#form-estoque').addEventListener('submit', async (event) => {
        event.preventDefault();
        const nome = document.getElementById('nomeProduto').value;
        const preco = parseFloat(document.getElementById('preco').value);   
        const quantidade = parseInt(document.getElementById('quantidade').value);
        const categoria = document.getElementById('categoria').value;

        await fetch('/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, preco, quantidade, categoria })
        });

        event.target.reset();
        carregarProdutos();
    });

    carregarProdutos();
});



const atualizarProduto = async (id) => {
    const nome = prompt("Digite o novo nome:");
    const preco = parseFloat(prompt("Digite o novo preço:"));
    const quantidade = parseInt(prompt("Digite a nova quatidade:"));
    const categoria = prompt("Digite a nova categoria:");

    if (nome && preco && quantidade && categoria) {
        await fetch(`/produtos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, preco, quantidade, categoria })
        });
        carregarProdutos();
    } else {
        alert("Todos os campos são obrigatórios.");
    }
};

async function removerProduto(id) {   
    await fetch(`/produtos/${id}`, { method: 'DELETE' });
    carregarProdutos();
}
carregarProdutos()


// ------------------------------------------------------------------------------------------------------
// Questão 3 - Filmes
async function carregarFilmes() {
    const resposta = await fetch('/filmes', {method: 'GET'});
    const filmes = await resposta.json();
  
    const tbody = document.querySelector('#tabelaFilmes tbody');
    tbody.innerHTML = '';
  
    filmes.forEach(filme => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${filme.titulo}</td>
        <td>${filme.ano}</td>
        <td>${filme.genero}</td>
        <td>${filme.nota}</td>
        <td>
          <button onclick="removerFilme(${filme.id})">Excluir</button>
          <button onclick="atualizarFilme(${filme.id})">Atualizar</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#form-filmes').addEventListener('submit', async (event) => {
        event.preventDefault();
        const titulo = document.getElementById('tituloFilme').value;
        const ano = parseInt(document.getElementById('anoFilme').value);
        const genero = document.getElementById('generoFilme').value;
        const nota = parseFloat(document.getElementById('notaFilme').value);

        await fetch('/filmes', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ titulo, ano, genero, nota })
        });

        event.target.reset();
        carregarFilmes();
    });

    carregarFilmes();
});

const atualizarFilme = async (id) => {
    const titulo = prompt("Novo título:");
    const ano = prompt("Novo ano:");
    const genero = prompt("Novo gênero:");
    const nota = prompt("Nova nota:");

    if (titulo && ano && genero && nota) {
        await fetch(`/filmes/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ titulo, ano, genero, nota })
        });
        carregarFilmes();
    } else {
        alert("Todos os campos são obrigatórios.");
    }
};

async function removerFilme(id) {   
    await fetch(`/filmes/${id}`, { method: 'DELETE' });
    carregarFilmes();
}

// ------------------------------------------------------------------------------------------------------
// Questão 4 - Tarefas
async function carregarTarefas() {
    const resposta = await fetch('/tarefas', {method: 'GET'});
    const tarefas = await resposta.json();
  
    const tbody = document.querySelector('#tabelaTarefas tbody');
    tbody.innerHTML = '';
  
    tarefas.forEach(tarefa => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${tarefa.titulo}</td>
        <td>${tarefa.descricao}</td>
        <td>${tarefa.status}</td>
        <td>
          <button onclick="removerTarefa(${tarefa.id})">Excluir</button>
          <button onclick="atualizarTarefa(${tarefa.id})">Atualizar</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#form-tarefas').addEventListener('submit', async (event) => {
        event.preventDefault();
        const titulo = document.getElementById('tituloTarefa').value;
        const descricao = document.getElementById('descricaoTarefa').value;

        await fetch('/tarefas', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ titulo, descricao })
        });

        event.target.reset();
        carregarTarefas();
    });

    carregarTarefas();
});

const atualizarTarefa = async (id) => {
    const novaOpcao = prompt("Digite o novo status: 'Concluido' ou 'Não foi feita'");

    const statusValido = ['concluido', 'nao foi feita'];

    if (statusValido.includes(novaOpcao.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
        await fetch(`/tarefas/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: novaOpcao })
        });
        carregarTarefas();
    } else {
        alert("Status inválido. Digite exatamente 'Concluído' ou 'Não foi feita'.");
    }
};

async function removerTarefa(id) {   
    await fetch(`/tarefas/${id}`, { method: 'DELETE' });
    carregarTarefas();
}

// ------------------------------------------------------------------------------------------------------
// Questão 5 - Funcionários
async function carregarFuncionarios() {
    const resposta = await fetch('/funcionarios', {method: 'GET'});
    const funcionarios = await resposta.json();
  
    const tbody = document.querySelector('#tabelaFuncionarios tbody');
    tbody.innerHTML = '';
  
    funcionarios.forEach(funcionario => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${funcionario.nome}</td>
        <td>${funcionario.cargo}</td>
        <td>${funcionario.salario}</td>
        <td>${funcionario.setor}</td>
        <td>
          <button onclick="removerFuncionario(${funcionario.id})">Excluir</button>
          <button onclick="atualizarFuncionario(${funcionario.id})">Atualizar</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#form-funcionarios').addEventListener('submit', async (event) => {
        event.preventDefault();
        const nome = document.getElementById('nomeFuncionario').value;
        const cargo = document.getElementById('cargoFuncionario').value;
        const salario = parseFloat(document.getElementById('salarioFuncionario').value);
        const setor = document.getElementById('setorFuncionario').value;

        await fetch('/funcionarios', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ nome, cargo, salario, setor })
        });

        event.target.reset();
        carregarFuncionarios();
    });

    carregarFuncionarios();
});

const atualizarFuncionario = async (id) => {
    const nome = prompt("Novo nome:");
    const cargo = prompt("Novo cargo:");
    const salario = prompt("Novo salário:");
    const setor = prompt("Novo setor:");

    if (nome && cargo && salario && setor) {
        await fetch(`/funcionarios/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ nome, cargo, salario, setor })
        });
        carregarFuncionarios();
    } else {
        alert("Todos os campos são obrigatórios.");
    }
};

async function removerFuncionario(id) {   
    await fetch(`/funcionarios/${id}`, { method: 'DELETE' });
    carregarFuncionarios();
}


// ------------------------------------------------------------------------------------------------------
// Questão 6 - Cardápio
async function carregarCardapio() {
    const resposta = await fetch('/cardapio', {method: 'GET'});
    const pratos = await resposta.json();
  
    const tbody = document.querySelector('#tabelaCardapio tbody');
    tbody.innerHTML = '';
  
    pratos.forEach(prato => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${prato.nome}</td>
        <td>${prato.preco}</td>
        <td>${prato.tipo}</td>
        <td>
          <button onclick="removerPrato(${prato.id})">Excluir</button>
          <button onclick="atualizarPrato(${prato.id})">Atualizar</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#form-cardapio').addEventListener('submit', async (event) => {
        event.preventDefault();
        const nome = document.getElementById('nomePrato').value;
        const preco = parseFloat(document.getElementById('precoPrato').value);
        const tipo = document.getElementById('tipoPrato').value;

        await fetch('/cardapio', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ nome, preco, tipo })
        });

        event.target.reset();
        carregarCardapio();
    });

    carregarCardapio();
});

const atualizarPrato = async (id) => {
    const nome = prompt("Novo nome:");
    const preco = prompt("Novo preço:");
    const tipo = prompt("Novo tipo:");

    if (nome && preco && tipo) {
        await fetch(`/cardapio/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ nome, preco, tipo })
        });
        carregarCardapio();
    } else {
        alert("Todos os campos são obrigatórios.");
    }
};

async function removerPrato(id) {   
    await fetch(`/cardapio/${id}`, { method: 'DELETE' });
    carregarCardapio();
}

// ------------------------------------------------------------------------------------------------------
// Questão 7 - Reservas
async function carregarReservas() {
    const resposta = await fetch('/reservas', {method: 'GET'});
    const reservas = await resposta.json();
  
    const tbody = document.querySelector('#tabelaReservas tbody');
    tbody.innerHTML = '';
  
    reservas.forEach(reserva => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${reserva.nomeCliente}</td>
        <td>${reserva.destino}</td>
        <td>${reserva.data}</td>
        <td>${reserva.pessoas}</td>
        <td>
          <button onclick="removerReserva(${reserva.id})">Excluir</button>
          <button onclick="atualizarReserva(${reserva.id})">Atualizar</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#form-reservas').addEventListener('submit', async (event) => {
        event.preventDefault();
        const nomeCliente = document.getElementById('nomeCliente').value;
        const destino = document.getElementById('destinoReserva').value;
        const data = document.getElementById('dataReserva').value;
        const pessoas = parseInt(document.getElementById('pessoasReserva').value);

        await fetch('/reservas', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ nomeCliente, destino, data, pessoas })
        });

        event.target.reset();
        carregarReservas();
    });

    carregarReservas();
});

const atualizarReserva = async (id) => {
    const nomeCliente = prompt("Novo nome do cliente:");
    const destino = prompt("Novo destino:");
    const data = prompt("Nova data (YYYY-MM-DD):");
    const pessoas = prompt("Novo número de pessoas:");

    if (nomeCliente && destino && data && pessoas) {
        await fetch(`/reservas/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ nomeCliente, destino, data, pessoas })
        });
        carregarReservas();
    } else {
        alert("Todos os campos são obrigatórios.");
    }
};

async function removerReserva(id) {   
    await fetch(`/reservas/${id}`, { method: 'DELETE' });
    carregarReservas();
}

// ------------------------------------------------------------------------------------------------------
// Questão 8 - Pets
async function carregarPets() {
    const resposta = await fetch('/pets', {method: 'GET'});
    const pets = await resposta.json();
  
    const tbody = document.querySelector('#tabelaPets tbody');
    tbody.innerHTML = '';
  
    pets.forEach(pet => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${pet.nome}</td>
        <td>${pet.especie}</td>
        <td>${pet.raca}</td>
        <td>${pet.idade}</td>
        <td>
          <button onclick="removerPet(${pet.id})">Excluir</button>
          <button onclick="atualizarPet(${pet.id})">Atualizar</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#form-pets').addEventListener('submit', async (event) => {
        event.preventDefault();
        const nome = document.getElementById('nomePet').value;
        const especie = document.getElementById('especiePet').value;
        const raca = document.getElementById('racaPet').value;
        const idade = parseInt(document.getElementById('idadePet').value);

        await fetch('/pets', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ nome, especie, raca, idade })
        });

        event.target.reset();
        carregarPets();
    });

    carregarPets();
});

const atualizarPet = async (id) => {
    const nome = prompt("Novo nome:");
    const especie = prompt("Nova espécie:");
    const raca = prompt("Nova raça:");
    const idade = prompt("Nova idade:");

    if (nome && especie && raca && idade) {
        await fetch(`/pets/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ nome, especie, raca, idade })
        });
        carregarPets();
    } else {
        alert("Todos os campos são obrigatórios.");
    }
};

async function removerPet(id) {   
    await fetch(`/pets/${id}`, { method: 'DELETE' });
    carregarPets();
}

// ------------------------------------------------------------------------------------------------------
// Questão 9 - Jogos
async function carregarJogos() {
    const resposta = await fetch('/jogos', {method: 'GET'});
    const jogos = await resposta.json();
  
    const tbody = document.querySelector('#tabelaJogos tbody');
    tbody.innerHTML = '';
  
    jogos.forEach(jogo => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${jogo.nome}</td>
        <td>${jogo.plataforma}</td>
        <td>${jogo.ano}</td>
        <td>${jogo.genero}</td>
        <td>
          <button onclick="removerJogo(${jogo.id})">Excluir</button>
          <button onclick="atualizarJogo(${jogo.id})">Atualizar</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#form-jogos').addEventListener('submit', async (event) => {
        event.preventDefault();
        const nome = document.getElementById('nomeJogo').value;
        const plataforma = document.getElementById('plataformaJogo').value;
        const ano = parseInt(document.getElementById('anoJogo').value);
        const genero = document.getElementById('generoJogo').value;

        await fetch('/jogos', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ nome, plataforma, ano, genero })
        });

        event.target.reset();
        carregarJogos();
    });

    carregarJogos();
});

const atualizarJogo = async (id) => {
    const nome = prompt("Novo nome:");
    const plataforma = prompt("Nova plataforma:");
    const ano = prompt("Novo ano:");
    const genero = prompt("Novo gênero:");

    if (nome && plataforma && ano && genero) {
        await fetch(`/jogos/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ nome, plataforma, ano, genero })
        });
        carregarJogos();
    } else {
        alert("Todos os campos são obrigatórios.");
    }
};

async function removerJogo(id) {   
    await fetch(`/jogos/${id}`, { method: 'DELETE' });
    carregarJogos();
}
// ------------------------------------------------------------------------------------------------------
