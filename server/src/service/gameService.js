import { v4 } from 'uuid';
import Game from '../model/game.js';

class GameService {
    constructor() {
        this.games = {};
        // this.gameHistory = [];
    }

    findOrCreateRandomGame(userId) {
        for (const gameId in this.games) {
            const game = this.games[gameId];
            if (game.players.length === 1 && game.players[0] !== userId) {
                game.players.push(userId);
                game.boards[userId] = this.createEmptyBoard();
                return gameId;
            }
        }

        const gameId = this.generateGameId();
        const game = new Game(gameId);
        game.players.push(userId);
        game.boards[userId] = this.createEmptyBoard();
        this.games[gameId] = game;
        return gameId;
    }

    placeShips(gameId, userId, shipPositions) {
        const game = this.games[gameId];
        if (!game) {
            throw new Error("Invalid game");
        }

        const board = game.boards[userId];
        for (const pos of shipPositions) {
            const[x, y] = pos
            if (x-1 < 0 || x-1 >= board.length || y-1 < 0 || y-1 >= board.length || board[y-1][x-1] !== 'E') {
                throw new Error("Invalid ship placement");
            } else {
                board[y-1][x-1] = 'S';
            }
        }
    }

    areShipsPlaced(gameId) {
        const game = this.games[gameId];
        // check for each board if it has any 'S'
        return game.players.every(player => game.boards[player].some(row => row.includes('S')));
    }

    makeShot(gameId, userId, shot) {
        const game = this.games[gameId];
        if (!game) {
            throw new Error("Invalid game");
        }

        if (game.players[game.currentTurn] !== userId) {
            throw new Error("Not your turn");
        }

        const opponentBoard = game.boards[game.players.find(player => player !== userId)];

        const [x, y] = shot;
        if (!(x < 0 || x >= opponentBoard.length || y < 0 || y >= opponentBoard.length || (opponentBoard[x][y] !== 'E' && opponentBoard[x][y] !== 'S'))) {
            if (opponentBoard[x][y] === 'S') {
                opponentBoard[x][y] = 'H';
            } else {
                opponentBoard[x][y] = 'M';
            }
        } else {
            throw new Error("Invalid move");
        }

        game.currentTurn = (game.currentTurn + 1) % 2;
        return opponentBoard
    }

    getGameFromUser(userId) {
        for (const gameId in this.games) {
            if (this.games[gameId].players.includes(userId)) {
                return this.games[gameId];
            }
        }
        return null
    }

    setGameEnd(gameId) {
        // this.gameHistory.push(this.games[gameId]);
        delete this.games[gameId];
    }

    createEmptyBoard() {
        return Array(10).fill().map(() => Array(10).fill('E'));
    }

    generateGameId() {
        return v4();
    }

    isReadyToStart(gameId) {
        return this.games[gameId].players.length === 2;
    }

    checkGameEnd(board) {
        return !board.some(row => row.includes('S'));
    }

    getPlayers(gameId) {
        return this.games[gameId].players;
    }
}

const gameService = new GameService();
export default gameService;