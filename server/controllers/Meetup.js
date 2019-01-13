import { prepareContent } from '../helpers/validate';
import { errorRxx, response2xx } from '../helpers/handlers';
import Query from '../helpers/query';
import Filters from '../helpers/filters';
import MeetupModel from '../models/Meetup';

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
		const MeetupQuery = new MeetupModel(payload);
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
		const MeetupQuery = new MeetupModel(id);
		const getMeetup = await MeetupQuery.getMeetupById();
		if (!getMeetup) return errorRxx(res, 500, 'Error in retrieving meetup, try again.');
		if (MeetupQuery.result.length === 0) return errorRxx(res, 404, 'Meetup record not available.');
		return response2xx(res, 200, MeetupQuery.result);
	}

	/**
 * @name getAllRecords
 * @param {object} req
 * @param {object} res
 * @returns {object}
 * @description Return all meetup records
 */
	static async getAllRecords(req, res) {
		const MeetupQuery = new MeetupModel();
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
		const MeetupQuery = new MeetupModel(req.params.id);
		const getMeetup = await MeetupQuery.getMeetupById();
		// return console.log(MeetupQuery.result)
		if (!getMeetup) return errorRxx(res, 500, 'Error in retrieving meetup, try again.');
		if (MeetupQuery.result.length === 0) return errorRxx(res, 404, 'Meetup record not available.');
		MeetupQuery.payload = req.body;
		const createRSVP = await MeetupQuery.rsvpMeetup(req.params.id, 8);
		if (!createRSVP && MeetupQuery.exists) return errorRxx(res, 403, 'You are already on RSVP for this event.');
		return response2xx(res, 200, MeetupQuery.result);
	}

	/**
 * @name upcoming
 * @param {object} req
 * @param {object} res
 * @returns {object}
 * @description Return all upcoming meetup records
 */
	static upcoming(req, res) {
		const query = new Query(null, meetups, null, null);
		const formatByDateAsc = Filters.date(query.getAllRecords());
		return response2xx(res, 200, formatByDateAsc);
	}
}

export default Meetup;
