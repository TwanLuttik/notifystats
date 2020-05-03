import axios from 'axios';
import DB from '../database';



const UPDATE_DAILY_STATS = (req: any, res: any) => {
  // return new Promise(async (resolve, reject) => {

  //   const date = new Date().toLocaleDateString();
  //   let last_value = -1;
  //   let fetchedUsers = 0;
  //   let checkedUsers = 0;


  //   const channels  = await DB.CHANNEL.GET_CHANNEL_NOT_TRACKED(date);

  //   for (const i in channels) {

  //     // Logging
  //     let percentage = Math.floor(i / (channels.length / 100)) ;
	// 		if (last_value !== percentage) {
	// 			last_value = percentage;
	// 			console.log(`    -> ${percentage}%`)
  //     }

  //     	// Check if its not undfined
	// 			await axios.get(`https://api.notify.me/channel/public?id=${channels[i]}`, {headers: {Origin: 'https://notify.me',Authorization: process.env.NOTIFY_SECRET}}).then(async (r) => {
  //         await DB.TRACK.ADD(channels[i], r.data.channel.subCount, r.data.channel.postCount, r.data.channel.frequencyRating)
  //         .then((r1) => {
	// 					checkedUsers++;
	// 					if (r1) {
	// 						console.log(`${i}  ->  ${r.data.channel.username} (${channels[i]})`);
	// 						fetchedUsers++;
	// 					}
	// 					return;
	// 				}).catch((r1) => {});
	// 			}).catch((r) => {});
      



  //   }


    

  // })
};


export const ADMIN_CONTROLLER = {
  UPDATE_DAILY_STATS
}