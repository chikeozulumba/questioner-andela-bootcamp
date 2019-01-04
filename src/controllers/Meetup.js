import Validate from '../functions/validate';
import { errorRxx, response2xx } from '../functions/handlers';
import Query from '../functions/query';
import Filters from '../functions/filters';

let validateOptions = {
	required: ['topic', 'Tags', 'happeningOn', 'location'], // Required fields
	format: ['topic'], // Check Format
};

const meetups = 'meetups';
const rsvps = 'rsvps';

/**
 * Create Meetup Class
 */
class Meetup {
	/**
	 * @param {object} req Controls Meetup Request
	 * @param {object} res Controls to Meetup Response
	 */
	static create(req, res) {
		let payload = req.body;
		const validation = Validate.init(payload, validateOptions);
		if (validation !== true && typeof validation === 'string') return errorRxx(res, 400, false, validation);

		const params = {
			arrays: ['Tags', 'images'],
		};
		payload = Validate.prepareContent(payload, params);
		// ADD TO MEETUPS DATA
		const query = new Query(payload, meetups, ['topic']);
		// SAVE MEETUP
		return query.save()
			.then(docs => response2xx(res, 200, true, docs))
			.catch(err => errorRxx(res, query.code, false, err));
	}

	static getRecord(req, res) {
		const id = req.params.id;
		const query = new Query(id, meetups, null, 'integer');
		const queryRecords = query.getRecord();
		if (!queryRecords) return errorRxx(res, query.code, false, query.errorMsg);
		return response2xx(res, 200, true, queryRecords);
	}

	static getAllRecords(req, res) {
		const query = new Query(null, meetups, null, null);
		const queryAllRecords = query.getAllRecords();
		return response2xx(res, 200, true, queryAllRecords);
	}

	static rsvp(req, res) {
		const id = req.params.id;
		const payload = req.body;
		const query = new Query(id, rsvps, null, 'integer');
		const queryRecords = query.getRecord();
		validateOptions = {
			required: ['meetup', 'response'], // Required fields
		};
		const validation = Validate.init(payload, validateOptions);
		if (validation !== true && typeof validation === 'string') return errorRxx(res, 400, false, validation);
		if (!queryRecords) return errorRxx(res, query.code, false, query.errorMsg);
		query.payload = payload;
		query.rsvp.id = id;
		return query.save()
			.then(docs => response2xx(res, 200, true, docs))
			.catch(err => errorRxx(res, 400, false, err));
	}

	static upcoming(req, res) {
		const query = new Query(null, meetups, null, null);
		const formatByDateAsc = Filters.date(query.getAllRecords());
		return response2xx(res, 200, true, formatByDateAsc);
	}
}

export default Meetup;
