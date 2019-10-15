const fetch = require('node-fetch');

module.exports.findServer = async (req, res) => {
	const serverArray = [
		{
			url: 'https://github.com/mostafa0996/nodej.js',
			priority: 1,
		},
		{
			url: 'http://bosta.co',
			priority: 7,
		},
		{
			url: 'http://offline.bosta.co',
			priority: 2,
		},
		{
			url: 'http://google.com',
			priority: 4,
		},
	];
	const promiseArr = [];
	const minArr = [];
	const onlineServers = [];

	serverArray.forEach(el => {
		promiseArr.push(fetch(el.url));
	});

	/**
	 * @param {object} ele // response object
	 * @param {number} i // index of server
	 * @description Check if the server status is online or not (in range 200-299)
	 */
	const _checkEachServerAvailability = (ele, i) => {
		if (ele.ok) {
			console.log(1);
			onlineServers.push({
				url: ele.url,
				priority: serverArray[i].priority,
			});
			minArr.push(serverArray[i].priority);
		}
	};

	/**
	 * @description Check if there is online servers
	 * @returns {Promise}
	 */
	const _ifServersOnline = () => {
		if (onlineServers.length > 0) {
			console.log(2);
			const min = Math.min(...minArr);
			const server = onlineServers.find(s => s.priority === min);
			return Promise.resolve(server);
		} else {
			return Promise.reject('No online servers');
		}
	};

	try {
		return Promise.all(promiseArr)
			.then(async result => {
				result.forEach(_checkEachServerAvailability);
				return _ifServersOnline();
			})
			.then(server => res.send(server))
			.catch(err => {
				res.send({ err });
			});
	} catch (error) {
		res.send(error);
	}
};
