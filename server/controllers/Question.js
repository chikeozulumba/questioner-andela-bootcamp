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
 * @name Create
 * @param {object} req
 * @param {object} res
 * @returns {object}
 * @description Create a question record
 */
	static create(req, res) {
		let payload = req.body;
		const validation = Validate.init(payload, validateOptions);
		if (validation !== true && typeof validation === 'string') return errorRxx(res, 400, validation);
		const params = {
			arrays: [],
		};
		payload = Validate.prepareContent(payload, params);
		// ADD TO MEETUPS DATA
		const query = new Query(payload, 'questions', ['title']);
		// SAVE MEETUP
		return query.save()
			.then(docs => response2xx(res, 200, docs))
			.catch(err => errorRxx(res, query.code, err));
	}

	/**
 * @name Vote
 * @param {object} req
 * @param {object} res
 * @returns {object}
 * @description Vote on a question
 */
	static vote(req, res) {
		const id = req.params.id;
		const path = Filters.last(req.url.split('/'));
		const query = new Query(id, 'questions', null, 'integer');
		const question = query.getRecord();
		if (!question) return errorRxx(res, query.code, query.errorMsg);
		if (path === 'upvote') {
			question.votes += 1;
		} else {
			if (question.votes !== 0) question.votes += 1;
			question.votes = 0;
		}
		query.payload = question;
		query.fields = ['title'];
		const pos = id - 1;
		if (query.update(pos)) return response2xx(res, 200, query.payload);
		return errorRxx(res, 500, `Internal server error, unable to ${path.toUpperCase()}`);
	}
}

export default Question;
