const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://dhavalsonani:xyz123@cluster0.el8ap.mongodb.net/lets_debate', {
            useNewUrlParser: true,
            retryWrites:true,
            useUnifiedTopology: true
        });
        console.log(`mongoDB connected: ${conn.connection.host}`);
    }
    catch(err){
        console.error(err);
    }
}

module.exports = connectDB;