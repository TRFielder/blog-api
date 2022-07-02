const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;

const Author = require('../models/author');

// PassportJS strategy setup

passport.use(
  new LocalStrategy((username, password, done) => {
    Author.findOne({ username }, (err, author) => {
      if (err) return done(err);
      if (!author) return done(null, false, 'Incorrect username');

      bcrypt.compare(password, author.password, (err, res) => {
        if (res) return done(null, author);
        return done(null, false, { message: 'Incorrect password' });
      });
    });
  })
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret',
    },
    (jwtPayload, done) => done(null, jwtPayload)
  )
);

module.exports = passport;
