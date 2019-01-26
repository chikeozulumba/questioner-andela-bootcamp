import express from 'express';
import {
	ValidateInteger, ValidateComment, ValidateCommentUpdate,
} from '../middlewares/validator';
import Auth from '../middlewares/auth';
import Comment from '../controllers/Comment';

const router = express.Router();

/**
* @name AddComment
* @param {object} req
* @param {object} res
* @returns {object}
* @description Add comment to a question
*/
router.post('/comments/', [ValidateComment, Auth.verifyCSRF], Comment.addComment);

/**
* @name EditComment
* @param {object} req
* @param {object} res
* @returns {object}
* @description Edit comment on a question
*/
router.patch('/comments/:id', [ValidateInteger, ValidateCommentUpdate, Auth.verifyCSRF], Comment.editComment);

/**
* @name DeleteComment
* @param {object} req
* @param {object} res
* @returns {object}
* @description Delete comment on a question
*/
router.delete('/comments/:id', [ValidateInteger, Auth.verifyCSRF, Auth.isAdmin], Comment.deleteComment);

export default router;
