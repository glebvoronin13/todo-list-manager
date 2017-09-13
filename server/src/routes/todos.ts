import todosController from '../controllers/todos';

const init = ({ app, router }) => {
    router.route('/todos')
        .get(todosController.getTodos);
};

export default {
    init
};
