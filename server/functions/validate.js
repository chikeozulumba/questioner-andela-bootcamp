'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var stringValidation = /^([a-zA-Z0-9,.!? @_-]+)$/;
var ignore = ['meetup', 'response'];
var format = function format(payload, options) {
	if ((typeof payload === 'undefined' ? 'undefined' : _typeof(payload)) !== 'object') throw new Error('Content must be of type \'object\' not ' + (typeof body === 'undefined' ? 'undefined' : _typeof(body)));
	var fields = Object.entries(payload);
	for (var i = 0; i < fields.length; i += 1) {
		var key = fields[i][0];
		var value = fields[i][1];
		if (options.required.includes(key) && !ignore.includes(key)) {
			if (typeof value === 'string' && value.length === 0) return '\'' + key + '\' field is empty.';
			if (value.length < 3) return '\'' + key + '\' field is too short.';
			if (options.format !== undefined && options.format.includes(key) && stringValidation.test(value) === false) return key + ' field contains invalid characters.';
		}
	}
	return true;
};

var prepareContent = function prepareContent(payload, params) {
	if (params !== null && params.arrays.length !== 0) {
		Object.keys(payload).forEach(function (key) {
			if (params.arrays.includes(key)) payload[key] = payload[key].split(',');
		});
	}
	return payload;
};

var required = function required(payload, options) {
	for (var i = 0; i < options.required.length; i += 1) {
		var req = options.required[i];
		if (payload[req] === undefined || payload[req] === null) return '\'' + req + '\' field is required.';
	}
	return true;
};

var checkType = function checkType(payload, type) {
	// eslint-disable-next-line valid-typeof
	var integer = /^\d+$/;
	switch (type) {
		case 'integer':
			if (!integer.test(payload)) return 'Parameter must be of type - integer';
			return true;
		default:
			return 'Parameter must be of type ' + type + ', not ' + (typeof payload === 'undefined' ? 'undefined' : _typeof(payload));
	}
};

var init = function init(payload, options) {
	if (options === null) return true;
	var checkRequiredFields = required(payload, options);
	if (checkRequiredFields === true) return format(payload, options);
	return checkRequiredFields;
};

var Validate = { init: init, prepareContent: prepareContent, checkType: checkType };

exports.default = Validate;
//# sourceMappingURL=validate.js.map