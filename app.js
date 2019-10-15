const express = require('express');
const app = express();
const findServerModule = require('./findServer');

app.get('/bosta/check-server', findServerModule.findServer);

app.listen(5000, () => {
	console.log('Server is listening 5000');
});
