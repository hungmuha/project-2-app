var passport = require('passport');
var request = require('request');
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
		successRedirect:'/member',
		failureRedirect:'/login',
		failureFlash :true
	})

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
}

function search(req,res, next) {
	console.log("hit search")
	var index = req.params.search;
	var searchThis="http://marketdata.websol.barchart.com/getQuote.json?apikey=11ba1fd5a7de3784398aa7d381ed4007&symbols="+index;
		request(searchThis,function(err,res,body){
			JSON.parse(body);
			
		});
}

module.exports = {
  getLogin: getLogin,
  postLogin: postLogin,
  getSignup: getSignup,
  postSignup: postSignup,
  getLogout: getLogout,
  member: member,
  search: search
}