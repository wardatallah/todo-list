import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';
import _ from 'lodash';
import moment from 'moment';
dotenv.config();
import routes from './routes/index.js';
import cors from 'cors';
const port = process.env.PORT || '3000';

const app = express();
app.use(cors({origin: '*'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// catch 400
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(400).send(`Error: ${res.originUrl} not found`);
    next();
});

// catch 500
app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send(`Error: ${err}`);
    next();
});

/**
* Register the routes
*/

routes.onInit(app);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

// export default app;
