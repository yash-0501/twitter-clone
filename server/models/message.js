import { Schema, model } from "mongoose";
import User from "./user";

const messageSchema = new Schema({
    text:{
        type: String,
        required: true,
        maxLen: 160
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},
{
    timestamps: true
})

messageSchema.pre('remove', async (next) =>{
    try{
        let user = await User.findById(this.user);
        user.message.remove(this.id);

        await user.save
        return next()
    } catch(err){
        return next(err)
    }
})

const Message = model("Message", messageSchema);
export default Message;