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

describe('User can create a new question', function () {
	it('should return status 200 with payload of newly created question record', function (done) {
		_chai2.default.request(_app2.default).post('/api/v1/questions').send({
			title: 'What are federated clusters?',
			body: 'Multiple Kubernetes clusters can be managed as a single cluster with the help of federated clusters.'
		}).end(function (err, res) {
			expect(res).to.have.status(200);
			expect(res.body.status).to.be.an('boolean').and.to.be.true;
			expect(res.body).to.be.an('object');
			done();
		});
	});

	it('should return status 400 when fields\' titles already exist on the collection.', function (done) {
		_chai2.default.request(_app2.default).post('/api/v1/questions').send({
			title: 'What is Kubernetes?',
			body: 'Multiple Kubernetes clusters can be managed as a single cluster with the help of federated clusters.'
		}).end(function (err, res) {
			expect(res).to.have.status(400);
			expect(res.body.status).to.be.a('boolean').and.to.be.false;
			expect(res.body).to.have.property('error').and.to.be.a('string');
			done();
		});
	});

	it('should return status 400 when fields\' that are required are not available', function (done) {
		_chai2.default.request(_app2.default).post('/api/v1/questions').send({}).end(function (err, res) {
			expect(res).to.have.status(400);
			expect(res.body.status).to.be.a('boolean').and.to.be.false;
			expect(res.body).to.have.property('error').and.to.be.a('string');
			done();
		});
	});

	it('should return status 400 for fields\' that don\'t meet validation rules', function (done) {
		_chai2.default.request(_app2.default).post('/api/v1/questions').send({
			title: 'NA',
			body: 'NA'
		}).end(function (err, res) {
			expect(res).to.have.status(400);
			expect(res.body.status).to.be.a('boolean').and.to.be.false;
			expect(res.body).to.have.property('error').and.to.be.a('string');
			done();
		});
	});

	it('should return status 400 for fields\' that contain illegal characters', function (done) {
		_chai2.default.request(_app2.default).post('/api/v1/questions').send({
			title: 'What###%^^^^',
			body: 'As a typical application would have a cluster of containers running across multiple hosts, all these containers would need to talk to each other.'
		}).end(function (err, res) {
			expect(res).to.have.status(400);
			expect(res.body.status).to.be.a('boolean').and.to.be.false;
			expect(res.body).to.have.property('error').and.to.be.a('string');
			done();
		});
	});

	it('should return status 400 for fields\' if required field is empty', function (done) {
		_chai2.default.request(_app2.default).post('/api/v1/questions').send({
			title: '',
			body: 'As a typical application would have a cluster of containers running across multiple hosts, all these containers would need to talk to each other.'
		}).end(function (err, res) {
			expect(res).to.have.status(400);
			expect(res.body.status).to.be.a('boolean').and.to.be.false;
			expect(res.body).to.have.property('error').and.to.be.a('string');
			done();
		});
	});
});

describe('User can upvote or downvote a specific question', function () {
	it('should return status 200 when User upvotes a question', function (done) {
		_chai2.default.request(_app2.default).patch('/api/v1/questions/1/upvote').end(function (err, res) {
			expect(res).to.have.status(200);
			expect(res.body.status).to.be.a('boolean').and.to.be.true;
			expect(res.body).to.have.property('data').and.to.be.an('object');
			expect(res.body.data).to.have.property('votes').and.to.be.a('number');
			done();
		});
	});

	it('should return status 200 when User downvotes a question', function (done) {
		_chai2.default.request(_app2.default).patch('/api/v1/questions/1/downvote').end(function (err, res) {
			expect(res).to.have.status(200);
			expect(res.body.status).to.be.a('boolean').and.to.be.true;
			expect(res.body).to.have.property('data').and.to.be.an('object');
			expect(res.body.data).to.have.property('votes').and.to.be.a('number');
			done();
		});
	});

	it('should return status 400 when User downvotes a question that doesn\'t exist', function (done) {
		_chai2.default.request(_app2.default).patch('/api/v1/questions/999999999999/downvote').end(function (err, res) {
			console.log(res.status);
			expect(res).to.have.status(404);
			expect(res.body.status).to.be.a('boolean').and.to.be.false;
			expect(res.body).to.have.property('error').and.to.be.an('string');
			done();
		});
	});

	it('should not be able to vote below 0 vote count', function (done) {
		_chai2.default.request(_app2.default).patch('/api/v1/questions/3/downvote').end(function (err, res) {
			console.log(res.status);
			expect(res).to.have.status(200);
			expect(res.body).to.have.property('data').and.to.be.an('object');
			expect(res.body.data).to.have.property('votes').and.to.be.a('number');
			expect(res.body.data.votes).to.not.be.lessThan(0);
			done();
		});
	});
});
//# sourceMappingURL=question.spec.js.map