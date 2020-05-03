const express = require('express');
const router = express();
const auth = require('../Auth');
const channels = require('../../lib/channels');
const main = require('../../lib/main');
const postgres = require('../../db/postgres');
const pg = new postgres();



router.post('/run/fetchStats', auth, (req, res) => {
	channels.prototype.updateDailyStats();
	return res.status(200).json({
		success: true
	})
});

router.post('/run/fetchNotifyUsers', auth, (req, res) => {
	main.prototype.getNotifyChannels();
	return res.status(200).json({
		success: true
	})
});


// router.post('/run/updateChannelData', auth, async (req, res) => {
// 	// get all channels in a array
// 	let channels = await pg.getChannels();
//
// 	for (const i in channels) {
// 		pg.channel
// 	}
//
//
//
// 	return res.status(200).json({
// 		success: true
// 	})
// });




router.get('/auth/create', async (req, res) => {
	let key = await pg.createAuthKey();
	return res.status(200).json({
		success: true,
		data: key
	});
});

router.get('/logs', auth, async (req, res) => {
	const data = await pg.getLogs();

	return res.status(200).json({
		success: true,
		data
	})
});






module.exports = router;