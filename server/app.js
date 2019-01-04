'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

require('./config/index');

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _router = require('./routes/router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Middlewares
var app = (0, _express2.default)();
// eslint-disable-next-line import/no-extraneous-dependencies

app.use((0, _cors2.default)());
app.use('/api', _router2.default);
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());
app.use((0, _morgan2.default)('combined', {
	skip: function skip(req, res) {
		return res.statusCode < 400;
	}
}));
app.use(_express2.default.static('UI'));
app.use('/UI', _express2.default.static(_path2.default.resolve(__dirname, '../../UI/')));

var PORT = process.env.PORT || 3001;

app.listen(PORT);

exports.default = app;
//# sourceMappingURL=app.js.map