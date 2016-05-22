var bookshelf = require('bookshelf');
var Promise = require('bluebird');

var config = {
   host: 'localhost',  // your host
   user: 'root', // your database user
   password: 'Hollie12123', // your database password
   database: 'dbUsers',
   charset: 'UTF8_GENERAL_CI'
};

var db = bookshelf.initialize({
   client: 'mysql',
   connection: config
});

module.exports.db = db;
