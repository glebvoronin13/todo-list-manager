import Todo from '../models/Todo';
import { sendResponse } from '../helpers';

const addTodo = (req, res) => {
    const text = req.body.text;
    const completed = req.body.completed === 'true';
    const newTodo = new Todo({
        text: text,
        completed: completed,
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
    Todo.findByIdAndRemove( id, function (err, data) {
        if (err) {
            return console.error(err);
        }
        sendResponse(data, res);
    });
};

const updateTodo = (req, res) => {
    req.body.sanitized = req.sanitize(req.body.text);
    const id = req.params.id;
    const text = req.body.text;
    const completed = req.body.completed === 'true';
    const updateObject: any = {};
    if ( req.body.text ) {
        updateObject.text = text;
    }
    if ( req.body.completed ) {
        updateObject.completed = completed;
    }
    Todo.findByIdAndUpdate( id, updateObject, { new: true }, function (err, data) {
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
