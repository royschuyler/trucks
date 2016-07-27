var db = require('./db').db;

var User = db.Model.extend({
   tableName: 'tblUsers',
   idAttribute: 'userId'

});

module.exports = {
   User: User
};
