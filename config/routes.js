var express =require('express');
var router= express.Router();
//Parses information from POST
var bodyParser = require('body-parser');
//Used to manipulate POST methods
var methodOverride =require('method-override');
var passport = require("passport");
var usersController = require('../controllers/users');
var staticsController = require('../controllers/statics');

// authenticated User
function authenticatedUser(req,res,next){

	if(req.isAuthenticated()) return next();

	res.redirect('/');
}

router.route('/')
  .get(staticsController.home);

router.route('/signup')
  .get(usersController.getSignup)
  .post(usersController.postSignup)

router.route('/login')
  .get(usersController.getLogin)
  .post(usersController.postLogin)

router.route("/logout")
  .get(usersController.getLogout)

router.route("/member")
  .get(authenticatedUser,usersController.member)

router.route("/member/:id/portfolio")
  .get(usersController.getPortfolio)
  .post(usersController.postPortfolio)

// router.route("/member/:id/portfolioInfo")
//   .get(usersController.getPortfolioInfo)

module.exports = router;