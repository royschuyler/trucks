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

    getConnection(function (err, connection) {
      var arr = [];
      var objArr = [];
      connection.query('SELECT sessionId FROM persons2 WHERE username =' + "'" + req.user.attributes.username + "'",
        function(err, rows) {

        if(rows[rows.length - 1]){
          var last1 = rows[rows.length - 1].sessionId;
        }else{
          last1 = '1';
        }
        if(rows[rows.length - 2]){
          var last2 = rows[rows.length - 2].sessionId;
        }else{
          last2 = '1';
        }
        if(rows[rows.length - 3]){
          var last3 = rows[rows.length - 3].sessionId;
        }else{
          last3 = '1';
        }
        if(rows[rows.length - 4]){
          var last4 = rows[rows.length - 4].sessionId;
        }else{
          last4 = '1';
        }
        if(rows[rows.length - 5]){
          var last5 = rows[rows.length - 5].sessionId;
        }else{
          last5 = '1';
        }


      connection.query('SELECT firstname, lastname, dob, sessionId FROM persons2 WHERE sessionId =' + "'" + last1 + "'",
        function(err, rows1) {
          objArr.push(rows1[0]);
        connection.query('SELECT firstname, lastname, dob, sessionId FROM persons2 WHERE sessionId =' + "'" + last2 + "'",
          function(err, rows2) {
            objArr.push(rows2[0]);
          connection.query('SELECT firstname, lastname, dob, sessionId FROM persons2 WHERE sessionId =' + "'" + last3 + "'",
            function(err, rows3) {
              objArr.push(rows3[0]);
            connection.query('SELECT firstname, lastname, dob, sessionId FROM persons2 WHERE sessionId =' + "'" + last4 + "'",
              function(err, rows4) {
                objArr.push(rows4[0]);
              connection.query('SELECT firstname, lastname, dob, sessionId FROM persons2 WHERE sessionId =' + "'" + last5 + "'",
                function(err, rows5) {
                  objArr.push(rows5[0]);

                  for (i = 0; i < objArr.length; i++){
                    if(objArr[i] == undefined){
                      objArr.splice(i);
                    }
                  }
                  console.log(objArr)

              connection.release();

              res.render('search', {
                title: 'Search',
                user: user,
                error: 'Search by session Id',
                last: objArr
              });
            });
          });
        });
      });
    });


        });
    });

  }
};

//-------------------------------------------------------

var searchPost = function(req, res, next) {

var user = req.user;

if (req.body.sessionId){
  sql = 'SELECT * FROM persons2 WHERE sessionId =' + "'" + req.body.sessionId + "'";
} else if (req.body.lastname && req.body.dob){
  sql = 'SELECT * FROM persons2 WHERE lastname =' + "'" + req.body.lastname + "'" + 'AND dob = ' + "'" + req.body.dob + "'"+ 'AND username = ' + "'" + req.user.attributes.username + "'";
} else {
  res.redirect('/search')
}

getConnection(function (err, connection) {
  connection.query(sql,
    function(err, rows) {
      console.log(rows);
      console.log(rows[0]);
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
