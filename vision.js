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

//**************************************************

var vision = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/signin');
  } else {

    var sessionId = req.params.sessionId;
    sessionIdArr.push(sessionId);

    var user = req.user;

    if (user !== undefined) {
      user = user.toJSON();
    }
    res.render('vision', {
      title: 'Vision',
      user: user
    });
  }
};

//-------------------------------------------------------
var visionPost = function(req, res, next) {

  var sessionId = sessionIdArr;
  var user = req.user;

  connection.query('INSERT INTO vision(username, userId, sessionId, rightuncorrected, rightcorrected, fieldright, leftuncorrected, leftcorrected, fieldleft, bothuncorrected, bothcorrected, traficlight, monocular, optometrist, documentation) VALUES(' + "'" + user.attributes.username + "'," + "'" + user.attributes.userId + "'," + "'" + sessionId + "'," + "'" + req.body.rightuncorrected + "'," + "'" + req.body.rightcorrected + "'," + "'" + req.body.fieldright + "'," + "'" + req.body.leftuncorrected + "'," + "'" + req.body.leftcorrected + "'," + "'" + req.body.fieldleft + "'," + "'" + req.body.bothuncorrected + "'," + "'" + req.body.bothcorrected + "'," + "'" + req.body.traficlight + "'," + "'" + req.body.monocular + "'," + "'" + req.body.optometrist + "'," + "'" + req.body.documentation + "')"),
    function(err, rows) {

    }


    res.redirect('/landing/' + sessionId)

};




module.exports.vision = vision;
module.exports.visionPost = visionPost;