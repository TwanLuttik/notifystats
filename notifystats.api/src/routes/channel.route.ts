import express from 'express';
import { CHANNEL_CONTROLLER } from '../controllers/channel.controller';


const router = express.Router();


// Top channels, max 50
router.get('/top', CHANNEL_CONTROLLER.GET_TOP)

// Get by username
router.get('/username/:username', CHANNEL_CONTROLLER.GET_USERNAME)




export default router;