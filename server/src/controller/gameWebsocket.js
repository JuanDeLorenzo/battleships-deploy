import gameService from '../service/gameService.js'

const userSocketMap = {}

export function onRandomGame(socket, data) {
    try {
        console.log('User ' + data.userId + ' is looking for a random game')
        userSocketMap[data.userId] = socket
        const gameId = gameService.findOrCreateRandomGame(data.userId)
        if (gameService.isReadyToStart(gameId)) {
            const players = gameService.getPlayers(gameId)
            players.forEach(player => userSocketMap[player].emit('gameReady', { gameId: gameId }))
        }
    } catch (e) {
        console.log(e)
        socket.emit('error', 'Error while joining random game: ' + e.message)
    }
}

export function onPlaceShips(socket, data) {
    try {
        console.log('User ' + data.userId + ' is placing ships')
        gameService.placeShips(data.gameId, data.userId, data.shipPositions)
        if (gameService.areShipsPlaced(data.gameId)) {
            const players = gameService.getPlayers(data.gameId)
            players.forEach(player => userSocketMap[player].emit('shipsPlaced'))
            setTimeout(() => {
                userSocketMap[players[0]].emit('turnUpdate', { yourTurn: true })
            }, 1000)
        }
    } catch (e) {
        console.log(e)
        socket.emit('error', 'Error while placing ships: ' + e.message)
    }
}

export function onShot(socket, data) {
    try {
        console.log('User ' + data.userId + ' is making a shot')
        const opponentBoard = gameService.makeShot(data.gameId, data.userId, data.shot)
        const players = gameService.getPlayers(data.gameId)
        if (gameService.checkGameEnd(opponentBoard)) {
            gameService.setGameEnd(data.gameId)
            players.forEach(player => userSocketMap[player].emit('gameEnd', { winner: data.userId }))
        }
        // Send message to opponent for turn update
        const opponent = players.find(player => player !== data.userId)
        userSocketMap[opponent].emit('turnUpdate', { yourTurn: true })
        // Send message to current player for move result
        userSocketMap[data.userId].emit('shotResult', { shot: data.shot, result: opponentBoard[data.shot[0]][data.shot[1]] })
    } catch (e) {
        console.log(e)
        socket.emit('error', 'Error while making move: ' + e.message)
    }
}

export function onDisconnect(socket) {
    const userId = Object.keys(userSocketMap).find(key => userSocketMap[key] === socket)
    if (userId) {
        console.log('User ' + userId + ' disconnected')
        const game = gameService.getGameFromUser(userId)
        if (game) {
            const opponent = game.players.find(player => player !== userId)
            if (userSocketMap[opponent]) {
                userSocketMap[opponent].emit('opponentDisconnect')
            }
            gameService.setGameEnd(game.id)
        }
        delete userSocketMap[userId]
    }
}