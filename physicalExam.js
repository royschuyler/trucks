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
var userArr = [];

//***********************************************************

var physicalExamination = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/signin');
  } else {

    var sessionId = req.params.sessionId;
    sessionIdArr.push(sessionId);
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
  var sessionId = sessionIdArr;

    var connection = mysql.createConnection(db_config);
    connection.connect(function(err) {
    if(err) {
    console.log('Connection is asleep (time to wake it up): ', err);
    setTimeout(handleDisconnect, 1000);
    handleDisconnect();
    }
    });

  connection.query('INSERT INTO physicalexam(username, userId, sessionId, general, skin, eyes, ears, mouth, cardiovascular, lungs, abdomen, back, hernia, joints, neuro, gait, vascular, examtextarea) VALUES(' + "'" + user.attributes.username + "'," + "'" + user.attributes.userId + "'," + "'" + sessionId + "'," + "'" + req.body.general + "'," + "'" + req.body.skin + "'," + "'" + req.body.eyes + "'," + "'" + req.body.ears + "'," + "'" + req.body.mouth + "'," + "'" + req.body.cardiovascular + "'," + "'" + req.body.lungs + "'," + "'" + req.body.abdomen + "'," + "'" + req.body.back + "'," + "'" + req.body.hernia + "'," + "'" + req.body.joints + "'," + "'" + req.body.neuro + "'," + "'" + req.body.gait + "'," + "'" + req.body.vascular + "'," + "'" + req.body.examtextarea + "')",
    function(err, rows) {

    })
    connection.destroy();
  res.redirect('/landing/' + sessionId)
};

module.exports.physicalExamination = physicalExamination;
module.exports.physicalExaminationPost = physicalExaminationPost;
