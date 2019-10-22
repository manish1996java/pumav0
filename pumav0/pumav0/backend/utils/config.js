module.exports = {
    auth:{
        secretString:"this_must_be_stringest_password",
        expiresIn: {expiresIn: "1h"}
    },
    google:{
        callbackUrl:'/user/dashboard',
        clientID:'815755726078-kctttnqip089j540n6tk3ksckrhmhrbi.apps.googleusercontent.com',
        clientSecret: 'L4WiDbZ4-7W5M3a3Iw9_wQQj'
    },
    multer:{
        destinationUrl: "backend/image"
    }
}