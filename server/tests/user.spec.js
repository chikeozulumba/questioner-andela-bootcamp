/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const request = require('supertest')(app);

const { expect } = chai;
chai.use(chaiHttp);

describe('POST /api/auth/signup', () => {
	it('should return status 201 when new user record is created', (done) => {
		const payload = {
			firstName: 'Chike Ozulumba',
			lastName: 'Lagos',
			phone: '+2348131976306',
			email: 'test@andela.com',
			password: 'AndelaTest',
		};
		chai
			.request(app)
			.post('/api/v1/auth/signup')
			.send(payload)
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res.body.status).to.be.a('number');
				expect(res.body.data).to.be.an('object');
				expect(res.body.data).to.have.property('token').to.be.a('string');
				expect(res.body.data).to.have.property('user').to.be.an('object');
				expect(res.body.data.user).to.have.property('email').to.be.a('string');
				expect(res.body.data.user.email).to.be.equals(payload.email);
				done();
			});
	});

	it('should return status 409 when user signs up with already existing fields.', (done) => {
		const payload = {
			firstName: 'Chike Ozulumba',
			lastName: 'Lagos',
			phone: '+2348131976306',
			email: 'test@andela.com',
			password: 'AndelaTest',
		};
		chai
			.request(app)
			.post('/api/v1/auth/signup')
			.send(payload)
			.end((err, res) => {
				expect(res).to.have.status(409);
				expect(res.body.status).to.be.a('number').and.to.be.equal(409);
				expect(res.body).to.have.property('error').and.to.be.a('string');
				done();
			});
	});
});

describe('POST /api/v1/auth/signin', () => {
	it('should return status 200 with when sign in is successful.', (done) => {
		const payload = {
			email: 'chinwe@gmail.com',
			password: 'TochiOzulumba',
		};
		chai
			.request(app)
			.post('/api/v1/auth/signin')
			.send(payload)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.a('number');
				expect(res.body.data).to.be.an('object');
				expect(res.body.data).to.have.property('token').to.be.an('string');
				expect(res.body.data).to.have.property('user').to.be.an('object');
				expect(res.body.data.user).to.have.property('email').to.be.an('string');
				expect(res.body.data.user.email).to.be.equals(payload.email);
				done();
			});
	});

	it('should return status 404 with email field does not exist on database.', (done) => {
		const payload = {
			email: 'angel@andela.com',
			password: 'AndelaTest',
		};
		chai
			.request(app)
			.post('/api/v1/auth/signin')
			.send(payload)
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body.status).to.be.a('number');
				expect(res.body).to.have.property('error').and.to.be.a('string');
				done();
			});
	});

	it('should return status 401 for invalid password or email combination.', (done) => {
		const payload = {
			email: 'chinwe@gmail.com',
			password: 'AndelaTest',
		};
		chai
			.request(app)
			.post('/api/v1/auth/signin')
			.send(payload)
			.end((err, res) => {
				expect(res).to.have.status(401);
				expect(res.body.status).to.be.a('number');
				expect(res.body).to.have.property('error').and.to.be.a('string');
				done();
			});
	});
});
