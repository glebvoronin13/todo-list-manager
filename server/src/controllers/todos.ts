import Todo from '../models/Todo';
import { sendResponse } from '../helpers';

const getTodos = (req, res) => {
  console.log('user', req.user);
  Todo.find({ }, function (err, data) {
        if (err) {
            return console.error(err);
        }
        sendResponse(data, res);
    });
};

export default {
    getTodos
};
