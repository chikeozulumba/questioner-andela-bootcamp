import db from '../config/database';

/**
 * @name Meetup
 * @returns {array}
 * @description Create Meetup table on database
 */
const Meetup = async () => {
	const client = await db.connect();
	try {
		const query = `CREATE TABLE IF NOT EXISTS meetups (
          id SERIAL UNIQUE, 
          topic VARCHAR(255) NOT NULL, 
          location VARCHAR(255) NOT NULL, 
          images TEXT [], 
          tags TEXT [], 
          happeningOn VARCHAR(255) NOT NULL,
          createdOn TIMESTAMPTZ DEFAULT NOW(), 
          PRIMARY KEY(id)
      );`;
		await client.query(query);
		console.info('Created MEETUPS tables');
	} catch (error) {
		throw error;
	} finally {
		client.release();
	}
};
export default Meetup;
