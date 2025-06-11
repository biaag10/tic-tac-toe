# Jogo da Velha - Projeto

- Este é um projeto de Jogo da Velha (Tic Tac Toe) desenvolvido utilizando Python (Flask) para o backend, HTML, CSS e JavaScript para o frontend e Docker para containerização. O backend interage com o frontend através de uma API RESTful e armazena o estado do jogo em um banco de dados SQLite.

## Tecnologias Usadas

* Backend: Python, Flask, SQLite
* Frontend: HTML, CSS, JavaScript 
* Containerização: Docker (Docker Compose)
* API: RESTful
* Banco de Dados: SQLite

## Estrutura do Projeto
tic-tac-toe/
├── backend/
│   ├── app.py                # Arquivo principal do backend (Flask)
│   ├── Dockerfile            # Dockerfile para o backend
│   ├── game.py               # Lógica do jogo (TicTacToe)
│   ├── database.py           # Banco de dados SQLite
│   └── requirements.txt      # Dependências do Python
├── frontend/
│   ├── index.html            # HTML para o frontend
│   ├── script.js             # Lógica do frontend (JavaScript)
│   ├── style.css             # Estilos para o frontend
│   └── Dockerfile            # Dockerfile para o frontend (Nginx)
├── docker-compose.yml        # Arquivo para orquestrar os containers
└── README.md                 # Este arquivo

## Como Rodar o Projeto

- Para rodar o projeto, você precisará do Docker e Docker Compose instalados em sua máquina.

1. Configuração do Backend
O backend é responsável pela lógica do jogo e pela comunicação com o banco de dados. Ele foi implementado utilizando o Flask e o SQLite (Dependências do Python: No arquivo requirements.txt).

2. Configuração do Frontend
O frontend consiste em um simples aplicativo da web que exibe o tabuleiro e permite que os jogadores façam suas jogadas. Ele é servido pelo Nginx.
O código HTML, CSS e JavaScript são simples e interagem com a API do backend para realizar as jogadas.

3. Docker e Docker Compose
Este projeto utiliza o Docker para containerizar tanto o frontend quanto o backend, e Docker Compose para orquestrar os containers.

4. Como Executar o Projeto
Para rodar o projeto, basta executar o seguinte comando na raiz do projeto (onde está o arquivo docker-compose.yml): docker-compose up --build
Isso fará o Docker baixar as imagens necessárias, construir os containers e iniciar o projeto.
*O frontend estará acessível em http://localhost (ou na porta configurada no nginx.conf).
*O backend estará acessível em http://localhost:5000.

5. Parâmetros de Configuração do Docker
O arquivo docker-compose.yml está configurado da seguinte forma:
*Backend: O backend Flask está configurado para rodar na porta 5000.
*Frontend: O frontend está sendo servido pelo Nginx e estará acessível na porta 80.
*Banco de Dados: A base de dados SQLite será criada dentro do container db.