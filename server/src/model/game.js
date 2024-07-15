class Game {
    constructor(gameId) {
        this.gameId = gameId;
        this.players = [];
        this.boards = {};
        this.currentTurn = 0;
    }
}

export default Game;