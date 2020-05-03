const CronJob = require('cron').CronJob;
const channels = require('./lib/channels');
const main = require('./lib/main');


// Every day at 01:00 am
new CronJob('30 0 * * *', async () => {
	await main.prototype.getNotifyChannels();
	await channels.prototype.updateDailyStats();
}, null, true, 'America/Los_Angeles');

class Runner {}


module.exports = Runner;