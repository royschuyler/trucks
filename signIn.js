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

function GUID() {
  // http://www.ietf.org/rfc/rfc4122.txt
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}

var sessionId = GUID();

var signIn = function(req, res, next) {
  if (req.isAuthenticated()) res.redirect('/');
  res.render('signin', {
    title: 'Sign In'
  });

};

//-------------------------------------------------------

var signInPost = function(req, res, next) {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin'
  }, function(err, user, info) {
    if (err) {
      return res.render('signin', {
        title: 'Sign In',
        errorMessage: err.message
      });
    }

    if (!user) {
      return res.render('signin', {
        title: 'Sign In',
        errorMessage: info.message
      });
    }

    return req.logIn(user, function(err) {
      if (err) {
        return res.render('signin', {
          title: 'Sign In',
          errorMessage: err.message
        });
      } else {

        connection.query('INSERT INTO session(username, userId, sessionId)VALUES(' + '"' + user.username + '",' + '"' + user.userId + '",' + '"' + sessionId + '")'),
          function(err, rows) {
            //console.log(rows[0])
          };

        connection.query('INSERT INTO landing(username, userId, sessionId, demographics, history, historyreview, testing, vision, hearing, physicalexam)VALUES(' + '"' + user.username + '",' + '"' + user.userId + '",' + '"' + sessionId + '",' + '"' + 0 + '",' + '"' + 0 + '",' + '"' + 0 + '",' + '"' + 0 + '",' + '"' + 0 + '",' + '"' + 0 + '",' + '"' + 0 + '")'),
          function(err, landingrows) {
          //console.log(landingrows[0])
          };




        return res.redirect('/landing/' + sessionId);
      }
    });
  })(req, res, next);
};

module.exports.signIn = signIn;
module.exports.signInPost = signInPost;
