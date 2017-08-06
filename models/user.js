var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Stock = require('./stock');

var User = mongoose.Schema({
  local: {	
	// name: String,
	email: String,
	password: String,	
 },
 	stocks: [Stock.schema]
});

User.methods.hash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

User.methods.validPassword = function(password) {
	return bcrypt.compareSync(password,this.local.password);
};


module.exports = mongoose.model('User',User);

// module.exports=User;