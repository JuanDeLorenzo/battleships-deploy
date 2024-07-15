import { Server } from 'socket.io'
import http from 'http'
import express from 'express'
import {onRandomGame, onShot, onPlaceShips, onDisconnect} from './controller/gameWebsocket.js'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*'
    }
})

io.on('connection', (socket) => {
    socket.on('randomGame', (data) => onRandomGame(socket, data))
    socket.on('placeShips', (data) => onPlaceShips(socket, data))
    socket.on('shot', (data) => onShot(socket, data))
    socket.on('disconnect', () => onDisconnect(socket))

})
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log('Socket.io is running')
})
