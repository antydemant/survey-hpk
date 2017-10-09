var express = require('express');
var router = express.Router();
var db = require('../helpers/databaseRefs');
var validator = require('validator');
var crypto = require('../helpers/crypto');

/*
Firebase Database rules:
 {
     "rules": {
         "users": {
             ".read": true,
             ".write": "auth != null"
         },
         "emailUserList": {
             ".read": "auth != null",
             ".write": true
         },
         "emailGroup": {
             ".read": true,
             ".write": true
         },
         "questions": {
             ".read": true,
             ".write": "auth != null"
         },
         "questionGroup": {
             ".read": true,
             ".write": "auth != null"
         },
         "answers": {
             ".read": "auth != null",
             ".write": true
         },
         "surveys": {
             ".read": "auth != null",
             ".write": true
         }
     }
 }
 */
router.get('/list', function(req, res, next) {
    var usersRef = db.users;
    usersRef.once('value',function (data) {
        if(data.val() === null) {
            res.json({errorMessage:'List of users is empty'});
        } else {
            res.json(data.val());
        }
    });
});

router.get('/:id', function(req, res, next) {
    var usersRef = db.users.child(req.params.id);
    usersRef.once('value',function (data) {
        if(data.val() === null) {
            res.json({errorMessage:'User with ID:' + req.params.id + ' doesn\'t exist'});
        } else {
            res.json(data.val());
        }
    });
});

router.post('/create', function(req, res, next) {
    var usersRef = db.users;
    usersRef.push({
        username: req.body.username,
        email: req.body.email,
        password: crypto(req.body.password),
        token: crypto(Date.now().toString() + req.body.email),
        registration_date: Date.now().toString(),
        last_login: null
    });
    res.sendStatus(201);
});

router.post('/login', function(req, res, next) {

    var usersRef = db.users;
    usersRef.once('value',function (data) {
        data.forEach(function (value) {
            if(value.val().password === crypto(req.body.password) &&
               value.val().email === req.body.email) {
                var userRef = db.users.child(value.key);
                userRef.update({
                    token: crypto(Date.now().toString() + req.body.email)
                });
                userRef.once('value', function (userdata) {
                    res.json({
                        token:userdata.val().token
                    })
                })
            }
        })
    });
});

module.exports = router;