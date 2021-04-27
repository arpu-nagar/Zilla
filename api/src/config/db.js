import mysql from 'promise-mysql';

export default mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DB,
    password: process.env.MYSQL_PASS,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
});
