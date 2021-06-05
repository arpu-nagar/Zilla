import express from 'express';
import db from '../config/db';

const router = express.Router();

router.post('/addBug', async (req, res) => {
    try {
    } catch (error) {
        res.sendError();
    }
});

export default router;
