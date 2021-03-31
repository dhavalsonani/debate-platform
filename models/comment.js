const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    pro_con:{type:Boolean},
    comment:{type:String},
    debate_id:{type:String},
    user_id:{type:String},
    likes:{type:Number}
})

module.exports = mongoose.model('Comment', CommentSchema);