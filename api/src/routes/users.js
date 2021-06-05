import express from 'express';
import db from '../config/db';
import sendEmail from '../utils/mailer';

const router = express.Router();

function makeid(length) {
    var result = [];
    var characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(
            characters.charAt(Math.floor(Math.random() * charactersLength)),
        );
    }
    return result.join('');
}

router.post('/getUserData', async (req, res) => {
    try {
        const data = await db.query(
            'SELECT Users.name as me,email, organisation.* from Users INNER JOIN organisation where Users.id=?;',
            [req.admin_data.id],
        );
        // delete data[0].data.id;
        console.log(data[0]);
        return res.sendSuccess(data[0], 'Successfully sent user data.');
    } catch (error) {
        console.log(error);
    }
});

router.post('/addUser', async (req, res) => {
    try {
        const { email, name } = req.body;
        const { organisation } = req.admin_data;
        console.log(req.admin_data.organisation);
        const token = makeid(16);
        await db.query(
            'INSERT INTO Users(name, email, password, token, verified, organisation) VALUES (?, ?, ?, ?, ?, ?);',
            [name, email, 'abcd', token, false, organisation],
        );
        await sendEmail({
            email: email,
            subject: 'You have an invite on Zilla!',
            html: `
                <html>
                <body>
                    Hey, click here to join the organisation.
                    <a href="${process.env.DOMAIN}auth/set-user-password/${token}">Click me!</a>
                </body>
                </html>
            `,
        });
        return res.sendSuccess(null, 'Invite sent to User!');
    } catch (error) {
        console.log(error);
        return res.sendError(null, 'Internal Server Error');
    }
});

router.post('/deleteUser', async (req, res) => {
    try {
        const { id } = req.body;
    } catch (error) {
        return res.sendError(null, 'Internal Server Error');
    }
});

export default router;
