import express from 'express';
import { MeetupValidation, ValidateInteger, RSVPValidation } from '../middlewares/validator';
import Auth from '../middlewares/auth';
import Meetup from '../controllers/Meetup';

const router = express.Router();

/**
 * @name CreateMeetup
 * @param {object} req
 * @param {object} res
 * @returns {object}
 * @description Create a meetup
 */
router.post('/meetups', [MeetupValidation, Auth.verifyCSRF, Auth.isAdmin], Meetup.create);

/**
* @name GetUpcomingMeetups
* @param {object} req
* @param {object} res
* @returns {object}
* @description Get all upcoming meetup record
*/
router.get('/meetups/upcoming', [Auth.verifyCSRF], Meetup.upcoming);

/**
* @name GetSpecificMeetup
* @param {object} req
* @param {object} res
* @returns {object}
* @description Get specific meetup record
*/
router.get('/meetups/:id', [ValidateInteger, Auth.verifyCSRF], Meetup.getRecord);

/**
* @name GetAllMeetup
* @param {object} req
* @param {object} res
* @returns {object}
* @description Get all meetup record
*/
router.get('/meetups/', [Auth.verifyCSRF], Meetup.getAllRecords);

/**
* @name RSVP
* @param {object} req
* @param {object} res
* @returns {object}
* @description RSVP for a specific meetup record
*/
router.post('/meetups/:id/rsvp', [ValidateInteger, RSVPValidation, Auth.verifyCSRF], Meetup.rsvp);

export default router;
