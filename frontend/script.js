window.onload = function() {
    const boardElement = document.getElementById('board');
    const currentPlayerElement = document.getElementById('current-player');
    const statusElement = document.getElementById('status');

    if (!boardElement) {
        console.error('Elemento #board não encontrado!');
        return;  // Se o elemento não for encontrado, o código não continua
    }

    let currentPlayer = 'X'; // Começa com o jogador X
    let gameMode = ''; // 'human' ou 'computer'
    let board = Array(9).fill(' '); // Tabuleiro com 9 células vazias

    // Função para atualizar a tela do tabuleiro
    const renderBoard = () => {
        boardElement.innerHTML = '';  // Limpa o tabuleiro
        board.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.className = 'cell';
            cellElement.textContent = cell;
            cellElement.addEventListener('click', () => makeMove(index));  // Adiciona o ouvinte de evento
            boardElement.appendChild(cellElement);
        });
        currentPlayerElement.textContent = `Jogador Atual: ${currentPlayer}`;
    };

    // Função para fazer a jogada
    const makeMove = async (index) => {
    try {
        if (board[index] !== ' ') return;  // Impede de clicar em uma célula já ocupada

        const response = await fetch('http://localhost:5000/move', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ position: index })
        });

        if (!response.ok) {
            throw new Error('Failed to make move');
        }

        const data = await response.json();
        
        // Verifique se a resposta tem o formato esperado
        if (data.board) {
            board = data.board;  // Atualiza o tabuleiro
            renderBoard();
            if (data.winner) {
                statusElement.textContent = `Jogador ${data.winner} venceu!`;
            } else if (!data.board.includes(' ')) {
                statusElement.textContent = 'Empate!';
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Alterna entre os jogadores
                currentPlayerElement.textContent = `Jogador Atual: ${currentPlayer}`;
            }
        } else {
            throw new Error('Invalid board data');
        }

    } catch (error) {
        console.error('Erro ao fazer a jogada:', error);
        statusElement.textContent = `Erro: ${error.message}`;
    }
};


    // Função para começar o jogo contra outra pessoa
    const playVsHuman = () => {
        board = Array(9).fill(' '); // Reinicia o tabuleiro
        currentPlayer = 'X';
        renderBoard();
        statusElement.textContent = '';  // Limpa o status
    };

    // Função para começar o jogo contra o computador
    const playVsComputer = () => {
        board = Array(9).fill(' '); // Reinicia o tabuleiro
        currentPlayer = 'X';
        renderBoard();
        statusElement.textContent = '';  // Limpa o status
    };

    // Adicionar os eventos para os botões (Se tiver)
    document.getElementById('play-vs-human')?.addEventListener('click', playVsHuman);
    document.getElementById('play-vs-computer')?.addEventListener('click', playVsComputer);

    // Inicializa o jogo
    renderBoard();
};
