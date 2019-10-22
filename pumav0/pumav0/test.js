const path = require('path');


let normalize =  path.normalize('backend/first/second/third/four/fifth/../../sixth');

console.log(normalize);