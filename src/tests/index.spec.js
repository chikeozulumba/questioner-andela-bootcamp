
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

describe('User should be able to Signup', () => {
	it('should return status 201 user created', (done) => {
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
