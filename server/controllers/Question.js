import Validate from '../helpers/validate';
import { errorRxx, response2xx } from '../helpers/handlers';
import Query from '../helpers/query';
import Filters from '../helpers/filters';

const validateOptions = {
	required: ['title', 'body'], // Required fields
	format: ['title'], // Check Format
};

/**
 * Create Meetup Class
 */
class Question {
	/**
	 * @param {object} req Controls Meetup Request
	 * @param {object} res Controls to Meetup Response
	 */
	static create(req, res) {
		let payload = req.body;
		const validation = Validate.init(payload, validateOptions);
		if (validation !== true && typeof validation === 'string') return errorRxx(res, 400, false, validation);
		const params = {
			arrays: [],
		};
		payload = Validate.prepareContent(payload, params);
		// ADD TO MEETUPS DATA
		const query = new Query(payload, 'questions', ['title']);
		// SAVE MEETUP
		return query.save()
			.then(docs => response2xx(res, 200, true, docs))
			.catch(err => errorRxx(res, query.code, false, err));
	}

	static vote(req, res) {
		const id = req.params.id;
		const path = Filters.last(req.url.split('/'));
		const query = new Query(id, 'questions', null, 'integer');
		const question = query.getRecord();
		if (!question) return errorRxx(res, query.code, false, query.errorMsg);
		if (path === 'upvote') {
			question.votes += 1;
		} else {
			if (question.votes !== 0) question.votes += 1;
			question.votes = 0;
		}
		query.payload = question;
		query.fields = ['title'];
		const pos = id - 1;
		if (query.update(pos)) return response2xx(res, 200, true, query.payload);
		return errorRxx(res, 500, false, `Internal server error, unable to ${path.toUpperCase()}`);
	}
}

export default Question;
