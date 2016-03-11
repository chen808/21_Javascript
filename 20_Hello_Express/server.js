// loading the express module
var express = require("express");

// invoking var express and store the resulting application in var app
var app = express();

// lets handle the base route '/' and respond with "Hello Express"
app.get('/', function(request, response){
	response.send("<h1>Holy Cow OMG!</h1>");
})

// tell the express app to listen on port 8000
app.listen(8000, function(){
	console.log("listening on port 8000");
})
// *** this code will almost always be at the end of your server.js file.
// (we only tell the server to listen after we have set up all our rules)

