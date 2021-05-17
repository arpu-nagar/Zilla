import jwt from 'jsonwebtoken';
import db from '../config/db';

const authenticateJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, async (err, id) => {
            if (err) {
                return res.sendStatus(403);
            }

            const data = await db.query('SELECT * FROM Users where id=?;', [
                id.id,
            ]);
            req.admin_data = JSON.parse(JSON.stringify(data[0]));
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

export default authenticateJWT;
