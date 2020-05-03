const express = require('express');
const router = express();
const auth = require('../Auth');
const pg1 = require('../../db/postgres');
const pg = new pg1();



// Get the top 50 channels
router.get('/top', (req, res) => {
	pg.getTopChannels().then((r) => {
		return res.status(200).json({
			success: true,
			data: r
		})
	}).catch((r) => {
		return res.status(400).json({
			success: false,
			message: r
		})
	});
});


router.get('/username/:username', (req, res) => {
	pg.getChannelByUsername(req.params.username).then((r) => {
		return res.status(200).json({
			success: true,
			data: r
		})
	}).catch((r) => {
		return res.status(404).json({
			success: false,
			message: r
		})
	})
});






module.exports = router;