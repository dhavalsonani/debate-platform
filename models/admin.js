const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    	
	    email_id:{type:String},

})

module.exports = mongoose.model('Admin', AdminSchema);