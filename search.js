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
      user: user
    });
  }
};
//-------------------------------------------------------
var searchPost = function(req, res, next) {

var user = req.user;
sessionId = req.body.sessionId;

getConnection(function (err, connection) {
  connection.query('SELECT * FROM persons2 WHERE sessionId =' + "'" + sessionId + "'",
    function(err, rows) {
      console.log(rows[0])
      var name = rows[0].firstname + ' ' + rows[0].lastname;
      console.log("name: " + name)
      res.redirect('/searchresults/' + sessionId);
      connection.release();
    });
});
};

module.exports.search = search;
module.exports.searchPost = searchPost;
