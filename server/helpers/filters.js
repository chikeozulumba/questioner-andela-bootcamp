import moment from 'moment';

/**
 * Sort an Array by ID
 * @param {array} collection
 * @param {integer} id
 * @returns {object}
 * @returns {null}
 */
export const sortArrayById = (collection, id) => {
	id = parseInt(id, 10);
	for (let i = 0; i < collection.length; i += 1) {
		const col = collection[i];
		if (col.id === id) return col;
	}
	return null;
};

/**
 * Sort an Array by date
 * @param {array} array
 * @returns {array}
 */
export const date = (array) => {
	array.sort((current, next) => {
		const currentDate = moment(current.happeningOn, 'YYYY-DD-MM').format();
		const nextDate = moment(next.happeningOn, 'YYYY-DD-MM').format();
		return new Date(currentDate).getTime() - new Date(nextDate).getTime();
	});
	return array;
};

/**
 * Get last item in an array
 * @param {array} array
 * @returns {array}
 */
export const last = array => array[array.length - 1];
export const jsUcfirst = string => string.charAt(0).toUpperCase() + string.slice(1);
export const friendlyDate = rawDate => moment(rawDate).format('MMMM Do YYYY, h:mm:ss a');

export const parseCommentResponse = (commentQuery, comment, question = null) => {
	const { questionid } = commentQuery;
	let response = {
		question: questionid, comment,
	};
	if (question) {
		const { title, body } = question;
		response = {
			question: questionid, title, body, comment,
		};
	}
	return response;
};
