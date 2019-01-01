const stringValidation = /^([a-zA-Z0-9,.!? @_-]+)$/;
const required = (payload, options) => {
	if (typeof payload !== 'object') throw new Error(`Content must be of type 'object' not ${typeof payload}`);
	const fields = Object.entries(payload);
	for (let i = 0; i < fields.length; i += 1) {
		const key = fields[i][0];
		const value = fields[i][1];
		if (options.required.includes(key)) {
			if (typeof value === 'string' && value.length === 0) {
				return `'${key}' field is empty.`;
			}
			if (value.length < 3) {
				return `'${key}' field is too short.`;
			}
			if (options.format !== undefined && options.format.includes(key) && stringValidation.test(value) === false) {
				return `${key} field contains invalid characters.`;
			}
		}
	}
	return true;
};

const prepareContent = (payload, params) => {
	Object.keys(payload).forEach((key) => {
		if (params.arrays.includes(key)) payload[key] = payload[key].split(',');
	});
	return payload;
};

const init = (payload, options) => {
	if (options === null) return true;
	return required(payload, options);
};

const Validate = {
	prepareContent,
	init,
	required,
};

export default Validate;
