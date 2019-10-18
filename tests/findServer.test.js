const chai = require('chai');
const expect = chai.expect;
const request = require('chai-http');
const app = require('../app');

chai.use(request);
chai.should();

describe('#POST /bosta/check-server', function() {
	this.timeout(10000);
	let response = {}
	describe('# Make a post request with non-online server', () => {
		it('* Get response from the post request', done => {
			chai
				.request(app)
				.post('/bosta/check-server')
				.set('Content-Type', 'application/json')
				.send({
					serverArray: [
						{
							url: 'https://github.com/mostafa0996/nodej.js',
							priority: 1,
						}
					],
				})
				.end((err, res) => {
					if (!err) response = res;
					done();
				});
		});
	
		it('* Check status code to be 200' ,  done => {
			expect(response.status).to.equal(200);
			done();
		});
	
		it('* Check body of response ' ,  done => {
			expect(response.body).to.have.property('err','No online servers');
			done();
		});
	})

	describe('# Make a post request with non-online and online servers ', () => {
		it('* Get response from the post request', done => {
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
						{
							url: 'http://bosta.co',
							priority: 7
						},
					],
				})
				.end((err, res) => {
					if (!err) response = res;
					done();
				});
		});
	
		it('* Check status code to be 200' ,  done => {
			expect(response.status).to.equal(200);
			done();
		});

		it('* Check response body data' ,  done => {
			expect(response.body).to.have.property('url','https://bosta.co/');
			expect(response.body).to.have.property('priority',7);
			done();
		});
	});

	describe('# Make a post request with non-online and online servers and online server that took more than 5 secs', () => {
		it('* Get response from the post request', done => {
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
						{
							url: 'http://bosta.co',
							priority: 7
						},
						{
							url: 'http://www.medium.com',
							priority: 3
						},
						{
							url: 'http://offline.bosta.co',
							priority: 2
						},
					],
				})
				.end((err, res) => {
					if (!err) response = res;
					done();
				});
		});
	
		it('* Check status code to be 200' ,  done => {
			expect(response.status).to.equal(200);
			done();
		});

		it('* Check response body data' ,  done => {
			expect(response.body).to.have.property('url','http://offline.bosta.co/');
			expect(response.body).to.have.property('priority',2);
			done();
		});
	});
});
