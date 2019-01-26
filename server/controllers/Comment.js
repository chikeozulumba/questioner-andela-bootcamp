import { errorRxx, response2xx } from '../helpers/handlers';
import {
	parseCommentResponse,
} from '../helpers/filters';
import Model from '../models/Question';
import CommentModel from '../models/Comment';

/**
 * Create Meetup Class
 */
class Comment {
	/**
 * @name AddComment
 * @param {object} req
 * @param {object} res
 * @returns {object}
 * @description Add a comment
 */
	static async addComment(req, res) {
		const { comment, meetup, questionid } = req.body;
		const userid = req.user.id;
		const QuestionQuery = new Model(questionid);
		if (!await QuestionQuery.getQuestionById()) return errorRxx(res, 500, 'Internal server error, try again');
		if (QuestionQuery.result.length === 0) return errorRxx(res, 404, 'Question record not available');
		const CommentQuery = new CommentModel({
			questionid, userid, meetup, comment,
		});
		if (!await CommentQuery.createComment()) return errorRxx(res, 500, 'Your comment could not be saved, try again.');
		return response2xx(res, 201, parseCommentResponse(CommentQuery.result, comment, QuestionQuery.result[0]));
	}

	/**
 * @name EditComment
 * @param {object} req
 * @param {object} res
 * @returns {object}
 * @description Edit a comment
 */
	static async editComment(req, res) {
		const { id } = req.user;
		const { comment } = req.body;
		const CommentQuery = new CommentModel(req.params.id);
		if (await CommentQuery.getCommentById(id) && CommentQuery.result.length === 0) return errorRxx(res, 404, 'Comment record not available');
		if (!await CommentQuery.updateComment(comment, id)) return errorRxx(res, 500, 'Your details could not be saved, try again.');
		if (CommentQuery.result.length === 0) return errorRxx(res, 401, 'You are not assigned to manage this comment.');
		return response2xx(res, 202, parseCommentResponse(CommentQuery.result[0], comment));
	}

	/**
 * @name DeleteComment
 * @param {object} req
 * @param {object} res
 * @returns {object}
 * @description Delete a comment
 */
	static async deleteComment(req, res) {
		const { id } = req.params;
		const CommentQuery = new CommentModel(parseInt(id, 10));
		if (!await CommentQuery.getCommentById()) return errorRxx(res, 500, 'Internal server error, try again');
		if (CommentQuery.result.length === 0) return errorRxx(res, 404, 'Comment record not available');
		if (!await CommentQuery.deleteComment()) return errorRxx(res, 500, 'Comment could not be deleted.');
		return response2xx(res, 200, 'Comment deleted successfully.');
	}
}

export default Comment;
