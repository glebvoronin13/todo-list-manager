import Todo from '../models/Todo';
import { sendResponse, sendErrorResponse } from '../helpers';

const getTodoList = (req, res) => {
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
    Todo.findOneAndRemove({ _id: id, uid: uid }, function (err, data) {
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

  if (req.user && req.user._id) {
    const uid = req.user._id;
    const id = req.params.id;
    const text = req.body.text;
    let completed;
    try {
      if ( req.body.completed.toString() === 'true' ) {
        completed = true;
      } else if ( req.body.completed.toString() === 'false' ) {
        completed = false;
      }
    } catch (e) {
      completed = null;
    }
    const updateObject: any = {};
    if (req.body.text) {
      updateObject.text = text;
    }
    if (completed !== null) {
      updateObject.completed = completed;
    }
    Todo.findOneAndUpdate({ _id: id, uid: uid }, updateObject, { new: true }, function (err, data) {
      if (err) {
        return sendErrorResponse(res, 401, err);
      }
      sendResponse(data, res);
    });
  } else {
    return sendErrorResponse(res, 401, 'Not Authorised');
  }
};

export default {
  getTodoList,
  addTodo,
  removeTodo,
  updateTodo,
};
