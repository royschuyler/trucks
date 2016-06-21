var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var Model = require('./model');

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Hollie12123',
  database: 'doctor'
});

connection.connect(function(err) {
  if (!err) {
    console.log("Database is connected ... \n\n");
  } else {
    console.log("Error connecting database ... \n\n");
  }
});

//-----------------------------------------------------------------------
var GUIDText = "Current Patient ID: ";

var GUID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
  var r = Math.random() * 16 | 0,
    v = c == 'x' ? r : (r & 0x3 | 0x8);
  return v.toString(16);
});

var GUIDReady = GUIDText + GUID;

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

var home = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/signin');
  } else {

    var user = req.user;

    if (user !== undefined) {
      user = user.toJSON();
    }
    res.render('home', {
      title: 'Home',
      user: user
    });
  }
};

//-------------------------------------------------------
var demographics = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/signin');
  } else {

    var user = req.user;
    var userId = req.user.attributes.userId
    //console.log(req.user.attributes.userId)

    if (user !== undefined) {
      user = user.toJSON();
    }

    //console.log("user: " + user.username);

    res.render('demographics', {
      title: 'Demographics',
      user: user,
      userId: userId
    });
  }
};
//------------------------------------------------------
var demographicsPost = function(req, res, next) {

  var user = req.user;

  connection.query('INSERT INTO persons (FirstName, MiddleName, LastName, Address, Zip, DOB, SSN, City, State, Country, Company, Email, Doctor, GUID)Values(' + "'" + req.body.fName + "'," + "'" + req.body.mName + "'," + "'" + req.body.lName + "'," + "'" + req.body.address + "'," + "'" + req.body.zip + "'," + "'" + req.body.dob + "'," + "'" + req.body.ssn + "'," + "'" + req.body.city + "'," + "'" + req.body.state + "'," + "'" + req.body.country + "'," + "'" + req.body.company + "'," + "'" + req.body.email + "'," + "'" + req.body.username + "'," + "'" + GUID + "'" + ')'),
    function(err, rows) {
      console.log("user: " + user.username);


    };

    if (req.body.fName == "warn") {

        res.redirect('/warn');
      } else {

        res.redirect('/history');
      }
(req, res, next);
};

//-------------------------------------------------------
var history = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/signin');
  } else {

    var user = req.user;

    if (user !== undefined) {
      user = user.toJSON();
    }
    res.render('history', {
      title: 'History',
      user: user
    });
  }
};

//-------------------------------------------------------

var historyPost = function(req, res, next) {

    var user = req.user;
    //console.log(req.body)
    //console.log(user)
    //console.log(req.body.one)
    //console.log(req.body.two)
    //console.log(req.body.three)

    res.redirect('/historyreview')
};

//-------------------------------------------------------
var historyReview = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/signin');
  } else {

    var user = req.user;

    if (user !== undefined) {
      user = user.toJSON();
    }
    res.render('historyreview', {
      title: 'History Review',
      user: user,
      //GUID: GUIDReady
    });
  }
};

//-------------------------------------------------------
var historyReviewPost = function(req, res, next) {

    var user = req.user;


    //console.log(req.body.review)


    res.redirect('/testing')
};

//-------------------------------------------------------
var testing = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/signin');
  } else {

    var user = req.user;

    if (user !== undefined) {
      user = user.toJSON();
    }
    res.render('testing', {
      title: 'Testing',
      user: user
    });
  }
};

//-------------------------------------------------------
var testingPost = function(req, res, next) {

    var user = req.user;


    console.log(req.body.pulserate)
    console.log(req.body.rhythm)
    console.log(req.body.bloodpressure)
    console.log(req.body.systolic)
    console.log(req.body.diastolic)
    console.log(req.body.sitting)
    console.log(req.body.secondreading)
    console.log(req.body.othertesting)

    res.redirect('/vision')
};

//-------------------------------------------------------
var vision = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/signin');
  } else {

    var user = req.user;

    if (user !== undefined) {
      user = user.toJSON();
    }
    res.render('vision', {
      title: 'Vision',
      user: user
    });
  }
};
//-------------------------------------------------------
var visionPost = function(req, res, next) {

    var user = req.user;


    console.log(req.body.rightuncorrected)
    console.log(req.body.rightcorrected)
    console.log(req.body.fieldright)
    console.log(req.body.leftuncorrected)
    console.log(req.body.leftcorrected)
    console.log(req.body.fieldleft)
    console.log(req.body.bothuncorrected)
    console.log(req.body.bothcorrected)
       //console.log("hayyyy")


    if(req.body.rightuncorrected <= 20) {
      res.redirect('/warn')
    } else {
    res.redirect('/hearing')
  }
};

//-------------------------------------------------------
var hearing = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/signin');
  } else {

    var user = req.user;

    if (user !== undefined) {
      user = user.toJSON();
    }
    res.render('hearing', {
      title: 'Hearing',
      user: user
    });
  }
};
//-------------------------------------------------------
var hearingPost = function(req, res, next) {

    var user = req.user;


    console.log(req.body.hearingaidright)
    console.log(req.body.hearingaidleft)
    console.log(req.body.hearingaidboth)
    console.log(req.body.rightear)
    console.log(req.body.leftear)
    console.log(req.body.right500)
    console.log(req.body.right1000)
    console.log(req.body.right2000)
    console.log(req.body.left500)
    console.log(req.body.left1000)
    console.log(req.body.left2000)

    res.redirect('/physicalexamination')
};

//-------------------------------------------------------
var physicalExamination = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/signin');
  } else {

    var user = req.user;

    if (user !== undefined) {
      user = user.toJSON();
    }
    res.render('physicalexamination', {
      title: 'Physical examination',
      user: user
    });
  }
};
//-------------------------------------------------------
var physicalExaminationPost = function(req, res, next) {

    var user = req.user;


    console.log(req.body.general)
    console.log(req.body.skin)
    console.log(req.body.eyes)
    console.log(req.body.ears)
    console.log(req.body.mouth)
    console.log(req.body.cardiovascular)
    console.log(req.body.lungs)
    console.log(req.body.abdomen)
    console.log(req.body.hernias)
    console.log(req.body.back)
    console.log(req.body.joints)
    console.log(req.body.neuro)
    console.log(req.body.gait)
    console.log(req.body.vascular)

    console.log(req.body.textarea)

    res.redirect('/home')
};


//-------------------------------------------------------
var medication = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/signin');
  } else {

    var user = req.user;

    if (user !== undefined) {
      user = user.toJSON();
    }
    res.render('medication', {
      title: 'Medication',
      user: user
    });
  }
};

//-------------------------------------------------------

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
        return res.redirect('/demographics');
      }
    });
  })(req, res, next);
};

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

      signUpUser.save().then(function(model) {
        // sign in the newly registered user
        signInPost(req, res, next);
      });
    }
  });
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

var warn = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/signin');
  } else {

    var user = req.user;

    if (user !== undefined) {
      user = user.toJSON();
    }
    res.render('warn', {
      title: 'warn',
      user: user
    });
  }
};

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
module.exports.home = home;
module.exports.demographics = demographics;
module.exports.demographicsPost = demographicsPost;
module.exports.history = history;
module.exports.historyPost = historyPost;
module.exports.historyReview = historyReview;
module.exports.historyReviewPost = historyReviewPost;
module.exports.testing = testing;
module.exports.testingPost = testingPost;
module.exports.vision = vision;
module.exports.visionPost = visionPost;
module.exports.hearing = hearing;
module.exports.hearingPost = hearingPost;
module.exports.physicalExamination = physicalExamination;
module.exports.physicalExaminationPost = physicalExaminationPost;
module.exports.hearingPost = hearingPost;
module.exports.medication = medication;
module.exports.signIn = signIn;
module.exports.signInPost = signInPost;
module.exports.signUp = signUp;
module.exports.signUpPost = signUpPost;
module.exports.signOut = signOut;
module.exports.warn = warn;
module.exports.notFound404 = notFound404;
