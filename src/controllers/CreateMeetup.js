import Validate from '../functions/validate';
import { error4xx, response2xx } from '../functions/handlers';
import Query from '../functions/query';

const validateOptions = {
	required: ['topic', 'Tags', 'happeningOn', 'location'], // Required fields
	format: ['topic'], // Check Format
};

const meetups = 'meetups';

/**
 * Create Meetup Class
 */
class CreateMeetup {
	/**
	 * @param {object} req Controls Meetup Request
	 * @param {object} res Controls to Meetup Response
	 */
	static create(req, res) {
		let payload = req.body;
		const validation = Validate.init(payload, validateOptions);
		console.log(validation);
		if (validation !== true && typeof validation === 'string') return error4xx(res, 400, false, validation);

		const params = {
			arrays: ['Tags', 'images'],
		};
		payload = Validate.prepareContent(payload, params);
		// ADD TO MEETUPS DATA
		const query = new Query(payload, meetups, ['topic']);
		// SAVE MEETUP
		return query.save()
			.then(docs => response2xx(res, 200, true, docs))
			.catch(err => error4xx(res, 400, false, err));
	}

	static getRecord(req, res) {
		const id = req.params.id;
		const query = new Query(id, meetups, null, 'integer');
		const queryRecords = query.getRecord();
		if (!queryRecords) return error4xx(res, 404, false, query.errorMsg);
		return response2xx(res, 200, true, queryRecords);
	}
}

export default CreateMeetup;
