var express = require('express');
var app = express();
var path = require('path')


app.set('view engine', 'jade');
app.use(express.static('www'));




app.get('/', function(req, res){
  res.render('index')
  //res.send('hello world');
});
console.log('hello')

app.listen(3000);
