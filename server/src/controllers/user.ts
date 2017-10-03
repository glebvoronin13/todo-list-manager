import * as bcrypt from 'bcryptjs';
import * as passport from 'passport';
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

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(newUser.password, salt, function (cryptErr, hash) {
      if (cryptErr) {
        console.log(cryptErr);
      }
      newUser.password = hash;
      newUser.save(function (saveError) {
        if (saveError) {
          console.log(saveError);
          return;
        } else {
          sendResponse('success', res);
        }
      });
    });
  });

};

const login = (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {
    // console.log(info);
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send('No user');
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      sendResponse('success', res);
    });
  })(req, res, next);
};

export default {
  addUser,
  login,
};
