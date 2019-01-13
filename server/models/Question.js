import db from '../config/database';
import {
	createNewQuestion, getQuestionByID, checkIfUpvoted, checkIfDownvoted, addVote, removeVote,
} from './index';

export default class Question {
	constructor(payload = null) {
		this.payload = payload;
		this.result = null;
		this.error = null;
		this.exists = null;
	}

	async createQuestion() {
		const {
			title, body, meetup, createdBy,
		} = this.payload;

		const values = [title, body, meetup, createdBy];
		try {
			const { rows } = await db.query(createNewQuestion, values);
			this.result = rows[0];
			return true;
		} catch (error) {
			this.error = error.stack;
			return false;
		}
	}

	async getQuestionById() {
		try {
			const { rows } = await db.query(getQuestionByID, [this.payload]);
			this.result = rows;
			return true;
		} catch (error) {
			this.error = error.stack;
			return false;
		}
	}

	async upVote(user) {
		try {
			const { rows } = await db.query(checkIfDownvoted, [user, this.payload]);
			if (rows.length > 0) await db.query(removeVote('downvotes', user, this.payload));
			const votes = await db.query(addVote('upvotes', user, this.payload));
			this.result = votes.rows[0];
			return true;
		} catch (error) {
			this.error = error.stack;
			return false;
		}
	}

	async downVote(user) {
		try {
			const { rows } = await db.query(checkIfUpvoted, [user, this.payload]);
			if (rows.length > 0) await db.query(removeVote('upvotes', user, this.payload));
			const votes = await db.query(addVote('downvotes', user, this.payload));
			this.result = votes.rows[0];
			return true;
		} catch (error) {
			this.error = error.stack;
			return false;
		}
	}
}
