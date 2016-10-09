var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var Model = require('./model');
var bodyParser = require('body-parser');

var getConnection  = require('./connectionpool');


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
  getConnection(function (err, connection) {
    connection.query('INSERT INTO moreinfo(username, fname, lname, registerAddress, registerCity, registerState, registerZip, registerPhone, registerEmail, stateLicense, stateLicenseState, nationalLicense, exp, what, specify, medicalNumber)VALUES(' + "'" + username  + "'," + "'" + req.body.fname   + "'," + "'" + req.body.lname  + "'," + "'" + req.body.registerAddress  + "'," + "'" + req.body.registerCity + "'," + "'" + req.body.registerState + "'," + "'" + req.body.registerZip + "'," + "'" + req.body.registerPhone + "'," + "'" + req.body.registerEmail + "'," + "'" + req.body.stateLicense   + "'," + "'" + req.body.stateLicenseState + "'," + "'" + req.body.nationalLicense + "'," + "'" + req.body.exp  + "'," + "'" + req.body.what + "'," + "'" + req.body.specify + "'," + "'" + req.body.medicalNumber + "')",
    function(err, rows) {
      connection.release();
    });
  });
    //connection.end();
  res.redirect('/signin')

};


module.exports.moreInfo = moreInfo;
module.exports.moreInfoPost = moreInfoPost;
