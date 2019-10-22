const express = require('express');
const passport = require('passport');
const multer = require('../middleware/multer');

const usercontrol = require('../controllers/user');
const sendauth = require('../middleware/sendauth');
const googleauth = require('../controllers/googleauth');
const multermiddle = require('../middleware/multer');

const router = express.Router();

router.post('/login',usercontrol.login);

/* sent to the passportgoole route , pasport.authenticate will athtnicate with google strategy */
router.get('/passportgoogle',passport.authenticate('google',{
    scope:['profile','email']
}));

router.get('/dashboard',passport.authenticate('google',{failureRedirect: '/user/failiur'}),sendauth);

router.get('/failiur',googleauth.failur);

// passport.authenticate('google',{scope:['profile','email'],successFlash:"",successMessage:"",successReturnToOrRedirect:""})
router.post('/signup',usercontrol.signup);

router.post('/upload',multer,(req,res,next)=>{
    console.log(" upload route")
})

module.exports = router;