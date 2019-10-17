/**
 * @description Check if there is online servers
 * @returns {Promise}
 */
module.exports = (onlineServers, minArr) => {
	if (onlineServers.length > 0) {
		const min = Math.min(...minArr);
		const server = onlineServers.find(s => s.priority === min);
		return Promise.resolve(server);
	} else {
		return Promise.reject('No online servers');
	}
};
