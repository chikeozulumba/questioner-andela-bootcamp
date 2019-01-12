import db from '../config/database';
import { createNewMeetup } from './index';

export default class Meetup {
	constructor(payload) {
		this.payload = payload;
		this.result = null;
		this.error = null;
	}

	async createMeetup() {
		const {
			topic, location, tags, images, happeningOn,
		} = this.payload;

		const values = [topic, location, tags, images, happeningOn];
		try {
			const { rows } = await db.query(createNewMeetup, values);
			this.result = rows[0];
			return true;
		} catch (error) {
			this.error = error.stack;
			return false;
		}
	}
}
