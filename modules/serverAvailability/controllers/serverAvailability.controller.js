const fetchAsync = require('../../../helpers/fetchAsync');
const getUrls = require('../../../helpers/getUrls');
const checkServerAvailability = require('../../../helpers/checkServerAvailability')

module.exports.findServer = async (req, res) => {
	const { serverArray } = req.body;
	
	// get all urls in one arry
	const urls = getUrls(serverArray);

	try {
		Promise.all(urls.map(fetchAsync))
			.then(result => checkServerAvailability(result, serverArray))
			.then(server => {
				res.send(server);
			})
			.catch(err => {
				res.send({ err });
			});
	} catch (error) {
		res.send(error);
	}
};
