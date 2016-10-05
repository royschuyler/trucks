var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var Model = require('./model');
var bodyParser = require('body-parser');

var mysql = require('mysql');
var getConnection  = require('./connectionpool');


//var sessionIdArr = [];
var userArr = [];

//***********************************************************

var physicalExamination = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/signin');
  } else {

    sessionId = req.params.sessionId;
    //sessionIdArr.push(sessionId);
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
  //var sessionId = sessionIdArr;

  getConnection(function (err, connection) {
    connection.query('UPDATE landing SET physicalexam=' + "'" + 'x' + "'" + 'WHERE sessionId=' + "'" + sessionId + "'",
    function(err, rows) {
      connection.release();
    });
  });

getConnection(function (err, connection) {
  connection.query('INSERT INTO physicalexam(username, userId, sessionId, general, skin, eyes, ears, mouth, cardiovascular, lungs, abdomen, back, hernia, joints, neuro, gait, vascular, examtextarea) VALUES(' + "'" + user.attributes.username + "'," + "'" + user.attributes.userId + "'," + "'" + sessionId + "'," + "'" + req.body.general + "'," + "'" + req.body.skin + "'," + "'" + req.body.eyes + "'," + "'" + req.body.ears + "'," + "'" + req.body.mouth + "'," + "'" + req.body.cardiovascular + "'," + "'" + req.body.lungs + "'," + "'" + req.body.abdomen + "'," + "'" + req.body.back + "'," + "'" + req.body.hernia + "'," + "'" + req.body.joints + "'," + "'" + req.body.neuro + "'," + "'" + req.body.gait + "'," + "'" + req.body.vascular + "'," + "'" + req.body.examtextarea + "')",
    function(err, rows) {
      connection.release();
    });
});
    //connection.end();
  res.redirect('/landing/' + sessionId)
};

module.exports.physicalExamination = physicalExamination;
module.exports.physicalExaminationPost = physicalExaminationPost;
