
/**
 * @description Function to get all url in one array
 * @param {array} serverArray
 * @returns {array} arrau of urls
 */
module.exports = serverArray => {
    const urls = [];
    for (let i = 0; i < serverArray.length; i++) {
        urls[i] = serverArray[i].url;
    }
    return urls;
}