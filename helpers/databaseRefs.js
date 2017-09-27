var firebase = require('../firebaseController');
var database = firebase.database().ref();
var questionGroup = database.child('questionGroup');
var userGroup = database.child('userEmailGroup');
var questions = database.child('questions');
var users = database.child('users');
var survey = database.child('survey');

module.exports.database = database;
module.exports.questionGroup = questionGroup;
module.exports.questions = questions;
module.exports.users = users;
module.exports.userGroup = userGroup;
module.exports.survey = survey;
