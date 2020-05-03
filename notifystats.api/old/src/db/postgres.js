const cache = require('./cacheLayer');
const uuidv4 = require('uuid/v4');
const { Pool, Client } = require('pg');

const pool = new Pool({
	user: process.env.PG_USER,
	host: process.env.PG_HOST,
	database: process.env.PG_DATABASE,
	password: process.env.PG_PASSWORD
});



module.exports = class postgres {


	addChannelToWatch(channel_id) {
		return new Promise(async (resolve, reject) => {
			const query = {
				text: 'INSERT INTO channels (channel_id, added_at) SELECT $1, $2 WHERE NOT EXISTS (SELECT 1 FROM channels WHERE channel_id = $1);',
				values: [channel_id, new Date().getTime()],
			};

			await pool.query(query)
				.then((r) => {
					if (r.rowCount === 1) return resolve(true);
					return resolve(false);
				})
				.catch((r) => {
					if (r) throw r;
				});

		});
	};



	addUserStats(channel_id, subs, posts, month) {
		return new Promise(async (resolve, reject) => {
			let date = new Date().toLocaleDateString();
			const query = {
				text: `INSERT INTO track (channel_id, subs, posts, month, created_at) VALUES ($1, $2, $3, $4, $5) on conflict do nothing;`,
				values: [channel_id, subs, posts, month, date]
			};


			pool.query(query)
				.then((r) => {
					if (r.rowCount === 1) return resolve(true);
					return resolve(false);
				})
				.catch((r) => {
					if (r) throw r;
				});
		});
	};


	getChannelByUsername(username) {
		return new Promise(async (resolve, reject) => {
			let cacheKey = 'channel/username' + username;
			const c = cache.get(cacheKey);
			if (c) return resolve(c);

			let channel = {};
			let track = [];

			// Get channel info
			const query = {
				text: 'SELECT * FROM channel WHERE LOWER(username) = LOWER($1);',
				values: [username]
			};

			await pool.query(query).then((r) => {
				if (r.rows.length === 0) return reject('No channel found');
				channel = r.rows[0];
			}).catch((r) => {
				return reject(r);
			});

			// Get channel tracks
			const query2 = {
				text: 'SELECT * FROM track WHERE channel_id = $1 ORDER BY created_at DESC LIMIT 50;',
				values: [channel.channel_id]
			};
			await pool.query(query2).then((r) => {
				track = r.rows;
			}).catch((r) => {
				return reject(r);
			});

			cache.set(cacheKey, { channel, track });
			resolve({ channel, track });
		});
	};





	PutChannelInfo(channel_id, username, displayName, bio, tagline, link, location, topics, verified, badges, dummy, created_at, creator, gender, avatar, coverPhoto, aliases) {
		return new Promise(async (resolve, reject) => {
			const query = {
				text: 'INSERT INTO channel (channel_id, username, displayName, bio, tagline, link, location, topics, verified, badges, dummy, created_at, creator, gender, aliases, avatar, coverPhoto) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17);',
				values: [channel_id, username, displayName, bio, tagline, link, location, topics, verified, badges, dummy, created_at, creator, gender, aliases, avatar, coverPhoto]
			};


			await pool.query(query)
				.then((r) => {
					if (r.rowCount === 1) return resolve(true);
					return resolve(false);
				})
				.catch((r) => {
					if (r) throw r;
				});

		});
	};

	UpdateChannelInfo(channel_id, username, displayName, bio, tagline, link, location, topics, verified, badges, dummy, created_at, creator, gender, avatar, coverPhoto, aliases) {
		return new Promise(async (resolve, reject) => {
			const query = {
				text: 'INSERT INTO channel (channel_id, username, displayName, bio, tagline, link, location, topics, verified, badges, dummy, created_at, creator, gender, avatar, coverPhoto, aliases) SELECT $1, $2, $3, $4, $5, $6, $7, $8, $9, $0, $10, $11, $12, $13, $14, $15, $16;',
				values: [channel_id, username, displayName, bio, tagline, link, location, topics, verified, badges, dummy, created_at, creator, gender, avatar, coverPhoto, aliases]
			};


			await pool.query(query)
				.then((r) => {
					if (r.rowCount === 1) return resolve(true);
					return resolve(false);
				})
				.catch((r) => {
					if (r) throw r;
				});

		});
	};



	getTopChannelID() {
		return new Promise(async (resolve, reject) => {
			const query = {
				text: 'SELECT channel_id FROM channels ORDER BY channel_id DESC LIMIT 1;'
			};

			pool.query(query).then((r) => {
				if (r.rows.length === 0) return resolve(0);
				return resolve(r.rows[0].channel_id);
			}).catch((r) => {
				return reject(r);
			});
		})
	};

	/**
	 * @returns An array of allt he channel ids
	 * @param date
	 */

	getChannelsNotTracked(date) {
		return new Promise(async (resolve, reject) => {
			let allChannels = [];
			let alreadyChecked = [];

			const query = {
				text: 'SELECT track.channel_id FROM track WHERE track.created_at = $1',
				values: [date]
			};

			const query2 = { text: 'SELECT channel_id FROM channels' };

			await pool.query(query)
				.then((r) => {
					for (const i in r.rows) {
						alreadyChecked.push(r.rows[i].channel_id);
					}
				})
				.catch((r) => {
					if (r) throw r;
				});

			await pool.query(query2)
				.then((r) => {
					for (const i in r.rows) {
						allChannels.push(r.rows[i].channel_id);
					}
				})
				.catch((r) => {
					if (r) throw r;
				});

			return resolve(allChannels.filter(channel_id => !alreadyChecked.includes(channel_id)));
		});
	}


	/**
	 * @returns {Array} of channel id's
	 */
	getChannels() {
		return new Promise((resolve, reject) => {
			const query = {
				text: 'SELECT channel_id FROM channels;'
			};

			pool.query(query)
				.then((r) => {
					return resolve(r.rows);
				})
				.catch((r) => {
					if (r) throw r;
				})
		});
	}




	// we need to fix the query
	// getTopChannels() {
	// 	return new Promise((resolve, reject) => {
	// 		const query = {
	// 			text: 'SELECT track.channel_id, track.subs, track.posts, track.month, track.created_at, channel.username FROM track LEFT OUTER JOIN channel ON track.channel_id = channel.channel_id WHERE track.created_at = ? LIMIT 50;'
	// 		}
	// 	})
	// }



	isAuthKeyValid(key) {
		return new Promise((resolve, reject) => {
			const query = {
				text: 'SELECT * FROM authorisation WHERE key = $1 AND expire_date >= $2;',
				values: [key, new Date().getTime()]
			};

			pool.query(query)
				.then((r) => {
					if (r.rowCount === 1) return resolve(true);
					return resolve(false);
				})
				.catch((r) => {
					if (r) throw r;
				});
		});
	};


	/**
	 *
	 * @returns {Promise<unknown>}
	 */
	createAuthKey() {
		return new Promise((resolve, reject) => {
			let uuid = uuidv4();
			const query = {
				text: 'INSERT INTO authorisation (key, created_at, expire_date) SELECT $1, $2, $3;',
				values: [
					uuid,
					new Date().getTime(),
					new Date().getTime() + (30 * 24 * 60 * 60 * 1000)
				]
			};

			pool.query(query)
				.then((r) => {
					if (r.rowCount === 1) return resolve(uuid)
					else return reject('Failed to create an auth key');
				})
				.catch((r) => {
					if (r) return reject('Failed to create an auth key');
				})
		})
	}

	createLog(code, description, performed_by) {
		return new Promise((resolve, reject) => {
			let uuid = uuidv4();
			let date = new Date().getTime();

			
			const query = {
				text: 'INSET INTO logs (uuid, created_at, code, description, performed_by) SELECT $1, $2, $3, $4, $5;',
				values: [uuid, date, code, description, performed_by]
			};

			pool.query(query)
				.then((r) => {
					if (r.rowCount === 0) return reject('Failed to create a log');
					else return resolve('Log created')
				})
				.catch((r) => {
					if (r) throw r;
				})

		})
	}

	getLogs() {
		return new Promise((resolve, reject) => {
			const query = {
				text: 'SELECT * FROM logs order by logs.created_at DESC LIMIT 50;'
			};

			pool.query(query)
				.then((r) => {
					return resolve(r.rows);
				})
				.catch((r) => {
					if (r) throw r;
				})
		});
	}


	/**
	 * @return {Array} Top 50 channels on notify
	 */
	getTopChannels() {
		return new Promise((resolve, reject) => {
			let cacheKey = 'channel/top';
			const c = cache.get(cacheKey);
			if (c) return resolve(c);


			let date = new Date().toLocaleDateString();

			const query = {
				text: 'SELECT track.channel_id, track.subs, track.posts, channel.displayname, channel.username, channel.avatar, channel.coverPhoto, channel.verified FROM track LEFT JOIN channel ON track.channel_id = channel.channel_id  WHERE track.created_at = $1 ORDER BY track.subs DESC LIMIT 50;',
				values: ['2/1/2020']
			};

			pool.query(query).then((r) => {
				cache.set('channel/top', r.rows);
				return resolve(r.rows);
			}).catch((r) => {
				return reject(r);
			})
		})
	}












};