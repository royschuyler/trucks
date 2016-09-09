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

//**************************************************

var testing = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/signin');
  } else {

    var sessionId = req.params.sessionId;
    sessionIdArr.push(sessionId);

    var user = req.user;

    if (user !== undefined) {
      user = user.toJSON();
    }
    res.render('testing', {
      title: 'Testing',
      user: user
    });
  }
};

//-------------------------------------------------------
var testingPost = function(req, res, next) {

  var sessionId = sessionIdArr;
  var user = req.user;

  connection.query('INSERT INTO testing(username, userId, sessionId, pulserate, pulserhythm, heightfeet, heightinches , weight, urinesp, urineprotein, urineblood, urinesugar, systolic1, diastolic1, systolic2, diastolic2, othertesting) VALUES(' + "'" + user.attributes.username + "'," + "'" + user.attributes.userId + "'," + "'" + sessionId + "'," + "'" + req.body.pulserate + "'," + "'" + req.body.pulserhythm + "'," + "'" + req.body.heightfeet + "'," + "'" + req.body.heightinches + "'," + "'" + req.body.weight + "'," + "'" + req.body.urinesp + "'," + "'" + req.body.urineprotein + "'," + "'" + req.body.urineblood + "'," + "'" + req.body.urinesugar + "'," + "'" + req.body.systolic1 + "'," + "'" + req.body.diastolic1 + "'," + "'" + req.body.systolic2 + "'," + "'" + req.body.diastolic2 + "'," + "'" + req.body.othertesting + "')"),
    function(err, rows) {

    }

  res.redirect('/landing/' + sessionId)
};

module.exports.testing = testing;
module.exports.testingPost = testingPost;
