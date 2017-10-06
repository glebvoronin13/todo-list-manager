/*
import Todo from '../models/Todo';
import { sendResponse, sendErrorResponse } from '../helpers';

const addTodo = (req, res) => {
  const user = req.user;
  if (!user) {
    return sendErrorResponse(res, 401, 'Not Authorised');
  }
  const text = req.body.text;
  const completed = req.body.completed === 'true';
  const newTodo = new Todo({
    text: text,
    completed: completed,
    uid: user._id,
  });
  newTodo.save(function (err, data) {
    if (err) {
      return console.error(err);
    }
    sendResponse(data, res);
  });
};

const removeTodo = (req, res) => {
  const id = req.params.id;
  if (req.user && req.user._id) {
    const uid = req.user._id;
    Todo.findOneAndRemove({ _id: id, uid: uid  }, function (err, data) {
      if (err) {
        return console.error(err);
      }
      sendResponse(data, res);
    });
  } else {
    return sendErrorResponse(res, 401, 'Not Authorised');
  }
};

const updateTodo = (req, res) => {
  req.body.sanitized = req.sanitize(req.body.text);
  const id = req.params.id;
  const text = req.body.text;
  const completed = req.body.completed === 'true';
  const updateObject: any = {};
  if (req.body.text) {
    updateObject.text = text;
  }
  if (req.body.completed) {
    updateObject.completed = completed;
  }
  Todo.findByIdAndUpdate(id, updateObject, { new: true }, function (err, data) {
    if (err) {
      return console.error(err);
    }
    sendResponse(data, res);
  });
};

export default {
  addTodo,
  removeTodo,
  updateTodo,
};
*/
