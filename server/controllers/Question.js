import { errorRxx, response2xx } from '../helpers/handlers';
import {
	friendlyDate, jsUcfirst, last, parseCommentResponse,
} from '../helpers/filters';
import Model from '../models/Question';

/**
 * Create Meetup Class
 */
class Question {
	/**
 * @name Create
 * @param {object} req
 * @param {object} res
 * @returns {object}
 * @description Create a Comment record
 */
	static async create(req, res) {
		const {
			title, body, meetup,
		} = req.body;
		const { id } = req.user;
		const QuestionQuery = new Model({
			title, body, meetup, createdBy: id,
		});
		if (!await QuestionQuery.createQuestion()) return errorRxx(res, 500, 'Question could not be saved, try again.');
		const response = QuestionQuery.result;
		response.vote = 0;
		response.user = response.createdby;
		delete response.createdby;
		return response2xx(res, 201, response);
	}

	// 	/**
	//  * @name GetQuestionById
	//  * @param {object} req
	//  * @param {object} res
	//  * @returns {object}
	//  * @description Get question by ID
	//  */
	// 	static async getQuestion(id) {
	// 		const QuestionQuery = new Model(id);
	// 		const question = await QuestionQuery.getQuestionById();
	// 		this.result = QuestionQuery.result;
	// 		return question;
	// 	}

	/**
 * @name Vote
 * @param {object} req
 * @param {object} res
 * @returns {object}
 * @description Vote on a question
 */
	static async vote(req, res) {
		const { id } = req.user;
		const path = last(req.url.split('/'));
		const QuestionQuery = new Model(req.params.id);
		if (!await QuestionQuery.getQuestionById()) return errorRxx(res, 500, `Internal server error, could not ${path}`);
		if (QuestionQuery.result.length > 0) {
			if (path === 'upvote') await QuestionQuery.upVote(id);
			else await QuestionQuery.downVote(id);
			const result = QuestionQuery.result;
			const upvotes = !result.upvotes ? [] : result.upvotes;
			const downvotes = !result.downvotes ? [] : result.downvotes;
			if (upvotes !== null && (downvotes === null || upvotes.length > downvotes.length)) {
				result.votes = upvotes.length - downvotes.length;
			} else result.votes = 0;
			delete result.upvotes;
			delete result.downvotes;
			result.createdon = friendlyDate(result.createdon);
			return response2xx(res, 200, result, `${jsUcfirst(path)} successful!`);
		} return errorRxx(res, 404, 'Question not found');
	}
}

export default Question;
