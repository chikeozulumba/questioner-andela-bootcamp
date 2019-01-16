import db from '../config/database';
import { createNewUser, getUserByEmail } from './index';
import { hashPassword, generateToken } from '../helpers/auth';

export default class User {
	constructor(payload) {
		this.payload = payload;
		this.result = null;
		this.error = null;
	}

	async createNewUser() {
		const {
			firstName, lastName, email, phone, password,
		} = this.payload;
		const values = [firstName, lastName, email, phone, hashPassword(password)];
		try {
			const { rows } = await db.query(createNewUser, values);
			this.result = rows[0];
			this.result.token = generateToken(this.result.id);
			return true;
		} catch (error) {
			this.error = error.stack;
			return false;
		}
	}

	async getUserByEmail() {
		const email = this.payload.email;
		try {
			const { rows, rowCount } = await db.query(getUserByEmail, [email]);
			this.result = rows;
			this.rowCount = rowCount;
			return true;
		} catch (error) {
			this.error = error.stack;
			return false;
		}
	}
}
