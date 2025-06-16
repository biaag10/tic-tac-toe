window.onload = function() {
    const boardElement = document.getElementById('board');
    const currentPlayerElement = document.getElementById('current-player');
    const statusElement = document.getElementById('status');
    const playAgainButton = document.getElementById('play-again');

    if (!boardElement) {
        console.error('Elemento #board não encontrado!');
        return;
    }

    let gameState = {
        board: Array(9).fill(' '),
        current_player: 'X',
        winner: null,
        is_draw: false
    };

    // Função para buscar o estado atual do jogo
    const fetchGameState = async () => {
        try {
            const response = await fetch('http://localhost:5000/game');
            if (!response.ok) {
                throw new Error('Failed to fetch game state');
            }
            const data = await response.json();
            gameState = data;
            renderBoard();
            updateGameStatus();
        } catch (error) {
            console.error('Erro ao buscar estado do jogo:', error);
            statusElement.textContent = `Erro: ${error.message}`;
        }
    };

    // Função para atualizar a tela do tabuleiro
    const renderBoard = () => {
        boardElement.innerHTML = '';
        gameState.board.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.className = 'cell';
            cellElement.textContent = cell === ' ' ? '' : cell;
            
            // Só adiciona o evento de clique se o jogo não terminou
            if (!gameState.winner && !gameState.is_draw) {
                cellElement.addEventListener('click', () => makeMove(index));
            }
            
            boardElement.appendChild(cellElement);
        });
    };

    // Função para atualizar o status do jogo
    const updateGameStatus = () => {
        if (gameState.winner) {
            statusElement.textContent = `Jogador ${gameState.winner} venceu!`;
            currentPlayerElement.textContent = '';
            playAgainButton.style.display = 'block';
        } else if (gameState.is_draw) {
            statusElement.textContent = 'Empate!';
            currentPlayerElement.textContent = '';
            playAgainButton.style.display = 'block';
        } else {
            statusElement.textContent = '';
            currentPlayerElement.textContent = `Jogador Atual: ${gameState.current_player}`;
            playAgainButton.style.display = 'none';
        }
    };

    // Função para fazer a jogada
    const makeMove = async (index) => {
        try {
            // Verifica se a célula já está ocupada ou se o jogo terminou
            if (gameState.board[index] !== ' ' || gameState.winner || gameState.is_draw) {
                return;
            }

            const response = await fetch('http://localhost:5000/move', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ position: index })
            });

            if (!response.ok) {
                throw new Error('Jogada inválida');
            }

            const data = await response.json();
            gameState = {
                board: data.board,
                current_player: data.current_player,
                winner: data.winner,
                is_draw: data.is_draw
            };

            renderBoard();
            updateGameStatus();

        } catch (error) {
            console.error('Erro ao fazer a jogada:', error);
            statusElement.textContent = `Erro: ${error.message}`;
        }
    };

    // Função para reiniciar o jogo
    const resetGame = async () => {
        try {
            const response = await fetch('http://localhost:5000/reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                throw new Error('Failed to reset game');
            }

            const data = await response.json();
            gameState = {
                board: data.board,
                current_player: data.current_player,
                winner: data.winner,
                is_draw: data.is_draw
            };

            renderBoard();
            updateGameStatus();

        } catch (error) {
            console.error('Erro ao reiniciar o jogo:', error);
            statusElement.textContent = `Erro: ${error.message}`;
        }
    };

    // Adiciona o evento de clique no botão "Jogar Novamente"
    playAgainButton.addEventListener('click', resetGame);

    // Inicializa o jogo buscando o estado atual
    fetchGameState();
};

