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
});

// POSTS
app.post('/result', function(request, response){
	user_input = {
		name: request.body.name,
		location: request.body.location,
		faveLang: request.body.faveLang,
		comment: request.body.comment
	};
	
	response.render('result', { user: user_input });
});









// tell express to listen to port 8000
app.listen(8000, function(){
	console.log("listening on port 8000");
})