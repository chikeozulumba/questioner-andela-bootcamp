/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const request = require('supertest')(app);

const { expect } = chai;
chai.use(chaiHttp);

let userToken = null; // AUTH TOKEN
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
	request.post('/api/v1/auth/signin')
		.send(user)
		.end((err, res) => {
			if (err) throw err;
			userToken = res.body.data[0].token;
		});
	request.post('/api/v1/auth/signin')
		.send(admin)
		.end((err, res) => {
			if (err) throw err;
			adminToken = res.body.data[0].token;
			done();
		});
});

describe('POST /api/v1/comments/', () => {
	it('should return status 201 when User adds a comment to a question', (done) => {
		const payload = {
			comment: 'You are God',
			meetup: 1,
			questionid: 1,
		};
		chai
			.request(app)
			.post('/api/v1/comments')
			.set('Authorization', userToken)
			.send(payload)
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res.body.status).to.be.a('number').and.to.equal(201);
				expect(res.body).to.have.property('data').and.to.be.an('array');
				expect(res.body.data[0].comment).to.be.a('string').and.to.be.equal(payload.comment);
				done();
			});
	});
});

describe('PATCH /api/v1/comments/:id', () => {
	it('should return status 202 when User edits a comment to a question', (done) => {
		const payload = {
			comment: 'You are God alone!',
			meetup: 1,
		};
		chai
			.request(app)
			.patch('/api/v1/comments/35')
			.set('Authorization', userToken)
			.send(payload)
			.end((err, res) => {
				expect(res).to.have.status(202);
				expect(res.body.status).to.be.a('number').and.to.equal(202);
				expect(res.body).to.have.property('data').and.to.be.an('array');
				expect(res.body.data[0].comment).to.be.a('string').and.to.be.equal(payload.comment);
				done();
			});
	});
});

describe('DELETE /api/v1/comments/:id', () => {
	it('should return status 200 when an Admin User attempts to delete a comment', (done) => {
		chai
			.request(app)
			.delete('/api/v1//comments/2')
			.set('Authorization', adminToken)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.a('number').and.to.equal(200);
				expect(res.body).to.have.property('data').and.to.be.an('string').to.be.equal('Comment deleted successfully.');
				done();
			});
	});

	it('should return status 403 when a Normal User attempts to delete a comment', (done) => {
		chai
			.request(app)
			.delete('/api/v1/comments/6')
			.set('Authorization', userToken)
			.end((err, res) => {
				expect(res).to.have.status(403);
				expect(res.body.status).to.be.a('number').and.to.equal(403);
				expect(res.body).to.have.property('error').and.to.be.an('string');
				done();
			});
	});

	it('should return status 404 when a Admin User attempts to delete a comment that doesn\'t exist', (done) => {
		chai
			.request(app)
			.delete('/api/v1/comments/699')
			.set('Authorization', adminToken)
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body.status).to.be.a('number').and.to.equal(404);
				expect(res.body).to.have.property('error').and.to.be.an('string');
				done();
			});
	});
});
