const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

module.exports = function(passport){

	passport.serializeUser(function(user,callback){
		callback(null,user.id);
	});

	passport.deserializeUser(function(id, callback){
		User.findById(id,function(err,user) {
			callback(err,user);
		});
	});

	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, function(req,email,password,callback){
		console.log("function ran");
		//find a user given the email
		User.findOne({'local.email':email} ,function(err,user){
			if(err) return callback(err);
				console.log('no mongo error!');
			//if User already exists
			if(user){
				console.log('user exist');
				return callback(null, false, req.flash('signupMessage','This email is already exist'));
			}else{
				console.log('user doesnt');
				//user does not exist yet
				//create it
				let newUser = new User();
				newUser.local.email = email;
				newUser.local.password = newUser.hash(password);

				newUser.save(function(err) {
					if(err) throw err;
					return callback(null,newUser);
				});
			};
		});
	}));

	passport.use('local-login', new LocalStrategy({
		usernameField:'email',
		passwordField:'password',
		passReqToCallback:true
	}, function(req,email,password,callback){
		//search for a user with this email
			User.findOne({ 'local.email' :email}, function(err,user) {
				if(err) {
					return callback(err);
				}
				//if no user is found
				if(!user) {
					return callback(null,false, req.flash('loginMessage','No user found.'));
				}
				////wrong password
				if(!user.validPassword(password)) {
					return callback(null, false, req.flash('loginMessage', 'OOps!Wrong password.'));
				}

				return callback(null,user);
			});
	
	}));

};