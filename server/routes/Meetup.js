import express from 'express';
import { MeetupValidation, ValidateInteger, RSVPValidation } from '../middlewares/validator';
import Meetup from '../controllers/Meetup';

const router = express.Router();

/**
 * @name CreateMeetup
 * @param {object} req
 * @param {object} res
 * @returns {object}
 * @description Create a meetup
 */
router.post('/meetups', [MeetupValidation], Meetup.create);

/**
* @name GetUpcomingMeetups
* @param {object} req
* @param {object} res
* @returns {object}
* @description Get all upcoming meetup record
*/
router.get('/meetups/upcoming', Meetup.upcoming);

/**
* @name GetSpecificMeetup
* @param {object} req
* @param {object} res
* @returns {object}
* @description Get specific meetup record
*/
router.get('/meetups/:id', [ValidateInteger], Meetup.getRecord);

/**
* @name GetAllMeetup
* @param {object} req
* @param {object} res
* @returns {object}
* @description Get all meetup record
*/
router.get('/meetups/', Meetup.getAllRecords);

/**
* @name RSVP
* @param {object} req
* @param {object} res
* @returns {object}
* @description RSVP for a specific meetup record
*/
router.post('/meetups/:id/rsvp', [ValidateInteger, RSVPValidation], Meetup.rsvp);

export default router;
