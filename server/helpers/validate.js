/**
 * @name prepareContent
 * @param {object} payload
 * @param {array} params
 * @returns {object}
 * @description Form strings to arrays in request payload
 */
export const prepareContent = (payload, params) => {
	if (params !== null && params.arrays.length !== 0) {
		Object.keys(payload).forEach((key) => {
			if (params.arrays.includes(key)) {
				payload[key] = payload[key].split(',');
				payload[key] = payload[key].map(el => el.trim());
			}
		});
	}
	return payload;
};

/**
 * @name ToArray
 * @param {object} payload
 * @param {array} params
 * @returns {object}
 * @description Form strings to arrays in request payload
 */
export const toArray = (payload) => {
	const output = {};
	output.new = [];
	payload = payload.split(',');
	payload.forEach((el) => {
		output.new.push(el.trim());
	});
	return output.new;
};

export const mergeArray = (array1, array2) => {
	let arr = array1.concat(array2);
	arr = arr.filter((item, index, inputArray) => inputArray.indexOf(item) === index);
	return arr;
};
