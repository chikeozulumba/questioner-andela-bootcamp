/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

// @route GET /api/v1/meetups
// @desc  Create meetup route

describe('Create new meetup', () => {
	it('should return status 200 with payload of newly created meetup record', (done) => {
		chai
			.request(app)
			.post('/api/v1/meetups')
			.send({
				createdOn: 'Monday, 31st December 2018',
				location: 'Lagos',
				images: 'http://localhost:5100/api/v1/image.png',
				topic: 'Kubernetes@a',
				happeningOn: 'Monday, 31st December 2018',
				Tags: 'api, endpoints',
			})
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.an('boolean').and.to.be.true;
				expect(res.body).to.be.an('object');
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
				topic: 'Kubernetes Conference @ Tech Zone',
				happeningOn: 'Monday, 31st December 2018',
				Tags: 'api, endpoints',
			})
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.status).to.be.a('boolean').and.to.be.false;
				expect(res.body).to.have.property('error').and.to.be.a('string');
				done();
			});
	});
});

describe('Get SPECIFIC meetup record', () => {
	it('should return status 200 with specific meetup record.', (done) => {
		chai
			.request(app)
			.get('/api/v1/meetups/1')
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.a('boolean').and.to.be.true;
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
				expect(res.body.status).to.be.a('boolean').and.to.be.false;
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
				expect(res.body.status).to.be.a('boolean').and.to.be.false;
				expect(res.body).to.have.property('error').and.to.be.a('string');
				done();
			});
	});
});

describe('Get ALL meetup records', () => {
	it('should return status 200 with all meetup records.', (done) => {
		chai
			.request(app)
			.get('/api/v1/meetups/')
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.a('boolean').and.to.be.true;
				expect(res.body).to.have.property('data').and.to.be.an('array');
				done();
			});
	});
});
