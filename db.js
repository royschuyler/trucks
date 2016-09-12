var bookshelf = require('bookshelf');
var Promise = require('bluebird');

var config = {
   host: 'us-cdbr-iron-east-04.cleardb.net',
   user: 'b92d757f64dfcb',
   password: '8e8e5d6c',
   database: 'heroku_0a3af633b949104',
   charset: 'UTF8_GENERAL_CI'
};

var db = bookshelf.initialize({
   client: 'mysql',
   connection: config
});

module.exports.db = db;


