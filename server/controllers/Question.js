import moment from 'moment';
import { errorRxx, response2xx } from '../helpers/handlers';
import Query from '../helpers/query';
import { friendlyDate, jsUcfirst, last } from '../helpers/filters';
import Model from '../models/Question';
import CommentModel from '../models/Comment';

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
		const payload = req.body;
		payload.meetup = 1;
		payload.createdBy = req.user !== undefined ? req.user.id : 1;
		const QuestionQuery = new Model(payload);
		const saveQuestion = await QuestionQuery.createQuestion();
		if (!saveQuestion) return errorRxx(res, 500, 'Your details could not be saved, try again.');
		return response2xx(res, 201, QuestionQuery.result);
	}

	/**
 * @name getQuestionById
 * @param {object} req
 * @param {object} res
 * @returns {object}
 * @description VGet question by ID
 */
	static async getQuestion(id) {
		const QuestionQuery = new Model(id);
		const question = await QuestionQuery.getQuestionById();
		this.result = QuestionQuery.result;
		return question;
	}

	/**
 * @name Vote
 * @param {object} req
 * @param {object} res
 * @returns {object}
 * @description Vote on a question
 */
	static async vote(req, res) {
		const user = req.user !== undefined ? req.user.id : 1;
		const path = last(req.url.split('/'));
		const QuestionQuery = new Model(req.params.id);
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
		result.createdon = friendlyDate(result.createdon);
		return response2xx(res, 200, result, `${jsUcfirst(path)} successful!`);
	}

	/**
 * @name AddComment
 * @param {object} req
 * @param {object} res
 * @returns {object}
 * @description Add a comment
 */
	static async addComment(req, res) {
		const id = req.params.id;
		const comment = req.body.comment;
		const meetup = req.body.meetup;
		const user = req.user !== undefined ? req.user.id : 1;
		const QuestionQuery = new Model(id);
		const question = await QuestionQuery.getQuestionById();
		if (!question) return errorRxx(res, 500, 'Internal server error, try again');
		if (QuestionQuery.result.length === 0) return errorRxx(res, 404, 'Comment record not available, check request parameters');
		const payload = {
			id, user, meetup, comment,
		};
		const CommentQuery = new CommentModel(payload);
		const saveComment = await CommentQuery.createComment();
		if (!saveComment) return errorRxx(res, 500, 'Your details could not be saved, try again.');
		CommentQuery.result.createdon = friendlyDate(CommentQuery.result.createdon);
		return response2xx(res, 201, CommentQuery.result);
	}

	/**
 * @name EditComment
 * @param {object} req
 * @param {object} res
 * @returns {object}
 * @description Edit a comment
 */
	static async editComment(req, res) {
		const id = parseInt(req.params.id, 10);
		const user = req.user !== undefined ? req.user.id : 1;
		const CommentQuery = new CommentModel(id);
		const comment = await CommentQuery.getCommentById();
		if (!comment) return errorRxx(res, 500, 'Internal server error, try again');
		if (CommentQuery.result.length === 0) return errorRxx(res, 404, 'Comment record not available, check request parameters');
		const updateComment = await CommentQuery.updateComment(req.body.comment, user);
		if (!updateComment) return errorRxx(res, 500, 'Your details could not be saved, try again.');
		CommentQuery.result.createdon = friendlyDate(CommentQuery.result.createdon);
		return response2xx(res, 202, CommentQuery.result);
	}

	/**
 * @name DeleteComment
 * @param {object} req
 * @param {object} res
 * @returns {object}
 * @description Delete a comment
 */
	static async deleteComment(req, res) {
		const id = req.params.id;
		const CommentQuery = new CommentModel(id);
		const comment = await CommentQuery.getCommentById();
		if (!comment) return errorRxx(res, 500, 'Internal server error, try again');
		if (CommentQuery.result.length === 0) return errorRxx(res, 404, 'Comment record not available, check request parameters');
		const deleteComment = await CommentQuery.deleteComment();
		if (!deleteComment) return errorRxx(res, 500, 'Comment could not be deleted.');
		return response2xx(res, 200, 'Comment deleted successfully.');
	}
}

export default Question;
