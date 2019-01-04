'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _v = require('./v1');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = _express2.default.Router();
// Create Versioning for Child routes -- v*
Router.use('/v1', _v2.default);

// Export Base Router
exports.default = Router;
//# sourceMappingURL=router.js.map