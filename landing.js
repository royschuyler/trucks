var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var Model = require('./model');
var bodyParser = require('body-parser');
var url = require('url')
var getConnection  = require('./connectionpool');


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

  getConnection(function (err, connection) {
    connection.query('SELECT * fROM landing WHERE sessionId=' + "'" + sessionId + "'",
    function(err, rows) {
      connection.release();
      console.log(rows[0])

    res.render('landing', {
      title: 'Landing',
      user: user,
      sessionId: sessionId,
      x: rows[0]
    });
    });
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


