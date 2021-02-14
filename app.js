var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var jsonBodyParser = require('body-parser');
//var bodyParser = require('body')
var logger = require('morgan');
var hbs = require('express-handlebars')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutRouter = require('./routes/about');
var loginRouter = require('./routes/login');
const { RequestHeaderFieldsTooLarge } = require('http-errors');

//we can use regular expresstions

var app = express();

// view engine setup
app.engine('hbs',hbs({extname: 'hbs',defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));

app.use(jsonBodyParser.urlencoded({extended: true}));
app.use(jsonBodyParser.json())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

//app.router is deprecated!
//app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

//connect is used by express

app.use('/', indexRouter);
app.use('/login',loginRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);
app.use('/file.txt',(req,res,next) =>{
  res.send("I am not file anymore....")
});

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
