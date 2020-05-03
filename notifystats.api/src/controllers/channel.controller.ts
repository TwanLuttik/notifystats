import express from 'express';
import DB from '../database';


// const auth = require('../Auth');
// const pg1 = require('../../db/postgres');
// const pg = new pg1();



// Get the top 50 channels
const GET_TOP = (req: any, res: any) => {
  DB.CHANNEL.GET_TOP()
  .then((e) => {
    return res.status(200).json({
      success: true,
      data: e
    })
  })
  .catch((e) => {
    return res.status(400).json({
      success: false,
      message: e
    })
  })
}

// Get channel by username
const GET_USERNAME = (req: any, res: any) => {
  DB.CHANNEL.GET_BY_USERNAME(req.params.username)
  .then((e) => {
    return res.status(200).json({
			success: true,
			data: e
		})
  })
  .catch((e) => {
    return res.status(404).json({
			success: false,
			message: e
		})
  })
}



export const CHANNEL_CONTROLLER  = {
  GET_TOP,
  GET_USERNAME
};