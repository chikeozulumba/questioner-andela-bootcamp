import Validate from '../functions/validate';

const regex = /^[a-z0-9][a-z0-9-_]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/;
const stringValidation = /^([a-zA-Z0-9 _-]+)\d*[.,]?\d+$/;

const validateOptions = {
	required: ['topic', 'Tags', 'happeningOn', 'createdOn', 'location'], // Required fields
	format: ['topic'], // Check Format
};

/**
 * Create Meetup Class
 */
class CreateMeetup {
	/**
	 * @param {object} req Controls Meetup Request
	 * @param {object} res Controls to Meetup Response
	 */
	static create(req, res) {
		const validation = new Validate(req.body, validateOptions);
		if (!validation.init()) return validation.errorMsg;
	}
}

export default CreateMeetup;
