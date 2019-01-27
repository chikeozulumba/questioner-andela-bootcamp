/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const request = require('supertest')(app);

const { expect } = chai;
chai.use(chaiHttp);

let userToken = null; // AUTH TOKEN
let userTwoToken = null; // AUTH TOKEN
let adminToken = null; // AUTH TOKEN
before((done) => {
	const admin = {
		email: 'chinwe@gmail.com',
		password: 'TochiOzulumba',
	};
	const user = {
		email: 'amaka@gmail.com',
		password: 'AdakuNwanne',
	};
	const userTwo = {
		email: 'adaku@gmail.com',
		password: 'AdakuNwanne',
	};
	request.post('/api/v1/auth/signin')
		.send(user)
		.end((err, res) => {
			if (err) throw err;
			userToken = res.body.data[0].token;
		});
	request.post('/api/v1/auth/signin')
		.send(userTwo)
		.end((err, res) => {
			if (err) throw err;
			userTwoToken = res.body.data[0].token;
		});
	request.post('/api/v1/auth/signin')
		.send(admin)
		.end((err, res) => {
			if (err) throw err;
			adminToken = res.body.data[0].token;
			done();
		});
});

describe('POST /api/v1/meetups', () => {
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
			.set('Authorization', adminToken)
			.send(payload)
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res.body.status).to.be.a('number');
				expect(res.body.data).to.be.an('array');
				expect(payload.topic).to.be.equal(res.body.data[0].topic);
				expect(payload.tags.split(',').length).to.be.equal(res.body.data[0].tags.length);
				done();
			});
	});

	it('should return status 400 when fields titles already exist on the collection.', (done) => {
		chai
			.request(app)
			.post('/api/v1/meetups')
			.set('Authorization', userToken)
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

describe('GET /api/v1/meetups/:id', () => {
	it('should return status 200 with specific meetup record.', (done) => {
		chai
			.request(app)
			.get('/api/v1/meetups/1')
			.set('Authorization', userToken)
			.end((err, res) => {
				expect(res.body.status).to.be.a('number').and.to.equals(200);
				expect(res.body).to.have.property('data').and.to.be.an('array');
				done();
			});
	});

	it('should return status 404 when specific meetup record isn\'t found.', (done) => {
		chai
			.request(app)
			.get('/api/v1/meetups/9999999')
			.set('Authorization', userToken)
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
			.set('Authorization', userToken)
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.status).to.be.a('number').and.to.equals(400);
				expect(res.body).to.have.property('error').and.to.be.a('object');
				done();
			});
	});
});

describe('GET /api/v1/meetups', () => {
	it('should return status 200 with all meetup records.', (done) => {
		chai
			.request(app)
			.get('/api/v1/meetups/')
			.set('Authorization', userToken)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.a('number').and.to.equals(200);
				expect(res.body).to.have.property('data').and.to.be.an('array');
				done();
			});
	});
});

describe('POST /api/v1/meetups/:id/rsvp', () => {
	it('should return status 200 with rsvp record.', (done) => {
		chai
			.request(app)
			.post('/api/v1/meetups/1/rsvp')
			.set('Authorization', userTwoToken)
			.send({
				response: 'yes',
				meetup: 1,
			})
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res.body.status).to.be.a('number').and.to.equals(201);
				expect(res.body).to.have.property('data').and.to.be.an('array');
				done();
			});
	});

	it('should return status 409 when user is already existing on rsvp record.', (done) => {
		chai
			.request(app)
			.post('/api/v1/meetups/1/rsvp')
			.set('Authorization', userToken)
			.send({
				response: 'yes',
				meetup: 1,
			})
			.end((err, res) => {
				expect(res).to.have.status(409);
				expect(res.body.status).to.be.a('number').and.to.equals(409);
				expect(res.body).to.have.property('error').and.to.be.an('string');
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
			.set('Authorization', userToken)
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
			.set('Authorization', userToken)
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
			.set('Authorization', userToken)
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

describe('GET /api/v1/meetups/upcoming', () => {
	it('should return status 200 all upcoming meetup records.', (done) => {
		chai
			.request(app)
			.get('/api/v1/meetups/upcoming')
			.set('Authorization', userToken)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.a('number').and.to.equals(200);
				expect(res.body).to.have.property('data').and.to.be.an('array');
				done();
			});
	});
});

describe('DELETE /api/v1/meetups/:id', () => {
	it('should return status 202 for an Admin to delete meetup record', (done) => {
		chai
			.request(app)
			.delete('/api/v1/meetups/5')
			.set('Authorization', adminToken)
			.end((err, res) => {
				expect(res).to.have.status(202);
				expect(res.body.status).to.be.a('number').and.to.equals(202);
				expect(res.body).to.have.property('data').and.to.be.an('string').and.to.be.equals('Meetup record successfully removed.');
				done();
			});
	});

	it('should return status 403 for a User that attempts to delete meetup record', (done) => {
		chai
			.request(app)
			.delete('/api/v1/meetups/1')
			.set('Authorization', userToken)
			.end((err, res) => {
				expect(res).to.have.status(403);
				expect(res.body.status).to.be.a('number').and.to.equals(403);
				expect(res.body).to.have.property('error').and.to.be.an('string');
				done();
			});
	});
});

describe('PUT /api/v1/meetups/:id/tags', () => {
	it('should return status 200 for an Admin to add to meetup tags', (done) => {
		const payload = {
			tags: 'alc, google, facebook, abuja, kubernetes',
		};
		chai
			.request(app)
			.put('/api/v1/meetups/1/tags')
			.send(payload)
			.set('Authorization', adminToken)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.a('number').and.to.equals(200);
				expect(res.body.data[0].tags).to.be.an('array');
				done();
			});
	});

	it('should return status 403 for an Normal user attempting to add to meetup tags', (done) => {
		const payload = {
			tags: 'alc, google, facebook, abuja, kubernetes',
		};
		chai
			.request(app)
			.put('/api/v1/meetups/1/tags')
			.send(payload)
			.set('Authorization', userToken)
			.end((err, res) => {
				expect(res).to.have.status(403);
				expect(res.body.status).to.be.a('number').and.to.equals(403);
				expect(res.body.error).to.be.an('string');
				done();
			});
	});

	it('should return status 404 for an a meetup that is not available', (done) => {
		const payload = {
			tags: 'alc, google, facebook, abuja, kubernetes',
		};
		chai
			.request(app)
			.put('/api/v1/meetups/20/tags')
			.send(payload)
			.set('Authorization', adminToken)
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body.status).to.be.a('number').and.to.equals(404);
				expect(res.body.error).to.be.an('string');
				done();
			});
	});
});

describe('PUT /api/v1/meetups/:id/images', () => {
	it('should return status 200 for an Admin to add to meetup images', (done) => {
		const payload = {
			images: 'https://facebook.com/picture.png, https://insta.com/picture.png',
		};
		chai
			.request(app)
			.put('/api/v1/meetups/1/images')
			.send(payload)
			.set('Authorization', adminToken)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.a('number').and.to.equals(200);
				expect(res.body.data[0].tags).to.be.an('array');
				done();
			});
	});

	it('should return status 403 for an Normal user attempting to add to meetup tags', (done) => {
		const payload = {
			images: 'https://facebook.com/picture.png, https://youyou.com/picture.png',
		};
		chai
			.request(app)
			.put('/api/v1/meetups/1/images')
			.send(payload)
			.set('Authorization', userToken)
			.end((err, res) => {
				expect(res).to.have.status(403);
				expect(res.body.status).to.be.a('number').and.to.equals(403);
				expect(res.body.error).to.be.an('string');
				done();
			});
	});

	it('should return status 404 for an a meetup that is not available', (done) => {
		const payload = {
			images: 'https://facebook.com/picture.png, https://facebook.com/picture.png',
		};
		chai
			.request(app)
			.put('/api/v1/meetups/20/images')
			.send(payload)
			.set('Authorization', adminToken)
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body.status).to.be.a('number').and.to.equals(404);
				expect(res.body.error).to.be.an('string');
				done();
			});
	});

	it('should return status 400 when attempting to add an invalid url', (done) => {
		const payload = {
			images: 'https://facebook.com/picture.png, https://facebook.com/picture.png, https://facebook     #.com/picture.png',
		};
		chai
			.request(app)
			.put('/api/v1/meetups/20/images')
			.send(payload)
			.set('Authorization', adminToken)
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.status).to.be.a('number').and.to.equals(400);
				expect(res.body.error).to.be.an('object');
				done();
			});
	});
});
