import express from 'express';
import db from '../config/db';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import sendEmail from '../utils/mailer';
import crypto from 'cryptojs';

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            organisation,
            organisationDescription,
        } = req.body;
        const users = await db.query('SELECT * FROM Users WHERE email = ?', [
            email,
        ]);
        if (users.length > 0)
            return res.sendError(null, 'Email already exists, try to LogIn.');
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // create the organisation first
        await db.query(
            'INSERT INTO organisation(name,owner,description) VALUES (?,?,?);',
            [organisation, email, organisationDescription],
        );
        const orgData = await db.query(
            'SELECT * from organisation where owner=?;',
            [email],
        );
        console.log(orgData);
        await db.query(
            'INSERT INTO Users(name,email,password,organisation) VALUES(?,?,?,?)',
            [name, email, passwordHash, orgData[0].id],
        );
        const data = await db.query('SELECT * from Users where email=?;', [
            email,
        ]);
        console.log(data);
        // send email
        const link = process.env.DOMAIN + 'auth/verify/' + data[0].id;
        const details = {
            email: email,
            subject: 'Verification for Zilla Account.',
            html: `
            <html>
                <body> 
                <h4> Hi ${name}, </h4>
                <br>
                <p> Please click on the following link to verify your account.</p>
                <br>
                <a href=${link}>${link}</a>
                </body> 
            </html> 
        `,
        };
        await sendEmail(details);
        res.sendSuccess(
            null,
            'Successfully Signed up. Please check your email.',
        );
    } catch (error) {
        console.log(error);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        const users = await db.query('SELECT * FROM Users WHERE email = ?', [
            email,
        ]);
        if (users.length === 0) {
            console.log('yes');
            return res.sendError(null, 'Email doesnot exist, please SignUp.');
        }

        const flag = await bcrypt.compare(password, users[0].password);
        if (flag === true) {
            res.json({
                success: true,
                token: jwt.sign(
                    {
                        id: users[0].id,
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

router.get('/verify/:id', async (req, res) => {
    try {
        const data = await db.query(
            'UPDATE Users SET verified=true where id=?;',
            [req.params.id],
        );
        if (data.affectedRows === 1)
            return res.send('<script>window.close();</script >');
        else res.sendError(null, 'Interval Server Error.');
    } catch (error) {
        console.log(error);
    }
});

router.post('/passwordreset', async (req, res) => {
    try {
        const { email } = req.body;
        const users = await db.query('SELECT * FROM Users WHERE email = ?', [
            email,
        ]);
        if (users.length === 0)
            return res.sendError(null, 'Email doesnot exist, please SignUp.');

        const token = Math.random().toString(36).substring(16);
        await db.query('UPDATE Users SET token=? where email=?;', [
            token,
            email,
        ]);
        // TODO
        // change link to redirect to frontend
        const link = process.env.FRONTEND + 'reset-password/' + users[0].id;
        const details = {
            email: email,
            subject: 'Verification for Zilla Account.',
            html: `
            <html>
                <body> 
                <br>
                <p> Please click on the following link to reset your account password.</p>
                <br>
                <a href=${link}>${link}</a>
                </body>
            </html> 
        `,
        };
        await sendEmail(details);
        res.sendSuccess(null, 'Successful, please check your email.');
    } catch (error) {
        console.log(error);
    }
});

router.post('/passwordreset/:id', async (req, res) => {
    try {
        const { password } = req.body;
        const { id } = req.params;
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        await db.query('UPDATE Users set password=? where token=?', [
            passwordHash,
            id,
        ]);

        res.sendSuccess(null, 'Successful, please login.');
    } catch (error) {
        console.log(error);
    }
});

export default router;
