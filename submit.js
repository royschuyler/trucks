var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var Model = require('./model');
var bodyParser = require('body-parser');

var mysql = require('mysql');
var getConnection  = require('./connectionpool');

//***********************************************************

var submit = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/signin');
  } else {

    var user = req.user;
    sessionId = req.params.sessionId;
    console.log("submit: " + sessionId)

    if (user !== undefined) {
      user = user.toJSON();
    }
    res.render('submit', {
      title: 'Submit',
      user: user
    });
  }
};

//-------------------------------------------------------

var submitPost = function(req, res, next) {
  console.log("submit: " + sessionId)
  res.redirect('/signin')
};

module.exports.submit = submit;
module.exports.submitPost = submitPost;
