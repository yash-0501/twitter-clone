import { set, Promise as _Promise, connect } from "mongoose";
        
set("debug,true");
_Promise = Promise;
connect("mongodb://localhost/twitter-clone",{
    keepAlive: true
});


export const User = require("./user");
export const Message = require("./message");