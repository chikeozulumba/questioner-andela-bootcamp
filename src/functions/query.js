import moment from 'moment';
import data from '../mock/data';
import Validate from './validate';
import Filters from './filters';

const stringValidation = /^([a-zA-Z0-9,.!? @_-]+)$/;

class Query {
	/**
	 * Required method
	 * @param {object} payload Object containig fields
	 * @param {object} options Object containing additional options
	 */
	constructor(payload, collection, fields = null, type = null) {
		this.payload = payload;
		this.errorMsg = null;
		this.collection = collection;
		this.collections = [...data[collection]];
		this.fields = fields;
		this.checkProp = Validate.checkType(this.payload, type);
		this.results = null;
	}

	async unique(payload, params) {
		return new Promise((resolve, reject) => {
			params.forEach((param) => {
				this.collections.filter((collection) => {
					if (collection[param] === payload[param]) {
						this.errorMsg = `'${payload[param]}' as ${param.toUpperCase()} field title already in use.`;
						return reject(this.errorMsg);
					}
					return resolve(true);
				});
			});
		});
	}

	async save() {
		const save = this.addQuery();
		return save.then((res) => {
			if (res) this.collections.push(this.payload);
			return Promise.resolve(this.payload);
		}).catch(err => Promise.reject(err));
	}

	getID() {
		return this.collections.length + 1;
	}

	// PREPARE FOR MEETUP
	prepareMeetup() {
		const length = this.collections.length;
		this.payload.id = this.getID();
		this.payload.createdOn = moment().format('MMMM Do YYYY, h:mm:ss a');
		return this.payload;
	}

	prepareQuestions() {
		const length = this.collections.length;
		this.payload.id = this.getID();
		this.payload.createdOn = moment().format('MMMM Do YYYY, h:mm:ss a');
		this.payload.createdBy = 1;
		this.payload.meetup = 1;
		this.payload.votes = 0;
		this.payload.upVoted = [];
		this.payload.downVoted = [];
		this.payload.permitted = true;
		return this.payload;
	}

	// PREPARE FOR QUESTIONS
	prepare() {
		switch (this.collection) {
		case 'questions':
			return this.prepareQuestions();
		default:
			return this.prepareMeetup();
		}
	}

	async addQuery() {
		return new Promise((resolve, reject) => {
			this.unique(this.payload, this.fields)
				.then(res => resolve(this.prepare()))
				.catch(err => reject(err));
		});
	}

	getRecord() {
		if (this.checkProp !== true) {
			this.errorMsg = this.checkProp;
			return false;
		}
		this.results = Filters.sortArrayById(this.collections, this.payload);
		if (!this.results) this.errorMsg = 'Record not found';
		return this.results;
	}
}

export default Query;
