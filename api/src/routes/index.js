import express from 'express';
import authenticateJWT from '../middleware/auth';
import auth from './auth';

const router = express.Router();

router.use('/auth', auth);
router.post('/status', authenticateJWT, async (req, res) => {
    return res.send({
        success: true,
    });
});

export default router;
