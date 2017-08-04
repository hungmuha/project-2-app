var passport = require('passport');
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

module.exports = {
  getLogin: getLogin,
  postLogin: postLogin,
  getSignup: getSignup,
  postSignup: postSignup,
  getLogout: getLogout,
  member: member
}