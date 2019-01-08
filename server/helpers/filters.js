import moment from 'moment';

const sortArrayById = (collection, id) => {
	id = parseInt(id, 10);
	for (let i = 0; i < collection.length; i += 1) {
		const col = collection[i];
		if (col.id === id) return col;
	}
	return null;
};

const date = (array) => {
	array.sort((current, next) => {
		const currentDate = moment(current.happeningOn, 'YYYY-DD-MM').format();
		const nextDate = moment(next.happeningOn, 'YYYY-DD-MM').format();
		return new Date(currentDate).getTime() - new Date(nextDate).getTime();
	});
	return array;
};
const last = array => array[array.length - 1];

const Filters = { sortArrayById, last, date };

export default Filters;
