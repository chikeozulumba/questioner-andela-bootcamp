import { prepareContent, toArray, mergeArray } from '../helpers/validate';
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
		const { id } = req.user;
		const payload = prepareContent(req.body, { arrays: ['tags', 'images'] });
		const {
			topic, location, tags, images, happeningOn,
		} = payload;
		const MeetupQuery = new Model({
			id, topic, location, tags, images, happeningOn,
		});
		if (!await MeetupQuery.createMeetup()) return errorRxx(res, 500, 'Error in saving meetup, kindly try again.');
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
		const { id } = req.params;
		const MeetupQuery = new Model(id);
		if (!await MeetupQuery.getMeetupById()) return errorRxx(res, 500, 'Error in retrieving meetup, try again.');
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
		const { id } = req.params;
		const MeetupQuery = new Model(id);
		if (!await MeetupQuery.getMeetupById()) return errorRxx(res, 500, 'Error in retrieving meetup, try again.');
		if (MeetupQuery.result.length === 0) return errorRxx(res, 404, 'Meetup record not available.');
		if (req.rsvpErrors) return errorRxx(res, 400, req.rsvErrorMsg);
		MeetupQuery.payload = req.body;
		if (MeetupQuery.error !== null) return errorRxx(res, 500, 'An error occured while processing your RSVP.');
		if (!await MeetupQuery.rsvpMeetup(id, req.user.id) && MeetupQuery.exists) return errorRxx(res, 409, 'You are already on RSVP for this event.');
		return response2xx(res, 201, MeetupQuery.result);
	}

	/**
 * @name Add-Tags
 * @param {object} req
 * @param {object} res
 * @returns {object}
 * @description Add tags to a meetup
 */
	static async addTags(req, res) {
		const { tags } = req.body;
		const MeetupQuery = new Model(req.params.id);
		const getMeetup = await MeetupQuery.getMeetupById();
		if (!getMeetup || MeetupQuery.result.length === 0) return errorRxx(res, 404, 'Meetup record not available.');
		const meetupTags = mergeArray(MeetupQuery.result[0].tags, toArray(tags, { arrays: ['tags'] }));
		await MeetupQuery.updateTags(meetupTags);
		if (MeetupQuery.error !== null) return errorRxx(res, 500, 'An error occured while processing your RSVP.');
		return response2xx(res, 200, MeetupQuery.result[0]);
	}

	/**
 * @name Add-Images
 * @param {object} req
 * @param {object} res
 * @returns {object}
 * @description Add tags to a meetup
 */
	static async addImages(req, res) {
		const MeetupQuery = new Model(req.params.id);
		if (!await MeetupQuery.getMeetupById() || MeetupQuery.result.length === 0) return errorRxx(res, 404, 'Meetup record not available.');
		const addImagesToMeetup = mergeArray(MeetupQuery.result[0].images, toArray(req.body.images, { arrays: ['images'] }));
		await MeetupQuery.updateImages(addImagesToMeetup);
		if (MeetupQuery.error !== null) return errorRxx(res, 500, 'An error occured while processing your RSVP.');
		return response2xx(res, 200, MeetupQuery.result[0]);
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
		if (!await MeetupQuery.getAllMeetups()) return errorRxx(res, 500, 'Error in retrieving meetup, try again.');
		const formatByDateAsc = date(MeetupQuery.result);
		return response2xx(res, 200, formatByDateAsc);
	}

	/**
 * @name Delete
 * @param {object} req
 * @param {object} res
 * @returns {object}
 * @description Delete metup records
 */
	static async delete(req, res) {
		const MeetupQuery = new Model(req.params.id);
		if (!await MeetupQuery.getMeetupById()) return errorRxx(res, 500, 'Error in processing request.');
		if (MeetupQuery.result.length === 0) return errorRxx(res, 404, 'Meetup record not available.');
		if (!await MeetupQuery.deleteMeetup()) return errorRxx(res, 500, 'Error in processing request, try again.');
		return response2xx(res, 202, 'Meetup record successfully removed.');
	}
}

export default Meetup;
