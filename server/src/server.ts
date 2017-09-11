import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

const app = express();

const start = (port) => {
    initExpress();

    // init routes

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
        let message = 'Error';
        res.status(500).send({error: message});
    });
};

export default {
    start
};