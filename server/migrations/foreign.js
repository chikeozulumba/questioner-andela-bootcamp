import db from '../config/database';

/**
 * @name Foreign
 * @returns {array}
 * @description Add foreign keys to tables on database
 */
const Foreign = async () => {
	const client = await db.connect();
	try {
		const query = `ALTER TABLE comments
			ADD FOREIGN KEY (userid) REFERENCES public.users (id), ADD FOREIGN KEY (meetup) REFERENCES public.meetups (id);`;
		await client.query(query);
	} catch (error) {
		throw error;
	} finally {
		client.release();
	}
};
export default Foreign;
