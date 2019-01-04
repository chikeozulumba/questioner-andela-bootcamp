'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _data = require('../mock/data');

var _data2 = _interopRequireDefault(_data);

var _validate = require('./validate');

var _validate2 = _interopRequireDefault(_validate);

var _filters = require('./filters');

var _filters2 = _interopRequireDefault(_filters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var stringValidation = /^([a-zA-Z0-9,.!? @_-]+)$/;
var user = {
	id: 1,
	name: 'Chike'
};

var Query = function () {
	/**
  * Required method
  * @param {object} payload Object containig fields
  * @param {object} options Object containing additional options
  */
	function Query(payload, collection) {
		var fields = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
		var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

		_classCallCheck(this, Query);

		this.payload = payload;
		this.errorMsg = null;
		this.collection = collection;
		this.collections = [].concat(_toConsumableArray(_data2.default[collection]));
		this.fields = fields;
		this.checkProp = _validate2.default.checkType(this.payload, type);
		this.results = null;
		this.rsvp = {};
		this.user = user;
	}

	_createClass(Query, [{
		key: 'unique',
		value: function () {
			var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(payload, params) {
				var _this = this;

				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								return _context.abrupt('return', new Promise(function (resolve, reject) {
									if (!params) resolve(true);
									params.forEach(function (param) {
										_this.collections.filter(function (collection) {
											if (collection[param] === payload[param]) {
												_this.errorMsg = '\'' + payload[param] + '\' as ' + param.toUpperCase() + ' field title already in use.';
												_this.code = 400;
												return reject(_this.errorMsg);
											}
											return resolve(true);
										});
									});
								}));

							case 1:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function unique(_x3, _x4) {
				return _ref.apply(this, arguments);
			}

			return unique;
		}()
	}, {
		key: 'save',
		value: function () {
			var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
				var _this2 = this;

				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								return _context2.abrupt('return', this.addQuery().then(function (res) {
									if (res) _this2.collections.push(_this2.payload);
									return Promise.resolve(_this2.payload);
								}).catch(function (err) {
									return Promise.reject(err);
								}));

							case 1:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function save() {
				return _ref2.apply(this, arguments);
			}

			return save;
		}()
	}, {
		key: 'update',
		value: function update(index) {
			this.collections[index] = this.payload;
			return this.payload;
		}
	}, {
		key: 'getID',
		value: function getID() {
			return this.collections.length + 1;
		}
	}, {
		key: 'getUser',
		value: function getUser() {
			return this.user;
		}

		// eslint-disable-next-line class-methods-use-this

	}, {
		key: 'addTImeStamp',
		value: function addTImeStamp() {
			var date = new Date();
			var formatted = (0, _moment2.default)(date).format('MM-DD-YYYY');
			return formatted;
		}

		// PREPARE FOR MEETUP

	}, {
		key: 'prepareMeetup',
		value: function prepareMeetup() {
			this.payload.id = this.getID();
			this.payload.createdOn = this.addTImeStamp();
			return this.payload;
		}
	}, {
		key: 'prepareQuestions',
		value: function prepareQuestions() {
			this.payload.id = this.getID();
			this.payload.createdOn = this.addTImeStamp();
			this.payload.createdBy = 1;
			this.payload.meetup = 1;
			this.payload.votes = 0;
			this.payload.upVoted = [];
			this.payload.downVoted = [];
			this.payload.permitted = true;
			return this.payload;
		}
	}, {
		key: 'prepareRsvps',
		value: function prepareRsvps() {
			this.payload.createdOn = this.addTImeStamp();
			this.payload.id = this.getID();
			this.payload.meetup = parseInt(this.payload.meetup, 10);
			this.payload.user = this.getUser().id;
			return this.payload;
		}

		// PREPARE FOR QUESTIONS

	}, {
		key: 'prepare',
		value: function prepare() {
			switch (this.collection) {
				case 'questions':
					return this.prepareQuestions();
				case 'rsvps':
					return this.prepareRsvps();
				default:
					return this.prepareMeetup();
			}
		}
	}, {
		key: 'addQuery',
		value: function () {
			var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
				var _this3 = this;

				return regeneratorRuntime.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								return _context3.abrupt('return', new Promise(function (resolve, reject) {
									_this3.unique(_this3.payload, _this3.fields).then(function (res) {
										return resolve(_this3.prepare());
									}).catch(function (err) {
										return reject(err);
									});
								}));

							case 1:
							case 'end':
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			function addQuery() {
				return _ref3.apply(this, arguments);
			}

			return addQuery;
		}()
	}, {
		key: 'getRecord',
		value: function getRecord() {
			if (this.checkProp !== true) {
				this.errorMsg = this.checkProp;
				this.code = 400;
				return false;
			}
			this.results = _filters2.default.sortArrayById(this.collections, this.payload);
			if (!this.results) {
				this.errorMsg = 'Record not found';
				this.code = 404;
			}
			return this.results;
		}
	}, {
		key: 'getAllRecords',
		value: function getAllRecords() {
			return this.collections;
		}
	}]);

	return Query;
}();

exports.default = Query;
//# sourceMappingURL=query.js.map