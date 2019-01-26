import express from 'express';
import {
	QuestionValidation, ValidateInteger, ValidateComment, ValidateCommentUpdate,
} from '../middlewares/validator';
import Auth from '../middlewares/auth';
import Question from '../controllers/Question';

const router = express.Router();

/**
* @name AddComment
* @param {object} req
* @param {object} res
* @returns {object}
* @description Add comment to a question
*/
router.post('/comments/', [ValidateComment, Auth.verifyCSRF], Question.addComment);

/**
* @name EditComment
* @param {object} req
* @param {object} res
* @returns {object}
* @description Edit comment on a question
*/
router.patch('/comments/:id', [ValidateInteger, ValidateCommentUpdate, Auth.verifyCSRF], Question.editComment);

/**
* @name DeleteComment
* @param {object} req
* @param {object} res
* @returns {object}
* @description Delete comment on a question
*/
router.delete('/comments/:id', [ValidateInteger, Auth.verifyCSRF, Auth.isAdmin], Question.deleteComment);

export default router;
