const postgres = require('../db/postgres');
const pg = new postgres();
const axios = require('axios');
const util = require('../util');


class channels {
	updateDailyStats() {
		return new Promise(async (resolve, reject) => {
			const date = new Date().toLocaleDateString();
			let last_value = -1;
			let fetchedUsers = 0;
			let checkedUsers = 0;

			// await sql.createLOG('cron job started', 'fetching notify users',  1);


			const channels = await pg.getChannelsNotTracked(date);

			// for (const i in channels) {
			for (const i in channels) {

				let percentage = Math.floor(i / (channels.length / 100)) ;
				if (last_value !== percentage) {
					last_value = percentage;
					console.log(`    -> ${percentage}%`)
				}

				// Check if its not undfined
				await axios.get(`https://api.notify.me/channel/public?id=${channels[i]}`, {headers: {Origin: 'https://notify.me',Authorization: process.env.NOTIFY_SECRET}}).then(async (r) => {
					await pg.addUserStats(channels[i], r.data.channel.subCount, r.data.channel.postCount, r.data.channel.frequencyRating).then((r1) => {
						checkedUsers++;
						if (r1) {
							console.log(`${i}  ->  ${r.data.channel.username} (${channels[i]})`);
							fetchedUsers++;
						}
						return;
					}).catch((r1) => {});
				}).catch((r) => {});

			}


			// await sql.createLOG('cron job ended', `Checked ${checkedUsers} users and fetched ${fetchedUsers} notify users`, 0);
			return resolve();
		})
	}



}

module.exports = channels;