var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var Model = require('./model');
var bodyParser = require('body-parser');
var url = require('url')

var mysql = require('mysql');


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


