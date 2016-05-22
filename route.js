var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var Model = require('./model');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Hollie12123',
  database : 'doctor'
});

connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... \n\n");
} else {
    console.log("Error connecting database ... \n\n");
}
});


//-----------------------------------------------------

var index = function(req, res, next) {
   if(!req.isAuthenticated()) {
      res.redirect('/signin');
   } else {

      var user = req.user;

      if(user !== undefined) {
         user = user.toJSON();
      }
      res.render('index', {title: 'Home', user: user});
   }
};

//-------------------------------------------------------

var home = function(req, res, next) {
   if(!req.isAuthenticated()) {
      res.redirect('/signin');
   } else {

      var user = req.user;

      if(user !== undefined) {
         user = user.toJSON();
      }
      res.render('home', {title: 'Home', user: user});
   }
};

//-------------------------------------------------------
var demographics = function(req, res, next) {
   if(!req.isAuthenticated()) {
      res.redirect('/signin');
   } else {

      var user = req.user;

      if(user !== undefined) {
         user = user.toJSON();
      }
      res.render('demographics', {title: 'Demographics', user: user});
   }
};
//------------------------------------------------------
var demographicsPost = function(req, res, next) {

      // console.log('hello world');
      // console.log('First Name: ' + req.body.fName);
      // console.log('Middle Name: ' + req.body.mName);
      // console.log('Last Name: ' + req.body.lName);
      // console.log('DOB: ' + req.body.dob);

      connection.query('SELECT * FROM persons', function(err, rows) {
      console.log(rows)
      console.log(err)

    });

      res.redirect('/vitals');

};

//-------------------------------------------------------

//-------------------------------------------------------
var history = function(req, res, next) {
   if(!req.isAuthenticated()) {
      res.redirect('/signin');
   } else {

      var user = req.user;

      if(user !== undefined) {
         user = user.toJSON();
      }
      res.render('history', {title: 'History', user: user});
   }
};

//-------------------------------------------------------
var vitals = function(req, res, next) {
   if(!req.isAuthenticated()) {
      res.redirect('/signin');
   } else {

      var user = req.user;

      if(user !== undefined) {
         user = user.toJSON();
      }
      res.render('vitals', {title: 'vitals', user: user});
   }
};

//-------------------------------------------------------
var medication = function(req, res, next) {
   if(!req.isAuthenticated()) {
      res.redirect('/signin');
   } else {

      var user = req.user;

      if(user !== undefined) {
         user = user.toJSON();
      }
      res.render('medication', {title: 'Medication', user: user});
   }
};

//-------------------------------------------------------



var signIn = function(req, res, next) {
   if(req.isAuthenticated()) res.redirect('/');
   res.render('signin', {title: 'Sign In'});

};

//-------------------------------------------------------

var signInPost = function(req, res, next) {
   passport.authenticate('local', { successRedirect: '/',
                          failureRedirect: '/signin'}, function(err, user, info) {
      if(err) {
         return res.render('signin', {title: 'Sign In', errorMessage: err.message});
      }

      if(!user) {
         return res.render('signin', {title: 'Sign In', errorMessage: info.message});
      }
      return req.logIn(user, function(err) {
         if(err) {
            return res.render('signin', {title: 'Sign In', errorMessage: err.message});
         } else {
            return res.redirect('/');
         }
      });
   })(req, res, next);
};

//-----------------------------------------------------------------------------------

var signUp = function(req, res, next) {
   if(req.isAuthenticated()) {
      res.redirect('/');
   } else {
      res.render('signup', {title: 'Sign Up'});
   }
};

//----------------------------------------------------------------------------

var signUpPost = function(req, res, next) {
   var user = req.body;
   var usernamePromise = null;
   usernamePromise = new Model.User({username: user.username}).fetch();

   return usernamePromise.then(function(model) {
      if(model) {
         res.render('signup', {title: 'signup', errorMessage: 'username already exists'});
      } else {
         //****************************************************//
         // MORE VALIDATION GOES HERE(E.G. PASSWORD VALIDATION)
         //****************************************************//
         var password = user.password;
         var hash = bcrypt.hashSync(password);

         var signUpUser = new Model.User({username: user.username, password: hash});

         signUpUser.save().then(function(model) {
            // sign in the newly registered user
            signInPost(req, res, next);
         });
      }
   });
};

//-------------------------------------------------------------------------------------------

var signOut = function(req, res, next) {
   // if(!req.isAuthenticated()) {
   //    notFound404(req, res, next);
   // } else {
      req.logout();
      res.redirect('/signin');
   }
// };

//-------------------------------------------------------

var notFound404 = function(req, res, next) {
   res.status(404);
   res.render('404', {title: '404 Not Found'});
};

//--------------------------------------------------------

module.exports.index = index;
module.exports.home = home;
module.exports.demographics = demographics;
module.exports.demographicsPost = demographicsPost;
module.exports.history = history;
module.exports.vitals = vitals;
module.exports.medication = medication;
module.exports.signIn = signIn;
module.exports.signInPost = signInPost;
module.exports.signUp = signUp;
module.exports.signUpPost = signUpPost;
module.exports.signOut = signOut;
module.exports.notFound404 = notFound404;
