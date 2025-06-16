class TicTacToe:
    def __init__(self):
        self.board = [' '] * 9  # Representação do tabuleiro
        self.current_player = 'X'
        self.winner = None  # Variável para armazenar o vencedor

    def get_board(self):
        return self.board

    def make_move(self, position):
        if self.board[position] == ' ' and self.winner is None:  # Verifica se o jogo ainda está em andamento
            self.board[position] = self.current_player
            if self.check_winner():
                return True  # Se houver um vencedor, não faz a troca de jogador
            self.current_player = 'O' if self.current_player == 'X' else 'X'
            return True
        return False

    def check_winner(self):
        # Definir os padrões de vitória
        win_patterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  # Linhas
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  # Colunas
            [0, 4, 8], [2, 4, 6]  # Diagonais
        ]

        for pattern in win_patterns:
            a, b, c = pattern
            if self.board[a] == self.board[b] == self.board[c] != ' ':
                self.winner = self.board[a]  # Define o vencedor
                return True  # Se houver vencedor, retorna True
        return False  # Não há vencedor

    def is_draw(self):
        # Verifica se o jogo terminou em empate
        return ' ' not in self.board and self.winner is None

    def reset_game(self):
        # Reinicia o jogo para uma nova partida
        self.board = [' '] * 9
        self.current_player = 'X'
        self.winner = None
