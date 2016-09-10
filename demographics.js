var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var Model = require('./model');

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'us-cdbr-iron-east-04.cleardb.net',
  user: 'b92d757f64dfcb',
  password: '8e8e5d6c',
  database: 'heroku_0a3af633b949104'
});

connection.connect(function(err) {
  if (!err) {
    console.log("Database is connected ... \n\n");
  } else {
    console.log("Error connecting database ... \n\n");
  }
});

var demographics = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/signin');
  } else {

    var user = req.user;
    var userId = req.user.attributes.userId

    if (user !== undefined) {
      user = user.toJSON();
    }

    res.render('demographics', {
      title: 'Demographics',
      user: user,
      userId: userId
    });
  }
};
//------------------------------------------------------
var demographicsPost = function(req, res, next) {

  var user = req.user;

  console.log(user.attributes.username);

  connection.query('INSERT INTO persons(userId, username, sessionId, FirstName, MiddleName, LastName, Address, Zip, DOB, SSN, City, State, Country, Company, Email, Doctor, GUID)Values(' + '"' + user.attributes.userId + '",' + '"' + user.attributes.username + '",' + '"' + sessionId + '",' + "'" + req.body.fName + "'," + "'" + req.body.mName + "'," + "'" + req.body.lName + "'," + "'" + req.body.address + "'," + "'" + req.body.zip + "'," + "'" + req.body.dob + "'," + "'" + req.body.ssn + "'," + "'" + req.body.city + "'," + "'" + req.body.state + "'," + "'" + req.body.country + "'," + "'" + req.body.company + "'," + "'" + req.body.email + "'," + "'" + req.body.username + "'," + "'" + GUID() + "'" + ')'),
    function(err, rows) {};

  res.redirect('/history');

  (req, res, next);
};

module.exports.demographics = demographics;
module.exports.demographicsPost = demographicsPost;
