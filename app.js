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
app.get('/historyreview', route.historyReview);
app.get('/testing', route.testing);
app.get('/vision', route.vision);
app.get('/hearing', route.hearing);
app.get('/medication', route.medication);
app.get('/signout', route.signOut);
app.get('/dropdown', route.dropdown);
app.get('/warn', route.warn);
app.get('/physicalexamination', route.physicalExamination)

app.post('/signin', route.signInPost);
app.post('/signup', route.signUpPost);
app.post('/demographics', route.demographicsPost);
app.post('/history', route.historyPost);
app.post('/historyreview', route.historyReviewPost);
app.post('/testing', route.testingPost);
app.post('/vision', route.visionPost);
app.post('/hearing', route.hearingPost);
app.post('/dropdown', route.dropdownPost);
app.post('/physicalexamination', route.physicalExaminationPost)




app.use(route.notFound404);






var server = app.listen(app.get('port'), function(err) {
   if(err) throw err;

   var message = 'Server is running @ http://localhost:' + server.address().port;
   console.log(message);
});


