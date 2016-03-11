// loading the express module
var express = require("express");
// invoking var express and store the resulting application in var app
var app = express();


// this is the line that tells our server to use the "/static" folder for static content
app.use(express.static(__dirname + "/static"));

// this sets the location where express will look for the ejs view
app.set( 'views', __dirname + '/views' );

// now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set( 'view engine', 'ejs' );



// lets handle the base route '/' and respond with "Hello Express"
app.get('/', function(request, response){
	response.send("<h1>Holy Cow OMG!</h1>");
})


// hard coding the names for now
app.get('/users', function(request, response){
	// hard-coded user data
	var users_array = [
		{ name:"Steph Curry", email:"curry@gmail.com" },
		{ name:"Klay Thompson", email:"klay@gmail.com" },
		{ name:"Andre Iguadala", email:"iggy@gmail.com" }
	];
	response.render('users', {users: users_array});
})
















// tell the express app to listen on port 8000
app.listen(8000, function(){
	console.log("listening on port 8000");
})
// *** this code will almost always be at the end of your server.js file.
// (we only tell the server to listen after we have set up all our rules)