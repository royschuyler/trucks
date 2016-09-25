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

//***********************************************************

var signUp = function(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {

    // var sessionId = req.params.sessionId;
    // sessionIdArr.push(sessionId);


    res.render('signup', {
      title: 'Sign Up'
    });
  }
};

//----------------------------------------------------------------------------

var signUpPost = function(req, res, next) {
  var user = req.body;
  var usernamePromise = null;
  usernamePromise = new Model.User({
    username: user.username
  }).fetch();

  var username = user.username;
  console.log(username)

  return usernamePromise.then(function(model) {
    if (model) {
      res.render('signup', {
        title: 'signup',
        errorMessage: 'username already exists'
      });
    } else {
      //****************************************************//
      // MORE VALIDATION GOES HERE(E.G. PASSWORD VALIDATION)
      //****************************************************//
      var password = user.password;
      var hash = bcrypt.hashSync(password);

      var signUpUser = new Model.User({
        username: user.username,
        password: hash
      });

      // signUpUser.save().then(function(model) {
      //   // sign in the newly registered user
      //   signInPost(req, res, next);
      //   res.redirect('/moreinfo/' + signUpUser.username)
      // });

      signUpUser.save();

      res.redirect('/moreInfo/' + username);
    }
  });
};

module.exports.signUp = signUp;
module.exports.signUpPost = signUpPost;
