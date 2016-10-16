var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var Model = require('./model');
var bodyParser = require('body-parser');

var mysql = require('mysql');
var getConnection  = require('./connectionpool');

//***********************************************************

var search = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/signin');
  } else {

    var user = req.user;

    if (user !== undefined) {
      user = user.toJSON();
    }
    res.render('search', {
      title: 'Search',
      user: user,
      error: 'test'
    });
  }
};

//-------------------------------------------------------

var searchPost = function(req, res, next) {

var user = req.user;

if (req.body.sessionId){
  sql = 'SELECT * FROM persons2 WHERE sessionId =' + "'" + req.body.sessionId + "'";
} else if (req.body.lastname){
  sql = 'SELECT * FROM persons2 WHERE lastname =' + "'" + req.body.lastname + "'";
} else if (req.body.dob){
  sql = 'SELECT * FROM persons2 WHERE dob =' + "'" + req.body.dob + "'";
} else {
  res.redirect('/search')
}

getConnection(function (err, connection) {
  connection.query(sql,
    function(err, rows) {
      console.log(rows)
      console.log(rows[0])
      if (rows[0] == [] || rows[0] == null || rows[0] == undefined){
        res.render('search', {
          error: "No results found. Please try again",
          title: 'Search',
          user: user
        })
      }


      var sessionId = rows[0].sessionId;
      res.redirect('/searchresults/' + sessionId);
      connection.release();
    });
  });
};

module.exports.search = search;
module.exports.searchPost = searchPost;
