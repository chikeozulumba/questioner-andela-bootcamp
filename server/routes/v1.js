'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _Meetup = require('../controllers/Meetup');

var _Meetup2 = _interopRequireDefault(_Meetup);

var _Question = require('../controllers/Question');

var _Question2 = _interopRequireDefault(_Question);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
router.use(_express2.default.static('UI'));
router.use('/UI', _express2.default.static(_path2.default.resolve(__dirname, '../../UI/')));
router.use(_bodyParser2.default.urlencoded({ extended: true }));
router.use(_bodyParser2.default.json());
router.use((0, _morgan2.default)('combined', {
	skip: function skip(req, res) {
		return res.statusCode < 400;
	}
}));

// @route POST /api/v1/meetups
// @desc  Create meetup
// @access public

router.post('/meetups', _Meetup2.default.create);

// @route POST /api/v1/questions
// @desc  Create question
// @access public

router.post('/questions', _Question2.default.create);

// @route GET /api/v1/meetups/<meetup-id>
// @desc  Get Specific Meetup record
// @access public

router.get('/meetups/:id', _Meetup2.default.getRecord);

// @route GET /api/v1/meetups/
// @desc  Get all meetups
// @access public

router.get('/meetups/', _Meetup2.default.getAllRecords);

// @route PATCH /api/v1/questions/<question-id>/upvote
// @desc  Upvote a question
// @access public

router.patch('/questions/:id/upvote', _Question2.default.vote);

// @route PATCH /api/v1/questions/<question-id>/downvote
// @desc  Downvote a question
// @access public

router.patch('/questions/:id/downvote', _Question2.default.vote);

// @route PATCH /api/v1/meetups/<meetup-id>/rsvp
// @desc  RSVP for a meetup
// @access public

router.post('/meetups/:id/rsvp', _Meetup2.default.rsvp);

// @route PATCH /api/v1/meetups/upcoming
// @desc  Fetch all upcoming meetup records
// @access public

router.get('/meetups/upcoming/asc', _Meetup2.default.upcoming);

exports.default = router;
//# sourceMappingURL=v1.js.map