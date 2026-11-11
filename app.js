var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var Bicycle = require("./models/bicycle");

require('dotenv').config();
const connectionString = process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString);

//get default connection
var db = mongoose.connection;

//bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB Connection Error:'));
db.once("open", function(){
	console.log("Connection to DB succeeded")});

async function recreateDB(){
	//delete everything
	await Bicycle.deleteMany();

	let bicycle1 = new Bicycle({wheels:2, color:"red", brand:"giant"});
	let bicycle2 = new Bicycle({wheels:1, color:"black", brand:"uni"});
	let bicycle3 = new Bicycle({wheels:2, color:"green", brand:"generic"});
	var bicycleArr = [bicycle1, bicycle2, bicycle3];
	for (item of bicycleArr){
		item.save().then(doc=>{
			console.log("Object Saved: " + item)}
		).catch(err=>{
			console.error(err)
		});
	}
}

let reseed = true;
if (reseed) {recreateDB();}

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bicycleRouter = require('./routes/bicycle');
var gridRouter = require('./routes/grid');
var randomItemRouter = require('./routes/pick');
var resourceRouter = require('./routes/resource');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bicycle', bicycleRouter);
app.use('/grid', gridRouter);
app.use('/randomItem', randomItemRouter);
app.use('/resource', resourceRouter);

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
