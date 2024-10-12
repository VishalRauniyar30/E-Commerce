import { model, Schema } from 'mongoose'
 
const userSchema = Schema({
    name : {
        type : String,
    },
    email : {
        type : String,
        unique : true,
    },
    password : {
        type : String,
    },
    cartData : {
        type : Object,
    },
    date : {
        type : Date,
        default : Date.now
    }
})

const User = model("User", userSchema)

export default User