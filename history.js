var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var Model = require('./model');
var bodyParser = require('body-parser');

var getConnection  = require('./connectionpool');


var sessionIdArr = [];

//**********************************************************

var history = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/signin');
  } else {


    sessionId = req.params.sessionId;
    sessionIdArr.push(sessionId);

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

  //var sessionId = sessionIdArr;
  var user = req.user;

  getConnection(function (err, connection) {
    connection.query('UPDATE landing SET history=' + "'" + 'x' + "'" + 'WHERE sessionId=' + "'" + sessionId + "'",
    function(err, rows) {
      connection.release();
    });
  });

  getConnection(function (err, connection) {
    connection.query('INSERT INTO history (userId, username, sessionId, surgeryButton, surgeryComments, medicationButton, medicationComments, brainInjuries, seizures, eyeProblems, earProblems, heartProblems, paceMaker, highBloodPressure, highCholesterol, breathingProblems, lungDisease, kidneyProblems, stomachProblems, diabetes, insulin, anxiety, fainting, dizziness, unexplainedWeightLoss, stroke, missingLimbs, backProblems,  boneProblems, bloodClots, cancer, chronicDiseases, sleepDisorders, sleepTest, nightInHospital, brokenBone, useTobacco, drinkAlcohol, illegalSubstance, failedDrugTest, otherButton, otherComments, yesButton, yesDescribe) VALUES (' + "'" + user.attributes.userId + "'," + "'" + user.attributes.username + "'," + "'" + sessionId + "'," + "'" + req.body.surgeryButton + "'," + "'" + req.body.surgeryComments + "'," + "'" + req.body.medicationButton + "'," + "'" + req.body.medicationComments + "'," + "'" + req.body.brainInjuries + "'," + "'" + req.body.seizures + "'," + "'" + req.body.eyeProblems + "'," + "'" + req.body.earProblems + "'," + "'" + req.body.heartProblems + "'," + "'" + req.body.paceMaker + "'," + "'" + req.body.highBloodPressure + "'," + "'" + req.body.highCholesterol + "'," + "'" + req.body.breathingProblems + "'," + "'" + req.body.lungDisease + "'," + "'" + req.body.kidneyProblems + "'," + "'" + req.body.stomachProblems + "'," + "'" + req.body.diabetes + "'," + "'" + req.body.insulin + "'," + "'" + req.body.anxiety + "'," + "'" + req.body.fainting + "'," + "'" + req.body.dizziness + "'," + "'" + req.body.unexplainedWeightLoss + "'," + "'" + req.body.stroke + "'," + "'" + req.body.missingLimbs + "'," + "'" + req.body.backProblems + "'," + "'" + req.body.boneProblems + "'," + "'" + req.body.bloodClots + "'," + "'" + req.body.cancer + "'," + "'" + req.body.chronicDiseases + "'," + "'" + req.body.sleepDisorders + "'," + "'" + req.body.sleepTest + "'," + "'" + req.body.nightInHospital + "'," + "'" + req.body.brokenBone + "'," + "'" + req.body.useTobacco + "'," + "'" + req.body.drinkAlcohol + "'," + "'" + req.body.illegalSubstance + "'," + "'" + req.body.failedDrugTest + "'," + "'" + req.body.otherButton + "'," + "'" + req.body.otherComments + "'," + "'" + req.body.yesButton + "'," + "'" + req.body.yesDescribe + "')",
    function(err, rows) {
      connection.release();
    });
      //connection.end();
  });
  res.redirect('/landing/' + sessionId)
};

module.exports.history = history;
module.exports.historyPost = historyPost;


