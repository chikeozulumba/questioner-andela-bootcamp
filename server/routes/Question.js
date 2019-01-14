import express from 'express';
import { QuestionValidation, ValidateInteger } from '../middlewares/validator';
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

export default router;
