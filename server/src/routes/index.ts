import * as express from 'express';
import * as expressValidator from 'express-validator';
import todos from './todos';
import user from './user';

const init = (app) => {
  const router = express.Router();

  router.use(expressValidator());

  router.use(function (req, res, next) {
    next();
  });

  user.init({ app, router });
  todos.init({ app, router });

  app.use('/api', router);
};

export default {
  init
};
