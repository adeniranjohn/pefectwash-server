const jwt = require('jsonwebtoken');

function theadmin(req,res,next){
    if(req.shop.role === "Administrator"){
        next();
    }
}


function superAdmin(req,res,next){
    if(req.shop.role === "SuperAdministrator"){
        console.log("Super Administrator");
        next();
    }

}
function auth(req,res,next) {

    const token = req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).json({"status": "No token"})

    }else{
        try{
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            req.shop = decoded;
            next();
        }catch(ex){
            res.status(400).json({"status": "Bad request. Invalid user"});
        }
    }
}




module.exports = { auth, theadmin }
