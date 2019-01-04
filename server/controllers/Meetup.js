'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validate = require('../functions/validate');

var _validate2 = _interopRequireDefault(_validate);

var _handlers = require('../functions/handlers');

var _query = require('../functions/query');

var _query2 = _interopRequireDefault(_query);

var _filters = require('../functions/filters');

var _filters2 = _interopRequireDefault(_filters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var validateOptions = {
	required: ['topic', 'Tags', 'happeningOn', 'location'], // Required fields
	format: ['topic'] // Check Format
};

var meetups = 'meetups';
var rsvps = 'rsvps';

/**
 * Create Meetup Class
 */

var Meetup = function () {
	function Meetup() {
		_classCallCheck(this, Meetup);
	}

	_createClass(Meetup, null, [{
		key: 'create',

		/**
   * @param {object} req Controls Meetup Request
   * @param {object} res Controls to Meetup Response
   */
		value: function create(req, res) {
			var payload = req.body;
			var validation = _validate2.default.init(payload, validateOptions);
			if (validation !== true && typeof validation === 'string') return (0, _handlers.errorRxx)(res, 400, false, validation);

			var params = {
				arrays: ['Tags', 'images']
			};
			payload = _validate2.default.prepareContent(payload, params);
			// ADD TO MEETUPS DATA
			var query = new _query2.default(payload, meetups, ['topic']);
			// SAVE MEETUP
			return query.save().then(function (docs) {
				return (0, _handlers.response2xx)(res, 200, true, docs);
			}).catch(function (err) {
				return (0, _handlers.errorRxx)(res, query.code, false, err);
			});
		}
	}, {
		key: 'getRecord',
		value: function getRecord(req, res) {
			var id = req.params.id;
			var query = new _query2.default(id, meetups, null, 'integer');
			var queryRecords = query.getRecord();
			if (!queryRecords) return (0, _handlers.errorRxx)(res, query.code, false, query.errorMsg);
			return (0, _handlers.response2xx)(res, 200, true, queryRecords);
		}
	}, {
		key: 'getAllRecords',
		value: function getAllRecords(req, res) {
			var query = new _query2.default(null, meetups, null, null);
			var queryAllRecords = query.getAllRecords();
			return (0, _handlers.response2xx)(res, 200, true, queryAllRecords);
		}
	}, {
		key: 'rsvp',
		value: function rsvp(req, res) {
			var id = req.params.id;
			var payload = req.body;
			var query = new _query2.default(id, rsvps, null, 'integer');
			var queryRecords = query.getRecord();
			validateOptions = {
				required: ['meetup', 'response'] // Required fields
			};
			var validation = _validate2.default.init(payload, validateOptions);
			if (validation !== true && typeof validation === 'string') return (0, _handlers.errorRxx)(res, 400, false, validation);
			if (!queryRecords) return (0, _handlers.errorRxx)(res, query.code, false, query.errorMsg);
			query.payload = payload;
			query.rsvp.id = id;
			return query.save().then(function (docs) {
				return (0, _handlers.response2xx)(res, 200, true, docs);
			}).catch(function (err) {
				return (0, _handlers.errorRxx)(res, 400, false, err);
			});
		}
	}, {
		key: 'upcoming',
		value: function upcoming(req, res) {
			var query = new _query2.default(null, meetups, null, null);
			var formatByDateAsc = _filters2.default.date(query.getAllRecords());
			return (0, _handlers.response2xx)(res, 200, true, formatByDateAsc);
		}
	}]);

	return Meetup;
}();

exports.default = Meetup;
//# sourceMappingURL=Meetup.js.map