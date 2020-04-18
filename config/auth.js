const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.theadmin = function(req,res,next){
    if(req.shop.role === "Administrator"){
        console.log(req.shop);
        next();
    }
}


module.exports.superAdmin = function(req,res,next){
    if(req.shop.role === "SuperAdministrator"){
        console.log("Super Administrator");
        next();
    }
    
}
module.exports.auth = function(req,res,next) {
    const token = req.header('x-auth-token');
    //const token = req.query.token;
    //console.log(token);
    if(!token){
        console.log("no token");
        return res.status(401).json({"status": "No token"})

    }else{
        try{
            const decoded = jwt.verify(token, "perfectWashKey");
            req.shop = decoded;
            console.log("auth")
            next();
        }catch(ex){
            res.status(400).json({"status": "Bad request. Invalid token"});
        }
    }
}
