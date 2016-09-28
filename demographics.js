var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var Model = require('./model');
var bodyParser = require('body-parser');

var getConnection  = require('./connectionpool');

var sessionIdArr = [];

//***************************************************************

var demographics = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/signin');
  } else {

    var sessionId = req.params.sessionId;
    sessionIdArr.push(sessionId)

    var user = req.user;
    var userId = req.user.attributes.userId;
    var username = req.user.attributes.username;

    if (user !== undefined) {
      user = user.toJSON();
    }

    getConnection(function (err, connection) {
        connection.query("SELECT * FROM tblUsers WHERE tblUsers.username =" + '"' + req.user.attributes.username + '"',
        function(err, rows) {
          connection.release();
        });
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


  getConnection(function (err, connection) {
      connection.query('UPDATE landing SET demographics=1 WHERE landing.sessionId=' + "'" + sessionId + "'",
      function(err, rows) {
        connection.release();
      });
  });

  getConnection(function (err, connection) {
      connection.query('INSERT INTO persons2 (userId, username, sessionId, lastname, firstname, middlename, dob, age, streetaddress, city, state, zip, dln, issuing, phone, gender, email, holder, verified, denied) VALUES(' + '"' + user.attributes.userId + '",' + '"' + user.attributes.username + '",' + '"' + sessionId + '",' + "'" + req.body.lastname + "'," + "'" + req.body.firstname + "'," + "'" + req.body.middlename + "'," + "'" + req.body.dob + "'," + "'" + req.body.age + "'," + "'" + req.body.streetaddress + "'," + "'" + req.body.city + "'," + "'" + req.body.state + "'," + "'" + req.body.zip + "'," + "'" + req.body.dln + "'," + "'" + req.body.issuing + "'," + "'" + phone + "'," + "'" + req.body.gender + "'," + "'" + req.body.email + "'," + "'" + req.body.holder + "'," + "'" + req.body.verified + "'," + "'" + req.body.denied + "')",
      function(err, rows) {
        connection.release();
      });
  });



  res.redirect('/landing/' + sessionId);

  (req, res, next);
};

module.exports.demographics = demographics;
module.exports.demographicsPost = demographicsPost;
