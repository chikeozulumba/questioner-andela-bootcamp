import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
const connectionString = process.env.PG_URI;
const pool = new Pool({
	connectionString,
});

// Handle connection error
pool.on('error', (err) => {
	console.error('Fatall Error ==> Client is idle', err.stack);
	// Halt pool
	pool.end();
	process.exit(-1);
});

/**
 * Handle database successful connection
 */
pool.on('connect', () => console.log('Database started!'));
export default pool;
