const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    first_name:{type:String},
    last_name:{type:String},
    password:{type:String},
    email:{type:String},
    preferences:{type:Array},
    debate_liked:{type:Array},
    comment_liked:{type:Array}
});

module.exports = mongoose.model('User', UserSchema);