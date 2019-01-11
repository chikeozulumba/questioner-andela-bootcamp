import Validator from 'validatorjs';
import { errorRxx } from '../helpers/handlers';

const stringValidation = 'regex:/^([a-zA-Z0-9,.!? @_-]+)$/';
/**
 * @name MeetupValidation
 * @param {object} req
 * @param {object} res
 * @returns {function} next
 * @returns {function} next
 * @returns {object} error
 * @description Validates Meetup Request fields
 */
export const MeetupValidation = (req, res, next) => {
	const payload = req.body;
	const schema = {
		topic: ['required', stringValidation, 'min:3', 'max:255'],
		tags: 'required|string',
		location: 'required|string',
		images: 'string',
		happeningOn: 'required',
	};
	const validator = new Validator(payload, schema);
	const errors = validator.errors.all();
	if (validator.fails()) return errorRxx(res, 400, errors);
	return next();
};

/**
 * @name QuestionValidation
 * @param {object} req
 * @param {object} res
 * @returns {function} next
 * @returns {function} next
 * @returns {object} error
 * @description Validates Question Request fields
 */
export const QuestionValidation = (req, res, next) => {
	const payload = req.body;
	const schema = {
		title: ['required', stringValidation, 'min:3', 'max:255'],
		body: 'required|string',
	};
	const validator = new Validator(payload, schema);
	const errors = validator.errors.all();
	if (validator.fails()) return errorRxx(res, 400, errors);
	return next();
};

/**
 * @name RSVPValidation
 * @param {object} req
 * @param {object} res
 * @returns {function} next
 * @returns {function} next
 * @returns {object} error
 * @description Validates RSVP Request fields
 */
export const RSVPValidation = (req, res, next) => {
	const payload = req.body;
	const schema = {
		response: ['required', { in: ['yes', 'no', 'maybe'] }],
	};
	const validator = new Validator(payload, schema);
	const errors = validator.errors.all();
	if (validator.fails()) return errorRxx(res, 400, errors);
	return next();
};

/**
 * @name ValidateInteger
 * @param {object} req
 * @param {object} res
 * @returns {function} next
 * @returns {function} next
 * @returns {object} error
 * @description Validates Integer Param in request fields
 */
export const ValidateInteger = (req, res, next) => {
	const payload = {
		id: req.params.id,
	};
	const schema = {
		id: 'required|integer',
	};
	const validator = new Validator(payload, schema);
	const errors = validator.errors.all();
	if (validator.fails()) return errorRxx(res, 400, errors);
	return next();
};
