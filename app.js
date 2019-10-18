const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

const findServerRouter = require('./modules/serverAvailability/routes/serverAvailability.route');

// configure request-parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Access-Control-Allow-Headers', 'Accept');
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	next();
  });


  app.use(cors());
  app.use(helmet.frameguard());
  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());
  app.use(helmet.ieNoOpen());
  app.use(
	helmet.hsts({
	  maxAge: 6 * 30 * 24 * 60 * 60,
	  includeSubDomains: true,
	  force: true
	})
  );

// Using our routes
app.use('/bosta', findServerRouter);

const server = app.listen(5000, () => {
	console.log('Server is listening 5000');
});

module.exports = server; // for testing