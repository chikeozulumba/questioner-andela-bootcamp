import db from '../config/database';

// Create Users Table
const User = async () => {
	const client = await db.connect();
	try {
		const query = `CREATE TABLE IF NOT EXISTS users (
          user_id SERIAL UNIQUE,
          firstname VARCHAR NOT NULL,
          lastname VARCHAR NOT NULL,
          email VARCHAR NOT NULL,
          hashpassword VARCHAR NOT NULL, 
          user_role VARCHAR NOT NULL, 
          PRIMARY KEY(user_id, email)
      );`;

		await client.query(query);
	} catch (e) {
		throw e;
	} finally {
		client.release();
	}
};
export default User;
