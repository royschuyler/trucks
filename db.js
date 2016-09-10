var bookshelf = require('bookshelf');
var Promise = require('bluebird');

var config = {
  host: 'localhost',
  user: 'root',
  password: 'Hollie12123',
  database: 'dbUsers',
   charset: 'UTF8_GENERAL_CI'
};

var db = bookshelf.initialize({
   client: 'mysql',
   connection: config
});

module.exports.db = db;
