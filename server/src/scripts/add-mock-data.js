import { pool } from '../db.js';
import { v4 as uuidv4 } from 'uuid';

const TEST_USER_ID = 'user_2g4cBEMc5Crqs4uB47N3e9wJxyT';

async function addMockData() {
    try {
        console.log('Adding mock data for user:', TEST_USER_ID);

        // Add mock player stats
        await pool.query(`
            INSERT INTO player_stats 
            (player_id, games_played, games_won, games_lost, games_abandoned, total_shots, hits, accuracy, average_game_duration)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            ON CONFLICT (player_id) DO UPDATE SET
                games_played = EXCLUDED.games_played,
                games_won = EXCLUDED.games_won,
                games_lost = EXCLUDED.games_lost,
                games_abandoned = EXCLUDED.games_abandoned,
                total_shots = EXCLUDED.total_shots,
                hits = EXCLUDED.hits,
                accuracy = EXCLUDED.accuracy,
                average_game_duration = EXCLUDED.average_game_duration
        `, [
            TEST_USER_ID,
            15, // games_played
            10, // games_won
            4,  // games_lost
            1,  // games_abandoned
            150, // total_shots
            120, // hits
            80.00, // accuracy (80%)
            900 // average_game_duration (15 minutes in seconds)
        ]);

        // Add mock game history
        const mockGames = [
            {
                game_id: uuidv4(),
                player1_id: TEST_USER_ID,
                player2_id: 'opponent_1',
                winner_id: TEST_USER_ID,
                game_duration: 720, // 12 minutes
                abandoned: false,
                board_state: { shots: 15, hits: 12, accuracy: 80 }
            },
            {
                game_id: uuidv4(),
                player1_id: 'opponent_2',
                player2_id: TEST_USER_ID,
                winner_id: TEST_USER_ID,
                game_duration: 600, // 10 minutes
                abandoned: false,
                board_state: { shots: 12, hits: 10, accuracy: 83 }
            },
            {
                game_id: uuidv4(),
                player1_id: TEST_USER_ID,
                player2_id: 'opponent_3',
                winner_id: 'opponent_3',
                game_duration: 900, // 15 minutes
                abandoned: false,
                board_state: { shots: 18, hits: 14, accuracy: 78 }
            },
            {
                game_id: uuidv4(),
                player1_id: 'opponent_4',
                player2_id: TEST_USER_ID,
                winner_id: TEST_USER_ID,
                game_duration: 480, // 8 minutes
                abandoned: false,
                board_state: { shots: 10, hits: 9, accuracy: 90 }
            },
            {
                game_id: uuidv4(),
                player1_id: TEST_USER_ID,
                player2_id: 'opponent_5',
                winner_id: TEST_USER_ID,
                game_duration: 1200, // 20 minutes
                abandoned: false,
                board_state: { shots: 20, hits: 17, accuracy: 85 }
            }
        ];

        for (const game of mockGames) {
            await pool.query(`
                INSERT INTO game_history 
                (game_id, player1_id, player2_id, winner_id, game_duration, abandoned, board_state, created_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            `, [
                game.game_id,
                game.player1_id,
                game.player2_id,
                game.winner_id,
                game.game_duration,
                game.abandoned,
                JSON.stringify(game.board_state),
                new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) // Random date within last week
            ]);
        }

        // Add some opponent stats too
        const opponents = ['opponent_1', 'opponent_2', 'opponent_3', 'opponent_4', 'opponent_5'];
        for (const opponentId of opponents) {
            await pool.query(`
                INSERT INTO player_stats 
                (player_id, games_played, games_won, games_lost, games_abandoned, total_shots, hits, accuracy, average_game_duration)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                ON CONFLICT (player_id) DO NOTHING
            `, [
                opponentId,
                Math.floor(Math.random() * 20) + 5, // 5-25 games
                Math.floor(Math.random() * 15) + 2,  // 2-17 wins
                Math.floor(Math.random() * 10) + 1,  // 1-11 losses
                0, // no abandoned games
                Math.floor(Math.random() * 200) + 50, // 50-250 shots
                Math.floor(Math.random() * 160) + 40, // 40-200 hits
                Math.floor(Math.random() * 30) + 60,  // 60-90% accuracy
                Math.floor(Math.random() * 600) + 300  // 5-15 minutes average
            ]);
        }

        console.log('✅ Mock data added successfully!');
        console.log('Test user ID:', TEST_USER_ID);
        console.log('You can now test the UI with this user ID');

    } catch (error) {
        console.error('❌ Error adding mock data:', error);
        throw error;
    } finally {
        await pool.end();
    }
}

// Run the script
addMockData().catch(console.error); 