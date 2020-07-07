let passport = require('passport');
let JwtStrategy = require('passport-jwt').Strategy;
let { ExtractJwt } = require('passport-jwt');
let LocalStrategy = require('passport-local').Strategy;
let { JWT_SECRET } = require('./configurations');
let User = require('./models/user');

// JSON Web Tokens Strategy
passport.use(new JwtStrategy({
   jwtFromRequest: ExtractJwt.fromHeader('authorization'),
   secretOrKey: JWT_SECRET
}, async (payload, done) => {
   try {
      //  Find a user specified in token
      let user = await User.findById(payload.sub);

      // if user doesn't exist, handle it
      if (!user) {
         return done(null, false)
      }

      // Otherwise, return the user
      done(null, user);
   } catch (error) {
      done(error, false);
   }
}));

// LOCAL STRATEGY
passport.use(new LocalStrategy({
   usernameField: 'login',

}, async (login, password, done) => {
   try {
      //  Find a user give the login
      let user = await User.findOne({ login });

      // if user wasn't found, handle it
      if (!user) {
         return done(null, false);
      }

      // Check the password
      let isMatch = await user.isValidPassword(password);

      // If wrong password - handle it
      if (!isMatch) {
         return done(null, false);
      }
      // Otherwise, return the user
      done(null, user);
   } catch (error) {
      done(error, false);
   }
}));