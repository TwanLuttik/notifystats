import { Pool } from 'pg';

console.log(process.env.PG_HOST)
export const pool = new Pool({
	user: process.env.PG_USER,
	host: process.env.PG_HOST,
	database: process.env.PG_DATABASE,
	password: process.env.PG_PASSWORD
});

pool.connect();


import * as TRACK from './track.db';
import * as CHANNEL from './channel.db';
import * as ALL from './all.db';

const DB = {
	TRACK,
	CHANNEL,
	ALL
}

export default DB;