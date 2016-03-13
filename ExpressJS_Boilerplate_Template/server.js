// load express module
var express = require("express");
// path module
var path = require("path");
// invoke the express function
var app = express();
// require body-parser
var bodyParser = require('body-parser');



// tells our server to use the '/static' folder for static content
app.use(express.static(__dirname + "/static"));
// sets the location where express will lokk for ejs views
app.set('views', __dirname + '/views');
// set the view engine
app.set('view engine', 'ejs');
// using body-parser
app.use(bodyParser.urlencoded());




// GETS handle the base route '/'
app.get('/', function(request, response){
	response.render("index");
})

// POSTS
app.post('/users', function(request, response){
	console.log("POST DATA", req.body);
	// this is where we would add user to database
	// then redirect to root route
	response.redirect('/');
})





// tell express to listen to port 8000
app.listen(8000, function(){
	console.log("listening on port 8000");
})