import express from 'express';
import {
	QuestionValidation, ValidateInteger, ValidateComment, ValidateCommentUpdate,
} from '../middlewares/validator';
import Question from '../controllers/Question';

const router = express.Router();

/**
* @name CreateQuestion
* @param {object} req
* @param {object} res
* @returns {object}
* @description Create a new question
*/
router.post('/questions', [QuestionValidation], Question.create);

/**
* @name UpVoteQuestion
* @param {object} req
* @param {object} res
* @returns {object}
* @description UpVote a new question
*/
router.patch('/questions/:id/upvote', [ValidateInteger], Question.vote);

/**
* @name DownVoteQuestion
* @param {object} req
* @param {object} res
* @returns {object}
* @description DownVote a new question
*/
router.patch('/questions/:id/downvote', [ValidateInteger], Question.vote);

/**
* @name AddComment
* @param {object} req
* @param {object} res
* @returns {object}
* @description Add comment to a question
*/
router.post('/questions/:id/comment', [ValidateInteger, ValidateComment], Question.addComment);

/**
* @name EditComment
* @param {object} req
* @param {object} res
* @returns {object}
* @description Edit comment on a question
*/
router.patch('/questions/:id/comment', [ValidateInteger, ValidateCommentUpdate], Question.editComment);

/**
* @name DeleteComment
* @param {object} req
* @param {object} res
* @returns {object}
* @description Delete comment on a question
*/
router.delete('/questions/:id/comment', [ValidateInteger], Question.deleteComment);

export default router;
