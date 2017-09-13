import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import { sendErrorResponse } from './helpers';
import routes from './routes/index';
import db from './db';

const app = express();

const start = async (port) => {

    db.init();

    initExpress();

    // init routes
    routes.init(app);

    initErrorHandling();

    // init db

    return new Promise((resolve, reject) => {
        app.listen(port, () => {
            return resolve(port);
        });
    });
};

const initExpress = () => {
    app.use(bodyParser.json()); // get information from html forms
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cors());
};

const initErrorHandling = () => {
    app.use((err, req, res, next) => {
        sendErrorResponse(err, res);
    });
};

export default {
    start
};
