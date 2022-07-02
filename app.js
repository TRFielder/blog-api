const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const { default: mongoose } = require('mongoose');
const Author = require('./models/author');
require('dotenv').config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// connect to mongoDB
const dbURI = process.env.DB_URI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

// Set up PassportJS middleware
const sessionSecret = process.env.SESSION_SECRET;

app.use(
  session({ secret: sessionSecret, resave: false, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Set up passportJS local strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await Author.findOne({ username });
    if (!user) {
      return done(null, false, { message: 'User not found' });
    }
    bcrypt.compare(password, user.password, (err, res) => {
      if (res) {
        // Passwords match, log user in
        return done(null, user);
      }
      // Passwords do not match
      return done(null, false, { message: 'Incorrect password' });
    });
    return done(null, false, { message: 'Error logging in' });
  })
);

// Manage user session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Author.findById(id, (err, user) => {
    done(err, user);
  });
});

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
