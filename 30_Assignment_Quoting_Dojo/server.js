// 30_Assignment_Quoting Dojo

// 1) make sure all neccesary modules have been installed
// 2) terminal > nodemon server.js
// 3) terminal > sudo mongod (mongo server)
// 4) terminal > sudo mongo (database)

// REQUIRES
// require express module
var express = require("express");
// create an express app
var app = express();
// require body-parser (to recieve data from clients)
var bodyParser = require("body-parser");
// integrate body-parser with our app
app.use(bodyParser.urlencoded());
// require mongoose
var mongoose = require("mongoose");
// require path
var path = require("path")


// CONNECTING MONGOOSE TO MONGODB DATABASE
mongoose.connect('mongodb://localhost/dojo_quote');


// SCHEMAS
var UserSchema = new mongoose.Schema({
	name:String,
	color:String
})



// MODELS
mongoose.model('User', UserSchema); // setting schema in our 'User' model
var User = mongoose.model('User');  // retrieving this schema from our 'User' model


// SETTINGS
// setting our static folder directory
app.use(express.static(__dirname + "./static"));
// setting our views folder directory
app.set('views', path.join(__dirname, './views'));
// setting our view engine set to EJS
app.set('view engine', 'ejs');


// GETS
app.get('/', function(request, respond){
	respond.render('index');
});

app.get('/quotes', function(request, respond){
	User.find({}, function(err, users){
	respond.render('main', {user_quotes: users});
	})
});


// POSTS
app.post('/users', function(request, respond){
	var user = new User( {name:request.body.name, quote:request.body.quote} );

	user.save(function(err){
		if(err){
			console.log("OH no!!! Something is wrong!");
		}
		else{
			console.log(user);
			console.log('OMG, you sucessfuly created a quote');
			respond.redirect('/quotes');
		}
	});
});



// SET SERVER TO LISTEN TO PORT:8000
app.listen(8000, function(){
	console.log("Batman is listening on port 8000");
})













