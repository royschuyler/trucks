var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var Model = require('./model');
var bodyParser = require('body-parser');

var mysql = require('mysql');
var getConnection  = require('./connectionpool');

//***********************************************************

var option = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/signin');
  } else {

    var user = req.user;
    sessionId = req.params.sessionId;
    console.log("qoiuqoiun: " + sessionId)

    if (user !== undefined) {
      user = user.toJSON();
    }
    res.render('option', {
      title: 'Option',
      user: user,
      sessionId: sessionId
    });
  }
};

var optionPost = function(req, res, next) {

  //var user = req.user;
  res.redirect('/landing/' + sessionId)

};

module.exports.option = option;
module.exports.optionPost = optionPost;


