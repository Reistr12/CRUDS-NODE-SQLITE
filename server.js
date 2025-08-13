const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const port = 3000; 
const db = new sqlite3.Database('./db/database.db'); 

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// -----------------------------------------------------------------------------
// Alunos
db.run(`CREATE TABLE IF NOT EXISTS alunos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL, 
  idade INT NOT NULL,
  curso TEXT NOT NULL,
  turma TEXT NOT NULL)`);

app.get('/', (req, res) => {    
    res.sendFile(__dirname + '/public/index.html'); 
});

app.get('/alunos', (req, res) => {
    db.all(`SELECT * FROM alunos`, [], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});

app.post('/alunos', (req, res) => { 
    const { nome, idade, curso, turma } = req.body;  
    db.run(`INSERT INTO alunos (nome, idade, curso, turma) VALUES (?, ?, ?, ?)`, 
        [nome, idade, curso, turma], function(err) {        
        if (err) return res.status(500).send(err.message);        
        res.status(201).send({ id: this.lastID });    
    }); 
});

app.delete('/alunos/:id', (req, res) => { 
    const {id} = req.params;
    db.run(`DELETE FROM alunos WHERE id = ?`, [id], function(err) {
        if (err) return res.status(500).send(err.message);        
        res.status(200).send({ deletedID: id });    
    });
});

app.put('/alunos/:id', (req, res) => {
    const { id } = req.params;    
    const { nome, idade, curso, turma } = req.body;    
    db.run(`UPDATE alunos SET nome = ?, idade = ?, curso = ?, turma = ? WHERE id = ?`, 
        [nome, idade, curso, turma, id], function(err) {        
        if (err) return res.status(500).send(err.message);        
        res.status(200).send({ updatedID: id });    
    }); 
});
// -----------------------------------------------------------------------------
// Produtos
db.run(`CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL, 
    preco FLOAT NOT NULL,
    quantidade INT NOT NULL,
    categoria TEXT NOT NULL)`);

app.get('/produtos', (req, res) => {
    db.all(`SELECT * FROM produtos`, [], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});

app.post('/produtos', (req, res) => {
    const { nome, preco, quantidade, categoria } = req.body;
    db.run(`INSERT INTO produtos (nome, preco, quantidade, categoria) VALUES (?, ?, ?, ?)`, 
        [nome, preco, quantidade, categoria], function(err) {        
        if (err) return res.status(500).send(err.message);        
        res.status(201).send({ id: this.lastID });    
    }); 
});

app.put('/produtos/:id', (req, res) => {
    const { id } = req.params;    
    const { nome, preco, quantidade, categoria } = req.body;    
    db.run(`UPDATE produtos SET nome = ?, preco = ?, quantidade = ?, categoria = ? WHERE id = ?`, 
        [nome, preco, quantidade, categoria, id], function(err) {        
        if (err) return res.status(500).send(err.message);        
        res.status(200).send({ updatedID: id });    
    }); 
});

app.delete('/produtos/:id', (req, res) => { 
    const {id} = req.params;
    db.run(`DELETE FROM produtos WHERE id = ?`, [id], function(err) {
        if (err) return res.status(500).send(err.message);        
        res.status(200).send({ deletedID: id });    
    });
});

// -----------------------------------------------------------------------------
// Filmes
db.run(`CREATE TABLE IF NOT EXISTS filmes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    ano INT NOT NULL,
    genero TEXT NOT NULL,
    nota FLOAT NOT NULL)`);

app.get('/filmes', (req, res) => {
    db.all(`SELECT * FROM filmes`, [], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});

app.post('/filmes', (req, res) => {
    const { titulo, ano, genero, nota } = req.body;
    db.run(`INSERT INTO filmes (titulo, ano, genero, nota) VALUES (?, ?, ?, ?)`, 
        [titulo, ano, genero, nota], function(err) {
        if (err) return res.status(500).send(err.message);
        res.status(201).send({ id: this.lastID });
    });
});

app.put('/filmes/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, ano, genero, nota } = req.body;
    db.run(`UPDATE filmes SET titulo = ?, ano = ?, genero = ?, nota = ? WHERE id = ?`, 
        [titulo, ano, genero, nota, id], function(err) {
        if (err) return res.status(500).send(err.message);
        res.status(200).send({ updatedID: id });
    });
});

app.delete('/filmes/:id', (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM filmes WHERE id = ?`, [id], function(err) {
        if (err) return res.status(500).send(err.message);
        res.status(200).send({ deletedID: id });
    });
});

// -----------------------------------------------------------------------------
// Tarefas
db.run(`CREATE TABLE IF NOT EXISTS tarefas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    descricao TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Em andamento')`);

app.get('/tarefas', (req, res) => {
    db.all(`SELECT * FROM tarefas`, [], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});

app.post('/tarefas', (req, res) => {
    const { titulo, descricao } = req.body;
    db.run(`INSERT INTO tarefas (titulo, descricao, status) VALUES (?, ?, 'Em andamento')`, 
        [titulo, descricao], function(err) {
        if (err) return res.status(500).send(err.message);
        res.status(201).send({ id: this.lastID });
    });
});

app.put('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    let { status } = req.body;

    status = status.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");


    const statusValido = ['concluido', 'nao foi feita'];

 
    if (!statusValido.includes(status)) {
        return res.status(400).send('Status inválido');
    }

    const statusFormatado = status === 'concluido' ? 'Concluído' : 'Não foi feita';

    db.run(`UPDATE tarefas SET status = ? WHERE id = ?`, 
        [statusFormatado, id], function(err) {
        if (err) return res.status(500).send(err.message);
        res.status(200).send({ updatedID: id });
    });
});


app.delete('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM tarefas WHERE id = ?`, [id], function(err) {
        if (err) return res.status(500).send(err.message);
        res.status(200).send({ deletedID: id });
    });
});
// -----------------------------------------------------------------------------
// Funcionarios
db.run(`CREATE TABLE IF NOT EXISTS funcionarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    cargo TEXT NOT NULL,
    salario FLOAT NOT NULL,
    setor TEXT NOT NULL)`);

app.get('/funcionarios', (req, res) => {
    db.all(`SELECT * FROM funcionarios`, [], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});

app.post('/funcionarios', (req, res) => {
    const { nome, cargo, salario, setor } = req.body;
    db.run(`INSERT INTO funcionarios (nome, cargo, salario, setor) VALUES (?, ?, ?, ?)`, 
        [nome, cargo, salario, setor], function(err) {
        if (err) return res.status(500).send(err.message);
        res.status(201).send({ id: this.lastID });
    });
});

app.put('/funcionarios/:id', (req, res) => {
    const { id } = req.params;
    const { nome, cargo, salario, setor } = req.body;
    db.run(`UPDATE funcionarios SET nome = ?, cargo = ?, salario = ?, setor = ? WHERE id = ?`, 
        [nome, cargo, salario, setor, id], function(err) {
        if (err) return res.status(500).send(err.message);
        res.status(200).send({ updatedID: id });
    });
});

app.delete('/funcionarios/:id', (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM funcionarios WHERE id = ?`, [id], function(err) {
        if (err) return res.status(500).send(err.message);
        res.status(200).send({ deletedID: id });
    });
});

// -----------------------------------------------------------------------------
// Cardápio
db.run(`CREATE TABLE IF NOT EXISTS cardapio (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    preco FLOAT NOT NULL,
    tipo TEXT NOT NULL)`);

app.get('/cardapio', (req, res) => {
    db.all(`SELECT * FROM cardapio`, [], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});

app.post('/cardapio', (req, res) => {
    const { nome, preco, tipo } = req.body;
    db.run(`INSERT INTO cardapio (nome, preco, tipo) VALUES (?, ?, ?)`, 
        [nome, preco, tipo], function(err) {
        if (err) return res.status(500).send(err.message);
        res.status(201).send({ id: this.lastID });
    });
});

app.put('/cardapio/:id', (req, res) => {
    const { id } = req.params;
    const { nome, preco, tipo } = req.body;
    db.run(`UPDATE cardapio SET nome = ?, preco = ?, tipo = ? WHERE id = ?`, 
        [nome, preco, tipo, id], function(err) {
        if (err) return res.status(500).send(err.message);
        res.status(200).send({ updatedID: id });
    });
});

app.delete('/cardapio/:id', (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM cardapio WHERE id = ?`, [id], function(err) {
        if (err) return res.status(500).send(err.message);
        res.status(200).send({ deletedID: id });
    });
});

// -----------------------------------------------------------------------------
// Reservas
db.run(`CREATE TABLE IF NOT EXISTS reservas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nomeCliente TEXT NOT NULL,
    destino TEXT NOT NULL,
    data TEXT NOT NULL,
    pessoas INT NOT NULL)`);

app.get('/reservas', (req, res) => {
    db.all(`SELECT * FROM reservas`, [], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});

app.post('/reservas', (req, res) => {
    const { nomeCliente, destino, data, pessoas } = req.body;
    db.run(`INSERT INTO reservas (nomeCliente, destino, data, pessoas) VALUES (?, ?, ?, ?)`, 
        [nomeCliente, destino, data, pessoas], function(err) {
        if (err) return res.status(500).send(err.message);
        res.status(201).send({ id: this.lastID });
    });
});

app.put('/reservas/:id', (req, res) => {
    const { id } = req.params;
    const { nomeCliente, destino, data, pessoas } = req.body;
    db.run(`UPDATE reservas SET nomeCliente = ?, destino = ?, data = ?, pessoas = ? WHERE id = ?`, 
        [nomeCliente, destino, data, pessoas, id], function(err) {
        if (err) return res.status(500).send(err.message);
        res.status(200).send({ updatedID: id });
    });
});

app.delete('/reservas/:id', (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM reservas WHERE id = ?`, [id], function(err) {
        if (err) return res.status(500).send(err.message);
        res.status(200).send({ deletedID: id });
    });
});

// -----------------------------------------------------------------------------
// Pets
db.run(`CREATE TABLE IF NOT EXISTS pets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    especie TEXT NOT NULL,
    raca TEXT NOT NULL,
    idade INT NOT NULL)`);

app.get('/pets', (req, res) => {
    db.all(`SELECT * FROM pets`, [], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});

app.post('/pets', (req, res) => {
    const { nome, especie, raca, idade } = req.body;
    db.run(`INSERT INTO pets (nome, especie, raca, idade) VALUES (?, ?, ?, ?)`, 
        [nome, especie, raca, idade], function(err) {
        if (err) return res.status(500).send(err.message);
        res.status(201).send({ id: this.lastID });
    });
});

app.put('/pets/:id', (req, res) => {
    const { id } = req.params;
    const { nome, especie, raca, idade } = req.body;
    db.run(`UPDATE pets SET nome = ?, especie = ?, raca = ?, idade = ? WHERE id = ?`, 
        [nome, especie, raca, idade, id], function(err) {
        if (err) return res.status(500).send(err.message);
        res.status(200).send({ updatedID: id });
    });
});

app.delete('/pets/:id', (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM pets WHERE id = ?`, [id], function(err) {
        if (err) return res.status(500).send(err.message);
        res.status(200).send({ deletedID: id });
    });
});

// -----------------------------------------------------------------------------
// Jogos
db.run(`CREATE TABLE IF NOT EXISTS jogos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    plataforma TEXT NOT NULL,
    ano INT NOT NULL,
    genero TEXT NOT NULL)`);

app.get('/jogos', (req, res) => {
    db.all(`SELECT * FROM jogos`, [], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});

app.post('/jogos', (req, res) => {
    const { nome, plataforma, ano, genero } = req.body;
    db.run(`INSERT INTO jogos (nome, plataforma, ano, genero) VALUES (?, ?, ?, ?)`, 
        [nome, plataforma, ano, genero], function(err) {
        if (err) return res.status(500).send(err.message);
        res.status(201).send({ id: this.lastID });
    });
});

app.put('/jogos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, plataforma, ano, genero } = req.body;
    db.run(`UPDATE jogos SET nome = ?, plataforma = ?, ano = ?, genero = ? WHERE id = ?`, 
        [nome, plataforma, ano, genero, id], function(err) {
        if (err) return res.status(500).send(err.message);
        res.status(200).send({ updatedID: id });
    });
});

app.delete('/jogos/:id', (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM jogos WHERE id = ?`, [id], function(err) {
        if (err) return res.status(500).send(err.message);
        res.status(200).send({ deletedID: id });
    });
});

// -----------------------------------------------------------------------------
app.listen(port, () => {   
    console.log(`Server is running at http://localhost:${port}`);  
});
