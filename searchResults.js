var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var Model = require('./model');
var bodyParser = require('body-parser');

var mysql = require('mysql');
var getConnection  = require('./connectionpool');

//***********************************************************

var searchResults = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/signin');
  } else {

    var user = req.user;
    sessionId = req.params.sessionId;
    console.log("sId: " + sessionId)

    if (user !== undefined) {
      user = user.toJSON();
    }

    getConnection(function (err, connection) {
      connection.query('SELECT * FROM persons2 WHERE sessionId =' + "'" + sessionId + "'",
        function(err, rows) {

          var name = rows[0].firstname + ' ' + rows[0].lastname;
          res.render('searchresults', {
          title: 'Search Results',
          user: user,
          name: name,
          sessionId: sessionId
          });
          connection.release();
        });

    });
  };
};
//-------------------------------------------------------
var searchResultsPost = function(req, res, next) {

var user = req.user;
var search = req.body.search;

  res.redirect('/searchresults')
};

module.exports.searchResults = searchResults;
module.exports.searchResultsPost = searchResultsPost;
