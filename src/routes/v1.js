import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import CreateMeetup from '../controllers/CreateMeetup';
import CreateQuestion from '../controllers/CreateQuestion';

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

router.post('/meetups', CreateMeetup.create);

// @route GET /api/v1/questions
// @desc  Create question route
// @access public

router.post('/questions', CreateQuestion.create);

export default router;
