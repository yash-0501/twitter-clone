import { Schema, model, mongo } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    profileImageUrl:{
        type: String
    },
    messages: [{
        type: Schema.Types.ObjectId,
        ref: "Message"
    }]
});

userSchema.pre('save', async (next)=>{
    try{
        if(!this.isModified("password")){
            return next();
        }
        //10 is salt
        let hashedPass = await bcrypt.hash(this.password, 10);
        this.password = hashedPass;
        return next();
    } catch(err){
        return next(err); //goes to errorHandler
    }
})

userSchema.methods.comparePassword = async (candidatePassword, next)=>{
    try{
        let isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch(err){
        return next(err)
    }
}

const User = model("User", userSchema);
export default User