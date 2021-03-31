const mongoose = require('mongoose');

const DebateSchema = new mongoose.Schema({
    	
	    title:{type:String},
		tags:{type:Array},
		posting_date:{type:Date},
		user_id:{type:String},
		likes:{type:Number}
})

module.exports = mongoose.model('Debate', DebateSchema);