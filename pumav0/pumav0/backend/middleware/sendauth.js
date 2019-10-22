const jwt = require('jsonwebtoken');

const config = require('../utils/config');

module.exports = (req,res,next)=>{
    console.log("send auth work");
    console.log(req);
    const token = jwt.sign({id:req.currentUser.id},config.auth.secretString,config.auth.expiresIn);

//     res.status(200).json({
//     message: 'succcess fully login',
//     token: token,
//     expiresin: 3600
// })

    res.redirect(`http://localhost:4200/?token=${token}&expiresin=3600`);
}