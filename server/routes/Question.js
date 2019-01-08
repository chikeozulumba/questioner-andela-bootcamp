import express from 'express';
import Question from '../controllers/Question';

const router = express.Router();

// @route POST /api/v1/questions
// @desc  Create question
// @access public

router.post('/questions', Question.create);

// @route PATCH /api/v1/questions/<question-id>/upvote
// @desc  Upvote a question
// @access public

router.patch('/questions/:id/upvote', Question.vote);

// @route PATCH /api/v1/questions/<question-id>/downvote
// @desc  Downvote a question
// @access public

router.patch('/questions/:id/downvote', Question.vote);

export default router;
