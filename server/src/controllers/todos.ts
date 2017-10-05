import Todo from '../models/Todo';
import { sendResponse, sendErrorResponse } from '../helpers';

const getTodos = (req, res) => {
  console.log('user', req.user);
  if (!req.user) {
    return sendErrorResponse(res, 401, 'Not Authorised');
  }
  const id = req.user._id;
  Todo.find({ uid: id }, function (err, data) {
        if (err) {
            return console.error(err);
        }
        sendResponse(data, res);
    });
};

export default {
    getTodos
};
