/* eslint-disable max-len */
import db from '../config/database';
import { hashPassword } from '../helpers/auth';

/**
 * @name Meetup
 * @returns {array}
 * @description Create Meetup table on database
 */
const Seeders = async () => {
	const client = await db.connect();
	try {
		const users = 'INSERT INTO users(firstname, lastname, email, phone, password) VALUES($1, $2, $3, $4, $5)';
		const meetups = 'INSERT INTO meetups(userid, topic, location, tags, images, happeningOn) VALUES($1, $2, $3, $4, $5, $6)';
		const questions = 'INSERT INTO questions(title, body, meetup, createdBy, upvotes, downvotes) VALUES($1, $2, $3, $4, $5, $6)';
		const rsvps = 'INSERT INTO rsvps(meetup, user_id, response) VALUES($1, $2, $3)';
		const comments = 'INSERT INTO comments(userid, meetup, question, comment) VALUES($1, $2, $3, $4)';

		// USERS
		await client.query(users, ['Chike', 'Ozulumba', 'cheikkk@gmail.com', '+2348131976306', hashPassword('AdakuNwanne')]);
		await client.query(users, ['Amaka', 'Ozulumba', 'amaka@gmail.com', '+2348033031605', hashPassword('AdakuNwanne')]);

		// MEETUPS
		await client.query(meetups, [1, 'Kubernetes Conference Tech Zone', 'Lagos', ['api, endpoints'], ['http://localhost:5100/api/v1/image.png'], 'Monday, 31st March 2018']);
		await client.query(meetups, [2, 'Javascript Learning', 'Abuja', ['ES6, Babel'], ['http://localhost:5100/api/v1/image.png'], 'Tuesday, 31st April 2018']);

		// QUESTIONS
		await client.query(questions, ['What is Javascript?', 'You should normally use only the derived, result-specific methods for executing queries, all of which are named according to how many rows of data the query is expected to return', 1, 1, [1], [2]]);
		await client.query(questions, ['What is Kubernetes?', 'You should normally use only the derived, result-specific methods for executing queries, all of which are named according to how many rows of data the query is expected to return', 2, 2, [], [2, 1]]);

		// RSVPS
		await client.query(rsvps, [1, 2, 'yes']);
		await client.query(rsvps, [2, 1, 'yes']);

		// COMMENTS
		await client.query(comments, [1, 2, 1, 'You should normally use only the derived']);
		await client.query(comments, [2, 1, 2, 'You should normally use only the derived']);
	} catch (error) {
		throw error;
	} finally {
		client.release();
	}
};
export default Seeders;
