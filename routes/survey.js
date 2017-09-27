var express = require('express');
var router = express.Router();
var db = require('../helpers/databaseRefs');

function surveyExist(value) {
    if(value === null) {
        return false
    }
    return true;
}

function isQuestionGroupExist(id) {
    if(id) {
        var questionGroupData = db.questionGroup.child(id);
        questionGroupData.once('value', function (data) {
            if (!data) {
                return false;
            } else {
                return true;
            }
        });
    }
    return false;
}

function isUserGroupExist(id) {
    if(id) {
        var userGroupData = db.userGroup.child(id);
        userGroupData.once('value', function (data) {
            if (!data) {
                return false;
            } else {
                return true;
            }
        });
    }
    return false;
}

function isKeysEqual(requestKey,databaseKey) {
    if(requestKey !== databaseKey) {
       return false;
    }
    return true;
}

router.get('/:id/:key', function(req, res, next) {
    var survey = firebase.database().ref('survey/' + req.params.id);
    survey.once('value').then(function (surveyData) {
        if(surveyExist(surveyData.val()) && isKeysEqual(req.params.key, surveyData.val().key)){
            res.json({hello:"world"});
        } else {
            res.json({
                errorMessage: "Bad credentials!"
            });
        }
    });
});

router.post('/create',function (req, res, next) {
    var survey = db.survey;
    if(isQuestionGroupExist(req.body.questionGroupId) && isUserGroupExist(req.body.userGroupId)) {
        survey.push({
            name: req.body.name,
            userGroupId: req.body.userGroupId,
            questionGroupId: req.body.questionGroupId,
            status: "created"
        });
    } else {
        res.json({
            errorMessage:"Bad credentials!"
        });
    }
});

module.exports = router;