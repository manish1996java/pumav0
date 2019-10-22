const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

const rootdir = require('./utils/projectHomePath')
const configgoogle = require('./middleware/googlepassport');
const usermodel = require("./Models/user");
const config = require('./utils/config');
const userroute = require("./routes/user")
const errorpage = require('./controllers/error')

const app = express();


/* set CORS */
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, content-type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods","*");
    next();
})



/* initialize the static folder */
app.use(express.static(path.join(rootdir,'backend','public')));
/* to encode the url which comes with request */
app.use(bodyparser.urlencoded({extended:true}));
/* to encode the json which comes with request */
app.use(bodyparser.json());


/* set express-session */
app.use(session({
    secret: config.auth.secretString,
    resave: true,
    saveUninitialized: true,
}))




/*inisilize the passport to access the req and res object and also add user property to access current user */
app.use(passport.initialize({userProperty: 'currentUser'}));
/* configure passport session that express allow to use passport session */
app.use(passport.session());
/* configured google strategy to allow you to get access the user and its detail */
configgoogle();




/* passport serialize (It means it take user in request and create token 
    of user id and send as token)  */
passport.serializeUser((user,done)=>{
    console.log("inside serializeuser  ",user);
    done(null,user.id);
})

/* passport deserialize (when encrypted token comes then it deserialize id
    and find User in data base if exist then pass user in done)  */
passport.deserializeUser((id,done)=>{
    console.log("deserialize user");
    usermodel.findById(id).then((user)=>{
        done(null,user);
    })
})



/* Connect with mongodb server */
mongoose.connect("mongodb+srv://Manish:YFPqRfZGDM7hJb9u@cluster0-puvlp.mongodb.net/test?retryWrites=true&w=majority",{ useNewUrlParser: true })
    .then(()=>{ 
        console.log('connected to database!');
    }).catch((error)=>{
        console.log(error,"connection failed");
    });


/* enter requete inside user route */
app.use('/user',userroute);
app.use('',errorpage)

module.exports = app;