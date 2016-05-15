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

var route = require('./route');
var Model = require('./model');

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

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
   new Model.User({username: username}).fetch().then(function(user) {
      done(null, user);
   });
});


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

app.get('/', route.index);
app.get('/signin', route.signIn);
app.get('/signup', route.signUp);
app.get('/home', route.home);
app.get('/demographics', route.demographics);
app.get('/history', route.history);
app.get('/vitals', route.vitals);
app.get('/medication', route.medication);




app.post('/signin', route.signInPost);


app.post('/signup', route.signUpPost);

app.get('/signout', route.signOut);

app.use(route.notFound404);

var server = app.listen(app.get('port'), function(err) {
   if(err) throw err;

   var message = 'Server is running @ http://localhost:' + server.address().port;
   console.log(message);
});



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
