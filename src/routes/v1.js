import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import Meetup from '../controllers/Meetup';
import Question from '../controllers/Question';

const router = express.Router();
router.use(express.static('UI'));
router.use('/UI', express.static(path.resolve(__dirname, '../../UI/')));
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(morgan('combined', {
	skip: (req, res) => res.statusCode < 400,
}));

// @route GET /api/v1/meetups
// @desc  Create meetup route
// @access public

router.post('/meetups', Meetup.create);

// @route GET /api/v1/questions
// @desc  Create question route
// @access public

router.post('/questions', Question.create);

// @route GET /api/v1/meetups/<meetup-id>
// @desc  Create question route
// @access public

router.get('/meetups/:id', Meetup.getRecord);

// @route GET /api/v1/meetups/<meetup-id>
// @desc  Create question route
// @access public

router.get('/meetups/', Meetup.getAllRecords);

// @route PATCH /api/v1/questions/<question-id>/upvote
// @desc  Upvote a question route
// @access public

router.patch('/questions/:id/upvote', Question.vote);

// @route PATCH /api/v1/questions/<question-id>/downvote
// @desc  Downvote a question route
// @access public

router.patch('/questions/:id/downvote', Question.vote);

// @route PATCH /api/v1/meetups/<meetup-id>/rsvp
// @desc  RSVP for a meetup route
// @access public

router.post('/meetups/:id/rsvp', Meetup.rsvp);

// @route PATCH /api/v1/questions/<question-id>/downvote
// @desc  Fetch all upcoming meetup records
// @access public

router.post('/meetups/upcoming/', Meetup.upcoming);

export default router;
