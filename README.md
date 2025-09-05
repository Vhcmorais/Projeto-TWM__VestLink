# 📚 VestLink

![VestLink Logo](./public/vestlink_logo.png)

O **VestLink** é um site desenvolvido como projeto final da disciplina **Tecnologias Web e Mobile**, da Universidade Federal de Uberlândia. O objetivo é criar uma plataforma para postagens de **resumos, materiais de estudo e interações** entre estudantes que se preparam para vestibulares e ENEM.

O projeto tem como principal objetivo o desenvolvimento de um sistema funcional, utilizando técnicas compatíveis com **React** e tecnologias web modernas.

---

## 🚀 Funcionalidades

- ✅ Cadastro e login de usuários
- ✅ Postagem de resumos e materiais de estudo
- ✅ Visualização de postagens em um feed
- ✅ Interface responsiva e amigável
- ✅ Sistema de autenticação
- ✅ Organização dos conteúdos por áreas

---

## 🛠️ Tecnologias Utilizadas

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express)

| 📌 Frontend | ⚙️ Backend | 🗄️ Banco de Dados |
|---|---|---|
| React, Vite | Node.js, Express| SQLite, PostgreSQL |
| Bootstrap / React-Bootstrap | Multer, CORS | |

---

## 📂 Estrutura do Repositório

```bash
📁 vestlink/
├─ 📁 public/
│  ├─ logo.png
│  ├─ favicon.ico
│  └─ index.html
├─ 📁 src/
│  ├─ components/
│  └─ pages/
├─ 📁 uploads/
├─ 📄 server.js
├─ 📄 users.db
└─ 📄 README.md
```

---

## 🧑🏽‍💻 Criação do Projeto

1. Criamos o projeto React:
```bash
npx create-react-app vestlink
cd vestlink
npm start
```
2. Instalamos as bibliotecas necessárias:
```bash
npm install react-bootstrap bootstrap
npm install react-router-dom
npm install express
...
```

---

## 🗂️ Banco de Dados

O projeto utiliza SQLite no desenvolvimento local, por ser leve e não exigir configuração de servidor.

Ele armazena dados como usuários, postagens, perfis e materiais.

### 📌 Estrutura de Dados

As principais informações armazenadas localmente incluem:

- **Usuários:** dados de cadastro, login e perfil
- **Postagens:** resumos, materiais e comentários
- **Perfis:** informações adicionais de cada estudante (nome, biografia, foto)
- **Materiais:** arquivos e conteúdos vinculados às áreas de estudo

### ⚙️ Configuração

1. Instalação do pacote SQLite3:
   ```bash
   npm install sqlite3
   ```
2. Criação do arquivo server.js para inicializar o banco:
```javascript
// Importando os módulos necessários:

const express = require(\'express\');
const sqlite3 = require(\'sqlite3\').verbose();
...

// Cria a aplicação Express e define porta de conexão:

const app = express();
const PORT = 3001;
...

// Cria a tabela \


"users" caso ainda não exista:

const db = new sqlite3.Database(\'./users.db\', (err) => {
  if (err) {
    console.error(\'Erro ao abrir o banco de dados:\', err.message);
  } else {
    console.log(\'Conectado ao banco de dados SQLite.\');
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL,
      profilePicturePath TEXT,
      bio TEXT 
    )`, (err) => {
      if (err) {
        console.error(\'Erro ao criar a tabela de usuários:\', err.message);
      }
    });

...
```

---

## 💻 Desenvolvimento Front-end

O front-end do **VestLink** foi desenvolvido utilizando **React**, com estilização via **Bootstrap/React-Bootstrap** e CSS customizado.
---
---
### ⚛️ React

- React é uma **biblioteca JavaScript** para criar interfaces de usuário de forma **reativa e componentizada**.
- Cada parte da página (botões, formulários, cards de post, navbar) é construída como um **componente reutilizável**.
- Exemplo de criação de componente:

```javascript
function CardPost({ title, description }) {
  return (
    <div className="card p-3 m-2">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
```
...
---
### 🟦 Bootstrap / React-Bootstrap

- **Bootstrap** é um framework CSS que fornece **estilos prontos e componentes responsivos**, como grids, botões, formulários, cards e navbar.
- **React-Bootstrap** adapta esses componentes para serem usados **como componentes React**, mantendo a reatividade da aplicação.
- Benefícios:
  - Layout responsivo automaticamente (desktop, tablet, mobile)
  - Componentes prontos que aceleram o desenvolvimento
  - Integração fácil com React

**Exemplo de Card com React-Bootstrap:**
```jsx
import Card from \'react-bootstrap/Card\';

function CardPost({ title, description }) {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}
```

---

## ⚙️ Desenvolvimento Back-end

O back-end do **VestLink** foi desenvolvido com **Node.js** e **Express**, oferecendo uma API REST que se comunica com o banco de dados **SQLite** no ambiente local.

---

### 🟢 Tecnologias e Funções

- **Node.js**: ambiente de execução JavaScript no servidor
- **Express**: framework para criar rotas e APIs de forma rápida e organizada
- **SQLite**: banco de dados local para armazenamento de usuários, posts, favoritos e avaliações
- **Multer**: middleware para upload de arquivos (materiais, imagens de capa e foto de perfil)
- **CORS**: permite que o front-end acesse o back-end mesmo estando em portas diferentes
---
### 🔄 Funcionalidades do Back-end

1. **Cadastro e login de usuários**
   - Senhas armazenadas de forma segura usando `bcrypt`
   - Validação de campos obrigatórios e verificação de email único

2. **Gestão de posts**
   - Criação, listagem e exclusão de posts
   - Upload de arquivos e imagens (materiais de estudo e capa)

3. **Favoritos e avaliações**
   - Usuários podem favoritar/desfavoritar posts
   - Avaliações positivas ou negativas em cada post

4. **Perfis de usuário**
   - Visualização e atualização de biografia
   - Upload de foto de perfil

5. **Serviço de arquivos estáticos**
   - Arquivos enviados são armazenados em `uploads/`
   - Podem ser acessados via URL, ex.: `http://localhost:3001/uploads/nome-do-arquivo`
---
### 📂 Estrutura do Back-end

- `server.js` → arquivo principal do servidor Express
- `uploads/` → pasta onde arquivos enviados são salvos
- `users.db` → banco de dados SQLite local
- Possíveis futuras pastas para melhor organização:
  - `routes/` → rotas separadas por recurso (users, posts)
  - `controllers/` → funções que implementam a lógica de cada rota
  - `database/` → inicialização e configuração do SQLite

---
### 🔄 Fluxo de Comunicação

1. **Front-end React** envia requisições HTTP (GET, POST, PUT, DELETE) para o **Express**
2. **Express** processa a requisição, executa queries no **SQLite** e retorna dados em JSON
3. **Front-end** consome a resposta e atualiza a interface do usuário
---
### ⚡ Exemplos de Rotas

- `POST /register` → cadastrar usuário
- `POST /login` → autenticar usuário
- `POST /posts` → criar um novo post
... 

---

## 📊 Resultados Obtidos

Aqui estão algumas telas do projeto **VestLink**:

**Tela de Login**
![Tela de Login](./demo/imagens/tela_login.png)

**Feed de Postagens**
![Feed de Postagens](./demo/imagens/tela_post.png)

**Perfil do Usuário**
![Página de Perfil](./demo/imagens/tela_perfil.png)

---

## 🙏 Agradecimentos

Gostaria de agradecer aos meus colegas que contribuíram para este projeto!  
Seus esforços, ideias e dedicação tornaram este projeto possível.  

### Contribuidores
- [Vitor Henrique](https://github.com/Vhcmorais)  
- [Adilson José](https://github.com/OutroContribuidor)  
- [Bianca Marques](https://github.com/MaisUm)
- [Gabriel Alves](https://github.com/Maisum)

![Imagem de agradecimento](./demo/imagens/foto_readme.jpg)
