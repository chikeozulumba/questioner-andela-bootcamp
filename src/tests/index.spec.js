
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

describe('User should be able to visit Base App route', () => {
	it('should return status 200', (done) => {
		chai
			.request(app)
			.get('/')
			.end((err, res) => {
				if (err) throw err;
				expect(res).to.have.status(200);
				done();
			});
	});
});

describe('User should be able to visit Base API route', () => {
	it('should return status 200', (done) => {
		chai
			.request(app)
			.get('/api/v1/')
			.end((err, res) => {
				if (err) throw err;
				expect(res).to.have.status(200);
				done();
			});
	});
});

describe('User should recieve error message on invalid route', () => {
	it('should return status 404 on accepting HTML', (done) => {
		chai
			.request(app)
			.get('/api/v1/abrakadabra')
			.set('Accept', 'application/xhtml+xml')
			.end((err, res) => {
				if (err) throw err;
				expect(res).to.have.status(404);
				done();
			});
	});
	it('should return status 404 on accepting JSON', (done) => {
		chai
			.request(app)
			.get('/api/v1/abrakadabra')
			.set('Accept', 'application/json')
			.end((err, res) => {
				if (err) throw err;
				expect(res).to.have.status(404);
				done();
			});
	});
});
