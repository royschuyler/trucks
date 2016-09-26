var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'us-cdbr-iron-east-04.cleardb.net',
  user            : 'b92d757f64dfcb',
  password        : '8e8e5d6c',
  database        : 'heroku_0a3af633b949104'
});

var getConnection = function(callback) {
    pool.getConnection(function(err, connection) {
        callback(err, connection);
    });
};

module.exports = getConnection;
