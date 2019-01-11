import { prepareContent } from '../helpers/validate';
import { errorRxx, response2xx } from '../helpers/handlers';
import Query from '../helpers/query';
import Filters from '../helpers/filters';

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
	static create(req, res) {
		let payload = req.body;
		const params = {
			arrays: ['Tags', 'images'],
		};
		payload = prepareContent(payload, params);
		// ADD TO MEETUPS DATA
		const query = new Query(payload, meetups, ['topic']);
		// SAVE MEETUP
		return query.save()
			.then(docs => response2xx(res, 200, docs))
			.catch(err => errorRxx(res, query.code, err));
	}

	/**
 * @name getRecord
 * @param {object} req
 * @param {object} res
 * @returns {object}
 * @description Return a specific record
 */
	static getRecord(req, res) {
		const id = req.params.id;
		const query = new Query(id, meetups, null, 'integer');
		const queryRecords = query.getRecord();
		if (!queryRecords) return errorRxx(res, query.code, query.errorMsg);
		return response2xx(res, 200, queryRecords);
	}

	/**
 * @name getAllRecords
 * @param {object} req
 * @param {object} res
 * @returns {object}
 * @description Return all meetup records
 */
	static getAllRecords(req, res) {
		const query = new Query(null, meetups, null, null);
		const queryAllRecords = query.getAllRecords();
		return response2xx(res, 200, queryAllRecords);
	}

	/**
 * @name rsvp
 * @param {object} req
 * @param {object} res
 * @returns {object}
 * @description RSVP for a meetup
 */
	static rsvp(req, res) {
		const id = req.params.id;
		const payload = req.body;
		const query = new Query(id, rsvps, null, 'integer');
		const queryRecords = query.getRecord();
		if (!queryRecords) return errorRxx(res, query.code, query.errorMsg);
		query.payload = payload;
		query.rsvp.id = id;
		return query.save()
			.then(docs => response2xx(res, 200, docs))
			.catch(err => errorRxx(res, 400, err));
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
