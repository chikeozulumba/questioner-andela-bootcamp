import db from '../config/database';

/**
 * @name Meetup
 * @returns {array}
 * @description Create Meetup table on database
 */
const Question = async () => {
	const client = await db.connect();
	try {
		const query = `CREATE TABLE IF NOT EXISTS questions (
          id SERIAL UNIQUE, 
          createdBy INTEGER NOT NULL, 
          meetup INTEGER NOT NULL, 
          title VARCHAR(255) NOT NULL, 
          body TEXT NOT NULL, 
          votes INTEGER DEFAULT 0, 
          upvotes INTEGER [],
          downvotes INTEGER [],
          comments TEXT [],
          createdOn TIMESTAMPTZ DEFAULT NOW(), 
          PRIMARY KEY(id)
      );`;
		await client.query(query);
		console.info('Created QUESTIONS tables');
	} catch (error) {
		throw error;
	} finally {
		client.release();
	}
};
export default Question;
