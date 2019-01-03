import Validate from '../functions/validate';
import { error4xx, error5xx, response2xx } from '../functions/handlers';
import Query from '../functions/query';
import Filters from '../functions/filters';

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

	static vote(req, res) {
		const id = req.params.id;
		const path = Filters.last(req.url.split('/'));
		const query = new Query(id, 'questions', null, 'integer');
		const question = query.getRecord();
		if (!question) error5xx(res, query.code, false, query.errorMsg);
		switch (path) {
		case 'upvote':
			question.votes += 1;
			break;
		case 'downvote':
			question.votes -= 1;
			break;
		default:
			break;
		}
		query.payload = question;
		query.fields = ['title'];
		const pos = id - 1;
		return query.update(pos)
			.then(docs => response2xx(res, 200, true, docs))
			.catch(err => error5xx(res, 500, false, `Internal server error, unable to ${path.toUpperCase()}`));
	}
}

export default CreateQuestion;
