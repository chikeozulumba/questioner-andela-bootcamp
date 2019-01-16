import { prepareContent } from '../helpers/validate';
import { errorRxx, response2xx } from '../helpers/handlers';
import { date } from '../helpers/filters';
import Model from '../models/Meetup';

const meetups = 'meetups';
const rsvps = 'rsvps';

/**
 * Create Meetup Class
 */
class Meetup {
	/**
 * @name Create
 * @param {object} req
 * @param {object} res
 * @returns {object}
 * @description Create a meetup
 */
	static async create(req, res) {
		let payload = req.body;
		const params = {
			arrays: ['tags', 'images'],
		};
		payload = prepareContent(payload, params);
		payload.userid = 1;
		const MeetupQuery = new Model(payload);
		const create = await MeetupQuery.createMeetup();
		if (!create) return errorRxx(res, 500, 'Error in saving meetup, kindly try again.');
		return response2xx(res, 201, MeetupQuery.result);
	}

	/**
 * @name getRecord
 * @param {object} req
 * @param {object} res
 * @returns {object}
 * @description Return a specific record
 */
	static async getRecord(req, res) {
		const id = req.params.id;
		const MeetupQuery = new Model(id);
		const getMeetup = await MeetupQuery.getMeetupById();
		if (!getMeetup) return errorRxx(res, 500, 'Error in retrieving meetup, try again.');
		if (MeetupQuery.result.length === 0) return errorRxx(res, 404, 'Meetup record not available.');
		return response2xx(res, 200, MeetupQuery.result[0]);
	}

	/**
 * @name getAllRecords
 * @param {object} req
 * @param {object} res
 * @returns {object}
 * @description Return all meetup records
 */
	static async getAllRecords(req, res) {
		const MeetupQuery = new Model();
		const getAllMeetup = await MeetupQuery.getAllMeetups();
		if (!getAllMeetup) return errorRxx(res, 500, 'Error in retrieving all meetups, try again.');
		return response2xx(res, 200, MeetupQuery.result);
	}

	/**
 * @name rsvp
 * @param {object} req
 * @param {object} res
 * @returns {object}
 * @description RSVP for a meetup
 */
	static async rsvp(req, res) {
		const user = req.user.id;
		const MeetupQuery = new Model(req.params.id);
		const getMeetup = await MeetupQuery.getMeetupById();
		if (!getMeetup) return errorRxx(res, 500, 'Error in retrieving meetup, try again.');
		if (MeetupQuery.result.length === 0) return errorRxx(res, 404, 'Meetup record not available.');
		if (req.rsvpErrors) return errorRxx(res, 400, req.rsvErrorMsg);
		MeetupQuery.payload = req.body;
		const createRSVP = await MeetupQuery.rsvpMeetup(req.params.id, user);
		if (MeetupQuery.error !== null) return errorRxx(res, 500, 'An error occured while processing your RSVP.');
		if (!createRSVP && MeetupQuery.exists) return errorRxx(res, 409, 'You are already on RSVP for this event.');
		return response2xx(res, 201, MeetupQuery.result);
	}

	/**
 * @name upcoming
 * @param {object} req
 * @param {object} res
 * @returns {object}
 * @description Return all upcoming meetup records
 */
	static async upcoming(req, res) {
		const MeetupQuery = new Model();
		const results = await MeetupQuery.getAllMeetups();
		if (!results) return errorRxx(res, 500, 'Error in retrieving meetup, try again.');
		const formatByDateAsc = date(MeetupQuery.result);
		return response2xx(res, 200, formatByDateAsc);
	}
}

export default Meetup;
