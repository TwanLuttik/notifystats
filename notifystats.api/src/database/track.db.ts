import { pool } from './index';


/**
 * @description Inserts a track into the daily stats database
 * 
 * @param channel_id 
 * @param subs 
 * @param posts 
 * @param month 
 */
const ADD = (channel_id: number, subs: number, posts: number, month: string) => {
  return new Promise((resolve, reject) => {

    const query = {
      text: 'INSERT INTO track (channel_id, subs, posts, month, created_at) VALUES ($1, $2, $3, $4, $5) on conflict do nothing;',
      values: [channel_id, subs, posts, month, new Date().toLocaleDateString()]
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
  ADD
}