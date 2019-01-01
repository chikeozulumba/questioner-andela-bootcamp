import Validate from '../functions/validate';
import { error4xx, response2xx } from '../functions/handlers';
import { meetups } from '../mock/data.json';
import Query from '../functions/query';

const validateOptions = {
	required: ['topic', 'Tags', 'happeningOn', 'createdOn', 'location'], // Required fields
	format: ['topic'], // Check Format
};

const meetupData = meetups;

/**
 * Create Meetup Class
 */
class CreateMeetup {
	/**
	 * @param {object} req Controls Meetup Request
	 * @param {object} res Controls to Meetup Response
	 */
	static create(req, res) {
		let payload = req.body;
		const validation = new Validate(payload, validateOptions);
		if (!validation.init()) return error4xx(res, 400, false, validation.errorMsg);
		payload = validation.prepareContent();
		// ADD TO MEETUPS DATA
		const query = new Query(payload);
		// SAVE MEETUP
		return query.save()
			.then(docs => response2xx(res, 200, true, docs))
			.catch(err => error4xx(res, 400, false, err));
	}
}

export default CreateMeetup;
