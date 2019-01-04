'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect; /* eslint-disable no-unused-expressions */

_chai2.default.use(_chaiHttp2.default);

// @route GET /api/v1/meetups
// @desc  Create meetup route

describe('User can create a new meetup', function () {
	it('should return status 200 with payload of newly created meetup record', function (done) {
		_chai2.default.request(_app2.default).post('/api/v1/meetups').send({
			createdOn: 'Monday, 31st December 2018',
			location: 'Lagos',
			images: 'http://localhost:5100/api/v1/image.png',
			topic: 'Kubernetes@a',
			happeningOn: 'Monday, 31st December 2018',
			Tags: 'api, endpoints'
		}).end(function (err, res) {
			expect(res).to.have.status(200);
			expect(res.body.status).to.be.an('boolean').and.to.be.true;
			expect(res.body).to.be.an('object');
			done();
		});
	});

	it('should return status 400 when fields titles already exist on the collection.', function (done) {
		_chai2.default.request(_app2.default).post('/api/v1/meetups').send({
			createdOn: 'Monday, 31st December 2018',
			location: 'Lagos',
			images: 'http://localhost:5100/api/v1/image.png',
			topic: 'Kubernetes Conference @ Tech Zone',
			happeningOn: 'Monday, 31st December 2018',
			Tags: 'api, endpoints'
		}).end(function (err, res) {
			expect(res).to.have.status(400);
			expect(res.body.status).to.be.a('boolean').and.to.be.false;
			expect(res.body).to.have.property('error').and.to.be.a('string');
			done();
		});
	});
});

describe('User can get a SPECIFIC meetup record', function () {
	it('should return status 200 with specific meetup record.', function (done) {
		_chai2.default.request(_app2.default).get('/api/v1/meetups/1').end(function (err, res) {
			expect(res).to.have.status(200);
			expect(res.body.status).to.be.a('boolean').and.to.be.true;
			expect(res.body).to.have.property('data').and.to.be.an('object');
			done();
		});
	});

	it('should return status 404 when specific meetup record isn\'t found.', function (done) {
		_chai2.default.request(_app2.default).get('/api/v1/meetups/9999999').end(function (err, res) {
			expect(res).to.have.status(404);
			expect(res.body.status).to.be.a('boolean').and.to.be.false;
			expect(res.body).to.have.property('error').and.to.be.a('string');
			done();
		});
	});

	it('should return status 400 when invalid parameter is passed.', function (done) {
		_chai2.default.request(_app2.default).get('/api/v1/meetups/q1jkekfbebjhrejb-1nsdjhjreh').end(function (err, res) {
			expect(res).to.have.status(400);
			expect(res.body.status).to.be.a('boolean').and.to.be.false;
			expect(res.body).to.have.property('error').and.to.be.a('string');
			done();
		});
	});
});

describe('User can get ALL meetup records', function () {
	it('should return status 200 with all meetup records.', function (done) {
		_chai2.default.request(_app2.default).get('/api/v1/meetups/').end(function (err, res) {
			expect(res).to.have.status(200);
			expect(res.body.status).to.be.a('boolean').and.to.be.true;
			expect(res.body).to.have.property('data').and.to.be.an('array');
			done();
		});
	});
});

describe('User can RSVP for a meetup', function () {
	it('should return status 200 with rsvp record.', function (done) {
		_chai2.default.request(_app2.default).post('/api/v1/meetups/1/rsvp').send({
			response: 'yes',
			meetup: 1
		}).end(function (err, res) {
			expect(res).to.have.status(200);
			expect(res.body.status).to.be.a('boolean').and.to.be.true;
			expect(res.body).to.have.property('data').and.to.be.an('object');
			done();
		});
	});
	it('should return status 400 when required field(s) is/are missing.', function (done) {
		_chai2.default.request(_app2.default).post('/api/v1/meetups/1/rsvp').send({
			meetup: 1
		}).end(function (err, res) {
			expect(res).to.have.status(400);
			expect(res.body.status).to.be.a('boolean').and.to.be.false;
			expect(res.body).to.have.property('error').and.to.be.an('string');
			done();
		});
	});
	it('should return status 400 when meetup to RSVP isn\'t available.', function (done) {
		_chai2.default.request(_app2.default).post('/api/v1/meetups/200/rsvp').send({
			meetup: 1
		}).end(function (err, res) {
			expect(res).to.have.status(400);
			expect(res.body.status).to.be.a('boolean').and.to.be.false;
			expect(res.body).to.have.property('error').and.to.be.an('string');
			done();
		});
	});
});

describe('User can can get all upcoming meetups', function () {
	it('should return status 200 all upcoming meetup records.', function (done) {
		_chai2.default.request(_app2.default).get('/api/v1/meetups/upcoming/asc').end(function (err, res) {
			expect(res).to.have.status(200);
			expect(res.body.status).to.be.a('boolean').and.to.be.true;
			expect(res.body).to.have.property('data').and.to.be.an('array');
			done();
		});
	});
});
//# sourceMappingURL=meetup.spec.js.map