import userController from '../controllers/user';

const init = ({ app, router }) => {
    router.route('/user')
        .post(userController.addUser);
};

export default {
    init
};
