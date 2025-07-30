import { Server } from 'socket.io'
import http from 'http'
import express from 'express'
import {onRandomGame, onShot, onPlaceShips, onDisconnect, onReconnectToGame, onJoinGameByCode} from './controller/gameWebsocket.js'
import {initializeDatabase, testConnection} from "./db.js";
import gameService from './service/gameService.js'
import cors from 'cors'

const app = express()
const server = http.createServer(app)
const port = process.env.PORT
app.use(cors({ origin: "http://localhost:3000"}))
app.use(express.json())

const io = new Server(server, {
    cors: {
        origin: '*'
    }
})

// Initialize database on startup
async function initializeApp() {
    try {
        await testConnection();
        await initializeDatabase();
        
        console.log('Application initialized successfully');
    } catch (error) {
        console.error('Failed to initialize application:', error);
        process.exit(1);
    }
}

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// Get player statistics
app.get("/api/player-history/:playerId", async (req, res) => {
    try {
        const { playerId } = req.params;
        const stats = await gameService.getPlayerGameHistory(playerId);
        res.status(200).json(stats);
    } catch (error) {
        console.error('Error getting player stats:', error);
        res.status(500).json({ error: "Failed to get player statistics" });
    }
});

io.on('connection', (socket) => {
    socket.on('randomGame', (data) => onRandomGame(socket, data))
    socket.on('placeShips', (data) => onPlaceShips(socket, data))
    socket.on('shot', (data) => onShot(socket, data))
    socket.on('reconnectToGame', (data) => onReconnectToGame(socket, data))
    socket.on('joinGameByCode', (data) => onJoinGameByCode(socket, data))
    socket.on('disconnect', () => onDisconnect(socket))
})

// Initialize and start server
initializeApp().then(() => {
    server.listen(port, () => {
        console.log(`Server running on port: ${port}`)
    })
}).catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
