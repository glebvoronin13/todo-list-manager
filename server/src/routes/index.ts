import * as express from 'express';
import * as expressValidator from 'express-validator';
import todo from './todo';
import todos from './todos';
import user from './user';

const init = (app) => {
  const router = express.Router();

  router.use(expressValidator());

  router.use(function (req, res, next) {
    console.log('Something is happening.');
    next();
  });

  todo.init({ app, router });
  user.init({ app, router });
  todos.init({ app, router });

  app.use('/api', router);
};

export default {
  init
};
