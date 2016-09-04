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
var signIn = require('./signIn');
var demographics = require('./demographics');
var history = require('./history');
var home = require('./home');
var testing = require('./testing');
var vision = require('./vision');
var hearing = require('./hearing');
var physicalexamination = require('./physicalExam');
var end = require('./end');
var pdf = require('./pdf');
var signup = require('./signup');
var moreInfo = require('./moreInfo')
var landing = require('./landing')

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());


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

//----------------------------------------------------------------

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
app.get('/signin', signIn.signIn);
app.get('/signup', signup.signUp);
app.get('/moreinfo/:username', moreInfo.moreInfo);
app.get('/landing/:sessionId', landing.landing);
app.get('/home/:sessionId', home.home);
app.get('/end/:sessionId', end.end);
app.get('/pdf/:sessionId', pdf.pdf);
app.get('/demographics/:sessionId', demographics.demographics);
app.get('/history/:sessionId', history.history);
// app.get('/historyreview', route.historyReview);
app.get('/testing/:sessionId', testing.testing);
app.get('/vision/:sessionId', vision.vision);
app.get('/hearing/:sessionId', hearing.hearing);
app.get('/signout', route.signOut);
app.get('/physicalexamination/:sessionId', physicalexamination.physicalExamination)



app.post('/signin', signIn.signInPost);
app.post('/signup', signup.signUpPost);
app.post('/moreinfo/:username', moreInfo.moreInfoPost);
app.post('/home/:sessionId', home.homePost);
app.post('/end/:sessionId', end.endPost);
app.post('/demographics/:sessionId', demographics.demographicsPost);
app.post('/history/:sessionId', history.historyPost);
// app.post('/historyreview', route.historyReviewPost);
app.post('/testing/:sessionId', testing.testingPost);
app.post('/vision/:sessionId', vision.visionPost);
app.post('/hearing/:sessionId', hearing.hearingPost);
app.post('/physicalexamination/:sessionId', physicalexamination.physicalExaminationPost)




app.use(route.notFound404);



var server = app.listen(app.get('port'), function(err) {
   if(err) throw err;

   var message = 'Server is running @ http://localhost:' + server.address().port;
   console.log(message);
});


