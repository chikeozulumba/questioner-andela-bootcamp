import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
const pool = new Pool({
	user: process.env.PG_USER,
	host: process.env.PG_HOST,
	database: process.env.PG_DB,
	password: process.env.PG_PASSWORD,
	port: 5432,
	ssl: process.env.PG_SSL || false,
});

pool.on('error', (err) => {
	console.error('Fatall Error ==> Client is idle', err.stack);
	pool.end();
	process.exit(-1);
});

pool.on('connect', () => console.log('Connected to DB'));

export default pool;
