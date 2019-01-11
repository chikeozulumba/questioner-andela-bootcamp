import moment from 'moment';
import data from '../mock/data';
import { checkType } from './validate';
import Filters from './filters';

const user = {
	id: 1,
	name: 'Chike',
};
class Query {
	/**
	 * @name Query
	 * @param {object} payload
	 * @param {array} collections
	 * @param {array} fields
	 * @param {array} type
	 * @returns {object}
	 * @description Running queries on the collections
	 */
	constructor(payload, collection, fields = null, type = null) {
		this.payload = payload;
		this.errorMsg = null;
		this.collection = collection;
		this.collections = [...data[collection]];
		this.fields = fields;
		this.checkProp = checkType(this.payload, type);
		this.results = null;
		this.rsvp = {};
		this.user = user;
	}

	/**
	 * @name Unique
	 * @param {object} payload
	 * @param {array} params
	 * @returns {object}
	 * @description Ensuring payload fields are unique on the database collection.
	 */
	async unique(payload, params) {
		return new Promise((resolve, reject) => {
			if (!params) resolve(true);
			params.forEach((param) => {
				this.collections.filter((collection) => {
					if (collection[param] === payload[param]) {
						this.errorMsg = `'${payload[param]}' as ${param.toUpperCase()} field title already in use.`;
						this.code = 400;
						return reject(this.errorMsg);
					}
					return resolve(true);
				});
			});
		});
	}

	/**
	 * @name Save
	 * @param {object} payload
	 * @param {array} params
	 * @returns {promise}
	 * @description Saving payload to database collection.
	 */
	async save() {
		return this.addQuery().then((res) => {
			if (res) this.collections.push(this.payload);
			return Promise.resolve(this.payload);
		}).catch(err => Promise.reject(err));
	}

	/**
	 * @name Update
	 * @param {integer} index
	 * @returns {object}
	 * @description Updating payload to the database collection.
	 */
	update(index) {
		this.collections[index] = this.payload;
		return this.payload;
	}

	/**
	* @name getID
	* @returns {integer}
	* @description Create an ID for the payload before saving
	*/
	getID() {
		return this.collections.length + 1;
	}

	/**
	* @name getUser
	* @returns {object}
	* @description Returns an object that contains the user details
	*/
	getUser() {
		return this.user;
	}

	/**
	* @name addTImeStamp
	* @returns {date}
	* @description Returns current date
	*/
	// eslint-disable-next-line class-methods-use-this
	addTImeStamp() {
		const date = new Date();
		const formatted = moment(date).format('MM-DD-YYYY');
		return formatted;
	}

	/**
	* @name prepareMeetup
	* @returns {object}
	* @description Adds required fields to the payload
	*/
	prepareMeetup() {
		this.payload.id = this.getID();
		this.payload.createdOn = this.addTImeStamp();
		return this.payload;
	}

	/**
	* @name prepareQuestions
	* @returns {object}
	* @description Adds required fields to the payload
	*/
	prepareQuestions() {
		this.payload.id = this.getID();
		this.payload.createdOn = this.addTImeStamp();
		this.payload.createdBy = 1;
		this.payload.meetup = 1;
		this.payload.votes = 0;
		this.payload.upVoted = [];
		this.payload.downVoted = [];
		this.payload.permitted = true;
		return this.payload;
	}

	/**
	* @name prepareRsvps
	* @returns {object}
	* @description Prepare RSVP payload
	*/
	prepareRsvps() {
		this.payload.createdOn = this.addTImeStamp();
		this.payload.id = this.getID();
		this.payload.meetup = parseInt(this.rsvp.id, 10);
		this.payload.user = this.getUser().id;
		return this.payload;
	}

	/**
	* @name prepare
	* @returns {method}
	* @description Prepare dynamic queries
	*/
	prepare() {
		switch (this.collection) {
		case 'questions':
			return this.prepareQuestions();
		case 'rsvps':
			return this.prepareRsvps();
		default:
			return this.prepareMeetup();
		}
	}

	/**
	* @name addQuery
	* @returns {promise}
	* @description Add New Record Meetup/Question
	*/
	async addQuery() {
		return new Promise((resolve, reject) => {
			this.unique(this.payload, this.fields)
				.then(res => resolve(this.prepare()))
				.catch(err => reject(err));
		});
	}

	/**
	* @name getRecord
	* @returns {array}
	* @description Return specific record
	*/
	getRecord() {
		if (this.checkProp !== true) {
			this.errorMsg = this.checkProp;
			this.code = 400;
			return false;
		}
		this.results = Filters.sortArrayById(this.collections, this.payload);
		if (!this.results) {
			this.errorMsg = 'Record not found';
			this.code = 404;
		}
		return this.results;
	}

	/**
	* @name getAllRecords
	* @returns {array}
	* @description Get all records from collection
	*/
	getAllRecords() {
		return this.collections;
	}
}

export default Query;
