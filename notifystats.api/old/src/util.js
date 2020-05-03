const axios = require('axios');


class util {
	calcElapseTime(date) {
		let started = new Date(date);
		let now = new Date();
		// let started = new Date(date);

		let TOTAL_SECONDS = Math.floor((now - started) / 1000);
		let SECONDS = ((Math.floor(TOTAL_SECONDS / 60) * 60) - TOTAL_SECONDS).toString().replace('-', '');

		let TOTAL_MINUTES = Math.floor(TOTAL_SECONDS / 60);
		let MINUTES = ((Math.floor(TOTAL_MINUTES / 60) * 60) - TOTAL_MINUTES).toString().replace('-', '');

		let TOTAL_HOURS = Math.floor(TOTAL_MINUTES / 60);
		let HOURS = ((Math.floor(TOTAL_HOURS / 24) * 24) - TOTAL_HOURS).toString().replace('-', '');

		let DAYS = Math.floor(((TOTAL_SECONDS / 60) / 60) / 24);

		return `${DAYS} Days, ${HOURS} Hours, ${MINUTES} Minutes, ${SECONDS} Seconds`
	}
}

module.exports = util;