import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as session from 'express-session';
import * as passport from 'passport';
import passportConfig from './passport';

import { sendErrorResponse } from './helpers';
import routes from './routes/index';
import db from './db';

const app = express();

const start = async (port) => {
  return new Promise((resolve, reject) => {
    db.init().then(
        () => {
          initExpress();
          routes.init(app);
          initErrorHandling();
          app.listen(port, () => {
            return resolve(port);
          });
        },
        (err) => {
          console.log('Mongo connection err: ', err);
        }
    );
  });
};

const initExpress = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors({
    origin: function (origin, callback) {
      callback(null, true);
    },
    credentials: true
  }));
  app.use(session({
    secret: 'cookie_secret',
    name: 'tlm_user',
    proxy: true,
    resave: true,
    saveUninitialized: true
  }));
  passportConfig.init();
  app.use(passport.initialize());
  app.use(passport.session());
};

const initErrorHandling = () => {
  app.use((err, req, res, next) => {
    sendErrorResponse(res);
  });
};

export default {
  start
};
