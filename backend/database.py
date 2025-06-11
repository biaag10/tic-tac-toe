import sqlite3

class Database:
    def __init__(self):
        # Criar a conexão com o banco de dados SQLite, permitindo múltiplas threads
        self.conn = sqlite3.connect('game.db', check_same_thread=False)  # Alteração aqui
        self.cursor = self.conn.cursor()
        self.cursor.execute('''CREATE TABLE IF NOT EXISTS games (board TEXT, current_player TEXT)''')

    def save_game(self, board, current_player):
        # Salva o estado do jogo no banco de dados
        self.cursor.execute('INSERT INTO games (board, current_player) VALUES (?, ?)', (str(board), current_player))
        self.conn.commit()

    def get_last_game(self):
        # Retorna o último estado do jogo salvo
        self.cursor.execute('SELECT * FROM games ORDER BY rowid DESC LIMIT 1')
        return self.cursor.fetchone()
