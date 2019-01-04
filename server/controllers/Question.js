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
	required: ['title', 'body'], // Required fields
	format: ['title'] // Check Format
};

/**
 * Create Meetup Class
 */

var Question = function () {
	function Question() {
		_classCallCheck(this, Question);
	}

	_createClass(Question, null, [{
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
				arrays: []
			};
			payload = _validate2.default.prepareContent(payload, params);
			// ADD TO MEETUPS DATA
			var query = new _query2.default(payload, 'questions', ['title']);
			// SAVE MEETUP
			return query.save().then(function (docs) {
				return (0, _handlers.response2xx)(res, 200, true, docs);
			}).catch(function (err) {
				return (0, _handlers.errorRxx)(res, query.code, false, err);
			});
		}
	}, {
		key: 'vote',
		value: function vote(req, res) {
			var id = req.params.id;
			var path = _filters2.default.last(req.url.split('/'));
			var query = new _query2.default(id, 'questions', null, 'integer');
			var question = query.getRecord();
			if (!question) (0, _handlers.errorRxx)(res, query.code, false, query.errorMsg);
			if (path === 'upvote') {
				question.votes += 1;
			} else {
				if (question.votes !== 0) question.votes += 1;
				question.votes = 0;
			}
			query.payload = question;
			query.fields = ['title'];
			var pos = id - 1;
			if (query.update(pos)) (0, _handlers.response2xx)(res, 200, true, query.payload);
			return (0, _handlers.errorRxx)(res, 500, false, 'Internal server error, unable to ' + path.toUpperCase());
		}
	}]);

	return Question;
}();

exports.default = Question;
//# sourceMappingURL=Question.js.map