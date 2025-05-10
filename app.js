const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const exphbs = require('express-handlebars'); // motor de visualização
const Alimento = require('./models/alimento'); // modelo Sequelize
const sequelize = require('./db'); // conexão com o banco

const app = express();
const port = 3000;




// Configurar Handlebars
app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layout')
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Configurar body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rota para listar todos os alimentos
app.get('/alimentos', (req, res) => {
  Alimento.findAll()
    .then((alimentos) => {
      res.render('alimentos', { alimentos });
    })
    .catch((err) => console.log(err));
});

// Rota para exibir o formulário de adição de alimentos
app.get('/add-alimento', (req, res) => {
  res.render('add-alimento');
});

// Rota para adicionar alimento ao banco
app.post('/add-alimento', (req, res) => {
  const { nome, quantidade, descricao } = req.body;

  Alimento.create({
    nome,
    quantidade,
    descricao,
  })
    .then(() => res.redirect('/alimentos'))
    .catch((err) => console.log(err));
});

// Sincronizar banco e iniciar servidor
sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));

  const bcrypt = require('bcryptjs');
  const Usuario = require('./models/usuario'); // Importa o modelo de Usuário
  const session = require('express-session');
  
  // Configura a sessão (deve ser configurado antes de qualquer rota de autenticação)
  app.use(session({
    secret: 'seuSegredo',  // Pode ser qualquer string segura
    resave: false,
    saveUninitialized: true,
  }));
  
  // Rota para exibir o formulário de cadastro
  app.get('/cadastro', (req, res) => {
    res.render('cadastro');
  });
  
  // Rota para cadastrar um usuário
  app.post('/cadastro', (req, res) => {
    const { nome, email, senha } = req.body;
    const salt = bcrypt.genSaltSync(10);  // Gera o salt para criptografar a senha
    const senhaHash = bcrypt.hashSync(senha, salt);  // Criptografa a senha
  
    Usuario.create({ nome, email, senha: senhaHash })
      .then(() => res.redirect('/login'))
      .catch((err) => console.log(err));
  });
  
  // Rota para exibir o formulário de login
  app.get('/login', (req, res) => {
    res.render('login');
  });
  
  // Rota para fazer login
  app.post('/login', (req, res) => {
    const { email, senha } = req.body;
  
    Usuario.findOne({ where: { email } })
      .then((usuario) => {
        if (usuario && bcrypt.compareSync(senha, usuario.senha)) {
          req.session.usuario = {
            id: usuario.id,
            nome: usuario.nome
          };  // Armazena o ID e o Nome do usuário na sessão
          res.redirect('/alimentos');  // Redireciona para a página de alimentos após o login
        } else {
          res.send('Credenciais inválidas');
        }
      })
      .catch((err) => console.log(err));
  });
   
 // Rota para a página inicial (Home)
app.get('/', (req, res) => {
  res.render('home', { title: 'Home' });
});

// Rota para a página sobre
app.get('/sobre', (req, res) => {
  res.render('sobre', { title: 'Sobre' });
});

