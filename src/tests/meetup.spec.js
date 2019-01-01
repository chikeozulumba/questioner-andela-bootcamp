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
				topic: 'Kubernetes@',
				happeningOn: 'Monday, 31st December 2018',
				Tags: 'api, endpoints',
			})
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.status).to.be.a('boolean').and.to.be.false;
				expect(res.body).to.have.property('error').and.to.have.property('message').and.to.be.a('string');
				done();
			});
	});
});
