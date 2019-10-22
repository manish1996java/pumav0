const GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../utils/config');
const User = require('../Models/user');


const configureGoogleStrategy = ()=>{
    passport.use(new GoogleStrategy({
        callbackURL: '/user/dashboard',
        clientID: '815755726078-kctttnqip089j540n6tk3ksckrhmhrbi.apps.googleusercontent.com',
        clientSecret: 'L4WiDbZ4-7W5M3a3Iw9_wQQj'
    },(accessToken,refreshToken,profile,done)=>{

        console.log("this google strategy funct work");
        // console.log("profile is---->",profile.email);
        User.findOne({email:profile.email}).then((user)=>{
            if(user){
                console.log("user got it ");
                done(null,user);
            }
            else{
                const user = new User({
                    email: profile.email,
                })
                user.save().then((user)=>{
                    console.log("user created:",user);
                    done(null,user);
                })
            }
        })
        // console.log('accessToken:',accessToken);
        // console.log('refreshToken:',refreshToken);
        // console.log('profile:',profile);
    //    User.findOne({email:})
       
    }));
    
};

module.exports = configureGoogleStrategy;
// passport.use(new GoogleStrategy({
//     callbackURL: '/user/dashboard',
//     clientID: '815755726078-kctttnqip089j540n6tk3ksckrhmhrbi.apps.googleusercontent.com',
//     clientSecret: 'L4WiDbZ4-7W5M3a3Iw9_wQQj'
// }),(accessToken,refreshToken,profile,done)=>{
//     // console.log('callback Google...',profile,'token -->',accessToken);

//     // User.findOne({email:profile.id}).then(currentuser=>{
//     //     if(currentuser){
//     //         console.log('user exist');
//     //         done(null,currentuser);
//     //     }else{

//     //         const userObject = new User({
//     //             email:profile.id,
//     //             password:"manish"
//     //         });

//     //         userObject.save().then(newuser=>{
//     //             console.log("New user Added");
//     //             done(null, newuser);
//     //         })
//     //     }
//     // })

// })