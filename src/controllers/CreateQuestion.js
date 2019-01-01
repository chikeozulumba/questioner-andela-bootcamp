import Validate from '../functions/validate';
import { error4xx, response2xx } from '../functions/handlers';
import Query from '../functions/query';

const validateOptions = {
	required: ['title', 'body'], // Required fields
	format: ['title'], // Check Format
};

/**
 * Create Meetup Class
 */
class CreateQuestion {
	/**
	 * @param {object} req Controls Meetup Request
	 * @param {object} res Controls to Meetup Response
	 */
	static create(req, res) {
		let payload = req.body;
		const validation = Validate.init(payload, validateOptions);
		if (validation !== true && typeof validation === 'string') return error4xx(res, 400, false, validation);
		const params = {
			arrays: [],
		};
		payload = Validate.prepareContent(payload, params);
		// ADD TO MEETUPS DATA
		const query = new Query(payload, 'questions', ['title']);
		// SAVE MEETUP
		return query.save()
			.then(docs => response2xx(res, 200, true, docs))
			.catch(err => error4xx(res, 400, false, err));
	}
}

export default CreateQuestion;
