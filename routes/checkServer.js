// require packages
const router = require('express').Router();

// Add modules
const findServerModule = require('../modules/findServer');

// / bosta/check-server
router.post('/check-server', findServerModule.findServer);

module.exports = router;
