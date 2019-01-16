import db from '../config/database';
import {
	createNewComment, getCommentByID, updateComment, deleteComment,
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
			id, user, comment, meetup,
		} = this.payload;

		const values = [id, user, meetup, comment];
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
			this.result = rows[0];
			return true;
		} catch (error) {
			this.error = error.stack;
			return false;
		}
	}

	async getCommentById() {
		try {
			const { rows } = await db.query(getCommentByID, [this.payload]);
			this.result = rows;
			return true;
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
