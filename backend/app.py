from flask import Flask, jsonify, request
from game import TicTacToe
from database import Database
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
game = TicTacToe()
db = Database()

@app.route('/game', methods=['GET'])
def get_game_state():
    # Retorna o estado atual do jogo (tabuleiro)
    return jsonify({'board': game.get_board(), 'current_player': game.current_player})

@app.route('/move', methods=['POST'])
def make_move():
    # Recebe a jogada e atualiza o estado do jogo
    data = request.json
    position = data.get('position')
    
    if game.make_move(position):
        db.save_game(game.get_board(), game.current_player)
        return jsonify({'message': 'Move made', 'board': game.get_board(), 'winner': check_winner()})
    return jsonify({'message': 'Invalid move'}), 400

def check_winner():
    # Verifique se o jogador atual ganhou
    if game.check_winner():
        return game.current_player
    return None

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
