'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;

_chai2.default.use(_chaiHttp2.default);

describe('User should be able to visit Frontend pages', function () {
	it('should return status 200', function (done) {
		_chai2.default.request(_app2.default).get('/api/v1/').end(function (err, res) {
			if (err) throw err;
			expect(res).to.have.status(200);
			done();
		});
	});
});
//# sourceMappingURL=index.spec.js.map