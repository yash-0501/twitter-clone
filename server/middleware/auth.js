require("doten").load();
const       jwt = require("jsonwebtoken");

// Authenticatiom
exports.loginRequired = (req, res, next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1] //Bearer
        jwt.verify(token, process.env.secret, (err, decoded)=>{
            if(decoded){
                return next();
            } else{
                return next({
                    status: 401,
                    message: "Please login first!"
                })
            }

        })
    } catch (err){
        return next({
            status: 401,
            message: "Please login first!"
        })
    }
}


//Authorization
exports.ensureCorrectUser = (req,res,next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, process.env.secret, (err,decoded)=>{
            if(decoded && decoded.id === req.params.id){
                return next()
            } else {
                return({
                    status:401,
                    message:"Unauthorized"
                })
            }
        })
    } catch (err){
        return({
            status:401,
            message:"Unauthorized"
        })
    }
}