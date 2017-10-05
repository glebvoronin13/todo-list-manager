import userController from '../controllers/user';

const init = ({ app, router }) => {
  router.route('/user')
      .post(userController.addUser);
  router.route('/session')
      .post(userController.login)
      .delete(userController.logout);
};

export default {
  init
};
