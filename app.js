const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const findServerRouter = require('./modules/serverAvailability/routes/serverAvailability.route');

// configure request-parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Using our routes
app.use('/bosta', findServerRouter);

const server = app.listen(5000, () => {
	console.log('Server is listening 5000');
});

module.exports = server; // for testing