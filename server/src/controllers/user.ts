import * as bcrypt from 'bcryptjs';
import * as passport from 'passport';
import User from '../models/User';
import { sendResponse, sendErrorResponse } from '../helpers';

const addUser = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();

  const errors = req.validationErrors();

  const newUser: any = new User({
    email: email,
    password: password,
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, function (cryptErr, hash) {
      if (cryptErr) {
        console.log(cryptErr);
      }
      newUser.password = hash;
      newUser.save((saveError) => {
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
  passport.authenticate('local', (err, user, info) => {
    // console.log(info);
    if (err) {
      return next(err);
    }
    if (!user) {
      return sendErrorResponse( res, 401, 'User not found or wrong password' );
    }
    req.logIn(user, (error) => {
      if (error) {
        return next(error);
      }
      sendResponse('success', res);
    });
  })(req, res, next);
};

const logout = (req, res, next) => {
  req.logout();
  req.session.destroy(() => {
    sendResponse('Logged out', res);
  });
};

export default {
  addUser,
  login,
  logout,
};
