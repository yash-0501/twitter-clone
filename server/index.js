//Required packages
require("dotenv").config()
const express       = require("express"),
      app           = express(),
      cors          = require("cors"),
      bodyParser    = require("body-parser"),
      PORT          = 8081;
      errorHandler  = require("./handlers/error"),
      messagesRoutes= require("./routes/messages"),
      {loginRequired, ensureCorrectUser} = require("./middleware/auth");
      authRoutes    = require("./routes/auth");
app.use(cors());
app.use(bodyParser.json());

// Routes


app.use((req,res,next)=>{
    let err = new Error("Not Found")
    err.status = 404;
    next(err);
});

app.use(errorHandler);

app.use("/api/auth", authRoutes);
app.use("/api/users/:id/message",
 loginRequired,
 ensureCorrectUser,
 messagesRoutes
 );

 app.get("/api/messages", loginRequired, async (req,res,next) =>{
     try{
         let messages = await db.Message.find()
            .sort({createdAt: "desc"})
            .populate("user",{
                username: true,
                profileImageUrl: true
            })
            return res.status(200).json(messages)

     } catch(err){
         return next(err)
     }
 })

//Run Server
app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`)
})