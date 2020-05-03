import { pool } from './index';
import { INTERFACE_ADD_CHANNEL } from '../interfaces/index';


const GET_TOP = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT track.channel_id, track.subs, track.posts, channel.displayname, channel.username, channel.avatar, channel.coverPhoto, channel.verified FROM track LEFT JOIN channel ON track.channel_id = channel.channel_id  WHERE track.created_at = $1 ORDER BY track.subs DESC LIMIT 50;';
    const options = ['2/1/2020'];

    pool.query(query, options).then((r) => {
      return resolve(r.rows);
    }).catch((r) => {
      return reject(r);
    })
  })
};

const GET_BY_USERNAME = (username: string) => {
  return new Promise(async (resolve, reject) => {
    let channel = {};
    let track: any = [];

    // Get channel info
    const query = {
      text: 'SELECT * FROM channel WHERE LOWER(username) = LOWER($1)',
      values: [username]
    }

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
    }

    await pool.query(query2)
      .then((r) => {
        track = r.rows;
      })
      .catch((r) => {
        if (r) return reject(r);
      });

    return resolve({ channel, track });
  });
}

const ADD_CHANNEL_TO_WATCH = (channel_id: number) => {
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
}

const ADD_USER_STATS = (channel_id: number, subs: number, posts: number, month: string) => {
  return new Promise(async (resolve, reject) => {
    const query = {
      text: `INSERT INTO track (channel_id, subs, posts, month, created_at) VALUES ($1, $2, $3, $4, $5) on conflict do nothing;`,
      values: [channel_id, subs, posts, month, new Date().toLocaleDateString()]
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

}

// channel_id, username, displayName, bio, tagline, link, location, topics, verified, badges, dummy, created_at, creator, gender, avatar, coverPhoto, aliases

const ADD_CHANNEL = (data: INTERFACE_ADD_CHANNEL) => {
  return new Promise((resolve, reject) => {
    const acceptableData = [
      'channel_id',
      'username', 
      'displayName', 
      'bio', 
      'tagline', 
      'link', 
      'location', 
      'topics', 
      'verified', 
      'badges', 
      'dummy', 
      'created_at', 
      'creator', 
      'gender', 
      'avatar', 
      'coverPhoto', 
      'aliases'];


      let newData: object = {};
      
      // Check what new data comes in
      for (var key in data) {
        if (acceptableData.includes(key)) {
          newData[key] = acceptableData[key];
        } 
      }
      
      // Query setup
      const _preQuery: string = Object
      .keys(newData)
      .map(v => v)
      .toString()
      .slice(0, 1);
      const preQuery = _preQuery.slice(_preQuery.length - 1, _preQuery.length);
      const _preQuery2 = Object.keys(newData).map((v, i) => '$' + i + ',').toString();
      const preQuery2 =  _preQuery2.slice(_preQuery2.length - 1, _preQuery2.length);

      const query = `INSERT INTO channel (${preQuery}) VALUES (${preQuery2});`;
      const options = Object.values(newData);

      // Execution
      pool.query(query, options)
        .then((e) => {
          if (e.rowCount === 1) return resolve(true);
					return resolve(false);
        })
        .catch((e) => {
          if (e) return reject(e);
        });

  })
};

const GET_CHANNEL_NOT_TRACKED = (date: any) => {
  return new Promise(async (resolve, reject) => {
    let allChannels: any[];
    let alreadyChecked: any[];

    // Query
    const query = {
      text: 'SELECT track.channel_id FROM track WHERE track.created_at = $1',
      values: [date]
    };

    const query2 = {
      text: 'SELECT channel_id FROM channels'
    };

    
    // Execution
    await pool.query(query)
      .then((r) => {
        for (const i in r.rows) {
          alreadyChecked.push(r.rows[i].channel_id);
        }
      })
      .catch((r) => {
        if (r) return reject(r);
      });
  
    
    // Execution
    await pool.query(query2)
      .then((r) => {
        for (const i in r.rows) {
          allChannels.push(r.rows[i].channel_id);
        }
      })
      .catch((r) => {
        if (r) return reject(r);
      });

    return resolve(allChannels.filter(channel_id => !alreadyChecked.includes(channel_id)));
  })
}





export {
  GET_TOP,
  GET_BY_USERNAME,
  ADD_CHANNEL_TO_WATCH,
  ADD_USER_STATS,
  ADD_CHANNEL,
  GET_CHANNEL_NOT_TRACKED
}


