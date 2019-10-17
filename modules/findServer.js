const fetchAsync = require('../helpers/fetchAsync');
const getOnlineServers = require('../helpers/getOnlineServers');

module.exports.findServer = async (req, res) => {
	const { serverArray } = req.body;
	const urls = [];
	const onlineServers = [];
	const minArr = [];

	/**
	 * @param {object} ele // response object
	 * @param {number} i // index of server
	 * @description Check if the server status is online or not (in range 200-299)
	 */
	const _checkEachServerAvailability = (ele, i) => {
		if (ele.ok) {
			onlineServers.push({
				url: ele.url,
				priority: serverArray[i].priority,
			});
			minArr.push(serverArray[i].priority);
		}
	};

	try {
		// get all urls in one array
		for (let i = 0; i < serverArray.length; i++) {
			urls[i] = serverArray[i].url;
		}

		Promise.all(urls.map(fetchAsync))
			.then(async result => {
				result.map(_checkEachServerAvailability);
				return getOnlineServers(onlineServers, minArr);
			})
			.then(server => {
				// res.writeHead(200, { 'Content-Type': 'application/json' });
				res.send(server);
			})
			.catch(err => {
				// res.writeHead(404, { 'Content-Type': 'application/json' });
				res.send({ err });
			});
	} catch (error) {
		res.send(error);
	}
};
