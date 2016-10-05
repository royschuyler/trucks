var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var Model = require('./model');
var bodyParser = require('body-parser');

var getConnection  = require('./connectionpool');


//var sessionIdArr = [];

//-------------------------------------------------------

var home = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/signin');
  } else {
      console.log("on home page")
      sessionId = req.params.sessionId;
      //sessionIdArr.push(sessionId);

      var user = req.user;
      var arr = [];
      var arr2 = [];

      if (user !== undefined) {
        user = user.toJSON();
      }

    getConnection(function (err, connection) {
      connection.query("SELECT * FROM history WHERE history.sessionId =" + '"' + sessionId + '"',
        function(err, rows) {

        var obj = rows[0];

        for (var prop in obj) {
          if (obj[prop] == "1" || obj[prop] == "3" ) {
          arr.push("yes");
          } else {
          arr.push("no")
          }
        }

        arr.splice(0, 8);
        res.render('home', {
          title: 'Home',
          user: user,
          arr: arr
        });
        connection.release();
        });
    });
  }
};

//-------------------------------------------------------
var homePost = function(req, res, next) {

  //var sessionId = sessionIdArr;
  var user = req.user;

  getConnection(function (err, connection) {
    connection.query('UPDATE landing SET historyreview=' + "'" + 'x' + "'" + 'WHERE sessionId=' + "'" + sessionId + "'",
    function(err, rows) {
      connection.release();
    });
  });

  getConnection(function (err, connection) {
    connection.query('INSERT INTO history_review(username, userId, sessionId, followUpBrainInjury, followUpBrainInjuryNotes, followUpEpilepsy, followUpEpilepsyNotes, followUpEye, followUpEyeNotes, followUpEar, followUpEarNotes, followUpHeart, followUpHeartNotes, followUpPacemaker, followUpPacemakerNotes, followupBloodPressure, followupBloodPressureNotes, followUpHighCholesterol, followUpHighCholesterolNotes, followUpBreathingProblems, followUpBreathingProblemsNotes, followUpLungDisease, followUpLungDiseaseNotes, followUpBackProblems, followUpBackProblemsNotes, followUpKidneyProblems, followUpKidneyProblemsNotes, followUpStomachProblems, followUpStomachProblemsNotes, followUpDiabetes, followUpDiabetesNotes, followUpInsulin, followUpInsulinNotes, followUpAnxiety, followUpAnxietyNotes, followUpFainting, followUpFaintingNotes, followUpDizziness, followUpDizzinessNotes, followUpUnExplainedWeightLoss, followUpUnExplainedWeightLossNotes, followUpStroke, followUpStrokeNotes, followUpMissingLimbs, followUpMissingLimbsNotes, followUpBoneProblems, followUpBoneProblemsNotes, followUpBloodClots,followUpBloodClotsNotes, followUpCancer, followUpCancerNotes, followUpChronicDiseases, followUpChronicDiseasesNotes, followUpSleepDisorders, followUpSleepDisordersNotes, followUpSleepTest, followUpSleepTestNotes, followUpNightInHospital, followUpNightInHospitalNotes, followUpBrokenBone, followUpBrokenBoneNotes, followUpUseTobacco, followUpUseTobaccoNotes, followUpDrinkAlcohol,followUpDrinkAlcoholNotes, followUpIllegalSubstance, followUpIllegalSubstanceNotes, followUpFailedDrugTest, followUpFailedDrugTestNotes, historyReview) VALUES(' +
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
      req.body.followUpUnExplainedWeightLoss +
      "'," + "'" +
      req.body.followUpUnExplainedWeightLossNotes +
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
      "')",

    function(err, rows) {
      connection.release();
    });
  });

  res.redirect('/landing/' + sessionId)
};

module.exports.home = home;
module.exports.homePost = homePost;
