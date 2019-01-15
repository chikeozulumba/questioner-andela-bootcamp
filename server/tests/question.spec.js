/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

describe('User can create a new question', () => {
	it('should return status 200 with content of newly created question record', (done) => {
		chai
			.request(app)
			.post('/api/v1/questions')
			.send({
				title: 'What are federated clusters?',
				body: 'Multiple Kubernetes clusters can be managed as a single cluster with the help of federated clusters.',
			})
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res.body.status).to.be.a('number').and.to.equals(201);
				expect(res.body).to.be.an('object');
				done();
			});
	});

	it('should return status 400 when fields\' that are required are not available', (done) => {
		chai
			.request(app)
			.post('/api/v1/questions')
			.send({
			})
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.status).to.be.a('number').and.to.equals(400);
				expect(res.body).to.have.property('error').and.to.be.a('object');
				done();
			});
	});

	it('should return status 400 for fields\' that don\'t meet validation rules', (done) => {
		chai
			.request(app)
			.post('/api/v1/questions')
			.send({
				title: 'NA',
				body: 'NA',
			})
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.status).to.be.a('number').and.to.equals(400);
				expect(res.body).to.have.property('error').and.to.be.a('object');
				done();
			});
	});

	it('should return status 400 for fields\' that contain illegal characters', (done) => {
		chai
			.request(app)
			.post('/api/v1/questions')
			.send({
				title: 'What###%^^^^',
				body: 'As a typical application would have a cluster of containers running across multiple hosts, all these containers would need to talk to each other.',
			})
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.status).to.be.a('number').and.to.equals(400);
				expect(res.body).to.have.property('error').and.to.be.a('object');
				done();
			});
	});

	it('should return status 400 for fields\' if required field is empty', (done) => {
		chai
			.request(app)
			.post('/api/v1/questions')
			.send({
				title: '',
				body: 'As a typical application would have a cluster of containers running across multiple hosts, all these containers would need to talk to each other.',
			})
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.status).to.be.a('number').and.to.equals(400);
				expect(res.body).to.have.property('error').and.to.be.a('object');
				done();
			});
	});
});

describe('User can upvote or downvote a specific question', () => {
	it('should return status 200 when User upvotes a question', (done) => {
		chai
			.request(app)
			.patch('/api/v1/questions/1/upvote')
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.a('number').and.to.equal(200);
				expect(res.body).to.have.property('data').and.to.be.an('object');
				expect(res.body.data).to.have.property('votes').and.to.be.a('number');
				done();
			});
	});

	it('should return status 200 when User downvotes a question', (done) => {
		chai
			.request(app)
			.patch('/api/v1/questions/1/downvote')
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.a('number').and.to.equal(200);
				expect(res.body).to.have.property('data').and.to.be.an('object');
				expect(res.body.data).to.have.property('votes').and.to.be.a('number');
				done();
			});
	});

	it('should return status 400 when User downvotes a question that doesn\'t exist', (done) => {
		chai
			.request(app)
			.patch('/api/v1/questions/222222222/downvote')
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body.status).to.be.a('number').and.to.equal(404);
				expect(res.body).to.have.property('error').and.to.be.an('string');
				done();
			});
	});

	it('should return status 500 when User downvotes a question that is impossible to exist', (done) => {
		chai
			.request(app)
			.patch('/api/v1/questions/999999999999/downvote')
			.end((err, res) => {
				expect(res).to.have.status(500);
				expect(res.body.status).to.be.a('number').and.to.equal(500);
				expect(res.body).to.have.property('error').and.to.be.an('string');
				done();
			});
	});

	it('should not be able to vote below 0 vote count', (done) => {
		chai
			.request(app)
			.patch('/api/v1/questions/3/downvote')
			.end((err, res) => {
				console.log(res.status);
				expect(res).to.have.status(200);
				expect(res.body).to.have.property('data').and.to.be.an('object');
				expect(res.body.data).to.have.property('votes').and.to.be.a('number');
				expect(res.body.data.votes).to.not.be.lessThan(0);
				done();
			});
	});
});
