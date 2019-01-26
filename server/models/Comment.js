import db from '../config/database';
import {
	createNewComment, getCommentByID, updateComment, deleteComment, getCommentByIDwithUser,
} from './index';

export default class Comment {
	constructor(payload = null) {
		this.payload = payload;
		this.result = null;
		this.error = null;
		this.exists = null;
	}

	async createComment() {
		const {
			questionid, userid, comment, meetup,
		} = this.payload;
		const values = [userid, meetup, parseInt(questionid, 10), comment];
		try {
			const { rows } = await db.query(createNewComment, values);
			this.result = rows[0];
			return true;
		} catch (error) {
			this.error = error.stack;
			return false;
		}
	}

	async updateComment(comment, user) {
		try {
			const { rows } = await db.query(updateComment(comment, this.payload, user));
			this.result = rows;
			return true;
		} catch (error) {
			this.error = error.stack;
			return false;
		}
	}

	async getCommentById(user = null) {
		try {
			const query = getCommentByID;
			const values = [this.payload];
			const { rows } = await db.query(query, values);
			this.result = rows;
			return true;
		} catch (error) {
			this.error = error.stack;
			return false;
		}
	}

	async getCommentByIDwithUser(user = null) {
		try {
			const query = getCommentByIDwithUser;
			const values = [this.payload, user];
			const { rows } = await db.query(query, values);
			this.result = rows;
			return this.result;
		} catch (error) {
			this.error = error.stack;
			return false;
		}
	}

	async deleteComment() {
		try {
			const { rows } = await db.query(deleteComment, [this.payload]);
			this.result = rows;
			return true;
		} catch (error) {
			this.error = error.stack;
			return false;
		}
	}
}
