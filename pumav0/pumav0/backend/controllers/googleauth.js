module.exports.failur = (req,res,next)=>{
    
    console.log("page not found");
    res.send("page not found!");
}

// module.exports.googleLogin = passport.authenticate('google',{
//     scope:['profile','email']
// })