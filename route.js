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

connection.connect(function(err) {
  if (!err) {
    console.log("Database is connected ... \n\n");
  } else {
    console.log("Error connecting database ... \n\n");
  }
});


//var GUIDText = "Current Patient ID: ";

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

//var GUIDReady = GUIDText + GUID();

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

//-------------------------------------------------------


//-------------------------------------------------------


//-----------------------------------------------------------------------------------

var signUp = function(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
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



      //console.log(username)
      res.redirect('/moreInfo')
    }
  });

};

//-----------------------------------------------------------------------------------------
//-------------------------------------------------------
var moreInfo = function(req, res, next) {

  var user = req.user;

  if (user !== undefined) {
    user = user.toJSON();
  }

  // connection.query('SELECT * FROM moreinfo WHERE moreinfo.username = ' + "'" + user.attributes.username + "'"),
  //   function(err, rows) {
  //     console.log(rows[0])
  //   }

  res.render('moreinfo', {
    title: 'More Info'
      // user: user
  });
}

//-------------------------------------------------------
var moreInfoPost = function(req, res, next) {

  // connection.query('INSERT INTO moreinfo(registerAddress, registerCity, registerState, registerZip, registerPhone, registerEmail, stateLicense, nationalLicense)VALUES(' + "'" + req.body.registerAddress  + "'," + "'" + req.body.registerCity + "'," + "'" + req.body.registerState + "'," + "'" + req.body.registerZip + "'," + "'" + req.body.registerPhone + "'," + "'" + req.body.registerEmail + "'," + "'" + req.body.stateLicense + "'," + "'" + req.body.nationalLicense + "')"),
  //     function(err, rows) {

  //     }

  res.redirect('/signin')

};

//-------------------------------------------------------------------------------------------

var signOut = function(req, res, next) {
    // if(!req.isAuthenticated()) {
    //    notFound404(req, res, next);
    // } else {
    req.logout();
    res.redirect('/signin');
  }
  // };

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
// module.exports.home = home;
// module.exports.homePost = homePost;
// module.exports.end = end;
// module.exports.endPost = endPost;
// module.exports.pdf = pdf;
// module.exports.demographics = demographics;
// module.exports.demographicsPost = demographicsPost;
// module.exports.history = history;
// module.exports.historyPost = historyPost;
// module.exports.historyReview = historyReview;
// module.exports.historyReviewPost = historyReviewPost;
// module.exports.testing = testing;
// module.exports.testingPost = testingPost;
// module.exports.vision = vision;
// module.exports.visionPost = visionPost;
// module.exports.hearing = hearing;
// module.exports.hearingPost = hearingPost;
// module.exports.physicalExamination = physicalExamination;
// module.exports.physicalExaminationPost = physicalExaminationPost;
// module.exports.medication = medication;
// module.exports.dropdown = dropdown;
// module.exports.dropdownPost = dropdownPost;
// module.exports.signIn = signIn;
// module.exports.signInPost = signInPost;
module.exports.signUp = signUp;
module.exports.signUpPost = signUpPost;
module.exports.moreInfo = moreInfo;
module.exports.moreInfoPost = moreInfoPost;
module.exports.signOut = signOut;
// module.exports.warn = warn;
module.exports.notFound404 = notFound404;
