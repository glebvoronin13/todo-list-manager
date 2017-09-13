import todoController from '../controllers/todo';

const init = ({ app, router }) => {
    router.route('/todo')
        .post(todoController.addTodo);
    router.route('/todo/:id')
        .delete(todoController.removeTodo);
};

export default {
    init
};
