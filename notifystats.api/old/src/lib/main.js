const axios = require('axios');
const util = require('../util');
const uuidV4 = require('uuid/v4');
const postgres = require('../db/postgres');
const pg = new postgres();


class main {
	/**
	 * get all notify channels and save all other information into `channel` DB
	 * @returns {Promise<void>}
	 */
	async getNotifyChannels() {
		const uuid = uuidV4();
		// const start_count = await sql.getTopChannelID();
		const start_count = await pg.getTopChannelID();
		// const start_count = 0;
		let channel_count = 15500;
		let last_value = -1;
		let addedUsers = 0;
		let checkedUsers = 0;

		// await sql.createLOG('import notify channels', 'importing all the notify channels', 1, uuid);

		for (let i = start_count; i <= channel_count; i++) {
			let percentage = Math.floor(i / (channel_count / 100)) ;
			if (last_value !== percentage) {
				last_value = percentage;
				console.log(`    -> ${percentage}%`)
			}

			await axios.get(`https://api.notify.me/secret/channel/id/${i}`, { headers: { Origin: 'https://notify.me', Authorization: process.env.NOTIFY_SECRET }}).then(async (r) => {
				await pg.addChannelToWatch(r.data.channel.id).then(async (r2) => {
					checkedUsers++;

					// If the user did't exist in the database we wil also save all less important information
					if (r2) {
						let c = r.data.channel;
						// add all other information to `channel` db;
						await pg.PutChannelInfo(i, c.username, c.displayName, c.bio, c.tagline, c.link, c.location, JSON.stringify(c.topics), +c.verified, JSON.stringify(c.badges), +c.dummy, c.createdAt, +c.creator, c.gender, c.avatar, c.coverPhoto, JSON.stringify(c.aliases));
						console.log(`${i} -> ${r.data.channel.username}`);
						addedUsers++;
					}

				}).catch((r2) => {});

			}).catch((r) => {});
		}

		// await sql.createLOG('import notify channels', `checked for ${checkedUsers} and added ${addedUsers} new users to the database`, 0, uuid);

}



// updateChannelsInfo() {
// 	return new Promise((resolve, reject) => {
// 		// const users = await sql
// 	});
// }

}


module.exports = main;