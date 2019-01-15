import moment from 'moment';
import { errorRxx, response2xx } from '../helpers/handlers';
import Query from '../helpers/query';
import Filters from '../helpers/filters';
import Model from '../models/Question';


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
	static async create(req, res) {
		const payload = req.body;
		payload.meetup = 1;
		payload.createdBy = req.user !== undefined ? req.user.id : 1;
		const QuestionQuery = new Model(payload);
		const saveQuestion = await QuestionQuery.createQuestion();
		if (!saveQuestion) return errorRxx(res, 500, 'Your details could not be saved, try again.');
		return response2xx(res, 201, QuestionQuery.result);
	}

	/**
 * @name Vote
 * @param {object} req
 * @param {object} res
 * @returns {object}
 * @description Vote on a question
 */
	static async vote(req, res) {
		const id = req.params.id;
		const user = req.user !== undefined ? req.user.id : 1;
		const path = Filters.last(req.url.split('/'));
		const QuestionQuery = new Model(id);
		const question = await QuestionQuery.getQuestionById();
		if (!question) return errorRxx(res, 500, `Internal server error, could not ${path}`);
		if (QuestionQuery.result.length === 0) return errorRxx(res, 404, 'Question not found, check request parameters');
		if (path === 'upvote') await QuestionQuery.upVote(user);
		else await QuestionQuery.downVote(user);
		const result = QuestionQuery.result;
		if (result.upvotes !== null && result.upvotes.length > result.downvotes.length) result.votes = result.upvotes.length - result.downvotes.length;
		else result.votes = 0;
		delete result.upvotes;
		delete result.downvotes;
		result.createdon = moment(result.createdon).format('MMMM Do YYYY, h:mm:ss a');
		return response2xx(res, 200, result, `${Filters.jsUcfirst(path)} successful!`);
	}
}

export default Question;
