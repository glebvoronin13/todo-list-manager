import * as mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
    completed: {
        type: Boolean,
        required: true
    }
});

const Todo = mongoose.model('Todo', TodoSchema);
export default Todo;
