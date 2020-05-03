const { Pool } = require('pg');

const pool = new Pool({
	user: process.env.PG_USER,
	host: process.env.PG_HOST,
	database: process.env.PG_DATABASE,
	password: process.env.PG_PASSWORD,
	port: 3211
});

module.exports = {
  query: (query, params) => pool.query(query, params)
};