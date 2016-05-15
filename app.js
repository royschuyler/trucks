var express = require('express');
var app = express();
var path = require('path')


app.set('view engine', 'jade');
app.use(express.static('www'));



//---------------------------------
app.get('/', function(req, res){
  res.render('index')
});
//---------------------------------
app.get('/login', function(req, res){
  res.render('login')
});
//---------------------------------
app.get('/history', function(req, res){
  res.render('history')
});
//---------------------------------
app.get('/medication', function(req, res){
  res.render('medication')
});
//---------------------------------
app.get('/vitals', function(req, res){
  res.render('vitals')
});
//---------------------------------


//---------------------------------------------------------------

app.listen(3000);
