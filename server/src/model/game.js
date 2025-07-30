class Game {
    constructor(gameId) {
        this.gameId = gameId;
        this.players = [];
        this.boards = {};
        this.currentTurn = 0;
        this.winnerId = null;
        this.abandonedGame = false;
        this.gameDate = new Date();
        this.gameStartTime = null;
        this.gameEndTime = null;
        this.shots = {}; // Track shots per player
        this.hits = {}; // Track hits per player
        this.shipsPlaced = false;
        this.gameCode = null;
        this.gameState = null;
    }

    switchTurn() {
        this.currentTurn = (this.currentTurn + 1) % this.players.length;
    }

    startGame() {
        this.gameStartTime = new Date();
        this.gameState = "active";
    }

    endGame(winnerId, abandoned = false) {
        this.gameEndTime = new Date();
        this.abandonedGame = abandoned;
        this.gameState = "finished";
        this.winnerId = winnerId;
        this.matchDuration = Math.floor((this.gameEndTime - this.gameStartTime) / 1000);
    }

    recordShot(playerId, isHit) {
        if (!this.shots[playerId]) {
            this.shots[playerId] = 0;
            this.hits[playerId] = 0;
        }
        this.shots[playerId]++;
        if (isHit) {
            this.hits[playerId]++;
        }
    }

    setGameUrl(url) {
        this.gameUrl = url;
    }

    setShipsPlaced(placed) {
        this.shipsPlaced = placed;
    }

    getGameData() {
        return {
            game_id: this.gameId,
            player1_id: this.players[0],
            player2_id: this.players[1],
            winner_id: this.winnerId,
            abandoned: this.abandonedGame,
            game_date: this.gameDate,
            game_duration: this.matchDuration,
            accuracy_player1 : (this.hits[this.players[0]] / this.shots[this.players[0]]) * 100,
            accuracy_player2 : (this.hits[this.players[1]] / this.shots[this.players[1]]) * 100
        };
    }
}

export default Game;