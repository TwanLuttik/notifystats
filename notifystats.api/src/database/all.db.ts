import { pool } from './index';

/**
 * @description Checks if the key is still valid
 * @param key 
 */
const AUTH_KEY_VALID = (key: string) => {
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
		  	if (r) return reject(r);
		  });
  })
}


export {
  AUTH_KEY_VALID
}