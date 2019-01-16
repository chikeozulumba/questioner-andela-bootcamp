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
			ADD FOREIGN KEY (question) REFERENCES public.questions (id), ADD FOREIGN KEY (meetup) REFERENCES public.meetups (id), ADD FOREIGN KEY (userid) REFERENCES public.users (id) ON DELETE CASCADE;`;
		const questions = `ALTER TABLE questions
			ADD FOREIGN KEY (createdby) REFERENCES public.users (id), ADD FOREIGN KEY (meetup) REFERENCES public.meetups (id) ON DELETE CASCADE;`;
		const rsvps = `ALTER TABLE rsvps
			ADD FOREIGN KEY (user_id) REFERENCES public.users (id), ADD FOREIGN KEY (meetup) REFERENCES public.meetups (id) ON DELETE CASCADE;`;
		const meetups = `ALTER TABLE meetups
			ADD FOREIGN KEY (userid) REFERENCES public.users (id) ON DELETE CASCADE;`;
		await client.query(meetups);
		await client.query(questions);
		await client.query(comments);
		await client.query(rsvps);
	} catch (error) {
		throw error;
	} finally {
		client.release();
	}
};
export default Foreign;
