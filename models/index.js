var mongoose = require('mongoose');
mongoose.connect( process.env.MONGODB_URI ||'mongodb://localhost/project-2');

module.exports.Stock= require("./stock");
module.exports.User= require("./user");
