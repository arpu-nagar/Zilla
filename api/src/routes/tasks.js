import express from 'express';
import db from '../config/db';

const router = express.Router();

router.post('/addBug', async (req, res) => {
    try {
        const { name, description } = req.body;
        const { id, organisation } = req.admin_data;
        await db.query(
            'Insert into Bugs(name,description,assignee,organisation) VALUES (?,?,?,?);',
            [name, description, id, organisation],
        );
        return res.sendSuccess(null, 'Successfully logged bug.');
    } catch (error) {
        res.sendError(null, 'Internal Server Error.');
    }
});

router.post('/getBug', async (req, res) => {
    try {
        const { organisation } = req.admin_data;
        const data = await db.query('SELECT * from Bugs where organisation=?', [
            organisation,
        ]);
        return res.sendSuccess(data, 'Sent Bugs metadata.');
    } catch (error) {
        res.sendError();
    }
});

router.post('/deleteBug', async (req, res) => {
    try {
        const { id } = req.body;
        await db.query('DELETE from Bugs where id=?;', [id]);
        return res.sendSuccess(null, 'Bug Resolved.');
    } catch (error) {
        res.sendError();
    }
});

router.post('/addIssue', async (req, res) => {
    try {
        const { reporter, assignee, name, description } = req.body;
        const { organisation } = req.admin_data;
        await db.query(
            'INSERT INTO Issue(reporter, assignee, name,description, organisation) VALUES(?,?,?,?,?);',
            [reporter, assignee, name, description, organisation],
        );
        return res.sendSuccess(null, 'Added Issue to organisation map.');
    } catch (error) {
        return res.sendError();
    }
});

router.post('/getIssue', async (req, res) => {
    try {
        const { organisation } = req.admin_data;
        const data = await db.query(
            'SELECT * from Issue where organisation=?;',
            [organisation],
        );
        return res.sendSuccess(data, 'Sent all Issues.');
    } catch (error) {
        return res.sendError();
    }
});

router.post('/deleteIssue', async (req, res) => {
    try {
        const { id } = req.body;

        await db.query('DELETE FROM Issue where id=?;', [id]);
        return res.sendSuccess(null, 'Deleted issue');
    } catch (error) {
        return res.sendError();
    }
});

export default router;
