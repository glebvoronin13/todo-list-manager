import * as bcrypt from 'bcryptjs';
import User from '../models/User';
import { sendResponse } from '../helpers';

const addUser = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    const errors = req.validationErrors();

    const newUser: any = new User({
        email: email,
        password: password,
    });

    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newUser.password, salt, function(cryptErr, hash){
            if (cryptErr) {
                console.log(cryptErr);
            }
            newUser.password = hash;
            newUser.save(function(saveError){
                if (saveError) {
                    console.log(saveError);
                    return;
                } else {
                    sendResponse( 'success', res );
                }
            });
        });
    });

};

export default {
    addUser,
};
