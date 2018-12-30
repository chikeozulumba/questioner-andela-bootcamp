const regex = /^[a-z0-9][a-z0-9-_]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/;
const stringValidation = /^([a-zA-Z0-9,.!? _-]+@)$/;
class Validate {
	/**
	 * Required method
	 * @param {object} body Object containig fields
	 * @param {object} options Object containing additional options
	 * @param [options.required] Array of fields that are necessary/required
	 */
	constructor(body, options = null) {
		this.body = body;
		this.options = options;
		this.errorMsg = null;
		this.format = options.format;
	}

	init() {
		if (this.options !== null) return this.required();
		return 'true init';
	}

	required() {
		if (typeof this.body !== 'object') throw new Error(`Content must be of type 'object' not ${typeof body}`);
		const fields = Object.entries(this.body);
		for (let i = 0; i < fields.length; i += 1) {
			const key = fields[i][0];
			const value = fields[i][1];
			if (this.options.required.includes(key)) {
				if (typeof value === 'string' && value.length === 0) { this.errorMsg = `'${key}' field is empty.`; return false; }
				if (value.length < 3) { this.errorMsg = `'${key}' field is too short.`; return false; }
				if (this.format !== undefined && this.format.includes(key) && stringValidation.test(value) === false) { this.errorMsg = `${key} field contains invalid characters.`; return false; }
			}
		}
		return true;
	}
}

export default Validate;
