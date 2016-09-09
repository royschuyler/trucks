var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var Model = require('./model');
var bodyParser = require('body-parser');

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'us-cdbr-iron-east-04.cleardb.net',
  user: 'b92d757f64dfcb',
  password: '8e8e5d6c ',
  database: 'heroku_0a3af633b949104'
});

var sessionIdArr = [];

//***************************************************************

var demographics = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/signin');
  } else {

    var sessionId = req.params.sessionId;
    sessionIdArr.push(sessionId)
    console.log("newId: " + sessionId)
    console.log("Arr: " + sessionIdArr)


    var user = req.user;
    var userId = req.user.attributes.userId;
    var username = req.user.attributes.username;
    console.log("domoUsername: " + username)

    if (user !== undefined) {
      user = user.toJSON();
    }

    connection.query("SELECT * FROM tblUsers WHERE tblUsers.username =" + '"' + req.user.attributes.username + '"',
      function(err, rows) {
        console.log(rows[0])
      });

    res.render('demographics', {
      title: 'Demographics',
      user: user,
      userId: userId
    });
  }
};

//------------------------------------------------------

var demographicsPost = function(req, res, next) {

  var posted = 'd';
  var sessionId = sessionIdArr;
  var user = req.user;
  var phone = req.body.phone1 + req.body.phone2 + req.body.phone3;

  connection.query('INSERT INTO persons2 (userId, username, sessionId, lastname, firstname, middlename, dob, age, streetaddress, city, state, zip, dln, issuing, phone, gender, email, holder, verified, denied) VALUES(' + '"' + user.attributes.userId + '",' + '"' + user.attributes.username + '",' + '"' + sessionId + '",' + "'" + req.body.lastname + "'," + "'" + req.body.firstname + "'," + "'" + req.body.middlename + "'," + "'" + req.body.dob + "'," + "'" + req.body.age + "'," + "'" + req.body.streetaddress + "'," + "'" + req.body.city + "'," + "'" + req.body.state + "'," + "'" + req.body.zip + "'," + "'" + req.body.dln + "'," + "'" + req.body.issuing + "'," + "'" + phone + "'," + "'" + req.body.gender + "'," + "'" + req.body.email + "'," + "'" + req.body.holder + "'," + "'" + req.body.verified + "'," + "'" + req.body.denied + "')"),
    function(err, rows) {
    }

  res.redirect('/landing/' + sessionId + '?' + posted);

  (req, res, next);
};




module.exports.demographics = demographics;
module.exports.demographicsPost = demographicsPost;
