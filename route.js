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

    connection.query("SELECT * FROM tblUsers WHERE tblUsers.username =" + '"' + req.user.attributes.username + '"',
      function(err, rows) {
        console.log(rows[0])
      });

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
    function(err, rows) {

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

  connection.query('INSERT INTO history (userId, username, sessionId, surgeryButton, surgeryComments, medicationButton, medicationComments, brainInjuries, seizures, eyeProblems, earProblems, heartProblems, paceMaker, highBloodPressure, highCholesterol, breathingProblems, lungDisease, kidneyProblems, stomachProblems, diabetes, insulin, anxiety, fainting, dizziness, unexplainedWeightLoss, stroke, missingLimbs, backProblems,  boneProblems, bloodClots, cancer, chronicDiseases, sleepDisorders, sleepTest, nightInHospital, brokenBone, useTobacco, drinkAlcohol, illegalSubstance, failedDrugTest, otherButton, otherComments, yesButton, yesDescribe) VALUES (' + "'" + user.attributes.userId + "'," + "'" + user.attributes.username + "'," + "'" + sessionId + "'," + "'" + req.body.surgeryButton + "'," + "'" + req.body.surgeryComments + "'," + "'" + req.body.medicationButton + "'," + "'" + req.body.medicationComments + "'," + "'" + req.body.brainInjuries + "'," + "'" + req.body.seizures + "'," + "'" + req.body.eyeProblems + "'," + "'" + req.body.earProblems + "'," + "'" + req.body.heartProblems + "'," + "'" + req.body.paceMaker + "'," + "'" + req.body.highBloodPressure + "'," + "'" + req.body.highCholesterol + "'," + "'" + req.body.breathingProblems + "'," + "'" + req.body.lungDisease + "'," + "'" + req.body.kidneyProblems + "'," + "'" + req.body.stomachProblems + "'," + "'" + req.body.diabetes + "'," + "'" + req.body.insulin + "'," + "'" + req.body.anxiety + "'," + "'" + req.body.fainting + "'," + "'" + req.body.dizziness + "'," + "'" + req.body.unexplainedWeightLoss + "'," + "'" + req.body.stroke + "'," + "'" + req.body.missingLimbs + "'," + "'" + req.body.backProblems + "'," + "'" + req.body.boneProblems + "'," + "'" + req.body.bloodClots + "'," + "'" + req.body.cancer + "'," + "'" + req.body.chronicDiseases + "'," + "'" + req.body.sleepDisorders + "'," + "'" + req.body.sleepTest + "'," + "'" + req.body.nightInHospital + "'," + "'" + req.body.brokenBone + "'," + "'" + req.body.useTobacco + "'," + "'" + req.body.drinkAlcohol + "'," + "'" + req.body.illegalSubstance + "'," + "'" + req.body.failedDrugTest + "'," + "'" + req.body.otherButton + "'," + "'" + req.body.otherComments + "'," + "'" + req.body.yesButton + "'," + "'" + req.body.yesDescribe + "')"),
    function(err, rows) {}

  res.redirect('/home')
};

//-------------------------------------------------------

var home = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/signin');
  } else {

    var user = req.user;
    var arr = [];
    var arr2 = [];

    if (user !== undefined) {
      user = user.toJSON();
    }

    connection.query("SELECT * FROM history WHERE history.sessionId =" + '"' + sessionId + '"',
      function(err, rows) {

        var obj = rows[0];

        for (var prop in obj) {
          if (obj[prop] == "1") {
            arr.push("yes");
          } else {
            arr.push("no")
          }
        }
        //console.log(arr);
        arr.splice(0, 8);
        //console.log(arr);
        // for (i = 4; i < arr.length; i++) {
        //   arr2.push(arr[i])
        // }

        console.log(arr)

        res.render('home', {
          title: 'Home',
          user: user,
          arr: arr

        });

      });
  }
};

//-------------------------------------------------------
var homePost = function(req, res, next) {

  var user = req.user;

connection.query('INSERT INTO history_review(username, userId, sessionId, followUpBrainInjury, followUpBrainInjuryNotes, followUpEpilepsy, followUpEpilepsyNotes, followUpEye,followUpEyeNotes,followUpEar, followUpEarNotes, followUpHeart,followUpHeartNotes, followUpPacemaker, followUpPacemakerNotes,followupBloodPressure, followupBloodPressureNotes,followUpHighCholesterol, followUpHighCholesterolNotes, followUpBreathingProblems, followUpBreathingProblemsNotes, followUpLungDisease, followUpLungDiseaseNotes, followUpKidneyProblems, followUpKidneyProblemsNotes, followUpStomachProblems, followUpStomachProblemsNotes, followUpDiabetes, followUpDiabetesNotes, followUpInsulin, followUpInsulinNotes, followUpAnxiety, followUpAnxietyNotes, followUpFainting, followUpFaintingNotes, followUpDizziness, followUpDizzinessNotes, followUpStroke, followUpStrokeNotes, followUpMissingLimbs, followUpMissingLimbsNotes, followUpBackProblems, followUpBackProblemsNotes, followUpBoneProblems, followUpBoneProblemsNotes, followUpBloodClots,followUpBloodClotsNotes, followUpCancer, followUpCancerNotes, followUpChronicDiseases, followUpChronicDiseasesNotes, followUpSleepDisorders, followUpSleepDisordersNotes, followUpSleepTest, followUpSleepTestNotes, followUpNightInHospital, followUpNightInHospitalNotes, followUpBrokenBone, followUpBrokenBoneNotes, followUpUseTobacco, followUpUseTobaccoNotes, followUpDrinkAlcohol,followUpDrinkAlcoholNotes, followUpIllegalSubstance, followUpIllegalSubstanceNotes, followUpFailedDrugTest, followUpFailedDrugTestNotes, historyReview) VALUES('
+ "'" +
user.attributes.username
+ "'," + "'" +
user.attributes.userId
+ "'," + "'" +
sessionId
+ "'," + "'" +
req.body.followUpBrainInjury
+ "'," + "'" +
req.body.followUpBrainInjuryNotes
+ "'," + "'" +
req.body.followUpEpilepsy
+ "'," + "'" +
req.body.followUpEpilepsyNotes
+ "'," + "'" +
req.body.followUpEye
+ "'," + "'" +
req.body.followUpEyeNotes
+ "'," + "'" +
req.body.followUpEar
+ "'," + "'" +
req.body.followUpEarNotes
+ "'," + "'" +
req.body.followUpHeart
+ "'," + "'" +
req.body.followUpHeartNotes
+ "'," + "'" +
req.body.followUpPacemaker
+ "'," + "'" +
req.body.followUpPacemakerNotes
+ "'," + "'" +
req.body.followupBloodPressure
+ "'," + "'" +
req.body.followupBloodPressureNotes
+ "'," + "'" +
req.body.followUpHighCholesterol
+ "'," + "'" +
req.body.followUpHighCholesterolNotes
+ "'," + "'" +
req.body.followUpBreathingProblems
+ "'," + "'" +
req.body.followUpBreathingProblemsNotes
+ "'," + "'" +
req.body.followUpLungDisease
+ "'," + "'" +
req.body.followUpLungDiseaseNotes
+ "'," + "'" +
req.body.followUpBackProblems
+ "'," + "'" +
req.body.followUpBackProblemsNotes
+ "'," + "'" +
req.body.followUpKidneyProblems
+ "'," + "'" +
req.body.followUpKidneyProblemsNotes
+ "'," + "'" +
req.body.followUpStomachProblems
+ "'," + "'" +
req.body.followUpStomachProblemsNotes
+ "'," + "'" +
req.body.followUpDiabetes
+ "'," + "'" +
req.body.followUpDiabetesNotes
+ "'," + "'" +
req.body.followUpInsulin
+ "'," + "'" +
req.body.followUpInsulinNotes
+ "'," + "'" +
req.body.followUpAnxiety
+ "'," + "'" +
req.body.followUpAnxietyNotes
+ "'," + "'" +
req.body.followUpFainting
+ "'," + "'" +
req.body.followUpFaintingNotes
+ "'," + "'" +
req.body.followUpDizziness
+ "'," + "'" +
req.body.followUpDizzinessNotes
+ "'," + "'" +
req.body.followUpStroke
+ "'," + "'" +
req.body.followUpStrokeNotes
+ "'," + "'" +
req.body.followUpMissingLimbs
+ "'," + "'" +
req.body.followUpMissingLimbsNotes
+ "'," + "'" +
req.body.followUpBoneProblems
+ "'," + "'" +
req.body.followUpBoneProblemsNotes
+ "'," + "'" +
req.body.followUpBloodClots
+ "'," + "'" +
req.body.followUpBloodClotsNotes
+ "'," + "'" +
req.body.followUpCancer
+ "'," + "'" +
req.body.followUpCancerNotes
+ "'," + "'" +
req.body.followUpChronicDiseases
+ "'," + "'" +
req.body.followUpChronicDiseasesNotes
+ "'," + "'" +
req.body.followUpSleepDisorders
+ "'," + "'" +
req.body.followUpSleepDisordersNotes
+ "'," + "'" +
req.body.followUpSleepTest
+ "'," + "'" +
req.body.followUpSleepTestNotes
+ "'," + "'" +
req.body.followUpNightInHospital
+ "'," + "'" +
req.body.followUpNightInHospitalNotes
+ "'," + "'" +
req.body.followUpBrokenBone
+ "'," + "'" +
req.body.followUpBrokenBoneNotes
+ "'," + "'" +
req.body.followUpUseTobacco
+ "'," + "'" +
req.body.followUpUseTobaccoNotes
+ "'," + "'" +
req.body.followUpDrinkAlcohol
+ "'," + "'" +
req.body.followUpDrinkAlcoholNotes
+ "'," + "'" +
req.body.followUpIllegalSubstance
+ "'," + "'" +
req.body.followUpIllegalSubstanceNotes
+ "'," + "'" +
req.body.followUpFailedDrugTest
+ "'," + "'" +
req.body.followUpFailedDrugTestNotes
+ "'," + "'" +
req.body.historyReview
+ "')"),

    function(err, rows) {

    }

  res.redirect('/testing')
};

//-------------------------------------------------------
// var historyReview = function(req, res, next) {
//   if (!req.isAuthenticated()) {
//     res.redirect('/signin');
//   } else {

//     var user = req.user;

//     if (user !== undefined) {
//       user = user.toJSON();
//     }

//     res.render('historyreview', {
//       title: 'History Review',
//       user: user
//     });
//   }
// };

//-------------------------------------------------------
// var historyReviewPost = function(req, res, next) {

//   var user = req.user;

//   connection.query('INSERT INTO history_review(username, userId, sessionId, followupseizures, historyReview)VALUES(' + "'" + user.attributes.userId + "'," + "'" + user.attributes.username + "'," + "'" + sessionId + "'," + "'" + req.body.followupseizures + "'," + "'" + req.body.review + "')"),
//     function(err, rows) {}

//   res.redirect('/testing')
// };

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

  connection.query('INSERT INTO testing(username, userId, sessionId, pulserate, pulserhythm, heightfeet, heightinches , weight, urinesp, urineprotein, urineblood, urinesugar, systolic1, diastolic1, systolic2, diastolic2, othertesting) VALUES(' + "'" + user.attributes.username + "'," + "'" + user.attributes.userId + "'," + "'" + sessionId + "'," + "'" + req.body.pulserate + "'," + "'" + req.body.pulserhythm + "'," + "'" + req.body.heightfeet + "'," + "'" + req.body.heightinches + "'," + "'" + req.body.weight + "'," + "'" + req.body.urinesp + "'," + "'" + req.body.urineprotein + "'," + "'" + req.body.urineblood + "'," + "'" + req.body.urinesugar + "'," + "'" + req.body.systolic1 + "'," + "'" + req.body.diastolic1 + "'," + "'" + req.body.systolic2 + "'," + "'" + req.body.diastolic2 + "'," + "'" + req.body.othertesting + "')"),
    function(err, rows) {

    }

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

  connection.query('INSERT INTO vision(username, userId, sessionId, rightuncorrected, rightcorrected, fieldright, leftuncorrected, leftcorrected, fieldleft, bothuncorrected, bothcorrected, traficlight, monocular, optometrist, documentation) VALUES(' + "'" + user.attributes.username + "'," + "'" + user.attributes.userId + "'," + "'" + sessionId + "'," + "'" + req.body.rightuncorrected + "'," + "'" + req.body.rightcorrected + "'," + "'" + req.body.fieldright + "'," + "'" + req.body.leftuncorrected + "'," + "'" + req.body.leftcorrected + "'," + "'" + req.body.fieldleft + "'," + "'" + req.body.bothuncorrected + "'," + "'" + req.body.bothcorrected + "'," + "'" + req.body.traficlight + "'," + "'" + req.body.monocular + "'," + "'" + req.body.optometrist + "'," + "'" + req.body.documentation + "')"),
    function(err, rows) {

    }

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

  connection.query('INSERT INTO hearing(username, userId, sessionId, hearingaid, rightear, leftear, right500, right1000, right2000, left500, left1000, left2000) VALUES(' + "'" + user.attributes.username + "'," + "'" + user.attributes.userId + "'," + "'" + sessionId + "'," + "'" + req.body.hearingaid + "'," + "'" + req.body.rightear + "'," + "'" + req.body.leftear + "'," + "'" + req.body.right500 + "'," + "'" + req.body.right1000 + "'," + "'" + req.body.right2000 + "'," + "'" + req.body.left500 + "'," + "'" + req.body.left1000 + "'," + "'" + req.body.left2000 + "')"),
    function(err, rows) {

    }

  console.log(req.body.hearingaid)

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

  connection.query('INSERT INTO physicalexam(username, userId, sessionId, general, skin, eyes, ears, mouth, cardiovascular, lungs, abdomen, back, hernia, joints, neuro, gait, vascular, examtextarea) VALUES(' + "'" + user.attributes.username + "'," + "'" + user.attributes.userId + "'," + "'" + sessionId + "'," + "'" + req.body.general + "'," + "'" + req.body.skin + "'," + "'" + req.body.eyes + "'," + "'" + req.body.ears + "'," + "'" + req.body.mouth + "'," + "'" + req.body.cardiovascular + "'," + "'" + req.body.lungs + "'," + "'" + req.body.abdomen + "'," + "'" + req.body.back + "'," + "'" + req.body.hernia + "'," + "'" + req.body.joints + "'," + "'" + req.body.neuro + "'," + "'" + req.body.gait + "'," + "'" + req.body.vascular + "'," + "'" + req.body.examtextarea + "')"),
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

    // var followupData = connection.query('SELECT * FROM history_review WHERE history_review.sessionId = ' + "'" + sessionId + "'",
    //   function(err, rows) {
    //     console.log(rows[0])
    //   });

    var datas = connection.query('SELECT persons2.*, history.*, history_review.*, testing.*, vision.*, hearing.*, physicalexam.* FROM persons2, history, history_review, testing, vision, hearing, physicalexam WHERE' + "'" + sessionId + "'" + '=persons2.sessionId AND' + "'" + sessionId + "'" + '=history.sessionId AND' + "'" + sessionId + "'" + '=history_review.sessionId AND' + "'" + sessionId + "'" + '=testing.sessionId AND' + "'" + sessionId + "'" + '=vision.sessionId AND' + "'" + sessionId + "'" + '=hearing.sessionId AND' + "'" + sessionId + "'" + '=physicalexam.sessionId',
        function(err, rows) {

      var fs = require('fs');
      var pdfFiller = require('pdffiller');

      var sourcePDF = "newFormSpecial.pdf";
      // var destinationPDF =  "../../Desktop/watch8.pdf";
      var destinationPDF = "watch9.pdf";
      var shouldFlatten = true;

      var d = new Date();
      var monthFix = Number(d.getMonth()) + 1;
      var date = monthFix + "/" + d.getDate() + "/" + d.getFullYear();
      //console.log(str);

      var avgRight = (parseInt(rows[0].right500) + parseInt(rows[0].right1000) + parseInt(rows[0].right2000)) / 3;
      var avgLeft = (parseInt(rows[0].left500) + parseInt(rows[0].left1000) + parseInt(rows[0].left2000)) / 3;

      var data = {
        "MCSA-5875[0].Page1[0].privacyStatement[0].privacyDate[0]": "rows[0].",
        "MCSA-5875[0].Page1[0].medRecord[0].medNumber[0]": "rows[0].",
        "MCSA-5875[0].Page1[0].driverPersonal[0].nameLast[0]": rows[0].lastname,
        "MCSA-5875[0].Page1[0].driverPersonal[0].nameFirst[0]": rows[0].firstname,
        "MCSA-5875[0].Page1[0].driverPersonal[0].nameInitial[0]": rows[0].middlename,
        "MCSA-5875[0].Page1[0].driverPersonal[0].birthDate[0]": rows[0].dob,
        "MCSA-5875[0].Page1[0].driverPersonal[0].driverAge[0]": rows[0].age,
        "MCSA-5875[0].Page1[0].driverPersonal[0].driverAddress[0]": rows[0].streetaddress,
        "MCSA-5875[0].Page1[0].driverPersonal[0].driverCity[0]": rows[0].city,
        "MCSA-5875[0].Page1[0].driverPersonal[0].driverState[0]": rows[0].state,
        "MCSA-5875[0].Page1[0].driverPersonal[0].driverZip[0]": rows[0].zip,
        "MCSA-5875[0].Page1[0].driverPersonal[0].driverLicense[0]": rows[0].dln,
        "MCSA-5875[0].Page1[0].driverPersonal[0].licenseState[0]": rows[0].issuing,
        "MCSA-5875[0].Page1[0].driverPersonal[0].driverPhone[0]": rows[0].phone,
        "MCSA-5875[0].Page1[0].driverPersonal[0].genderGroup[0].genderButtons[0]": rows[0].gender,
        "MCSA-5875[0].Page1[0].driverPersonal[0].emailAddress[0]": rows[0].email,
        "MCSA-5875[0].Page1[0].driverPersonal[0].cdlLicense[0].cdlButtonList[0]": rows[0].holder,
        "MCSA-5875[0].Page1[0].driverPersonal[0].driverVerify[0]": rows[0].verified,
        "MCSA-5875[0].Page1[0].driverPersonal[0].certDenyGroup[0].certDenyButtons[0]": rows[0].denied,
        "MCSA-5875[0].Page1[0].surgeryGroup[0].surgeryButtons[0]": rows[0].surgeryButton,
        "MCSA-5875[0].Page1[0].surgeryGroup[0].surgeryDescribe[0]": rows[0].surgeryComments,
        "MCSA-5875[0].Page1[0].medicineGroup[0].medicineButtons[0]": rows[0].medicationButton,
        "MCSA-5875[0].Page1[0].medicineGroup[0].medicineDescribe[0]": rows[0].medicationComments,
        "MCSA-5875[0].Page1[0].attachButton[0]": "rows[0].",
        "MCSA-5875[0].Page2[0].pageHead2[0].nameLastHead2[0]": rows[0].lastname,
        "MCSA-5875[0].Page2[0].pageHead2[0].nameFirstHead2[0]": rows[0].firstname,
        "MCSA-5875[0].Page2[0].pageHead2[0].nameInitialHead2[0]": rows[0].middlename,
        "MCSA-5875[0].Page2[0].pageHead2[0].dateBirth2[0]": rows[0].dob,
        "MCSA-5875[0].Page2[0].pageHead2[0].dateForm2[0]": date,
        "MCSA-5875[0].Page2[0].driverHealth[0].headGroup[0].headButtons[0]": rows[0].brainInjuries,
        "MCSA-5875[0].Page2[0].driverHealth[0].seizeGroup[0].seizeButtons[0]": rows[0].seizures,
        "MCSA-5875[0].Page2[0].driverHealth[0].eyeGroup[0].eyeButtons[0]": rows[0].eyeProblems,
        "MCSA-5875[0].Page2[0].driverHealth[0].earGroup[0].earButtons[0]": rows[0].earProblems,
        "MCSA-5875[0].Page2[0].driverHealth[0].heartGroup[0].heartButtons[0]": rows[0].heartProblems,
        "MCSA-5875[0].Page2[0].driverHealth[0].paceGroup[0].paceButtons[0]": rows[0].paceMaker,
        "MCSA-5875[0].Page2[0].driverHealth[0].highGroup[0].highButtons[0]": rows[0].highBloodPressure,
        "MCSA-5875[0].Page2[0].driverHealth[0].cholesterolGroup[0].cholesterolButtons[0]": rows[0].highCholesterol,
        "MCSA-5875[0].Page2[0].driverHealth[0].breathGroup[0].breathButtons[0]": rows[0].breathingProblems,
        "MCSA-5875[0].Page2[0].driverHealth[0].lungGroup[0].lungButtons[0]": rows[0].lungDisease,
        "MCSA-5875[0].Page2[0].driverHealth[0].kidneyGroup[0].kidneyButtons[0]": rows[0].kidneyProblems,
        "MCSA-5875[0].Page2[0].driverHealth[0].stomachGroup[0].stomachButtons[0]": rows[0].stomachProblems,
        "MCSA-5875[0].Page2[0].driverHealth[0].sugarGroup[0].sugarButtons[0]": rows[0].diabetes,
        "MCSA-5875[0].Page2[0].driverHealth[0].insulinGroup[0].insulinButtons[0]": rows[0].insulin,
        "MCSA-5875[0].Page2[0].driverHealth[0].mentalGroup[0].mentalButtons[0]": rows[0].anxiety,
        "MCSA-5875[0].Page2[0].driverHealth[0].faintGroup[0].faintButtons[0]": rows[0].fainting,
        "MCSA-5875[0].Page2[0].driverHealth[0].dizzyGroup[0].dizzyButtons[0]": rows[0].dizziness,
        "MCSA-5875[0].Page2[0].driverHealth[0].weightGroup[0].weightButtons[0]": rows[0].unexplainedWeightLoss,
        "MCSA-5875[0].Page2[0].driverHealth[0].strokeGroup[0].strokeButtons[0]": rows[0].stroke,
        "MCSA-5875[0].Page2[0].driverHealth[0].uselimitGroup[0].uselimitButtons[0]": rows[0].missingLimbs,
        "MCSA-5875[0].Page2[0].driverHealth[0].neckbackGroup[0].neckbackButtons[0]": rows[0].backProblems,
        "MCSA-5875[0].Page2[0].driverHealth[0].boneGroup[0].boneButtons[0]": rows[0].boneProblems,
        "MCSA-5875[0].Page2[0].driverHealth[0].bloodGroup[0].bloodButtons[0]": rows[0].bloodClots,
        "MCSA-5875[0].Page2[0].driverHealth[0].cancerGroup[0].cancerButtons[0]": rows[0].cancer,
        "MCSA-5875[0].Page2[0].driverHealth[0].infectGroup[0].infectButtons[0]": rows[0].chronicDiseases,
        "MCSA-5875[0].Page2[0].driverHealth[0].apneaGroup[0].apneaButtons[0]": rows[0].sleepDisorders,
        "MCSA-5875[0].Page2[0].driverHealth[0].sleeptestGroup[0].sleeptestButtons[0]": rows[0].sleepTest,
        "MCSA-5875[0].Page2[0].driverHealth[0].hospitalGroup[0].hospitalButtons[0]": rows[0].nightInHospital,
        "MCSA-5875[0].Page2[0].driverHealth[0].brokenGroup[0].brokenButtons[0]": rows[0].brokenBone,
        "MCSA-5875[0].Page2[0].driverHealth[0].tobaccoGroup[0].tobaccoButtons[0]": rows[0].useTobacco,
        "MCSA-5875[0].Page2[0].driverHealth[0].alcoholGroup[0].alcoholButtons[0]": rows[0].drinkAlcohol,
        "MCSA-5875[0].Page2[0].driverHealth[0].illegalGroup[0].illegalButtons[0]": rows[0].illegalSubstance,
        "MCSA-5875[0].Page2[0].driverHealth[0].failedGroup[0].failedButtons[0]": rows[0].failedDrugTest,
        "MCSA-5875[0].Page2[0].otherGroup[0].otherButtons[0]": rows[0].otherButton,
        "MCSA-5875[0].Page2[0].otherGroup[0].otherDescribe[0]": rows[0].otherComments,
        "MCSA-5875[0].Page2[0].commentGroup[0].commentButtons[0]": rows[0].yesButton,
        "MCSA-5875[0].Page2[0].commentGroup[0].commentDescribe[0]": rows[0].yesDescribe,
        "MCSA-5875[0].Page2[0].attachButton[0]": "rows[0].",
        "MCSA-5875[0].Page2[0].driverSignature[0].signatureDate[0]": "rows[0].",
        "MCSA-5875[0].Page2[0].#area[2].driveReview[0].examinerComment[0]": "rows[0].",
        "MCSA-5875[0].Page2[0].#area[2].driveReview[0].attachButton2[0]": "rows[0].",
        "MCSA-5875[0].Page3[0].pageHead3[0].nameLastHead3[0]": rows[0].lastname,
        "MCSA-5875[0].Page3[0].pageHead3[0].nameFirstHead3[0]": rows[0].firstname,
        "MCSA-5875[0].Page3[0].pageHead3[0].nameInitialHead3[0]": rows[0].middlename,
        "MCSA-5875[0].Page3[0].pageHead3[0].dateBirth3[0]": rows[0].dob,
        "MCSA-5875[0].Page3[0].pageHead3[0].dateForm3[0]": date,
        "MCSA-5875[0].Page3[0].driveTest[0].basicStats[0].pulseMeasure[0]": rows[0].pulserate,
        "MCSA-5875[0].Page3[0].driveTest[0].basicStats[0].pulserhythmGroup[0].pulserhythmButtons[0]": rows[0].pulserhythm,
        "MCSA-5875[0].Page3[0].driveTest[0].basicStats[0].#area[1].feetHeight[0]": rows[0].heightfeet,
        "MCSA-5875[0].Page3[0].driveTest[0].basicStats[0].#area[1].inchesHeight[0]": rows[0].heightinches,
        "MCSA-5875[0].Page3[0].driveTest[0].basicStats[0].#area[1].poundsWeight[0]": rows[0].weight,
        "MCSA-5875[0].Page3[0].driveTest[0].bloodPressure[0].Row1[0].sitSys[0]": rows[0].systolic1,
        "MCSA-5875[0].Page3[0].driveTest[0].bloodPressure[0].Row1[0].sitDias[0]": rows[0].diastolic1,
        "MCSA-5875[0].Page3[0].driveTest[0].bloodPressure[0].Row2[0].secSys[0]": rows[0].systolic2,
        "MCSA-5875[0].Page3[0].driveTest[0].bloodPressure[0].Row2[0].secDias[0]": rows[0].diastolic2,
        "MCSA-5875[0].Page3[0].driveTest[0].otherTesting[0]": rows[0].othertesting,
        "MCSA-5875[0].Page3[0].driveTest[0].urineTest[0].urineAnalysis[0].Row1[0].spgrNumber[0]": rows[0].urinesp,
        "MCSA-5875[0].Page3[0].driveTest[0].urineTest[0].urineAnalysis[0].Row1[0].proteinNumber[0]": rows[0].urineprotein,
        "MCSA-5875[0].Page3[0].driveTest[0].urineTest[0].urineAnalysis[0].Row1[0].bloodNumber[0]": rows[0].urineblood,
        "MCSA-5875[0].Page3[0].driveTest[0].urineTest[0].urineAnalysis[0].Row1[0].sugarNumber[0]": rows[0].urinesugar,
        "MCSA-5875[0].Page3[0].driveTest[0].visionTest[0].uncorrectRight[0]": rows[0].rightuncorrected,
        "MCSA-5875[0].Page3[0].driveTest[0].visionTest[0].correctRight[0]": rows[0].rightcorrected,
        "MCSA-5875[0].Page3[0].driveTest[0].visionTest[0].fieldRight[0]": rows[0].fieldright,
        "MCSA-5875[0].Page3[0].driveTest[0].visionTest[0].uncorrectLeft[0]": rows[0].leftuncorrected,
        "MCSA-5875[0].Page3[0].driveTest[0].visionTest[0].correctLeft[0]": rows[0].leftcorrected,
        "MCSA-5875[0].Page3[0].driveTest[0].visionTest[0].fieldLeft[0]": rows[0].fieldleft,
        "MCSA-5875[0].Page3[0].driveTest[0].visionTest[0].uncorrectBoth[0]": rows[0].bothuncorrected,
        "MCSA-5875[0].Page3[0].driveTest[0].visionTest[0].correctBoth[0]": rows[0].bothcorrected,
        "MCSA-5875[0].Page3[0].driveTest[0].visionTest[0].distinguishGroup[0].distinguishButtons[0]": rows[0].traficlight,
        "MCSA-5875[0].Page3[0].driveTest[0].visionTest[0].monocularGroup[0].monocularButtons[0]": rows[0].monocular,
        "MCSA-5875[0].Page3[0].driveTest[0].visionTest[0].referredGroup[0].referredButtons[0]": rows[0].optometrist,
        "MCSA-5875[0].Page3[0].driveTest[0].visionTest[0].documentGroup[0].documentButtons[0]": rows[0].documentation,
        "MCSA-5875[0].Page3[0].driveTest[0].hearingTest[0].#area[0].hearingaidGroup[0].hearingaidButtons[0]": rows[0].hearingaid,
        "MCSA-5875[0].Page3[0].driveTest[0].hearingTest[0].#area[0].whisperRight[0]": rows[0].rightear,
        "MCSA-5875[0].Page3[0].driveTest[0].hearingTest[0].#area[0].whisperLeft[0]": rows[0].leftear,
        "MCSA-5875[0].Page3[0].driveTest[0].hearingTest[0].#area[0].#area[2].right500[0]": rows[0].right500,
        "MCSA-5875[0].Page3[0].driveTest[0].hearingTest[0].#area[0].#area[2].right1000[0]": rows[0].right1000,
        "MCSA-5875[0].Page3[0].driveTest[0].hearingTest[0].#area[0].#area[2].right2000[0]": rows[0].right2000,
        "MCSA-5875[0].Page3[0].driveTest[0].hearingTest[0].#area[0].#area[2].left500[0]": rows[0].left500,
        "MCSA-5875[0].Page3[0].driveTest[0].hearingTest[0].#area[0].#area[2].left1000[0]": rows[0].left1000,
        "MCSA-5875[0].Page3[0].driveTest[0].hearingTest[0].#area[0].#area[2].left2000[0]": rows[0].left2000,
        "MCSA-5875[0].Page3[0].driveTest[0].hearingTest[0].#area[0].#area[2].rightAverage[0]": avgRight,
        "MCSA-5875[0].Page3[0].driveTest[0].hearingTest[0].#area[0].#area[2].leftAverage[0]": avgLeft,
        "MCSA-5875[0].Page3[0].driveExam[0].bodysys1[0].generalButtons[0]": rows[0].general,
        "MCSA-5875[0].Page3[0].driveExam[0].bodysys1[0].skinButtons[0]": rows[0].skin,
        "MCSA-5875[0].Page3[0].driveExam[0].bodysys1[0].eyesButtons[0]": rows[0].eyes,
        "MCSA-5875[0].Page3[0].driveExam[0].bodysys1[0].earsButtons[0]": rows[0].ears,
        "MCSA-5875[0].Page3[0].driveExam[0].bodysys1[0].mouthButtons[0]": rows[0].mouth,
        "MCSA-5875[0].Page3[0].driveExam[0].bodysys1[0].heartButtons[0]": rows[0].cardiovascular,
        "MCSA-5875[0].Page3[0].driveExam[0].bodysys1[0].chestButtons[0]": rows[0].lungs,
        "MCSA-5875[0].Page3[0].driveExam[0].bodysys2[0].abdomenButtons[0]": rows[0].abdomen,
        "MCSA-5875[0].Page3[0].driveExam[0].bodysys2[0].herniaButtons[0]": rows[0].hernia,
        "MCSA-5875[0].Page3[0].driveExam[0].bodysys2[0].backButtons[0]": rows[0].back,
        "MCSA-5875[0].Page3[0].driveExam[0].bodysys2[0].jointsButtons[0]": rows[0].joints,
        "MCSA-5875[0].Page3[0].driveExam[0].bodysys2[0].neuroButtons[0]": rows[0].neuro,
        "MCSA-5875[0].Page3[0].driveExam[0].bodysys2[0].gaitButtons[0]": rows[0].gait,
        "MCSA-5875[0].Page3[0].driveExam[0].bodysys2[0].vascularButtons[0]": rows[0].vascular,
        "MCSA-5875[0].Page3[0].driveExam[0].examComment[0]": rows[0].examtextarea,
        "MCSA-5875[0].Page3[0].driveExam[0].attachButton3[0]": "rows[0].",
        "MCSA-5875[0].Page4[0].pageHead4[0].nameLastHead4[0]": rows[0].lastname,
        "MCSA-5875[0].Page4[0].pageHead4[0].nameFirstHead4[0]": rows[0].firstname,
        "MCSA-5875[0].Page4[0].pageHead4[0].nameInitialHead4[0]": rows[0].middlename,
        "MCSA-5875[0].Page4[0].pageHead4[0].dateBirth4[0]": rows[0].dob,
        "MCSA-5875[0].Page4[0].pageHead4[0].dateForm4[0]": date,
        "MCSA-5875[0].Page4[0].fedDetermination[0].standardButtonList[0]": "2",
        "MCSA-5875[0].Page4[0].fedDetermination[0].notStandardsWhy[0]": "rows[0].",
        "MCSA-5875[0].Page4[0].fedDetermination[0].butStandardsWhy[0]": "rows[0].",
        "MCSA-5875[0].Page4[0].fedDetermination[0].qualifiedButtonList[0]": "rows[0].",
        "MCSA-5875[0].Page4[0].fedDetermination[0].otherQualify[0]": "rows[0].",
        "MCSA-5875[0].Page4[0].fedDetermination[0].correctLenses[0]": "2",
        "MCSA-5875[0].Page4[0].fedDetermination[0].hearingAid[0]": "2",
        "MCSA-5875[0].Page4[0].fedDetermination[0].waiverQualify[0]": "rows[0].",
        "MCSA-5875[0].Page4[0].fedDetermination[0].waiverEnter[0]": "rows[0].",
        "MCSA-5875[0].Page4[0].fedDetermination[0].speQualify[0]": "rows[0].",
        "MCSA-5875[0].Page4[0].fedDetermination[0].cfrQualify[0]": "rows[0].",
        "MCSA-5875[0].Page4[0].fedDetermination[0].exemptQualify[0]": "rows[0].",
        "MCSA-5875[0].Page4[0].fedDetermination[0].incompleteButtonList[0]": "rows[0].",
        "MCSA-5875[0].Page4[0].fedDetermination[0].pendingWhy[0]": "rows[0].",
        "MCSA-5875[0].Page4[0].fedDetermination[0].returnExam[0]": "rows[0].",
        "MCSA-5875[0].Page4[0].fedDetermination[0].returnDate[0]": "rows[0].",
        "MCSA-5875[0].Page4[0].fedDetermination[0].reportAmend[0]": "rows[0].",
        "MCSA-5875[0].Page4[0].fedDetermination[0].amendWhy[0]": "rows[0].",
        "MCSA-5875[0].Page4[0].fedDetermination[0].ifAmendDate[0]": "rows[0].",
        "MCSA-5875[0].Page4[0].fedDetermination[0].incompleteWhy[0]": "rows[0].",
        "MCSA-5875[0].Page4[0].fedDetermination[0].examName[0]": "rows[0].",
        "MCSA-5875[0].Page4[0].fedDetermination[0].medicalAddress[0]": "rows[0].",
        "MCSA-5875[0].Page4[0].fedDetermination[0].medicalCity[0]": "rows[0].",
        "MCSA-5875[0].Page4[0].fedDetermination[0].medicalState[0]": "rows[0].",
        "MCSA-5875[0].Page4[0].fedDetermination[0].medicalZip[0]": "rows[0].",
        "MCSA-5875[0].Page4[0].fedDetermination[0].medicalPhone[0]": "rows[0].",
        "MCSA-5875[0].Page4[0].fedDetermination[0].examDate[0]": "rows[0].",
        "MCSA-5875[0].Page4[0].fedDetermination[0].certNumber[0]": "rows[0].",
        "MCSA-5875[0].Page4[0].fedDetermination[0].issueState[0]": "rows[0].",
        "MCSA-5875[0].Page4[0].fedDetermination[0].md[0]": "rows[0].",
        "MCSA-5875[0].Page4[0].fedDetermination[0].do[0]": "rows[0].",
        "MCSA-5875[0].Page4[0].fedDetermination[0].physAssist[0]": "rows[0].",
        "MCSA-5875[0].Page4[0].fedDetermination[0].chiroPractor[0]": "rows[0].",
        "MCSA-5875[0].Page4[0].fedDetermination[0].pracNurse[0]": "rows[0].",
        "MCSA-5875[0].Page4[0].fedDetermination[0].otherPrac[0]": "rows[0].",
        "MCSA-5875[0].Page4[0].fedDetermination[0].nationalRegister[0]": "rows[0].",
        "MCSA-5875[0].Page4[0].fedDetermination[0].expireDate[0]": "rows[0].",
        "MCSA-5875[0].Page4[0].fedDetermination[0].otherPracSpecify[0]": "rows[0].",
        "MCSA-5875[0].Page5[0].pageHead5[0].nameLastHead5[0]": rows[0].lastname,
        "MCSA-5875[0].Page5[0].pageHead5[0].nameFirstHead5[0]": rows[0].firstname,
        "MCSA-5875[0].Page5[0].pageHead5[0].nameInitialHead5[0]": rows[0].middlename,
        "MCSA-5875[0].Page5[0].pageHead5[0].dateBirth5[0]": rows[0].dob,
        "MCSA-5875[0].Page5[0].pageHead5[0].dateForm5[0]": date,
        "MCSA-5875[0].Page5[0].stateDetermination[0].standardButtonListState[0]": "3",
        "MCSA-5875[0].Page5[0].stateDetermination[0].notStandardsWhyState[0]": "because",
        "MCSA-5875[0].Page5[0].stateDetermination[0].butStandardsWhyState[0]": "1",
        "MCSA-5875[0].Page5[0].stateDetermination[0].qualifiedButtonListState[0]": "2",
        "MCSA-5875[0].Page5[0].stateDetermination[0].otherQualifyState[0]": "rows[0].",
        "MCSA-5875[0].Page5[0].stateDetermination[0].correctLensesState[0]": "0",
        "MCSA-5875[0].Page5[0].stateDetermination[0].hearingAidState[0]": "2",
        "MCSA-5875[0].Page5[0].stateDetermination[0].waiverQualifyState[0]": "x",
        "MCSA-5875[0].Page5[0].stateDetermination[0].waiverEnterState[0]": "rows[0].",
        "MCSA-5875[0].Page5[0].stateDetermination[0].speQualifyState[0]": "rows[0].",
        "MCSA-5875[0].Page5[0].stateDetermination[0].grandQualifyState[0]": "rows[0].",
        "MCSA-5875[0].Page5[0].stateDetermination[0].examNameState[0]": "rows[0].",
        "MCSA-5875[0].Page5[0].stateDetermination[0].examDateState[0]": "rows[0].",
        "MCSA-5875[0].Page5[0].stateDetermination[0].medicalAddressState[0]": "rows[0].",
        "MCSA-5875[0].Page5[0].stateDetermination[0].medicalCityState[0]": "rows[0].",
        "MCSA-5875[0].Page5[0].stateDetermination[0].medicalStateState[0]": "rows[0].",
        "MCSA-5875[0].Page5[0].stateDetermination[0].medicalZipState[0]": "rows[0].",
        "MCSA-5875[0].Page5[0].stateDetermination[0].medicalPhoneState[0]": "rows[0].",
        "MCSA-5875[0].Page5[0].stateDetermination[0].certNumberState[0]": "rows[0].",
        "MCSA-5875[0].Page5[0].stateDetermination[0].issueStateState[0]": "rows[0].",
        "MCSA-5875[0].Page5[0].stateDetermination[0].mdState[0]": "rows[0].",
        "MCSA-5875[0].Page5[0].stateDetermination[0].doState[0]": "rows[0].",
        "MCSA-5875[0].Page5[0].stateDetermination[0].physAssistState[0]": "rows[0].",
        "MCSA-5875[0].Page5[0].stateDetermination[0].chiroPractorState[0]": "rows[0].",
        "MCSA-5875[0].Page5[0].stateDetermination[0].pracNurseState[0]": "rows[0].",
        "MCSA-5875[0].Page5[0].stateDetermination[0].otherPracState[0]": "rows[0].",
        "MCSA-5875[0].Page5[0].stateDetermination[0].otherSpec[0]": "rows[0].",
        "MCSA-5875[0].Page5[0].stateDetermination[0].nationalRegisterState[0]": "rows[0].",
        "MCSA-5875[0].Page5[0].stateDetermination[0].expireDateState[0]": "rows[0]."

      };

      pdfFiller.fillForm(sourcePDF, destinationPDF, data, shouldFlatten, function(err) {
        if (err) throw err;
        console.log("In callback (we're done).");
      });

    });

    if (user !== undefined) {
      user = user.toJSON();
    }

    connection.query('SELECT followUpBrainInjury, followUpEpilepsy, followUpPacemaker, followupBloodPressure, followUpHighCholesterol, followUpBreathingProblems, followUpLungDisease, followUpKidneyProblems, followUpStomachProblems, followUpDiabetes, followUpInsulin, followUpAnxiety, followUpFainting, followUpDizziness, followUpStroke, followUpMissingLimbs, followUpBackProblems, followUpBoneProblems, followUpBloodClots, followUpCancer, followUpChronicDiseases, followUpSleepDisorders, followUpSleepTest, followUpNightInHospital, followUpBrokenBone, followUpUseTobacco, followUpDrinkAlcohol, followUpIllegalSubstance, followUpFailedDrugTest FROM history_review WHERE history_review.sessionId = ' + "'" + sessionId + "'",
      function(err, rows) {
        //console.log(rows)

        var obj = rows[0];
        //console.log("obj before:")
        //console.log(obj)

        var followUpBrainInjury = "Due to head/brain injuries, ";
        var followUpEpilepsy = "Due to seizures/epilepsy, ";
        var followUpPacemaker = "Due to issues with a pacemaker, ";
        var followupBloodPressure = "Due to blood pressure, ";
        var followUpHighCholesterol = "Due to cholesterol issues, ";
        var followUpBreathingProblems = "Due to breathing issues, ";
        var followUpLungDisease = "Due to lung issues, ";
        var followUpKidneyProblems = "Due to kidney issues, ";
        var followUpStomachProblems = "Due to stomach issues, ";
        var followUpDiabetes = "Due to diabetes issues, ";
        var followUpInsulin = "Due to insulin use, ";
        var followUpAnxiety = "Due to anxiety issues, ";
        var followUpFainting = "Due to faintin issues, ";
        var followUpDizziness = "Due to dizziness issues, ";
        var followUpStroke = "Due to stroke issues, ";
        var followUpMissingLimbs = "Due to missing limbs, ";
        var followUpBackProblems = "Due to back/neck issues, ";
        var followUpBoneProblems = "Due to bone issues, ";
        var followUpBloodClots = "Due to blood clot issues, ";
        var followUpCancer = "Due to cancer issues, ";
        var followUpChronicDiseases = "Due to infections/chronic diseases, ";
        var followUpSleepDisorders = "Due to sleep disorders, ";
        var followUpSleepTest = "Due to sleep test issues, ";
        var followUpNightInHospital = "Due to hospital visits, ";
        var followUpBrokenBone = "Due to broken bone issues, ";
        var followUpUseTobacco = "Due to tobacco use, ";
        var followUpDrinkAlcohol = "Due to alcohol issues, ";
        var followUpIllegalSubstance = "Due to illegal drug issues, ";
        var followUpFailedDrugTest = "Due to failed drug test history, ";

        var certificate_0 = "a maximum of 1 year certificate can be issued.";
        var certificate_1 = "a maximum of 2 year certificate can be issued.";
        var certificate_2 = "tester ? a maximum of 1 year certificate can be issued with a neurologist's release.";
        var certificate_3 = "a maximum of 2 year certificate can be issued with a neurologist's release.";
        var certificate_4 = "no certificate can be issued.";
        var certificate_5 = "there is a three month wait period before a re-exam.";
        var certificate_6 = "a maximum of 1 year certificate can be issued.";
        var certificate_7 = "a maximum of 1 year certificate can be issued.";

        for (prop in obj) {
          if (obj[prop] == 'undefined' || obj[prop] == 'na') {
            delete obj[prop]
          }
        }

        //console.log("c1: " + certificate_1)
        //console.log("obj after:")
        //console.log(obj)

        var str = JSON.stringify(obj);

        str = str.replace(/valueZero/g, certificate_0);
        str = str.replace(/valueOne/g, certificate_1);
        str = str.replace(/valueTwo/g, certificate_2);
        str = str.replace(/valueThree/g, certificate_3);
        str = str.replace(/valueFour/g, certificate_4);
        str = str.replace(/valueFive/g, certificate_5);
        str = str.replace(/valueSix/g, certificate_6);
        str = str.replace(/valueSeven/g, certificate_7);

        str = str.replace(/followUpBrainInjury/g, followUpBrainInjury);
        str = str.replace(/followUpEpilepsy/g, followUpEpilepsy);
        str = str.replace(/followUpPacemaker/g, followUpPacemaker);
        str = str.replace(/followupBloodPressure/g, followupBloodPressure);
        str = str.replace(/followUpHighCholesterol/g, followUpHighCholesterol);
        str = str.replace(/followUpBreathingProblems/g, followUpBreathingProblems);
        str = str.replace(/followUpLungDisease/g, followUpLungDisease);
        str = str.replace(/followUpKidneyProblems/g, followUpKidneyProblems);
        str = str.replace(/followUpStomachProblems/g, followUpStomachProblems);
        str = str.replace(/followUpDiabetes/g, followUpDiabetes);
        str = str.replace(/followUpInsulin/g, followUpInsulin);
        str = str.replace(/followUpAnxiety/g, followUpAnxiety);
        str = str.replace(/followUpFainting/g, followUpFainting);
        str = str.replace(/followUpDizziness/g, followUpDizziness);
        str = str.replace(/followUpStroke/g, followUpStroke);
        str = str.replace(/followUpMissingLimbs/g, followUpMissingLimbs);
        str = str.replace(/followUpBackProblems/g, followUpBackProblems);
        str = str.replace(/followUpBoneProblems/g, followUpBoneProblems);
        str = str.replace(/followUpBloodClots/g, followUpBloodClots);
        str = str.replace(/followUpCancer/g, followUpCancer);
        str = str.replace(/followUpChronicDiseases/g, followUpChronicDiseases);
        str = str.replace(/followUpSleepDisorders/g, followUpSleepDisorders);
        str = str.replace(/followUpSleepTest/g, followUpSleepTest);
        str = str.replace(/followUpNightInHospital/g, followUpNightInHospital);
        str = str.replace(/followUpBrokenBone/g, followUpBrokenBone);
        str = str.replace(/followUpUseTobacco/g, followUpUseTobacco);
        str = str.replace(/followUpDrinkAlcohol/g, followUpDrinkAlcohol);
        str = str.replace(/followUpIllegalSubstance/g, followUpIllegalSubstance);
        str = str.replace(/followUpFailedDrugTest/g, followUpFailedDrugTest);

        obj = JSON.parse(str);

        var arr = [];
        for (prop in obj) {
          arr.push(prop + ' ' + obj[prop])
            //arr.push(prop)
          //console.log(prop)
          //console.log(obj[prop])
        }

        //console.log(arr)

        res.render('end', {
          title: 'End',
          user: user,
          data: arr
        });
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
            //console.log(rows[0])
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

      // signUpUser.save().then(function(model) {
      //   // sign in the newly registered user
      //   signInPost(req, res, next);
      //   res.redirect('/moreinfo/' + signUpUser.username)
      // });

      signUpUser.save();
      console.log(username)
      res.redirect('/signIn')
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
module.exports.homePost = homePost;
module.exports.end = end;
module.exports.endPost = endPost;
module.exports.pdf = pdf;
module.exports.demographics = demographics;
module.exports.demographicsPost = demographicsPost;
module.exports.history = history;
module.exports.historyPost = historyPost;
// module.exports.historyReview = historyReview;
// module.exports.historyReviewPost = historyReviewPost;
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
module.exports.moreInfo = moreInfo;
module.exports.moreInfoPost = moreInfoPost;
module.exports.signOut = signOut;
module.exports.warn = warn;
module.exports.notFound404 = notFound404;
