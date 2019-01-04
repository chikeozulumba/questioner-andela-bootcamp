'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sortArrayById = function sortArrayById(collection, id) {
	id = parseInt(id, 10);
	for (var i = 0; i < collection.length; i += 1) {
		var col = collection[i];
		if (col.id === id) return col;
	}
	return null;
};

var date = function date(array) {
	array.sort(function (current, next) {
		var currentDate = (0, _moment2.default)(current.happeningOn, 'YYYY-DD-MM').format();
		var nextDate = (0, _moment2.default)(next.happeningOn, 'YYYY-DD-MM').format();
		return new Date(currentDate).getTime() - new Date(nextDate).getTime();
	});
	return array;
};
var last = function last(array) {
	return array[array.length - 1];
};

var Filters = { sortArrayById: sortArrayById, last: last, date: date };

exports.default = Filters;
//# sourceMappingURL=filters.js.map