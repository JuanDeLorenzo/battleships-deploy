import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config();

export const pool = new pg.Pool({
    user: process.env.POSTGRES_USER || 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    database: process.env.POSTGRES_DB || 'battleships',
    password: process.env.POSTGRES_PASSWORD || 'password',
    port: process.env.POSTGRES_PORT || 5432,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

// Initialize database tables
export async function initializeDatabase() {
    try {
        await pool.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');

        // Create active_games table for storing ongoing games
        await pool.query(`
            CREATE TABLE IF NOT EXISTS games (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                game_id VARCHAR(255) NOT NULL UNIQUE,
                player1_id VARCHAR(255) NOT NULL,
                player2_id VARCHAR(255) NOT NULL,
                winner_id VARCHAR(255) NOT NULL,
                abandoned BOOLEAN NOT NULL,
                game_date TIMESTAMP NOT NULL,
                game_duration INTERVAL NOT NULL,
                accuracy_player1 FLOAT NOT NULL,
                accuracy_player2 FLOAT NOT NULL
            )
        `);

        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
}

// Test database connection
export async function testConnection() {
    try {
        const client = await pool.connect();
        await client.query('SELECT NOW()');
        client.release();
        console.log('Database connection successful');
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
}