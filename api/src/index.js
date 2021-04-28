import express from 'express';
import body from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import response from './utils/response';
import routes from './routes/index';
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(function (request, response, next) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );
    next();
});
app.use(morgan('dev'));
app.use(body.json());
app.use(body.urlencoded({ extended: false }));
app.use(response);
app.use(routes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    if (process.env.MODE === 'DEV') console.log(`Server init on PORT ${PORT}.`);
});
