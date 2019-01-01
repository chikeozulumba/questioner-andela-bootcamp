import data from '../mock/data';

const stringValidation = /^([a-zA-Z0-9,.!? @_-]+)$/;

class Query {
	/**
	 * Required method
	 * @param {object} payload Object containig fields
	 * @param {object} options Object containing additional options
	 */
	constructor(payload, collection, fields) {
		this.payload = payload;
		this.errorMsg = null;
		this.collection = collection;
		this.collections = [...data[collection]];
		this.fields = fields;
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
		return this.collections.reduce((acc, desc, i) => {
			if (acc === undefined || acc.id !== desc.id) return i + 1;
			return this.collections.length + 1;
		});
	}

	// PREPARE FOR MEETUP
	prepareMeetup() {
		const length = this.collections.length;
		this.payload.id = this.getID();
		return this.payload;
	}

	prepareQuestions() {
		const length = this.collections.length;
		this.payload.id = this.getID();
		this.payload.votes = 0;
		this.payload.upVoted = [];
		this.payload.downVoted = [];
		this.payload.permitted = true;
		return this.payload;
	}

	// PREPARE FOR QUESTIONS
	prepare() {
		switch (this.collection) {
		case 'meetup':
			return this.prepareMeetup();
		case 'questions':
			return this.prepareQuestions();
		default:
			return this.payload;
		}
	}

	async addQuery() {
		return new Promise((resolve, reject) => {
			this.unique(this.payload, this.fields)
				.then(res => resolve(this.prepare()))
				.catch(err => reject(err));
		});
	}
}

export default Query;
