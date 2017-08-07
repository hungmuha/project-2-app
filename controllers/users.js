var passport = require('passport');
var request = require('request');
var db = require('../models');
//GET /signup
function getSignup(request, response, next){
	console.log("hit getSignup");
	response.render('signup.ejs',{ message:request.flash('signupMesage')});
}

//Post /signup
function postSignup(request, response, next) {
	//save a new user
	console.log("hit postSignup");
	let signupStrategy = passport.authenticate('local-signup',{
		successRedirect:'/',
		failureRedirect:'/signup',
		failureFlash: true
	});

	return signupStrategy(request, response, next);
}

//GET /login
function getLogin(request, response, next) {
	response.render('login.ejs', {message:request.flash('loginMessage') });
}

//POST /login
function postLogin(request, response, next) {
	var loginProperty = passport.authenticate('local-login', {
		successRedirect:'/',
		failureRedirect:'/login',
		failureFlash :true
	})
	console.log(request.body);
	return loginProperty(request, response, next);
}

// GET /logout
function getLogout(request, response,next) {
	request.logout();
	response.redirect('/');
}
//get member after login and authenticated and authorized
function member(request, response,next) {
	response.render('member.ejs');
	var email = request.params.email;
	db.User.findOne({'local.email':email},function(err,user){
		console.log(user);
		response.json(user._id);
	})
}

function getPortfolio(request,response,next){
	response.render('member.ejs');
	console.log(foundUser.stocks);
}

function postPortfolio(request,response, next) {
	console.log("hit post portfolio")
	db.User.findById(id)
	.exec(function(err,foundUser){
		foundUser.stocks.push({name: req.body.name});
		foundUser.save(function(err){
			res.json(foundUser);
		});
	});
};



module.exports = {
  getLogin: getLogin,
  postLogin: postLogin,
  getSignup: getSignup,
  postSignup: postSignup,
  getLogout: getLogout,
  member: member,
  getPortfolio: getPortfolio,
  postPortfolio: postPortfolio
}