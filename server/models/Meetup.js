import db from '../config/database';
import {
	createNewMeetup, getMeetupByID, getAllMeetups, createRSVP, deleteMeetup, updateTags,
} from './index';

export default class Meetup {
	constructor(payload = null) {
		this.payload = payload;
		this.result = null;
		this.error = null;
		this.exists = null;
	}

	async createMeetup() {
		const {
			userid, topic, location, tags, images, happeningOn,
		} = this.payload;

		const values = [userid, topic, location, tags, images, happeningOn];
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

	async rsvpMeetup(meetupId, userId) {
		const {
			response,
		} = this.payload;
		const values = [meetupId, userId, response];
		const userHasActed = await this.userHasActed(meetupId, userId, 'rsvps', 'user_id', 'meetup');
		if (userHasActed === 1) {
			this.exists = true;
			return false;
		}
		try {
			const { rows } = await db.query(createRSVP, values);
			this.result = rows;
			return true;
		} catch (error) {
			this.error = error.stack;
			return false;
		}
	}

	async userHasActed(meetupId, userId, table, field, compare) {
		const queryString = `SELECT * FROM ${table} WHERE ${field} = $1 AND ${compare} = $2`;
		try {
			const { rows } = await db.query(queryString, [parseInt(userId, 10), parseInt(meetupId, 10)]);
			if (rows.length > 0) return 1;
			return true;
		} catch (error) {
			this.error = error.stack;
			return false;
		}
	}

	async deleteMeetup() {
		try {
			const { rows } = await db.query(deleteMeetup, [this.payload]);
			this.result = rows;
			return true;
		} catch (error) {
			this.error = error.stack;
			return false;
		}
	}

	async updateTags(tags) {
		try {
			const { rows } = await db.query(updateTags, [tags, this.payload]);
			this.result = rows;
			return true;
		} catch (error) {
			this.error = error.stack;
			return false;
		}
	}
}
