import db from '../config/database';

/**
 * @name Comment
 * @returns {array}
 * @description Create User table on database
 */
const Comment = async () => {
	const client = await db.connect();
	try {
		const query = `CREATE TABLE IF NOT EXISTS comments (
          id SERIAL UNIQUE, 
          userid INTEGER NOT NULL, 
          meetup INTEGER NOT NULL, 
          comment TEXT NOT NULL,
          createdon TIMESTAMPTZ DEFAULT NOW(),
          PRIMARY KEY(id)
      );`;
		await client.query(query);
	} catch (error) {
		throw error;
	} finally {
		client.release();
	}
};
export default Comment;
