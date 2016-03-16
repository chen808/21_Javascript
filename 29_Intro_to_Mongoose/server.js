// 1) Run sudo mongod (start the mongo server)
// 2) Run nodemond server.js
// 3) Run sudo mongo (start the database)


// REQUIRES
// require express module
var express = require("express");
// create an express app
var app = express();
// require body-parser (to recieve post data from clients)
var bodyParser = require("body-parser");
// integrate body-parser with our app
app.use(bodyParser.urlencoded());
// require mongoose
var mongoose = require("mongoose");
// require path
var path = require("path")



// this is how we connect to the MongoDB database using mongoose -- "basic_mongoose" is
// the name of our database in MongoDB -- this should match the name of the database you
// are going to use for your project
mongoose.connect('mongodb://localhost/basic_mongoose');



// SCHEMAS
var UserSchema = new mongoose.Schema({
	name:String,
	age:Number
})


// MODELS
mongoose.model('User', UserSchema); // setting this schema in our models as 'User'
var User = mongoose.model('User');  // retrieving this schema from our models, named 'User'



// SETTINGS
// setting our static folder directory
app.use(express.static(__dirname + "./static"));
// setting our views folder directory
app.set('views', path.join(__dirname, './views'));
// setting our view engine set to EJS
app.set('view engine', 'ejs');



// ROUTES GETS
app.get('/', function(request, respond){
	// getting the users info from database and include in view page
	respond.render('index'); // render views > index.ejs
})



// ROUTES POST
// when the user presses the submit button on index.ejs it should send a post request to '/users'. In
// this route we should add the user to the databae and then redirect to teh root route (index)
app.post('/users', function(request, respond){
	console.log("POST DATA", request.body);

	// create a new User with the name and age corresponding to those from request.body
	var user = new User( {name:request.body.name, age:request.body.age} );
	// saving user to database, run a callback function with an error (if any) from the operation
	user.save(function(err){
		// if there is error console.log that something went wrong
		if(err){
			console.log('holy smokes, something went WRONG!')
		}
		else{
			console.log('OMG, success!');
			respond.redirect('/');
		}
	});
}); // end post


// Queries
User.find({}, function(error, users){
	console.log(users);
});








// setting up our server to listen on Port:8000
app.listen(8000, function(){
	console.log("Batman is listening on port 8000");
})















