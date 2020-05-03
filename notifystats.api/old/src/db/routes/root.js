const express = require('express');
const router = express();
const sql = require('../sql');
const Runner = require('../../Runner');
const util = require('../../util');
const main = require('../../lib/main');
const channels = require('../../lib/channels');



// router.post('/runner', (req, res) => {
// 	if (req.body.token === process.env.TOKEN) {
// 		channels.prototype.fetchStats();
//
// 		return res.status(200).json({
// 			success: true,
// 			message: 'Requested to update stats'
// 		})
// 	}
// 	return res.status(200).json({
// 		success: false,
// 		message: 'Token is incorrect'
// 	})
// });
//
//
// router.post('/add/:id', (req, res) => {
// 	if (req.body.token === process.env.TOKEN) {
// 		sql.AddUserID(req.params.id);
//
// 		return res.status(200).json({
// 			success: true,
// 			message: 'User added'
// 		})
// 	}
//
// 	return res.status(200).json({
// 		success: false,
// 		message: 'Token is incorrect'
// 	})
// });
//
//
// router.get('/user/:username', async (req, res) => {
// 	if (req.body.token === process.env.TOKEN) {
// 		let d = await sql.getUser(req.params.username);
//
// 		return res.status(200).json({
// 			success: true,
// 			data: d
// 		})
// 	}
//
// 	return res.status(200).json({
// 		success: false,
// 		message: 'Token is incorrect'
// 	})
// });
//
// router.get('/test', async (req, res) => {
// 	main.prototype.getAllNotifyUsers();
// 	return res.status(200).json({
// 		success: true,
// 		message: '/test'
//
// 	})
// });

module.exports = router;