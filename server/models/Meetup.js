import db from '../config/database';
import { createNewMeetup, getMeetupByID, getAllMeetups } from './index';

export default class Meetup {
	constructor(payload = null) {
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

	async getMeetupById() {
		try {
			const { rows } = await db.query(getMeetupByID, [this.payload]);
			this.result = rows;
			return true;
		} catch (error) {
			this.error = error.stack;
			return false;
		}
	}

	async getAllMeetups() {
		try {
			const { rows } = await db.query(getAllMeetups);
			this.result = rows;
			return true;
		} catch (error) {
			this.error = error.stack;
			return false;
		}
	}
}
