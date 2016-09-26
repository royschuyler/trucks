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


var usernameArr = [];

//**************************************************************

var moreInfo = function(req, res, next) {

    var username = req.params.username;
    usernameArr.push(username);

  res.render('moreinfo', {
    title: 'More Info'
      // user: user
  });
}

//-------------------------------------------------------
var moreInfoPost = function(req, res, next) {

var username = usernameArr;
console.log(username)

connection.query('INSERT INTO moreinfo(username, registerAddress, registerCity, registerState, registerZip, registerPhone, registerEmail, stateLicense, nationalLicense)VALUES(' + "'" + username  + "'," + "'" + req.body.registerAddress  + "'," + "'" + req.body.registerCity + "'," + "'" + req.body.registerState + "'," + "'" + req.body.registerZip + "'," + "'" + req.body.registerPhone + "'," + "'" + req.body.registerEmail + "'," + "'" + req.body.stateLicense + "'," + "'" + req.body.nationalLicense + "')"),
    function(err, rows) {

    }
    //connection.end();

  res.redirect('/signin')

};


module.exports.moreInfo = moreInfo;
module.exports.moreInfoPost = moreInfoPost;
