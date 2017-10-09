var express = require('express');
var router = express.Router();
var google = require("googleapis");
//var serviceAccount = require('../serviceAccount');
//var authScopes = [
//    "https://www.googleapis.com/auth/userinfo.email",
//    "https://www.googleapis.com/auth/firebase.database"
//];

router.get('/adminAuthTest', function(req, res, next) {
    res.json({
        message:'text'
    })
    // Authenticate a JWT client with the service account.
    // var jwtClient = new google.auth.JWT(
    //     serviceAccount.client_email, // google email
    //     null,                        // wtf !?
    //     serviceAccount.private_key,  // private_key
    //     authScopes
    // );

    // Use the JWT client to generate an access token.
    // jwtClient.authorize(function(error, tokens) {
    //     if (error) {
    //         res.json({
    //             errorMessage:"Error making request to generate access token:" + error
    //         });
    //     } else if (tokens.access_token === null) {
    //         res.json({
    //             errorMessage:"Provided service account does not have permission to generate access tokens"
    //         });
    //     } else {
    //         var accessToken = tokens.access_token;
    //         res.json({
    //             token: accessToken
    //         });
    //     }
    // });
});

module.exports = router;
