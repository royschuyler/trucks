var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var Model = require('./model');
var bodyParser = require('body-parser');

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'us-cdbr-iron-east-04.cleardb.net',
  user: 'b92d757f64dfcb',
  password: '8e8e5d6c',
  database: 'heroku_0a3af633b949104'
});

var sessionIdArr = [];

//***********************************************************

var pdf = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/signin');
  } else {

    var sessionId = req.params.sessionId;
    sessionIdArr.push(sessionId);

    var user = req.user;

    if (user !== undefined) {
      user = user.toJSON();
    }

    res.download('watch9.pdf')

  }
};

module.exports.pdf = pdf;
