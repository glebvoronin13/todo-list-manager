import userController from '../controllers/user';

const init = ({ app, router }) => {
  router.route('/user')
      .post(userController.addUser);
  router.route('/login')
      .post(userController.login);
};

export default {
  init
};
