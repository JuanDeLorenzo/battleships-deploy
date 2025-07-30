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

            setTimeout(() => {
                if (!gameService.areShipsPlaced(gameId)) {
                    console.log("Timed out!")
                    players.forEach(player => userSocketMap[player].emit('setShipsTimedOut', {message: ' Timed out! requesting ships'}))
                }
            }, 60000)
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
            
            // Start the game timer
            gameService.startGame(data.gameId)
            
            setTimeout(() => {
                userSocketMap[players[0]].emit('turnUpdate', { yourTurn: true })
            }, 1000)
        }
    } catch (e) {
        console.log(e)
        socket.emit('error', 'Error while placing ships: ' + e.message)
    }
}

export async function onShot(socket, data) {
    try {
        console.log('User ' + data.userId + ' is making a shot')
        const opponentBoard = gameService.makeShot(data.gameId, data.userId, data.shot)
        const players = gameService.getPlayers(data.gameId)
        
        if (gameService.checkGameEnd(opponentBoard)) {
            // Game ended - save to database
            await gameService.setGameEnd(data.gameId, data.userId)
            players.forEach(player => userSocketMap[player].emit('gameEnd', { winner: data.userId }))
        } else {
            // Send message to current player for move result
            players.forEach(player => userSocketMap[player].emit('shotResult', { shot: data.shot, shooter: data.userId, result: opponentBoard[data.shot[0]][data.shot[1]] }))
            // Send message to opponent for turn update
            const opponent = players.find(player => player !== data.userId)
            userSocketMap[opponent].emit('turnUpdate', { yourTurn: true })
        }
    } catch (e) {
        console.log(e)
        socket.emit('error', 'Error while making move: ' + e.message)
    }
}

// Handle game reconnection
export async function onReconnectToGame(socket, data) {
    try {
        console.log('User ' + data.userId + ' attempting to reconnect to game ' + data.gameId)
        
        const result = await gameService.handlePlayerReconnection(data.userId, data.gameId)
        
        if (result.success) {
            const game = result.game
            userSocketMap[data.userId] = socket
            const currentTurn = game.players.at(game.currentTurn) === data.userId
            
            // Send game state to reconnected player
            socket.emit('gameReconnected', {
                currentTurn: currentTurn,
                shipsPlaced: game.shipsPlaced,
                myBoard: game.boards[data.userId],
                opponentBoard: game.boards[game.players.find(player => player !== data.userId)]
            })
            
            // Notify opponent
            const opponent = game.players.find(player => player !== data.userId)
            userSocketMap[opponent].emit('opponentReconnected')
            
            console.log('User ' + data.userId + ' successfully reconnected to game ' + data.gameId)
        } else {
            socket.emit('reconnectFailed', { message: result.message })
            console.log('Reconnection failed for user ' + data.userId + ': ' + result.message)
        }
    } catch (e) {
        console.log(e)
        socket.emit('error', 'Error while reconnecting to game: ' + e.message)
    }
}

export async function onDisconnect(socket) {
    const userId = Object.keys(userSocketMap).find(key => userSocketMap[key] === socket)
    if (userId) {
        console.log('User ' + userId + ' disconnected')
        const game = gameService.getGameFromUser(userId)
        if (game) {
            const opponent = game.players.find(player => player !== userId)
            if (userSocketMap[opponent]) {
                userSocketMap[opponent].emit('opponentDisconnect')
            }
            
            // Set reconnection timer instead of immediately ending game
            gameService.setReconnectTimer(userId, game.gameId, async (disconnectedUserId, gameId) => {
                console.log('Reconnection timeout for user ' + disconnectedUserId + ' in game ' + gameId)
                // If reconnection timer expires, end the game
                userSocketMap[opponent].emit('opponentAbandoned')
                await gameService.setGameEnd(gameId, opponent, true)
            })
        }
        delete userSocketMap[userId]
    }
}

// Handle joining game by code
export function onJoinGameByCode(socket, data) {
    try {
        console.log('User ' + data.userId + ' joining game with code: ' + data.gameCode)
        userSocketMap[data.userId] = socket
        
        // Find the game by code and add the player
        const game = gameService.getGameByCode(data.gameCode)
        if (game && game.players.length === 1) {
            game.players.push(data.userId)
            game.boards[data.userId] = gameService.createEmptyBoard()
            
            // Notify both players that the game is ready
            const players = game.players
            players.forEach(player => {
                if (userSocketMap[player]) {
                    userSocketMap[player].emit('gameReady', { 
                        gameId: game.gameId,
                        gameCode: game.gameCode
                    })
                }
            })
            
            // Add online player tracking
            gameService.addOnlinePlayer(data.userId)
        } else {
            socket.emit('joinGameError', { error: 'Game not found or full' })
        }
    } catch (error) {
        console.error('Error joining game by code:', error)
        socket.emit('joinGameError', { error: 'Failed to join game' })
    }
}