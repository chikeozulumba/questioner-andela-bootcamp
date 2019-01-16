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
			userToken = res.body.data.token;
			console.log('user', res.body.data.id);
		});
	request.post('/api/v1/auth/signin')
		.send(admin)
		.end((err, res) => {
			if (err) throw err;
			adminToken = res.body.data.token;
			console.log('admin', res.body.data.id);
			done();
		});
});

describe('POST /api/v1/questions', () => {
	it('should return status 200 with content of newly created question record', (done) => {
		const payload = {
			title: 'What are federated clusters?',
			body: 'Multiple Kubernetes clusters can be managed as a single cluster with the help of federated clusters.',
		};
		chai
			.request(app)
			.post('/api/v1/questions')
			.set('Authorization', userToken)
			.send(payload)
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res.body.status).to.be.a('number').and.to.equals(201);
				expect(res.body).to.be.an('object');
				expect(payload.title).to.be.equal(res.body.data.title);
				expect(payload.body).to.be.equal(res.body.data.body);
				done();
			});
	});

	it('should return status 400 when fields\' that are required are not available', (done) => {
		chai
			.request(app)
			.post('/api/v1/questions')
			.set('Authorization', userToken)
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
			.set('Authorization', userToken)
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
			.set('Authorization', userToken)
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
			.set('Authorization', userToken)
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

describe('PATCH /api/v1/upvote', () => {
	it('should return status 200 when User upvotes a question', (done) => {
		chai
			.request(app)
			.patch('/api/v1/questions/1/upvote')
			.set('Authorization', userToken)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.a('number').and.to.equal(200);
				expect(res.body).to.have.property('data').and.to.be.an('object');
				expect(res.body.data).to.have.property('votes').and.to.be.a('number');
				done();
			});
	});
});

describe('PATCH /api/v1/downvote', () => {
	it('should return status 200 when User downvotes a question', (done) => {
		chai
			.request(app)
			.patch('/api/v1/questions/1/downvote')
			.set('Authorization', userToken)
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
			.set('Authorization', userToken)
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body.status).to.be.a('number').and.to.equal(404);
				expect(res.body).to.have.property('error').and.to.be.an('string');
				done();
			});
	});

	it('should not be able to vote below 0 vote count', (done) => {
		chai
			.request(app)
			.patch('/api/v1/questions/8/downvote')
			.set('Authorization', userToken)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body).to.have.property('data').and.to.be.an('object');
				expect(res.body.data).to.have.property('votes').and.to.be.a('number');
				expect(res.body.data.votes).to.not.be.lessThan(0);
				done();
			});
	});
});

describe('POST /api/v1/questions/:id/comment', () => {
	it('should return status 201 when User adds a comment to a question', (done) => {
		const payload = {
			comment: 'You are God',
			meetup: 1,
		};
		chai
			.request(app)
			.post('/api/v1/questions/1/comment')
			.set('Authorization', userToken)
			.send(payload)
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res.body.status).to.be.a('number').and.to.equal(201);
				expect(res.body).to.have.property('data').and.to.be.an('object');
				expect(res.body.data.comment).to.be.a('string').and.to.be.equal(payload.comment);
				done();
			});
	});
});

describe('PATCH /api/v1/questions/comments/:id', () => {
	it('should return status 202 when User edits a comment to a question', (done) => {
		const payload = {
			comment: 'You are God alone!',
			meetup: 1,
		};
		chai
			.request(app)
			.patch('/api/v1/questions/comments/35')
			.set('Authorization', userToken)
			.send(payload)
			.end((err, res) => {
				expect(res).to.have.status(202);
				expect(res.body.status).to.be.a('number').and.to.equal(202);
				expect(res.body).to.have.property('data').and.to.be.an('object');
				expect(res.body.data.comment).to.be.a('string').and.to.be.equal(payload.comment);
				done();
			});
	});
});

describe('DELETE /api/v1/questions/comments/:id', () => {
	it('should return status 200 when an Admin User attempts to delete a comment', (done) => {
		chai
			.request(app)
			.delete('/api/v1/questions/comments/2')
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
			.delete('/api/v1/questions/comments/6')
			.set('Authorization', userToken)
			.end((err, res) => {
				expect(res).to.have.status(403);
				expect(res.body.status).to.be.a('number').and.to.equal(403);
				expect(res.body).to.have.property('error').and.to.be.an('string');
				done();
			});
	});
});
