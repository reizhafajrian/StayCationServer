var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/Admin');

var app = express();
const methodOverride=require('method-override')
const session=require('express-session')
const flash = require('connect-flash');
//import mongoose
const mongoose=require('mongoose')
const DB=`mongodb://StayCation:StayCation121@cluster0-shard-00-00.rj1ep.mongodb.net:27017,cluster0-shard-00-01.rj1ep.mongodb.net:27017,cluster0-shard-00-02.rj1ep.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-13nkva-shard-0&authSource=admin&retryWrites=true&w=majority`
mongoose.connect(DB,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {  maxAge: 60000 }
}))

app.use(flash())

app.use("/sb-admin-2",express.static(path.join(__dirname, 'node_modules/startbootstrap-sb-admin-2')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
