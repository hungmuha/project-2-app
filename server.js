var express= require('express');
var app= express();
var mongoose = require ('mongoose');
var passport = require('passport');
var flash= require('connect-flash');
var morgan = require('morgan');
var cookieParser= require('cookie-parser');
var bodyParser= require('body-parser');
var session= require('express-session');


// mongoose.connect('mongodb://localhost/project-2');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set('views', './views');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine','ejs');

app.use(express.static(__dirname + '/public'));

app.use(session({ secret: 'some basic understanding on watching stock or the market',resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport')(passport);


app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	next();
});


var routes = require('./config/routes');
app.use(routes);



app.listen(process.env.PORT || 4000);
