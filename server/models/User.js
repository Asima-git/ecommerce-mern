const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true,
        uniqe:true
    },
    email : {
        type:String,
        required:true,
        uniqe:true
    },
    password : {
        type:String,
        required:true,
    },
    role : {
        type:String,
        default:'user',
    }
});

const User = mongoose.model('User',UserSchema);
module.exports = User;