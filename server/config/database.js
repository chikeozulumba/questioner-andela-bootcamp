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

pool.on('connect', () => console.log('#DB CONNECTED#'));

export default pool;
