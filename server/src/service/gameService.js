import { v4 } from 'uuid';
import Game from '../model/game.js';
import databaseService from './databaseService.js';

class GameService {
    constructor() {
        this.games = {}
        this.playerReconnectTimers = new Map()
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
        game.currentTurn = 0;
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

        // Update ships placed status
        game.setShipsPlaced(true);
    }

    areShipsPlaced(gameId) {
        const game = this.games[gameId];
        if (!game) {
            return true
        }
        // check for each board if it has any 'S'
        return game.players.every(player => game.boards[player].some(row => row.includes('S')));
    }

    makeShot(gameId, userId, shot) {
        const game = this.games[gameId];
        if (!game) {
            throw new Error("Invalid game");
        }

        console.log("gameId: " + gameId + " "+userId + " "+ shot+ "| current: " + game.currentTurn)
        if (game.players.at(game.currentTurn) !== userId) {
            throw new Error("Not your turn");
        }

        const opponentBoard = game.boards[game.players.find(player => player !== userId)];

        const [x, y] = shot;
        if (!(x < 0 || x >= opponentBoard.length || y < 0 || y >= opponentBoard.length || (opponentBoard[x][y] !== 'E' && opponentBoard[x][y] !== 'S'))) {
            const isHit = opponentBoard[x][y] === 'S';
            if (isHit) {
                opponentBoard[x][y] = 'H';
            } else {
                opponentBoard[x][y] = 'M';
            }
            
            // Record shot statistics
            game.recordShot(userId, isHit);
        } else {
            throw new Error("Invalid move");
        }

        game.switchTurn();
        
        return opponentBoard;
    }

    getGameFromUser(userId) {
        for (const gameId in this.games) {
            if (this.games[gameId].players.includes(userId)) {
                return this.games[gameId];
            }
        }
        return null;
    }

    // Handle player reconnection
    async handlePlayerReconnection(userId, gameId) {
        try {
            // Clear any existing reconnection timer for this player
            this.clearReconnectTimer(userId);
            
            // Try to load game from memory first
            let game = this.games[gameId];
            
            if (!game) {
                return { success: false, message: "Game not found" };
            }
            
            // Check if player is part of this game
            if (!game.players.includes(userId)) {
                return { success: false, message: "Player not part of this game" };
            }
            
            return { 
                success: true, 
                game: game,
                message: "Successfully reconnected to game"
            };
        } catch (error) {
            console.error('Error handling player reconnection:', error);
            return { success: false, message: "Error reconnecting to game" };
        }
    }

    // Set reconnection timer for player
    setReconnectTimer(userId, gameId, callback) {
        // Clear existing timer
        this.clearReconnectTimer(userId);
        
        // Set new timer (30 seconds)
        const timer = setTimeout(() => {
            callback(userId, gameId);
            this.playerReconnectTimers.delete(userId);
        }, 30000);
        
        this.playerReconnectTimers.set(userId, timer);
    }

    // Clear reconnection timer for player
    clearReconnectTimer(userId) {
        const timer = this.playerReconnectTimers.get(userId);
        if (timer) {
            clearTimeout(timer);
            this.playerReconnectTimers.delete(userId);
        }
    }

    async setGameEnd(gameId, winnerId, abandoned = false) {
        const game = this.games[gameId];
        if (!game) return;

        try {
            game.endGame(winnerId, abandoned);

            // Save game to history database
            await databaseService.saveGame(game.getGameData());

            // Remove from memory
            delete this.games[gameId];
            
            // Clear any reconnection timers
            for (const playerId of game.players) {
                this.clearReconnectTimer(playerId);
            }
        } catch (error) {
            console.error('Error saving game to database:', error);
            // Still remove from memory even if database save fails
            delete this.games[gameId];
        }
    }

    startGame(gameId) {
        const game = this.games[gameId];
        if (game) {
            game.startGame();
        }
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

    async getPlayerGameHistory(playerId) {
        return await databaseService.getPlayerHistory(playerId);
    }
}

const gameService = new GameService();
export default gameService;