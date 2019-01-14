import Validator from 'validatorjs';
import { errorRxx } from '../helpers/handlers';

const stringValidation = 'regex:/^([a-zA-Z0-9,.!? @_-]+)$/';
const nameValidation = 'regex:/^[A-Za-z]|[A-Za-z][A-Za-z]*[A-Za-z]$/';
const phoneValidation = 'regex:/^[a-zA-Z0-9-().s+]{10,15}$/';
/**
 * @name UserValidation
 * @param {object} req
 * @param {object} res
 * @returns {function} next
 * @returns {function} next
 * @returns {object} error
 * @description Validates Meetup Request fields
 */
export const UserValidation = (req, res, next) => {
	const payload = req.body;
	let schema = {
		firstName: ['required', nameValidation, 'string', 'min:3', 'max:255'],
		lastName: ['required', nameValidation, 'string', 'min:3', 'max:255'],
		phone: ['required', phoneValidation],
		password: ['required', stringValidation, 'min:6'],
		email: 'required|email',
	};
	if (req.originalUrl === '/api/v1/auth/signin') {
		schema = {
			password: ['required', stringValidation, 'min:6'],
			email: 'required|email',
		};
	}
	const validator = new Validator(payload, schema);
	const errors = validator.errors.all();
	if (validator.fails()) return errorRxx(res, 400, errors);
	return next();
};

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
		topic: ['required', 'string'],
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
	req.body.response = req.body.response.toLowerCase();
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
