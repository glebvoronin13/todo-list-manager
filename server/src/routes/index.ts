import * as express from 'express';
import todo from './todo';
import todos from './todos';

const init = (app) => {
    const router = express.Router();

    router.use(function(req, res, next) {
        console.log('Something is happening.');
        next();
    });

    todo.init({app, router});
    todos.init({app, router});

    app.use('/api', router);
};

export default {
    init
};
