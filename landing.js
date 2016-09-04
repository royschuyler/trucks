var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var Model = require('./model');
var bodyParser = require('body-parser');

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Hollie12123',
  database: 'dbUsers'
});

var sessionIdArr = [];

//**********************************************************

var landing = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/signin');
  } else {


    var sessionId = req.params.sessionId;
    sessionIdArr.push(sessionId);

    if (user !== undefined) {
      user = user.toJSON();
    }

    var user = req.user;

    setTimeout(function(){}, 1000)
    connection.query('SELECT * FROM landing WHERE sessionId = ' + '"' + sessionId + '"',
      function(err, rows, fields) {
      console.log(rows[0])
      });

    res.render('landing', {
      title: 'Landing',
      user: user,
      sessionId: sessionId
    });
  }
};

//-------------------------------------------------------

// var landingPost = function(req, res, next) {

//   var sessionId = sessionIdArr;
//   var user = req.user;

//   console.log(sessionId)


//   res.redirect('/home/' + sessionId)
// };

module.exports.landing = landing;
//module.exports.landingPost = landingPost;


