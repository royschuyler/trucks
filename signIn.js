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

    var connection = mysql.createConnection(db_config);
    connection.connect(function(err) {
    if(err) {
    console.log('Connection is asleep (time to wake it up): ', err);
    setTimeout(handleDisconnect, 1000);
    handleDisconnect();
    }
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

//var sessionId = GUID();

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

        var sessionId = GUID();


        connection.query('INSERT INTO session(username, userId, sessionId)VALUES(' + '"' + user.username + '",' + '"' + user.userId + '",' + '"' + sessionId + '")'),
          function(err, rows) {
            //console.log(rows[0])
          };

        // connection.query('INSERT INTO landing(username, userId, sessionId, demographics, history, historyreview, testing, vision, hearing, physicalexam)VALUES(' + '"' + user.username + '",' + '"' + user.userId + '",' + '"' + sessionId + '",' + '"' + 0 + '",' + '"' + 0 + '",' + '"' + 0 + '",' + '"' + 0 + '",' + '"' + 0 + '",' + '"' + 0 + '",' + '"' + 0 + '")'),
        //   function(err, landingrows) {
        //   //console.log(landingrows[0])
        //   };




        return res.redirect('/landing/' + sessionId);
      }
    });
  })(req, res, next);
};

module.exports.signIn = signIn;
module.exports.signInPost = signInPost;
