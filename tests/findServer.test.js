const chai = require('chai');
const expect = chai.expect;
const request = require('chai-http');
const app = require('../app');

chai.use(request);
chai.should();

describe('#POST /bosta/check-server', function() {
	this.timeout(10000); // this test can take up to 5 seconds

	it('* Make A get Request and get a response', done => {
		chai
			.request(app)
			.post('/bosta/check-server')
			.set('Content-Type', 'application/json')
			.send({
				serverArray: [
					{
						url: 'https://github.com/mostafa0996/nodej.js',
						priority: 1,
					},
					// {
					// 	url: 'http://bosta.co',
					// 	priority: 7,
					// },
					// {
					// 	url: 'http://offline.bosta.co',
					// 	priority: 2,
					// },
					// {
					// 	url: 'http://google.com',
					// 	priority: 4,
					// },
					// {
					// 	url: 'http://www.medium.com',
					// 	priority: 3,
					// },
				],
			})
			.end((err, res) => {
				if (err) done(err);
				console.log(res.body);
				res.should.have.status(200);
				res.body.should.be.a('object');
			});
		done();
	});
});
