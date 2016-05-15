// var express  = require('express');
// var app      = express();
// var mysql    = require('mysql');
// var passport = require('passport');
// var cookieParser = require('cookie-parser');
// var bodyParser   = require('body-parser');
// var session      = require('express-session');
// var bcrypt   = require('bcrypt-nodejs');
// var bookshelf = require('bookshelf')

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');
var ejs = require('ejs');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// custom libraries
// routes
var route = require('./route');
// model
var Model = require('./model');



//app.set('view engine', 'jade');
// app.use(express.static('www'));


//--------------------------------------------------------------

passport.use(new LocalStrategy(function(username, password, done) {
   new Model.User({username: username}).fetch().then(function(data) {
      var user = data;
      if(user === null) {
         return done(null, false, {message: 'Invalid username or password'});
      } else {
         user = data.toJSON();
         if(!bcrypt.compareSync(password, user.password)) {
            return done(null, false, {message: 'Invalid username or password'});
         } else {
            return done(null, user);
         }
      }
   });
}));

//-------------------------------------------

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
   new Model.User({username: username}).fetch().then(function(user) {
      done(null, user);
   });
});

//---------------------------------------------------------------

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.set('view engine', 'ejs');
app.use(express.static('www'));

app.use(cookieParser());
app.use(bodyParser());
app.use(session({secret: 'secret strategic xxzzz code'}));
app.use(passport.initialize());
app.use(passport.session());

//---------------------------------

// GET
app.get('/', route.index);

// signin
// GET
app.get('/signin', route.signIn);
// POST
app.post('/signin', route.signInPost);

// signup
// GET
app.get('/signup', route.signUp);
// POST
app.post('/signup', route.signUpPost);

// logout
// GET
app.get('/signout', route.signOut);

// 404 not found
app.use(route.notFound404);

//---------------------------------

var server = app.listen(app.get('port'), function(err) {
   if(err) throw err;

   var message = 'Server is running @ http://localhost:' + server.address().port;
   console.log(message);
});


//---------------------------------
// app.get('/', function(req, res){
//   res.render('index')
// });
// //---------------------------------
// app.get('/signin', function(req, res){
//   res.render('signin');
// });
// //---------------------------------
// app.get('/signout', function(req, res){
//   res.render('signout');
// });
// //---------------------------------
// app.get('/demographics', function(req, res){
//   res.render('demographics')
// });
// //---------------------------------
// app.get('/history', function(req, res){
//   res.render('history')
// });
// //---------------------------------
// app.get('/medication', function(req, res){
//   res.render('medication')
// });
// //---------------------------------
// app.get('/vitals', function(req, res){
//   res.render('vitals')
// });
// //---------------------------------
// app.get('/signup', function(req, res){
//   res.render('signup');
// });
// //---------------------------------
// app.get('/404', function(req, res){
//   res.render('404');
// });
//---------------------------------

//---------DB CONNECT--------------------------------------

// var config = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'Hollie12123',
//   database : 'dbUsers',
//   charset: 'UTF8_GENERAL_CI'
// });

// var DB = bookshelf.initialize({
//    client: 'mysql',
//    connection: config
// });

// config.connect();

// // config.query('SELECT * FROM Persons', function(err, rows, fields) {
// //   if (!err)
// //     console.log('The solution is: ', rows);
// //   else
// //     console.log('Error while performing Query.');
// // });
// config.end();

//--------------------------------------------------------------------------

//app.listen(3000);
