const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const config = require('../utils/config');
const User = require('../Models/user');





exports.login = (req,res,next)=>{
    let fetchuser = "";

    User.findOne({email:req.body.email})
    .then((user)=>{
        if(!user || user === null){
            res.status(401).json({
                message:'Authfail'
            })
        }
        fetchuser = user;
        return bcrypt.compare(req.body.password,user.password);
    })
    .then((result)=>{
        
        if(!result){
            res.status(401).json({
                message:'Authfail'
            })
        }
        
        const token = jwt.sign({email:fetchuser.email,password:fetchuser.password},config.auth.secretString,config.auth.expiresIn)
        
        res.status(200).json({
            message: 'succcess fully login',
            token: token,
            expiresin: 3600
        })
    })
    .catch((error)=>{
        res.status(401).json({
            message: 'error'
        })
    })
}

exports.signup = (req,res,next)=>{
    
    bcrypt.hash(req.body.password,10)
    .then((hash)=>{
        const user = new User({
            email: req.body.email,
            password: hash
        })
        user.save().then((response)=>{
            console.log(response);
            res.status(200).json({
                message:'successfull'
            })
        }).catch((error)=>{
            res.status(500).json({
                error:error
            })
        })
    }).catch((error)=>{
        console.log('error',error);
    })
}

