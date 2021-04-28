import mysql from 'promise-mysql';
import 'dotenv/config';

export default mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DB,
    password: process.env.PASS,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
});
