var express = require('express');
var router = express.Router();
var db = require('../helpers/databaseRefs');

router.post('/create',function (req, res, next) {
    var questions = db.questions;

    questions.push({
        answerType: req.body.answerType,
        questionText: req.body.questionText
    });
    res.sendStatus(201);
});

router.post('/questionGroup/create',function (req, res, next) {
    var questions = db.questionGroup;

    questions.push({
        name: req.body.name,
        questions: req.body.questions
    });
    res.sendStatus(201);
});

module.exports = router;