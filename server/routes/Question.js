import express from 'express';
import {
	QuestionValidation, ValidateInteger, ValidateComment, ValidateCommentUpdate,
} from '../middlewares/validator';
import Auth from '../middlewares/auth';
import Question from '../controllers/Question';

const router = express.Router();

/**
* @name CreateQuestion
* @param {object} req
* @param {object} res
* @returns {object}
* @description Create a new question
*/
router.post('/questions', [QuestionValidation, Auth.verifyCSRF], Question.create);

/**
* @name UpVoteQuestion
* @param {object} req
* @param {object} res
* @returns {object}
* @description UpVote a new question
*/
router.patch('/questions/:id/upvote', [ValidateInteger, Auth.verifyCSRF], Question.vote);

/**
* @name DownVoteQuestion
* @param {object} req
* @param {object} res
* @returns {object}
* @description DownVote a new question
*/
router.patch('/questions/:id/downvote', [ValidateInteger, Auth.verifyCSRF], Question.vote);

/**
* @name AddComment
* @param {object} req
* @param {object} res
* @returns {object}
* @description Add comment to a question
*/
router.post('/questions/:id/comment', [ValidateInteger, ValidateComment, Auth.verifyCSRF], Question.addComment);

/**
* @name EditComment
* @param {object} req
* @param {object} res
* @returns {object}
* @description Edit comment on a question
*/
router.patch('/questions/comments/:id', [ValidateInteger, ValidateCommentUpdate, Auth.verifyCSRF], Question.editComment);

/**
* @name DeleteComment
* @param {object} req
* @param {object} res
* @returns {object}
* @description Delete comment on a question
*/
router.delete('/questions/comments/:id', [ValidateInteger, Auth.verifyCSRF, Auth.isAdmin], Question.deleteComment);

export default router;
