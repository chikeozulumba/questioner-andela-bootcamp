/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

// @route GET /api/v1/meetups
// @desc  Create meetup route

describe('User can create a new meetup', () => {
	it('should return status 201 with payload of newly created meetup record', (done) => {
		const payload = {
			createdOn: 'Monday, 31st December 2018',
			location: 'Lagos',
			images: 'http://localhost:5100/api/v1/image.png',
			topic: 'Kubernetesa',
			happeningOn: 'Monday, 31st December 2018',
			tags: 'api, endpoints',
		};
		chai
			.request(app)
			.post('/api/v1/meetups')
			.send(payload)
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res.body.status).to.be.a('number');
				expect(res.body.data).to.be.an('object');
				expect(payload.topic).to.be.equal(res.body.data.topic);
				expect(payload.tags.split(',').length).to.be.equal(res.body.data.tags.length);
				done();
			});
	});

	it('should return status 400 when fields titles already exist on the collection.', (done) => {
		chai
			.request(app)
			.post('/api/v1/meetups')
			.send({
				createdOn: 'Monday, 31st December 2018',
				location: 'Lagos',
				images: 'http://localhost:5100/api/v1/image.png',
				topic: 'Kubernetes Conference Tech Zone',
				happeningOn: 'Monday, 31st December 2018',
				Tags: 'api, endpoints',
			})
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.status).to.be.a('number').and.to.be.equal(400);
				expect(res.body).to.have.property('error').and.to.be.a('object');
				done();
			});
	});
});

describe('User can get a SPECIFIC meetup record', () => {
	it('should return status 200 with specific meetup record.', (done) => {
		chai
			.request(app)
			.get('/api/v1/meetups/1')
			.end((err, res) => {
				expect(res.body.status).to.be.a('number').and.to.equals(200);
				expect(res.body).to.have.property('data').and.to.be.an('object');
				done();
			});
	});

	it('should return status 404 when specific meetup record isn\'t found.', (done) => {
		chai
			.request(app)
			.get('/api/v1/meetups/9999999')
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body.status).to.be.a('number').and.to.equals(404);
				expect(res.body).to.have.property('error').and.to.be.a('string');
				done();
			});
	});

	it('should return status 400 when invalid parameter is passed.', (done) => {
		chai
			.request(app)
			.get('/api/v1/meetups/q1jkekfbebjhrejb-1nsdjhjreh')
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.status).to.be.a('number').and.to.equals(400);
				expect(res.body).to.have.property('error').and.to.be.a('object');
				done();
			});
	});
});

describe('User can get ALL meetup records', () => {
	it('should return status 200 with all meetup records.', (done) => {
		chai
			.request(app)
			.get('/api/v1/meetups/')
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.a('number').and.to.equals(200);
				expect(res.body).to.have.property('data').and.to.be.an('array');
				done();
			});
	});
});

describe('User can RSVP for a meetup', () => {
	it('should return status 200 with rsvp record.', (done) => {
		chai
			.request(app)
			.post('/api/v1/meetups/1/rsvp')
			.send({
				response: 'yes',
				meetup: 1,
				user: Math.random(100, 9999999),
			})
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res.body.status).to.be.a('number').and.to.equals(201);
				expect(res.body).to.have.property('data').and.to.be.an('array');
				done();
			});
	});

	it('should return status 409 when user is already on rsvp record.', (done) => {
		const payload = {
			response: 'yes',
			user: 2,
		};
		chai
			.request(app)
			.post('/api/v1/meetups/1/rsvp')
			.send(payload)
			.end((err, res) => {
				expect(res).to.have.status(409);
				expect(res.body.status).to.be.a('number').and.to.equals(409);
				expect(res.body).to.have.property('error').and.to.be.a('string');
				done();
			});
	});

	it('should return status 400 when required field(s) is/are missing.', (done) => {
		chai
			.request(app)
			.post('/api/v1/meetups/1/rsvp')
			.send({
				meetup: 1,
			})
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.status).to.be.a('number').and.to.equals(400);
				expect(res.body).to.have.property('error').and.to.be.an('object');
				done();
			});
	});
	it('should return status 400 when meetup to RSVP isn\'t available.', (done) => {
		chai
			.request(app)
			.post('/api/v1/meetups/200/rsvp')
			.send({
				meetup: 1,
			})
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body.status).to.be.a('number').and.to.equals(404);
				expect(res.body).to.have.property('error').and.to.be.a('string');
				done();
			});
	});
});

describe('User can can get all upcoming meetups', () => {
	it('should return status 200 all upcoming meetup records.', (done) => {
		chai
			.request(app)
			.get('/api/v1/meetups/upcoming')
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.a('number').and.to.equals(200);
				expect(res.body).to.have.property('data').and.to.be.an('array');
				done();
			});
	});
});
