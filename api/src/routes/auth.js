import express from 'express';
import db from '../config/db';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, organisation } = req.body;
        const users = await db.query('SELECT * FROM Users WHERE email = ?', [
            email,
        ]);
        if (users.length > 0)
            return res.sendError(null, 'Email already exists, try to LogIn.');
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        await db.query(
            'INSERT INTO Users(name,email,password,organisation) VALUES(?,?,?,?)',
            [name, email, passwordHash, organisation],
        );
        // send email
        res.sendSuccess(null, 'Successfully Signed up.');
    } catch (error) {
        console.log(error);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const users = await db.query('SELECT * FROM Users WHERE email = ?', [
            email,
        ]);
        if (users.length === 0)
            return res.sendError(null, 'Email doesnot exist, please SignUp.');
        const flag = bcrypt.compare(password, users.password);
        if (flag === true) {
            res.json({
                success: true,
                token: jwt.sign(
                    {
                        id: users.id,
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: 15 * 60 },
                ),
            });
        } else {
            res.sendError(null, 'Password is incorrect.');
        }
    } catch (error) {
        console.log(error);
    }
});

export default router;
