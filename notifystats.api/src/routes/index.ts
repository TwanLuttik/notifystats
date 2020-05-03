import admin from './admin.route';
import channel from './channel.route';

import express from 'express';
const router = express.Router();

router.use('/admin', admin);
router.use('/channel', channel);


export default router;