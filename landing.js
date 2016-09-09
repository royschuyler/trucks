var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var Model = require('./model');
var bodyParser = require('body-parser');
var url = require('url')

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'mysql://b9777c526cd36f:98fe641b@us-cdbr-iron-east-04.cleardb.net/heroku_5a0c317d331b7d8?reconnect=true',
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

    //console.log("url " + req.url)
    var str = req.url
    var hasDemographics = str.split('?')[1]

    console.log('demo: ' + hasDemographics)
    var sessionId = req.params.sessionId;
    sessionIdArr.push(sessionId);
    console.log(sessionId)

    if (user !== undefined) {
      user = user.toJSON();
    }

    var user = req.user;



    res.render('landing', {
      title: 'Landing',
      user: user,
      sessionId: sessionId,
      hasDemographics: hasDemographics
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


