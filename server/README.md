# Battleships Game Server

A real-time battleships game server with game history tracking and player statistics.

## Features

- Real-time multiplayer battleships game
- Game history tracking
- Player statistics and leaderboards
- PostgreSQL database for persistent storage
- WebSocket communication for real-time gameplay

## Database Schema

### game_history
Stores completed games with detailed information:
- `id`: UUID primary key
- `game_id`: Original game identifier
- `player1_id`, `player2_id`: Player identifiers
- `winner_id`: Winner's player ID (null if abandoned)
- `game_duration`: Game duration in seconds
- `abandoned`: Boolean flag for abandoned games
- `created_at`, `completed_at`: Timestamps
- `board_state`: JSON containing final board states and statistics

### player_stats
Tracks player performance statistics:
- `player_id`: Player identifier (primary key)
- `games_played`, `games_won`, `games_lost`, `games_abandoned`: Game counts
- `total_shots`, `hits`: Shot statistics
- `accuracy`: Hit percentage
- `average_game_duration`: Average game time
- `last_played`, `created_at`: Timestamps

## API Endpoints

### Health Check
- `GET /health` - Server health status

### Player Statistics
- `GET /api/player/:playerId/stats` - Get player statistics
- `GET /api/player/:playerId/history?limit=10` - Get player game history

### Game History
- `GET /api/games/recent?limit=20` - Get recent games
- `GET /api/leaderboard?limit=10` - Get leaderboard

## WebSocket Events

### Client to Server
- `randomGame` - Join random game queue
- `placeShips` - Place ships on board
- `shot` - Make a shot

### Server to Client
- `gameReady` - Game is ready to start
- `shipsPlaced` - All ships have been placed
- `turnUpdate` - Turn status update
- `shotResult` - Result of a shot
- `gameEnd` - Game has ended
- `opponentDisconnect` - Opponent disconnected
- `setShipsTimedOut` - Ship placement timeout

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   POSTGRES_USER=your_user
   POSTGRES_PASSWORD=your_password
   POSTGRES_DB=battleships
   POSTGRES_PORT=5432
   PORT=5800
   ```

3. Initialize database:
   ```bash
   npm run init-db
   ```

4. Start the server:
   ```bash
   npm start
   ```

## Development

- `npm run dev` - Start with auto-reload
- `npm run init-db` - Initialize database tables
- `npm test` - Run tests

## Architecture

- **In-Memory Games**: Active games are stored in memory for performance
- **Database History**: Completed games are saved to PostgreSQL
- **Statistics Tracking**: Player performance is tracked and updated in real-time
- **WebSocket Communication**: Real-time game updates via Socket.IO

## Game Flow

1. Player joins random game queue
2. When two players are matched, game starts
3. Players place ships within 60 seconds
4. Game begins with turn-based shooting
5. Game ends when all ships are sunk or player disconnects
6. Game data is saved to database with statistics 