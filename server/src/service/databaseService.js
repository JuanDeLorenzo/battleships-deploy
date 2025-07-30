import { pool } from '../db.js';

class DatabaseService {

    // Save completed game to history
    async saveGame(gameData) {
        const {
            game_id,
            player1_id,
            player2_id,
            winner_id,
            abandoned,
            game_date,
            game_duration,
            accuracy_player1,
            accuracy_player2
        } = gameData;

        try {
            const query = `
                INSERT INTO games 
                (game_id, player1_id, player2_id, winner_id, abandoned, game_date, game_duration, accuracy_player1, accuracy_player2)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                RETURNING id
            `;
            
            const values = [game_id, player1_id, player2_id, winner_id, abandoned, game_date, game_duration, accuracy_player1, accuracy_player2];
            await pool.query(query, values);
            
        } catch (error) {
            console.error('Error saving game history:', error);
            throw error;
        }
    }

    // Get player statistics
    async getPlayerHistory(playerId) {
        try {
            const query = 'SELECT * FROM games WHERE player1_id = $1 OR player2_id = $1 ORDER BY game_date DESC';
            const result = await pool.query(query, [playerId]);
            return result.rows;
        } catch (error) {
            console.error('Error getting player stats:', error);
            throw error;
        }
    }

}

const databaseService = new DatabaseService();
export default databaseService; 