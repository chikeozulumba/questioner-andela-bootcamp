const stringValidation = /^([a-zA-Z0-9,.!? @_-]+)$/;
const format = (payload, options) => {
	if (typeof payload !== 'object') throw new Error(`Content must be of type 'object' not ${typeof body}`);
	const fields = Object.entries(payload);
	for (let i = 0; i < fields.length; i += 1) {
		const key = fields[i][0];
		const value = fields[i][1];
		if (options.required.includes(key)) {
			if (typeof value === 'string' && value.length === 0) return `'${key}' field is empty.`;
			if (value.length < 3) return `'${key}' field is too short.`;
			if (options.format !== undefined && options.format.includes(key) && stringValidation.test(value) === false) return `${key} field contains invalid characters.`;
		}
	}
	return true;
};

const prepareContent = (payload, params) => {
	if (params !== null && params.arrays.length !== 0) {
		Object.keys(payload).forEach((key) => {
			if (params.arrays.includes(key)) payload[key] = payload[key].split(',');
		});
	}
	return payload;
};

const required = (payload, options) => {
	for (let i = 0; i < options.required.length; i += 1) {
		const req = options.required[i];
		if (payload[req] === undefined || payload[req] === null) return `'${req}' field is required.`;
	}
	return true;
};

const checkType = (payload, type) => {
	// eslint-disable-next-line valid-typeof
	const integer = /^\d+$/;
	switch (type) {
	case 'integer':
		if (!integer.test(payload)) return 'Parameter must be of type an integer';
		return true;
	default:
		return `Parameter must be of type ${type}, not ${typeof payload}`;
	}
};

const init = (payload, options) => {
	if (options === null) return true;
	const checkRequiredFields = required(payload, options);
	if (checkRequiredFields === true) return format(payload, options);
	return checkRequiredFields;
};

const Validate = { init, prepareContent, checkType };

export default Validate;
