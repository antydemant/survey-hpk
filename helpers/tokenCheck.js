var db = require('./databaseRefs');

var checkToken = function (requestToken) {
    var usersRef = db.users;
    usersRef.once('value',function (data) {
        data.forEach(function (value) {
            if(value.val().token === requestToken) {
                return true;
            }
        });
        return false;
    });
    return false;
};

module.exports = checkToken;