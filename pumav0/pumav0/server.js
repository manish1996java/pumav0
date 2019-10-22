const http = require("http");
const app = require("./backend/app");


const port = process.env.PORT||3000;

app.set('port',port);

const server = http.createServer(app);


server.on('close',()=>{
    console.log("close");
})
server.on("error",(error)=>{
    if( error.syscall != "listen"){
        throw error;
    }
    switch(error.code){
        case "EACCES": 
            console.log("permissin denied");
            process.exit(1);
            break;
        case "EADDRESSINUSE": 
            console.log("permissin denied");
            process.exit(1);
            break;

        default: throw error; 
    }
})
server.on("listening",()=>{
    console.log("listening");
})

server.on("connection",()=>{
    console.log("connection");
})

server.listen(port);


