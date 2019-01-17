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
		const admin = 'INSERT INTO users(firstname, lastname, email, phone, password, isadmin) VALUES($1, $2, $3, $4, $5, $6)';
		const meetups = 'INSERT INTO meetups(userid, topic, location, tags, images, happeningOn) VALUES($1, $2, $3, $4, $5, $6)';
		const questions = 'INSERT INTO questions(title, body, meetup, createdBy, upvotes, downvotes) VALUES($1, $2, $3, $4, $5, $6)';
		const rsvps = 'INSERT INTO rsvps(meetup, user_id, response) VALUES($1, $2, $3)';

		// USERS
		await client.query(users, ['Chike', 'Ozulumba', 'cheikkk@gmail.com', '+2348131976306', hashPassword('AdakuNwanne')]);
		await client.query(users, ['Amaka', 'Ozulumba', 'amaka@gmail.com', '+2348033031605', hashPassword('AdakuNwanne')]);
		await client.query(users, ['chike', 'Ozulumba', 'chike@gmail.com', '+2348033031605', hashPassword('AdakuNwanne')]);
		await client.query(users, ['adaku', 'Ozulumba', 'adaku@gmail.com', '+2348033031605', hashPassword('AdakuNwanne')]);
		await client.query(admin, ['Dike', 'Chinwe Ozulumba', 'chinwe@gmail.com', '+2348064649536', hashPassword('TochiOzulumba'), true]);
		await client.query(admin, ['Kosi', 'Ozulumba', 'kosi@gmail.com', '+2348064649536', hashPassword('TochiOzulumba'), true]);
		await client.query(admin, ['Chiko', 'Ozulumba', 'chiko@gmail.com', '+2348064649536', hashPassword('TochiOzulumba'), true]);
		await client.query(admin, ['Eva', 'Ezeoke', 'eva@gmail.com', '+2348064649536', hashPassword('TochiOzulumba'), true]);

		// MEETUPS
		await client.query(meetups, [1, 'Kubernetes Conference Tech Zone', 'Lagos', ['api', 'endpoints'], ['http://localhost:5100/api/v1/image.png'], 'Monday, 31st March 2018']);
		await client.query(meetups, [2, 'Javascript Learning', 'Abuja', ['ES6', 'Babel'], ['http://localhost:5100/api/v1/image.png'], 'Tuesday, 31st April 2018']);
		await client.query(meetups, [3, 'Javascript Learning', 'Abuja', ['ES6', 'Babel'], ['http://localhost:5100/api/v1/image.png'], 'Tuesday, 31st April 2018']);
		await client.query(meetups, [4, 'Javascript Learning', 'Abuja', ['ES6', 'Babel'], ['http://localhost:5100/api/v1/image.png'], 'Tuesday, 31st April 2018']);
		await client.query(meetups, [5, 'Javascript Learning', 'Abuja', ['ES6', 'Babel'], ['http://localhost:5100/api/v1/image.png'], 'Tuesday, 31st April 2018']);

		// QUESTIONS
		await client.query(questions, ['What is Javascript?', 'You should normally use only the derived, result-specific methods for executing queries, all of which are named according to how many rows of data the query is expected to return', 1, 1, [1], [2]]);
		await client.query(questions, ['What is Kubernetes?', 'You should normally use only the derived, result-specific methods for executing queries, all of which are named according to how many rows of data the query is expected to return', 2, 2, [], [2, 1]]);
		await client.query(questions, ['What is Big O?', 'You should normally use only the derived, result-specific methods for executing queries, all of which are named according to how many rows of data the query is expected to return', 2, 2, [], [2, 1]]);
		await client.query(questions, ['What is GCP?', 'You should normally use only the derived, result-specific methods for executing queries, all of which are named according to how many rows of data the query is expected to return', 2, 2, [], [2, 1]]);
		await client.query(questions, ['What is AWS?', 'You should normally use only the derived, result-specific methods for executing queries, all of which are named according to how many rows of data the query is expected to return', 2, 2, [], [2, 1]]);
		await client.query(questions, ['What is DOCKER?', 'You should normally use only the derived, result-specific methods for executing queries, all of which are named according to how many rows of data the query is expected to return', 2, 2, [], [2, 1]]);
		await client.query(questions, ['What is Ubuntu?', 'You should normally use only the derived, result-specific methods for executing queries, all of which are named according to how many rows of data the query is expected to return', 2, 2, [], [2, 1]]);

		// RSVPS
		await client.query(rsvps, [1, 2, 'yes']);
		await client.query(rsvps, [2, 1, 'yes']);
		await client.query(rsvps, [2, 1, 'yes']);
		await client.query(rsvps, [3, 1, 'yes']);
		await client.query(rsvps, [3, 1, 'yes']);
		await client.query(rsvps, [3, 1, 'yes']);
		await client.query(rsvps, [4, 1, 'yes']);
		await client.query(rsvps, [5, 1, 'yes']);
		await client.query(rsvps, [3, 1, 'yes']);
		await client.query(rsvps, [4, 1, 'yes']);
		await client.query(rsvps, [5, 1, 'yes']);
		await client.query(rsvps, [3, 1, 'yes']);
		await client.query(rsvps, [4, 1, 'yes']);
		await client.query(rsvps, [5, 1, 'yes']);
		await client.query(rsvps, [3, 1, 'yes']);
		await client.query(rsvps, [4, 1, 'yes']);
		await client.query(rsvps, [5, 1, 'yes']);

		// COMMENTS
		const comments = 'INSERT INTO comments(userid, meetupid, questionid, comment) VALUES($1, $2, $3, $4)';
		await client.query(comments, [1, 2, 1, 'You should normally use only the derived']);
		await client.query(comments, [2, 1, 2, 'You should normally use only the derived']);
		await client.query(comments, [2, 1, 2, 'You should normally use only the derived']);
		await client.query(comments, [2, 1, 2, 'You should normally use only the derived']);
		await client.query(comments, [2, 1, 2, 'You should normally use only the derived']);
		await client.query(comments, [3, 1, 2, 'You should normally use only the derived']);
		await client.query(comments, [3, 1, 2, 'You should normally use only the derived']);
		await client.query(comments, [3, 1, 2, 'You should normally use only the derived']);
		await client.query(comments, [3, 1, 2, 'You should normally use only the derived']);
		await client.query(comments, [3, 1, 2, 'You should normally use only the derived']);
		await client.query(comments, [3, 1, 2, 'You should normally use only the derived']);
		await client.query(comments, [3, 1, 2, 'You should normally use only the derived']);
		await client.query(comments, [4, 1, 2, 'You should normally use only the derived']);
		await client.query(comments, [5, 1, 2, 'You should normally use only the derived']);
		await client.query(comments, [4, 1, 2, 'You should normally use only the derived']);
		await client.query(comments, [5, 1, 2, 'You should normally use only the derived']);
		await client.query(comments, [4, 1, 2, 'You should normally use only the derived']);
		await client.query(comments, [5, 1, 2, 'You should normally use only the derived']);
		await client.query(comments, [4, 1, 2, 'You should normally use only the derived']);
		await client.query(comments, [4, 1, 2, 'You should normally use only the derived']);
		await client.query(comments, [5, 1, 2, 'You should normally use only the derived']);
		await client.query(comments, [7, 1, 2, 'You should normally use only the derived']);
		await client.query(comments, [7, 1, 2, 'You should normally use only the derived']);
		await client.query(comments, [7, 1, 2, 'You should normally use only the derived']);
		await client.query(comments, [7, 1, 2, 'You should normally use only the derived']);
		await client.query(comments, [6, 1, 2, 'You should normally use only the derived']);
		await client.query(comments, [6, 1, 2, 'You should normally use only the derived']);
		await client.query(comments, [6, 1, 2, 'You should normally use only the derived']);
		await client.query(comments, [6, 1, 2, 'You should normally use only the derived']);
		await client.query(comments, [8, 1, 2, 'You should normally use only the derived']);
		await client.query(comments, [8, 1, 2, 'You should normally use only the derived']);
		await client.query(comments, [8, 1, 2, 'You should normally use only the derived']);
		await client.query(comments, [8, 1, 2, 'You should normally use only the derived']);
		await client.query(comments, [8, 1, 2, 'You should normally use only the derived']);
	} catch (error) {
		throw error;
	} finally {
		client.release();
	}
};
export default Seeders;
