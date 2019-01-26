import express from 'express';
import {
	QuestionValidation, ValidateInteger,
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

export default router;
