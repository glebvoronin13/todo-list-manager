import todosController from '../controllers/todos';

const init = ({ app, router }) => {
  router.route('/todos')
      .get(todosController.getTodoList)
      .post(todosController.addTodo);
  router.route('/todos/:id')
      .put(todosController.updateTodo)
      .delete(todosController.removeTodo);
};

export default {
  init
};
