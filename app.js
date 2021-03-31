const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');
const bodyParser = require("body-parser");
const routes = require('./routes');
const App = express();
const connectDB = require('./db');
const initializePassport = require('./passport-config');
initializePassport();

//MongoDB connection
connectDB();

let admin = ['admin@letsdebate.com'];

//static folder
App.use(express.static(path.join(__dirname, 'public')));

App.use(express.urlencoded({ extended: true }));

//setting template engine
App.set('views', __dirname + '/views/');
App.set('view engine', 'ejs');
App.engine('ejs', require('ejs').__express);

App.use(bodyParser.json());
App.use(flash());
App.use(session({
    secret: 'sdfvfvf',
    resave: false,
    saveUninitialized: false,
}));
App.use(passport.initialize());
App.use(passport.session());
App.use(routes);

const User = require('./models/user.js');
const Comment = require('./models/comment');
const Debate = require('./models/debate');
const Admin = require('./models/admin.js');


App.post('/createdebate', (req, res) => {

    let title = req.body.title;
    let tags = req.body.tags.split(',');
    tags.forEach(function(tag, index){
        tags[index] = tag.trim();
    });

    console.log(req.user);

    const debate = new Debate({
        title: title,
        tags: tags,
        posting_date: Date.now(),
        user_id: req.user._id,
        likes: 0
    });

    debate.save();
    res.redirect('/');
    
});

App.post('/addUser', (req, res) => {
    console.log(req.body);
    const user = new User({ 
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password:  req.body.password,
        email_id:  req.body.email,
        preferences:  [],
        debate_id_liked:  [],
        comments_id_liked: []
    })
    
    user.save();
    res.end();
})

App.get('/', checkAuthenticated, (req, res) => {   
	let num_comment = [] 
    Debate.find({}, function(err, debate) {
		let is_admin = false;
		Admin.exists( {email_id: req.user.email}, (err, result) => {
			if(err){
				throw err;
			}
			res.render('index', { user : req.user.first_name, debates: debate, is_admin: result});			
		})
        
    }).sort({ likes : -1 });    
})

App.get('/debate_', checkAuthenticated, (req, res) => {

	Debate.find( {_id : req.query.debate_id}, function(err, debate){

		Comment.find({debate_id: req.query.debate_id}, function(err, comment) {
			let is_admin = false;
			if(admin.includes(req.user.email)){
				is_admin = true;
			}
			res.render('debate_', { "debate" : debate, "comments": comment, "user": req.user, "is_admin": is_admin});
		}).sort({ likes : -1 });
	})		
})


App.get("/debate", (req, res) => {
    res.render('debate', {debate_id : req.query.debate_id});  
});

App.get("/debate_data", (req, res) => {
	Debate.find({_id: req.query.debate_id}, function(err, debate) {
		if(err){ throw(err) }
		res.status(200).json(debate);
	}); 	
});


App.get("/user_data", (req, res) => {	
	User.find({_id: req.user._id}, function(err, user) {
		res.status(200).json(user);
	});
});

App.get('/deletedebate', (req, res) => {
	Debate.deleteOne({_id: req.query.debate_id}, (err) => {
		if(err){
			throw err;
		}
		res.redirect('/');
	});
	
});

App.get('/deletecomment', (req, res) => {
	Comment.deleteOne({_id: req.query.comment_id}, (err) => {
		if(err){
			throw err;
		}
		res.redirect('/debate_?debate_id='+req.query.debate_id);
	});
	
});

App.post("/updatelikes", (req, res) => {
	console.log("likes",req.body.comment_id);
	c_id = req.body.comment_id
	Comment.findOneAndUpdate({ _id:c_id}, { $inc: { likes: 1 } }, {new: true },function(err, response) {
		if(err){
	        throw(err)
	    }
 	});
	res.status(200).json({})
});

App.post("/updatelikeslist", (req, res) => {
	console.log("list", req.body.comment_id);
	c_id = req.body.comment_id
 	User.findOneAndUpdate({ _id: req.user._id}, { $push: { comment_liked: c_id } }, {new: true },function(err, response) {
		if(err){
	        throw(err)
	    }
		
 	});
 	res.status(200).json({})
});

App.post("/updatelikes_unlike", (req, res) => {
	console.log("likes",req.body.comment_id);
	c_id = req.body.comment_id
	Comment.findOneAndUpdate({ _id:c_id}, { $inc: { likes: -1 } }, {new: true },function(err, response) {
		if(err){
	        throw(err)
	    }

 	});
	res.status(200).json({})
});

App.post("/updatelikeslist_unlike", (req, res) => {
	console.log("list", req.body.comment_id);
	c_id = req.body.comment_id
 	User.findOneAndUpdate({ _id: req.user._id}, { $pull: { comment_liked:c_id } }, {new: true },function(err, response) {
		if(err){
	        throw(err)
	    }
		
 	});
 	res.status(200).json({})
});


App.post("/updatelikes_debate", (req, res) => {
	console.log("likes",req.body.debate_id);
	d_id = req.body.debate_id
	Debate.findOneAndUpdate({ _id:d_id}, { $inc: { likes: 1 } }, {new: true },function(err, response) {
		if(err){
	        throw(err)
	    }

 	});
	res.status(200).json({})
});

App.post("/updatelikeslist_debate", (req, res) => {
	console.log("list", req.body.debate_id);
	d_id = req.body.debate_id
 	User.findOneAndUpdate({ _id: req.user._id}, { $push: { debate_liked: d_id } }, {new: true },function(err, response) {
		if(err){
	        throw(err)
	    }
		
 	});
 	res.status(200).json({})
});


App.post("/updatelikes_debate_unlike", (req, res) => {
	console.log("likes",req.body.debate_id);
	d_id = req.body.debate_id
	Debate.findOneAndUpdate({ _id:d_id}, { $inc: { likes: -1 } }, {new: true },function(err, response) {
		if(err){
	        throw(err)
	    }

 	});
	res.status(200).json({})
});

App.post("/updatelikeslist_debate_unlike", (req, res) => {
	console.log("list", req.body.debate_id);
	d_id = req.body.debate_id
 	User.findOneAndUpdate({ _id: req.user._id}, { $pull: { debate_liked:d_id } }, {new: true },function(err, response) {
		if(err){
	        throw(err)
	    }
		
 	});
 	res.status(200).json({})
});


App.get("/comments", (req, res) => {	
	var id = (req.query.debate_id).valueOf();
	Comment.find({debate_id:id}, function(err, comment) {
		res.status(200).json(comment);
	}).sort({ likes : -1 });
});


// get request handler to fetch all likes data for a given id.
App.post("/pro", (req, res) => {
	var new_comment = {
		pro_con:true,
		comment:req.body.text,
		debate_id: req.body.debate_id,
		user_id: req.user._id,
		likes:0
	}
	let comment = new Comment(new_comment);
	comment.save();
	res.status(200).send({});
});

App.post("/con", (req, res) => {	
	var new_comment = {
		pro_con:false,
		comment:req.body.text,
		debate_id: req.body.debate_id,
		user_id: req.user._id,
		likes:0
	}
	let comment = new Comment(new_comment);
	comment.save();
	res.status(200).send({})
});


App.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

function checkAuthenticated(req, res, next){
    if (req.isAuthenticated()) {
      next();
    } else {
      req.flash("info", "You must be logged into see this page");
      res.redirect("/login");
    }
};

function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        res.redirect("/");
    }
    next(); 
}

function isAdmin(email){
	Admin.exists( {email_id: email}, (err, result) => {
		if(err){
			throw err;
		}
		console.log(result)
		return result;
	})
}
