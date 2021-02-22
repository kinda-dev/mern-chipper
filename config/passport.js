// requirements for passport

// grab the strategy we are going to use for handling jwt
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

// empty object
const options = {};

// where are we planning to get the json webtoken from and were do we want to
// extract it to
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// assign secret or key to check
options.secretOrKey = keys.secretOrKey;

// anonymous function, what stratefgy to use, this one takes two args, options above aand callback
// callback takes payload, second arg keyword "done", then we invoke the done function
// tells us that this middleware has done running
// module.exports = passport => {
//   passport.use(new JwtStrategy(options, (jwt_payload, done) => {
//     // This payload includes the items we specified earlier
//     console.log(jwt_payload);
//     done();
//   }));
// };


// fixed payload for passport
module.exports = passport => {
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            // return the user to the frontend
            return done(null, user);
          }
          // return false since there is no user
          return done(null, false);
        })
        .catch(err => console.log(err));
    }));
  };