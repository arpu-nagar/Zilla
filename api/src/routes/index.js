import express from 'express';
import authenticateJWT from '../middleware/auth';
import auth from './auth';
import user from './users';
import task from './tasks';

const router = express.Router();

router.use('/auth', auth);
router.use('/user', authenticateJWT, user);
router.use('/task', authenticateJWT, task);
router.post('/status', authenticateJWT, async (req, res) => {
    return res.send({
        success: true,
    });
});

export default router;
