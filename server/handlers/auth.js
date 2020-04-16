const db    = require("../models"),
      jwt   = require("jsonwebtoken");

exports.signin = async (req, res, next) =>{
    try{
        let user = await db.User.findOne({
            email: req.body.email
        });
        let {id, username, profileImageUrl} = user
        let isMatch = await user.ComparePassword(req.body.password)
        if(isMatch){
            let token = jwt.sign({
                id: id,
                username: username,
                profileImageUrl: profileImageUrl
            }, process.env.secret
            );
            return res.status(200).json({
                id,
                username,
                profileImageUrl,
                token
            })
        } else{
            return next({
                status:400,
                message: "Invalid Email/Password"
            })
        }
    } catch(err){
        return next({
            status: 400,
            message: err.message
        })
    }
    
}

exports.signup = async (req, res, next) =>{
    try{
        //create user
        let user = await db.User.create(req.body);
        let {id, username, profileImageUrl} = user
        //create a token
        let token = jwt.sign({
            id:id,
            username: username,
            profileImageUrl: profileImageUrl
        }, process.env.secret
        );
        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            token
        })
    } catch(err){
        //check kind of error
        if(err.code === 11000){
            err.message = "Username and/or email is already taken";
        }
        return next({
            status: 400,
            message: err.message
        })
        //response
    }
}