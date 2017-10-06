import * as passport from 'passport';
import * as mongoose from 'mongoose';
import * as passportLocal from 'passport-local';
import * as bcrypt from 'bcryptjs';
import User from './models/User';
const LocalStrategy = passportLocal.Strategy;

const init = () => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function(email, password, done){
      // Match Username
      const query = { email: email };
      User.findOne(query, function(err, user: any){
        if (err) { throw err; }
        if (!user) {
          return done(null, false, { message: 'No user found' });
        }

        // Match Password
        bcrypt.compare(password, user.password, function(err, isMatch){
          if (err) { throw err; }
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Wrong password' });
          }
        });
      });
    }));

    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
        done(err, user);
      });
    });


};

export default {
  init
};
