('use strict')
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
		successRedirect:'/member',
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
	var email = request.params.email;
	// db.User.findOne({'local.email':email},function(error,user){
	// 	console.log(user);
		response.render('member.ejs');
	// });
}

function getPortfolioInfo(request,response,next){
	var id = request.params.id;
	//using promise to make sure all the items comeback after hitting API
	function getPromise(){
		var stockPackage=[];
		var requestSend = require('request');
		db.User.findById(id)
		.exec(function(err,foundUser){
		
			for (var i=0;i<foundUser.stocks.length;i++){
				
				var stockName= foundUser.stocks[i].name;
				var apiURL = "https://www.quandl.com/api/v3/datasets/WIKI/"+foundUser.stocks[i].name+"/data.json?api_key=stetDCHJ1XKLf1Sx5NZe";
				
				console.log(stockName);
				
				var gettingData = new Promise(
					function(resolve,reject){
					requestSend(apiURL,function(stockName,res,body){
						var json= JSON.parse(body);
						// console.log(stockName);
						var stockData = {'Date': json.dataset_data.data[0][i][0], 'Close-Price':json.dataset_data.data[0][i][4]};
						
					})
						resolve(stockData);
					}
					
				);
				stockPackage.push(gettingData);
			}
		
		return stockPackage;		
			
		})
	}
	//these are not done
	var promiseNotDone = getPromise();
	console.log("these are not ready yet!");
	console.log(promiseNotDone);

	Promise.all(promiseNotDone).then(data=>{
		console.log("all of the promise are done!")
		response.json(data);
	})
}

function getPortfolio(request,response,next) {
	console.log("hit get portfolio name")
	var id = request.params.id;
	db.User.findById(id)
	.exec(function(err,foundUser){
		console.log(foundUser);
		response.json(foundUser.stocks);
	});
}

function postPortfolio(request,response, next) {
	console.log("hit post portfolio")
	var id = request.params.id;
	db.User.findById(id)
	.exec(function(err,foundUser){
		console.log(foundUser);
		foundUser.stocks.push({name: request.body.name});
		foundUser.save(function(err){
			response.json(foundUser);
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