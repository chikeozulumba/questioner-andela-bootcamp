/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

// @route GET /api/v1/questions
// @desc  Create question route

describe('Create new question record', () => {
	it('should return status 200 with payload of newly created question record', (done) => {
		chai
			.request(app)
			.post('/api/v1/questions')
			.send({
				title: 'What are federated clusters?',
				body: 'Multiple Kubernetes clusters can be managed as a single cluster with the help of federated clusters.',
			})
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.an('boolean').and.to.be.true;
				expect(res.body).to.be.an('object');
				done();
			});
	});

	it('should return status 400 when fields\' titles already exist on the collection.', (done) => {
		chai
			.request(app)
			.post('/api/v1/questions')
			.send({
				title: 'What is Kubernetes?',
				body: 'Multiple Kubernetes clusters can be managed as a single cluster with the help of federated clusters.',
			})
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.status).to.be.a('boolean').and.to.be.false;
				expect(res.body).to.have.property('error').and.to.be.a('string');
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
				expect(res.body.status).to.be.a('boolean').and.to.be.false;
				expect(res.body).to.have.property('error').and.to.be.a('string');
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
				expect(res.body.status).to.be.a('boolean').and.to.be.false;
				expect(res.body).to.have.property('error').and.to.be.a('string');
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
				expect(res.body.status).to.be.a('boolean').and.to.be.false;
				expect(res.body).to.have.property('error').and.to.be.a('string');
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
				expect(res.body.status).to.be.a('boolean').and.to.be.false;
				expect(res.body).to.have.property('error').and.to.be.a('string');
				done();
			});
	});
});
