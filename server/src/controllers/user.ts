import * as bcrypt from 'bcryptjs';
import * as passport from 'passport';
import User from '../models/User';
import { sendResponse, sendErrorResponse } from '../helpers';
import { PublicUser } from '../models/PublicUser';

const addUser = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();

  const errors = req.validationErrors();

  User.find({ email }, (error, user) => {
    if ( error ) {
      return sendErrorResponse(res, 500, 'Server error');
    }
    if ( user && user.length ) {
      return sendErrorResponse(res, 500, 'Email is already taken');
    } else {
      const newUser: any = new User({
        email: email,
        password: password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, function (cryptErr, hash) {
          if (cryptErr) {
            sendErrorResponse(res, 500, cryptErr);
            return;
          }
          newUser.password = hash;
          newUser.save((saveError) => {
            if (saveError) {
              return sendErrorResponse(res, 500, saveError);
            } else {
              // return sendResponse(new PublicUser(newUser), res);
              login( req, res, next );
            }
          });
        });
      });
    }
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
      sendResponse(new PublicUser(user), res);
    });
  })(req, res, next);
};

const logout = (req, res, next) => {
  req.logout();
  req.session.destroy(() => {
    sendResponse({ message: 'Logged out' }, res);
  });
};

const checkUser = (req, res) => {
  if (req.user && req.user._id) {
    const uid = req.user._id;
    User.findById(uid, function (err, data) {
      if (err) {
        return sendErrorResponse(res, 404, err);
      }
      sendResponse(data, res);
    });
  } else {
    return sendErrorResponse(res, 401, 'Not Authorised');
  }
};

export default {
  addUser,
  login,
  logout,
  checkUser,
};
