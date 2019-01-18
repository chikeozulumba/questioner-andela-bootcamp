/* eslint-disable array-callback-return */
import Validator from 'validatorjs';
import urlRegex from 'url-regex';
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
	const { title, meetup, body } = req.body;
	const schema = {
		title: ['required', stringValidation, 'min:3', 'max:255'],
		meetup: ['required', 'integer'],
		body: 'required|string',
	};
	const validator = new Validator({ title, meetup, body }, schema);
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
	if (req.body.response !== undefined) req.body.response = req.body.response.toLowerCase();
	const schema = {
		response: ['required', { in: ['yes', 'no', 'maybe'] }],
	};
	const validator = new Validator(payload, schema);
	const errors = validator.errors.all();
	if (validator.fails()) {
		req.rsvpErrors = true;
		req.rsvErrorMsg = errors;
	}
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

/**
 * @name ValidateComment
 * @param {object} req
 * @param {object} res
 * @returns {function} next
 * @returns {function|error} next
 * @description Validates comments in request fields
 */
export const ValidateComment = (req, res, next) => {
	const schema = {
		comment: ['required', stringValidation, 'string', 'min:0', 'max:255'],
		meetup: ['required', 'integer'],
	};
	const validator = new Validator(req.body, schema);
	const errors = validator.errors.all();
	if (validator.fails()) return errorRxx(res, 400, errors);
	return next();
};

/**
 * @name ValidateCommentUpdate
 * @param {object} req
 * @param {object} res
 * @returns {function} next
 * @returns {function|error} next
 * @description Validates comments in request fields
 */
export const ValidateCommentUpdate = (req, res, next) => {
	const schema = {
		comment: ['required', stringValidation, 'string', 'min:0'],
	};
	const validator = new Validator(req.body, schema);
	const errors = validator.errors.all();
	if (validator.fails()) return errorRxx(res, 400, errors);
	return next();
};

/**
 * @name ValidateCommentUpdate
 * @param {object} req
 * @param {object} res
 * @returns {function} next
 * @returns {function|error} next
 * @description Validates comments in request fields
 */
export const ValidateTags = (req, res, next) => {
	const schema = {
		tags: ['required', stringValidation, 'string', 'min:0'],
	};
	const validator = new Validator(req.body, schema);
	const errors = validator.errors.all();
	if (validator.fails()) return errorRxx(res, 400, errors);
	return next();
};

/**
 * @name ValidateImage
 * @param {object} req
 * @param {object} res
 * @returns {function} next
 * @returns {function|error} next
 * @description Validates comments in request fields
 */
export const ValidateImageUrl = (req, res, next) => {
	let images = req.body.images.split(',');
	const imageErrors = [];
	let passed = true;
	images = images.map((image) => {
		image = image.trim();
		if (!urlRegex({ exact: true }).test(image)) {
			passed = false;
			imageErrors.push(image);
		}
	});
	const schema = {
		images: ['required', 'string', 'min:0'],
	};
	const validator = new Validator(req.body, schema);
	const errors = validator.errors.all();
	errors.invalid = imageErrors;
	if (validator.fails() || !passed) return errorRxx(res, 400, errors);
	return next();
};
