var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var Model = require('./model');

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

//-----------------------------------------------------------------------


//--------------------------------------------------------------------


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
var demographics = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/signin');
  } else {

    var user = req.user;
    var userId = req.user.attributes.userId

    if (user !== undefined) {
      user = user.toJSON();
    }

    res.render('demographics', {
      title: 'Demographics',
      user: user,
      userId: userId
    });

    // res.download('watch9.pdf');
  }
};
//------------------------------------------------------
var demographicsPost = function(req, res, next) {

  var user = req.user;
  var phone = req.body.phone1 + req.body.phone2 + req.body.phone3;

  //console.log(user.attributes.username);

  connection.query('INSERT INTO persons2 (userId, username, sessionId, lastname, firstname, middlename, dob, age, streetaddress, city, state, zip, dln, issuing, phone, gender, email, holder, verified, denied) VALUES(' + '"' + user.attributes.userId + '",' + '"' + user.attributes.username + '",' + '"' + sessionId + '",' + "'" + req.body.lastname + "'," + "'" + req.body.firstname + "'," + "'" + req.body.middlename + "'," + "'" + req.body.dob + "'," + "'" + req.body.age + "'," + "'" + req.body.streetaddress + "'," + "'" + req.body.city + "'," + "'" + req.body.state + "'," + "'" + req.body.zip + "'," + "'" + req.body.dln + "'," + "'" + req.body.issuing + "'," + "'" + phone + "'," + "'" + req.body.gender + "'," + "'" + req.body.email + "'," + "'" + req.body.holder + "'," + "'" + req.body.verified + "'," + "'" + req.body.denied + "')"),
  function(err,rows) {

}

console.log(phone)
//console.log(res.body.lastname)
  res.redirect('/history');

  (req, res, next);
};

//-------------------------------------------------------
var history = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/signin');
  } else {

    if (user !== undefined) {
      user = user.toJSON();
    }

    var user = req.user;

    res.render('history', {
      title: 'History',
      user: user,
      sessionId: sessionId
    });
  }
};

//-------------------------------------------------------

var historyPost = function(req, res, next) {

  var user = req.user;

  console.log(sessionId)

  connection.query('INSERT INTO history (userId, username, sessionId, brainInjuries, seizures, eyeProblems, earProblems, heartProblems, paceMaker, highBloodPressure, highCholesterol, breathingProblems, lungDisease, kidneyProblems, stomachProblems, diabetes, anxiety, fainting, dizziness, unexplainedWeightLoss, stroke, missingLimbs, backProblems,  boneProblems, bloodClots, cancer, chronicDiseases, sleepDisorders, sleepTest, nightInHospital, brokenBone, useTobacco, drinkAlcohol, illegalSubstance, failedDrugTest) VALUES (' + "'" + user.attributes.userId + "'," + "'" + user.attributes.username + "'," + "'" + sessionId + "'," + "'" + req.body.brainInjuries + "'," + "'" + req.body.seizures + "'," + "'" + req.body.eyeProblems + "'," + "'" + req.body.earProblems + "'," + "'" + req.body.heartProblems + "'," + "'" + req.body.paceMaker + "'," + "'" + req.body.highBloodPressure + "'," + "'" + req.body.highCholesterol + "'," + "'" + req.body.breathingProblems + "'," + "'" + req.body.lungDisease + "'," + "'" + req.body.kidneyProblems + "'," + "'" + req.body.stomachProblems + "'," + "'" + req.body.diabetes + "'," + "'" + req.body.anxiety + "'," + "'" + req.body.fainting + "'," + "'" + req.body.dizziness + "'," + "'" + req.body.unexplainedWeightLoss + "'," + "'" + req.body.stroke + "'," + "'" + req.body.missingLimbs + "'," + "'" + req.body.backProblems + "'," + "'" + req.body.boneProblems + "'," + "'" + req.body.bloodClots + "'," + "'" + req.body.cancer + "'," + "'" + req.body.chronicDiseases + "'," + "'" + req.body.sleepDisorders + "'," + "'" + req.body.sleepTest + "'," + "'" + req.body.nightInHospital + "'," + "'" + req.body.brokenBone + "'," + "'" + req.body.useTobacco + "'," + "'" + req.body.drinkAlcohol + "'," + "'" + req.body.illegalSubstance + "'," + "'" + req.body.failedDrugTest + "')"),
    function(err, rows) {};

  res.redirect('/historyreview')
};

//-------------------------------------------------------

var home = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/signin');
  } else {

    var user = req.user;
    var arr =[];
    var arr2 = [];

    if (user !== undefined) {
      user = user.toJSON();
    }


      connection.query("SELECT * FROM history WHERE history.sessionId =" +  '"' + sessionId + '"',
        function(err, rows) {

          var obj = rows[0];

          for (var prop in obj) {
            if(obj[prop] == "yes") {
              arr.push("yes");
            }
            else {
              arr.push("no")
            }
          }

          for (i=4; i<arr.length; i++) {
            arr2.push(arr[i])
          }


    res.render('home', {
      title: 'Home',
      user: user,
      arr: arr2

    });










      });



    // res.render('home', {
    //   title: 'Home',
    //   user: user,
    //   rows: rows[0]
    // });
  }
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
      user: user
    });
  }
};

//-------------------------------------------------------
var historyReviewPost = function(req, res, next) {

  var user = req.user;

  connection.query('INSERT INTO history_review(username, userId, sessionId, historyReview)VALUES(' + "'" + user.attributes.userId + "'," + "'" + user.attributes.username + "'," + "'" + sessionId + "'," + "'" + req.body.review + "')"),
    function(err, rows) {}

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

  connection.query('INSERT INTO testing(username, userId, sessionId, pulseRate, rhythm, bloodPressure1, bloodPressure2, systolic, diastolic, sitting, secondReading, otherTesting) VALUES(' + "'" + user.attributes.username + "'," + "'" + user.attributes.userId + "'," + "'" + sessionId + "'," + "'" + req.body.pulserate + "'," + "'" + req.body.rhythm + "'," + "'" + req.body.bloodpressure1 + "'," + "'" + req.body.bloodpressure1 + "'," + "'" + req.body.systolic + "'," + "'" + req.body.diastolic + "'," + "'" + req.body.sitting + "'," + "'" + req.body.secondreading + "'," + "'" + req.body.othertesting + "')"),
    function(err, rows) {

    }

  // console.log(req.body.pulserate)
  // console.log(req.body.rhythm)
  // console.log(req.body.bloodpressure1)
  // console.log(req.body.bloodpressure2)
  // console.log(req.body.systolic)
  // console.log(req.body.diastolic)
  // console.log(req.body.sitting)
  // console.log(req.body.secondreading)
  // console.log(req.body.othertesting)

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

  connection.query('INSERT INTO vision(username, userId, sessionId, rightuncorrected, rightcorrected, fieldright, leftuncorrected, leftcorrected, fieldleft, bothuncorrected, bothcorrected) VALUES(' + "'" + user.attributes.username + "'," + "'" + user.attributes.userId + "'," + "'" + sessionId + "'," + "'" + req.body.rightuncorrected + "'," + "'" + req.body.rightcorrected + "'," + "'" + req.body.fieldright + "'," + "'" + req.body.leftuncorrected + "'," + "'" + req.body.leftcorrected + "'," + "'" + req.body.fieldleft + "'," + "'" + req.body.bothuncorrected + "'," + "'" + req.body.bothcorrected + "')"),
    function(err, rows) {

    }

  // console.log(req.body.rightuncorrected)
  // console.log(req.body.rightcorrected)
  // console.log(req.body.fieldright)
  // console.log(req.body.leftuncorrected)
  // console.log(req.body.leftcorrected)
  // console.log(req.body.fieldleft)
  // console.log(req.body.bothuncorrected)
  // console.log(req.body.bothcorrected)

  if (req.body.rightuncorrected >= 40) {
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

  connection.query('INSERT INTO hearing(username, userId, sessionId, hearingaidright, hearingaidleft, hearingaidboth, rightear, leftear, right500, right1000, right2000, left500, left1000, left2000) VALUES(' + "'" + user.attributes.username + "'," + "'" + user.attributes.userId + "'," + "'" + sessionId + "'," + "'" + req.body.hearingaidright + "'," + "'" + req.body.hearingaidleft + "'," + "'" + req.body.hearingaidboth + "'," + "'" + req.body.rightear + "'," + "'" + req.body.leftear + "'," + "'" + req.body.right500 + "'," + "'" + req.body.right1000 + "'," + "'" + req.body.right2000 + "'," + "'" + req.body.left500 + "'," + "'" + req.body.left1000 + "'," + "'" + req.body.left2000 + "')"),
    function(err, rows) {

    }

  // console.log(req.body.hearingaidright)
  // console.log(req.body.hearingaidleft)
  // console.log(req.body.hearingaidboth)
  // console.log(req.body.rightear)
  // console.log(req.body.leftear)
  // console.log(req.body.right500)
  // console.log(req.body.right1000)
  // console.log(req.body.right2000)
  // console.log(req.body.left500)
  // console.log(req.body.left1000)
  // console.log(req.body.left2000)

  if (req.body.rightear >= 5 || req.body.leftear >= 5) {
    res.redirect('/physicalexamination')
  } else {
    res.redirect('/warn')
  }

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

  // console.log(req.body.general)
  // console.log(req.body.skin)
  // console.log(req.body.eyes)
  // console.log(req.body.ears)
  // console.log(req.body.mouth)
  // console.log(req.body.cardiovascular)
  // console.log(req.body.lungs)
  // console.log(req.body.abdomen)
  // console.log(req.body.hernias)
  // console.log(req.body.back)
  // console.log(req.body.joints)
  // console.log(req.body.neuro)
  // console.log(req.body.gait)
  // console.log(req.body.vascular)
  //console.log(req.body.textarea)

    connection.query('INSERT INTO physicalexam(username, userId, sessionId, general, skin, eyes, mouth, cardiovascular, lungs, abdomen, back, joints, neuro, gait, vascular, textarea) VALUES(' + "'" + user.attributes.username + "'," + "'" + user.attributes.userId + "'," + "'" + sessionId + "'," + "'" + req.body.general + "'," + "'" + req.body.skin + "'," + "'" + req.body.eyes + "'," + "'" + req.body.mouth + "'," + "'" + req.body.cardiovascular + "'," + "'" + req.body.lungs + "'," + "'" + req.body.abdomen + "'," + "'" + req.body.back + "'," + "'" + req.body.joints + "'," + "'" + req.body.neuro + "'," + "'" + req.body.gait + "'," + "'" + req.body.vascular + "'," + "'" + req.body.textarea + "')"),
    function(err, rows) {

    }



  res.redirect('/end')
};
//-------------------------------------------------------
var end = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/signin');
  } else {

    var user = req.user;


    // connection.query('SELECT person2.*, history.*, history_review.*, testing.*, vision.*, hearing.*, physicalexam.* FROM person2 JOIN history ON history.sessionId = person2.sessionId JOIN history_review ON history_review.sessionId = history.sessionId JOIN testing ON testing.sessionId = history_review.sessionId JOIN vision ON vission.sessionId = testing.sessionId JOIN hearing ON hearing.sessionId = vission.sessionId JOIN physicalexam ON physicalexam.sessionId = hearing.sessionId', function (err,rows) {

      //connection.query('SELECT * FROM person2 limit 1, history limit 1, history_review limit 1, testing limit 1, vision limit 1, hearing limit 1, physicalexam limit 1', function (err,rows) {
    // console.log(err, rows)
    // });
    // connection.query('SELECT persons2.*, history.* FROM persons2, history WHERE' + "'" + sessionId + "'" + '=persons2.sessionId AND'+ "'" + sessionId + "'" + '=history.sessionId' , function(err, rows) {
    //   console.log(rows)
    // })

    connection.query('SELECT persons2.*, history.*, history_review.*, testing.*, vision.*, hearing.*, physicalexam.* FROM persons2, history, history_review, testing, vision, hearing, physicalexam WHERE' + "'" + sessionId + "'" + '=persons2.sessionId AND' + "'" + sessionId + "'" + '=history.sessionId AND' + "'" + sessionId + "'" + '=history_review.sessionId AND' + "'" + sessionId + "'" + '=testing.sessionId AND' + "'" + sessionId + "'" + '=vision.sessionId AND' + "'" + sessionId + "'" + '=hearing.sessionId AND' + "'" + sessionId + "'" + '=physicalexam.sessionId' , function(err, rows) {
      console.log(rows)
    });


    if (user !== undefined) {
      user = user.toJSON();
    }
    res.render('end', {
      title: 'End',
      user: user
    });
  }
};
//-------------------------------------------------------
var endPost = function(req, res, next) {

  var user = req.user;


  res.redirect('/pdf')

};

//-------------------------------------------------------
var pdf = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/signin');
  } else {

    var user = req.user;

    if (user !== undefined) {
      user = user.toJSON();
    }

    res.download('watch9.pdf')

    // res.render('pdf', {
    //   title: 'PDF',
    //   user: user
    // });
  }
};
//-------------------------------------------------------
//res.download('watch9.pdf')




//-------------------------------------------------------
var dropdown = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/signin');
  } else {

    var user = req.user;

    if (user !== undefined) {
      user = user.toJSON();
    }
    res.render('dropdown', {
      title: 'dropdown',
      user: user
    });
  }
};

//-------------------------------------------------------
var form = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/signin');
  } else {

    var user = req.user;

    if (user !== undefined) {
      user = user.toJSON();
    }
    res.render('form', {
      title: 'form',
      user: user
    });
  }
};
//-------------------------------------------------------
var dropdownPost = function(req, res, next) {

  var user = req.user;

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

        connection.query('INSERT INTO session(username, userId, sessionId)VALUES(' + '"' + user.username + '",' + '"' + user.userId + '",' + '"' + sessionId + '")'),
          function(err, rows) {

          };

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

module.exports.form = form;
module.exports.index = index;
module.exports.home = home;
module.exports.end = end;
module.exports.endPost = endPost;
module.exports.pdf = pdf;
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
module.exports.dropdown = dropdown;
module.exports.dropdownPost = dropdownPost;
module.exports.signIn = signIn;
module.exports.signInPost = signInPost;
module.exports.signUp = signUp;
module.exports.signUpPost = signUpPost;
module.exports.signOut = signOut;
module.exports.warn = warn;
module.exports.notFound404 = notFound404;
