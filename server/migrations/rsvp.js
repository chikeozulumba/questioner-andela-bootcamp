import db from '../config/database';

/**
 * @name Meetup
 * @returns {array}
 * @description Create Meetup table on database
 */
const RSVP = async () => {
	const client = await db.connect();
	try {
		const query = `CREATE TABLE IF NOT EXISTS rsvps (
          id SERIAL UNIQUE, 
          meetup INTEGER NOT NULL, 
          user_id INTEGER NOT NULL, 
					response VARCHAR(255) NOT NULL,
					timestamp TIMESTAMPTZ DEFAULT NOW(), 
          PRIMARY KEY(id, meetup)
      );`;
		await client.query(query);
	} catch (error) {
		throw error;
	} finally {
		client.release();
	}
};
export default RSVP;
