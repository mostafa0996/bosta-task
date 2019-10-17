const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const findServerModule = require('./modules/findServer');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/bosta/check-server', findServerModule.findServer);

const server = app.listen(5000, () => {
	console.log('Server is listening 5000');
});

module.exports = server;
