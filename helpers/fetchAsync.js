const fetch = require('node-fetch');

/**
 * @description Fetch urls of servers
 * @param {string} url
 */
module.exports = async url => {
	return Promise.race([
		fetch(url),
		new Promise((_, reject) =>
			setTimeout(() => reject(new Error('Timeout')), 5000),
		),
	])
		.then(result => {
			return result;
		})
		.catch(e => {
			return e;
		});
};
