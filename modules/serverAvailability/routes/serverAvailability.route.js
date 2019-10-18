// require packages
const router = require('express').Router();

// Add modules
const findServerModule = require('../controllers/serverAvailability.controller');

// / bosta/check-server
router.post('/check-server', findServerModule.findServer);

module.exports = router;
