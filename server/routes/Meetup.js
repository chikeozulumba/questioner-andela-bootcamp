import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import Meetup from '../controllers/Meetup';
import Validator from '../helpers/validate';

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(morgan('combined', {
	skip: (req, res) => res.statusCode < 400,
}));

// @route POST /api/v1/meetups
// @desc  Create meetup
// @access public

router.post('/meetups', Meetup.create);

// @route GET /api/v1/meetups/<meetup-id>
// @desc  Get Specific Meetup record
// @access public

router.get('/meetups/:id', Meetup.getRecord);

// @route GET /api/v1/meetups/
// @desc  Get all meetups
// @access public

router.get('/meetups/', Meetup.getAllRecords);

// @route PATCH /api/v1/meetups/<meetup-id>/rsvp
// @desc  RSVP for a meetup
// @access public

router.post('/meetups/:id/rsvp', Meetup.rsvp);

// @route PATCH /api/v1/meetups/upcoming
// @desc  Fetch all upcoming meetup records
// @access public

router.get('/meetups/upcoming/asc', Meetup.upcoming);

export default router;
