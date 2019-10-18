const getServerWithLowPriority = require('./getServerWithLowPriority');

const onlineServers = [];
const minArr = [];

/**
 * @param {object} ele // response object
 * @param {number} i // index of server
 * @description Check if the server status is online or not (in range 200-299)
 */
module.exports = async (result, serverArray) => {
	result.map((ele, i) => {
		if (ele.ok) { // status code is in range [200 -299]
			onlineServers.push({
				url: ele.url,
				priority: serverArray[i].priority,
			});
			minArr.push(serverArray[i].priority);
		}
	});
	const data = await getServerWithLowPriority(onlineServers, minArr);
	return data;
};