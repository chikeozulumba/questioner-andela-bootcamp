import {
	meetups,
} from '../mock/data.json';

const stringValidation = /^([a-zA-Z0-9,.!? @_-]+)$/;

class Query {
	/**
	 * Required method
	 * @param {object} payload Object containig fields
	 * @param {object} options Object containing additional options
	 */
	constructor(payload) {
		this.payload = payload;
		this.errorMsg = null;
		this.collections = [...meetups];
	}

	// `'${param}' name already exists on the database.` this.errorMsg = `'${param}' name already exists on collection.`;
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

	prepare() {
		const length = this.collections.length;
		this.payload.id = length + 1;
		return this.payload;
	}

	async addQuery() {
		return new Promise((resolve, reject) => {
			this.unique(this.payload, ['topic'])
				.then(res => resolve(this.prepare()))
				.catch(err => reject(err));
		});
	}
}

export default Query;
