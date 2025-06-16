
# 🎮 Jogo da Velha (Tic Tac Toe) - Web App com Flask + Docker

Este é um projeto de Jogo da Velha (Tic Tac Toe) desenvolvido com **Flask (Python)** no backend, **HTML/CSS/JavaScript** no frontend e totalmente containerizado com **Docker**. O estado do jogo é salvo em um banco de dados **SQLite** e a interface é hospedada com **Nginx**.

---

## 📦 Tecnologias Utilizadas

### Backend
- 🐍 Python 3.9
- 🌐 Flask
- 🔄 Flask-CORS
- 💾 SQLite
- 🧱 Docker

### Frontend
- 🧱 HTML5
- 🎨 CSS3
- ⚙️ JavaScript (vanilla)
- 🌐 Nginx (como servidor de arquivos estáticos)

### Orquestração
- 🐳 Docker Compose

---

## 📁 Estrutura do Projeto

.
├── backend
│ ├── app.py # Arquivo principal do servidor Flask
│ ├── game.py # Lógica do jogo da velha
│ ├── database.py # Interface com SQLite
│ ├── game.db # Banco de dados SQLite
│ ├── requirements.txt # Dependências do backend
│ └── Dockerfile # Dockerfile do backend
│
├── frontend
│ ├── index.html # Página principal do jogo
│ ├── style.css # Estilização da interface
│ ├── script.js # Lógica no cliente (frontend)
│ └── Dockerfile # Dockerfile do frontend (Nginx)
│
├── docker-compose.yml # Orquestração dos serviços
├── .gitignore
└── README.md # Este arquivo

yaml
Copiar
Editar

---

## 🚀 Como Executar

### Pré-requisitos
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Passo a passo

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/jogo-da-velha.git
cd jogo-da-velha

# Suba os containers
docker-compose up --build
Após isso, acesse:

🎮 Frontend: http://localhost

🔧 Backend API (exemplo): http://localhost:5000/game

🧠 Funcionalidades
Jogabilidade interativa com dois jogadores locais.

Detecção de vitória e empate.

Reinício de jogo com botão "Jogar Novamente".

Armazenamento do estado do jogo em banco de dados.

Interface leve e responsiva com atualizações dinâmicas via JavaScript.

📌 Endpoints da API
Método	Rota	Descrição
GET	/game	Retorna o estado atual do jogo
POST	/move	Realiza uma jogada (posição)
POST	/reset	Reinicia o jogo

👥 Equipe
Desenvolvido com 💡 por Sítio Sem a Cuca.
