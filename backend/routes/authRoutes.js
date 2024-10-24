const express = require('express');
const { UserSignIn, UserLogOut, UserSignUp, GetUser } = require('../controllers/authController');
const router = express.Router();



module.exports=(db)=>{
    router.post('/user/signin',UserSignIn(db));
    router.post('/user/signup',UserSignUp(db));
    router.get('/user/signout',UserLogOut(db));
    router.get('/user/show',GetUser(db));

    return router;
};