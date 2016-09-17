var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var Model = require('./model');
var bodyParser = require('body-parser');

var mysql = require('mysql');
var db_config = {
      host: 'us-cdbr-iron-east-04.cleardb.net',
      user: 'b92d757f64dfcb',
      password: '8e8e5d6c',
      database: 'heroku_0a3af633b949104'
    };

function handleDisconnect() {
  console.log('handleDisconnect()');
  connection.destroy();
  connection = mysql.createConnection(db_config);
  connection.connect(function(err) {
      if(err) {
      console.log(' Error when connecting to db  (DBERR001):', err);
      setTimeout(handleDisconnect, 1000);
      }
  });

}
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

    var connection = mysql.createConnection(db_config);
    connection.connect(function(err) {
    if(err) {
    console.log('Connection is asleep (time to wake it up): ', err);
    setTimeout(handleDisconnect, 1000);
    handleDisconnect();
    }
    });

connection.query('INSERT INTO moreinfo(username, registerAddress, registerCity, registerState, registerZip, registerPhone, registerEmail, stateLicense, nationalLicense)VALUES(' + "'" + username  + "'," + "'" + req.body.registerAddress  + "'," + "'" + req.body.registerCity + "'," + "'" + req.body.registerState + "'," + "'" + req.body.registerZip + "'," + "'" + req.body.registerPhone + "'," + "'" + req.body.registerEmail + "'," + "'" + req.body.stateLicense + "'," + "'" + req.body.nationalLicense + "')"),
    function(err, rows) {

    }
    connection.destroy();

  res.redirect('/signin')

};


module.exports.moreInfo = moreInfo;
module.exports.moreInfoPost = moreInfoPost;
