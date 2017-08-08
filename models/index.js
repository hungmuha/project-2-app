var mongoose = require('mongoose');
mongoose.connect( process.env.MONGODB_URI || 
                  process.env.MONGOLAB_URI || 
                  process.env.MONGOHQ_URL ||'mongodb://localhost/project-2');

module.exports.Stock= require("./stock");
module.exports.User= require("./user");
