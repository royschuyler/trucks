var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var Model = require('./model');
var bodyParser = require('body-parser');

var mysql = require('mysql');

//-----------------------------------------------------

var index = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/signin');
  } else {

    var user = req.user;

    if (user !== undefined) {
      user = user.toJSON();
    }
    res.render('index', {
      title: 'Home',
      user: user
    });
  }
};

//-------------------------------------------------------------------------------------------

var signOut = function(req, res, next) {

    req.logout();
    res.redirect('/signin');
  }


//-------------------------------------------------------

var notFound404 = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/signin');
  } else {

    var user = req.user;

    if (user !== undefined) {
      user = user.toJSON();
    }
    res.render('404', {
      title: '404',
      user: user
    });
  }
};

//--------------------------------------------------------


module.exports.index = index;
module.exports.signOut = signOut;
module.exports.notFound404 = notFound404;
