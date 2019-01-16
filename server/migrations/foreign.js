import db from '../config/database';

/**
 * @name Foreign
 * @returns {array}
 * @description Add foreign keys to tables on database
 */
const Foreign = async () => {
	const client = await db.connect();
	try {
		const comments = `ALTER TABLE comments
			ADD FOREIGN KEY (questionid) REFERENCES public.questions (id) ON DELETE CASCADE;`;
		const questions = `ALTER TABLE questions
			ADD FOREIGN KEY (createdby) REFERENCES public.users (id) ON DELETE CASCADE, ADD FOREIGN KEY (meetup) REFERENCES public.meetups (id) ON DELETE CASCADE;`;
		await client.query(questions);
		await client.query(comments);
	} catch (error) {
		throw error;
	} finally {
		client.release();
	}
};
export default Foreign;
