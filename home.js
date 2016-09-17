var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var Model = require('./model');
var bodyParser = require('body-parser');

var mysql = require('mysql');
var db_config = {
      host: 'us-cdbr-iron-east-04.cleardb.net',
      user: 'b92d757f64dfcb',
      password: '8e8e5d6c',
      database: 'heroku_0a3af633b949104'
    };

function handleDisconnect() {
  console.log('handleDisconnect()');
  connection.destroy();
  connection = mysql.createConnection(db_config);
  connection.connect(function(err) {
      if(err) {
      console.log(' Error when connecting to db  (DBERR001):', err);
      setTimeout(handleDisconnect, 1000);
      }
  });

}

var sessionIdArr = [];

//-------------------------------------------------------

var home = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/signin');
  } else {


    console.log("on home page")

    var sessionId = req.params.sessionId;
    sessionIdArr.push(sessionId);

    var user = req.user;
    var arr = [];
    var arr2 = [];

    if (user !== undefined) {
      user = user.toJSON();
    }
    var connection = mysql.createConnection(db_config);
    connection.connect(function(err) {
    if(err) {
    console.log('Connection is asleep (time to wake it up): ', err);
    setTimeout(handleDisconnect, 1000);
    handleDisconnect();
    }
    });

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

        arr.splice(0, 8);
        //console.log(arr)
connection.destroy();
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

  var sessionId = sessionIdArr;
  var user = req.user;

    var connection = mysql.createConnection(db_config);
    connection.connect(function(err) {
    if(err) {
    console.log('Connection is asleep (time to wake it up): ', err);
    setTimeout(handleDisconnect, 1000);
    handleDisconnect();
    }
    });

  connection.query('INSERT INTO history_review(username, userId, sessionId, followUpBrainInjury, followUpBrainInjuryNotes, followUpEpilepsy, followUpEpilepsyNotes, followUpEye,followUpEyeNotes,followUpEar, followUpEarNotes, followUpHeart,followUpHeartNotes, followUpPacemaker, followUpPacemakerNotes,followupBloodPressure, followupBloodPressureNotes,followUpHighCholesterol, followUpHighCholesterolNotes, followUpBreathingProblems, followUpBreathingProblemsNotes, followUpLungDisease, followUpLungDiseaseNotes, followUpKidneyProblems, followUpKidneyProblemsNotes, followUpStomachProblems, followUpStomachProblemsNotes, followUpDiabetes, followUpDiabetesNotes, followUpInsulin, followUpInsulinNotes, followUpAnxiety, followUpAnxietyNotes, followUpFainting, followUpFaintingNotes, followUpDizziness, followUpDizzinessNotes, followUpStroke, followUpStrokeNotes, followUpMissingLimbs, followUpMissingLimbsNotes, followUpBackProblems, followUpBackProblemsNotes, followUpBoneProblems, followUpBoneProblemsNotes, followUpBloodClots,followUpBloodClotsNotes, followUpCancer, followUpCancerNotes, followUpChronicDiseases, followUpChronicDiseasesNotes, followUpSleepDisorders, followUpSleepDisordersNotes, followUpSleepTest, followUpSleepTestNotes, followUpNightInHospital, followUpNightInHospitalNotes, followUpBrokenBone, followUpBrokenBoneNotes, followUpUseTobacco, followUpUseTobaccoNotes, followUpDrinkAlcohol,followUpDrinkAlcoholNotes, followUpIllegalSubstance, followUpIllegalSubstanceNotes, followUpFailedDrugTest, followUpFailedDrugTestNotes, historyReview) VALUES(' +
      "'" +
      user.attributes.username +
      "'," + "'" +
      user.attributes.userId +
      "'," + "'" +
      sessionId +
      "'," + "'" +
      req.body.followUpBrainInjury +
      "'," + "'" +
      req.body.followUpBrainInjuryNotes +
      "'," + "'" +
      req.body.followUpEpilepsy +
      "'," + "'" +
      req.body.followUpEpilepsyNotes +
      "'," + "'" +
      req.body.followUpEye +
      "'," + "'" +
      req.body.followUpEyeNotes +
      "'," + "'" +
      req.body.followUpEar +
      "'," + "'" +
      req.body.followUpEarNotes +
      "'," + "'" +
      req.body.followUpHeart +
      "'," + "'" +
      req.body.followUpHeartNotes +
      "'," + "'" +
      req.body.followUpPacemaker +
      "'," + "'" +
      req.body.followUpPacemakerNotes +
      "'," + "'" +
      req.body.followupBloodPressure +
      "'," + "'" +
      req.body.followupBloodPressureNotes +
      "'," + "'" +
      req.body.followUpHighCholesterol +
      "'," + "'" +
      req.body.followUpHighCholesterolNotes +
      "'," + "'" +
      req.body.followUpBreathingProblems +
      "'," + "'" +
      req.body.followUpBreathingProblemsNotes +
      "'," + "'" +
      req.body.followUpLungDisease +
      "'," + "'" +
      req.body.followUpLungDiseaseNotes +
      "'," + "'" +
      req.body.followUpBackProblems +
      "'," + "'" +
      req.body.followUpBackProblemsNotes +
      "'," + "'" +
      req.body.followUpKidneyProblems +
      "'," + "'" +
      req.body.followUpKidneyProblemsNotes +
      "'," + "'" +
      req.body.followUpStomachProblems +
      "'," + "'" +
      req.body.followUpStomachProblemsNotes +
      "'," + "'" +
      req.body.followUpDiabetes +
      "'," + "'" +
      req.body.followUpDiabetesNotes +
      "'," + "'" +
      req.body.followUpInsulin +
      "'," + "'" +
      req.body.followUpInsulinNotes +
      "'," + "'" +
      req.body.followUpAnxiety +
      "'," + "'" +
      req.body.followUpAnxietyNotes +
      "'," + "'" +
      req.body.followUpFainting +
      "'," + "'" +
      req.body.followUpFaintingNotes +
      "'," + "'" +
      req.body.followUpDizziness +
      "'," + "'" +
      req.body.followUpDizzinessNotes +
      "'," + "'" +
      req.body.followUpStroke +
      "'," + "'" +
      req.body.followUpStrokeNotes +
      "'," + "'" +
      req.body.followUpMissingLimbs +
      "'," + "'" +
      req.body.followUpMissingLimbsNotes +
      "'," + "'" +
      req.body.followUpBoneProblems +
      "'," + "'" +
      req.body.followUpBoneProblemsNotes +
      "'," + "'" +
      req.body.followUpBloodClots +
      "'," + "'" +
      req.body.followUpBloodClotsNotes +
      "'," + "'" +
      req.body.followUpCancer +
      "'," + "'" +
      req.body.followUpCancerNotes +
      "'," + "'" +
      req.body.followUpChronicDiseases +
      "'," + "'" +
      req.body.followUpChronicDiseasesNotes +
      "'," + "'" +
      req.body.followUpSleepDisorders +
      "'," + "'" +
      req.body.followUpSleepDisordersNotes +
      "'," + "'" +
      req.body.followUpSleepTest +
      "'," + "'" +
      req.body.followUpSleepTestNotes +
      "'," + "'" +
      req.body.followUpNightInHospital +
      "'," + "'" +
      req.body.followUpNightInHospitalNotes +
      "'," + "'" +
      req.body.followUpBrokenBone +
      "'," + "'" +
      req.body.followUpBrokenBoneNotes +
      "'," + "'" +
      req.body.followUpUseTobacco +
      "'," + "'" +
      req.body.followUpUseTobaccoNotes +
      "'," + "'" +
      req.body.followUpDrinkAlcohol +
      "'," + "'" +
      req.body.followUpDrinkAlcoholNotes +
      "'," + "'" +
      req.body.followUpIllegalSubstance +
      "'," + "'" +
      req.body.followUpIllegalSubstanceNotes +
      "'," + "'" +
      req.body.followUpFailedDrugTest +
      "'," + "'" +
      req.body.followUpFailedDrugTestNotes +
      "'," + "'" +
      req.body.historyReview +
      "')"),

    function(err, rows) {
      //console.log(req.body)
    }

  res.redirect('/landing/' + sessionId)
};

module.exports.home = home;
module.exports.homePost = homePost;
