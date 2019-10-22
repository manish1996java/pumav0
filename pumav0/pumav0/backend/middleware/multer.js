const multer = require('multer');
const config = require('../utils/config')

const Mime_type_Map = {
    "image/jpeg":"jpeg",
    "image/png":"png",
    "image/jpg":"jpg",
    "image/svg":"svg"
}

const destinationFunc = (req,file,cb)=>{
    console.log("destination function run");
    const isValid = Mime_type_Map[file.mimetype];
    let error = new Error('Invalid mime type');
    if(isValid){
        error=null;
    }
    cb(error,config.multer.destinationUrl);
}
const filenameFunc = (req,file,cb)=>{
    console.log("filename function run");
    let name = file.originalname.toLowerCase().split(' ').join('-');
    let ext = Mime_type_Map[file.mimetype];
    cb(null,name + '-' + Date.now + '.' + ext)
}

const storage = multer.diskStorage({
    destination:destinationFunc,
    filename:filenameFunc,
})

const fileFilter = ()=>{

}
const limits = 1024 * 1024 * 5;


module.exports = multer({storage:storage}).single("image");