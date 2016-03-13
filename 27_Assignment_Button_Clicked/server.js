// load the express module
var express = require("express");

// path module
var path = require("path");
// invoke the express function
var app = express();



// tells our server to use the '/static' folder for static content
app.use(express.static(__dirname + "/static"));
// set the location where express will look for ejs views
app.set('views', __dirname + '/views');
// set the view engine
app.set('view engine', 'ejs');



// GETS 
app.get('/', function(request, response){
	// this will render views > index.ejs
	response.render("index");
});


// POSTS




// Express will listen to port 8000
var server = app.listen(8000, function(){
	console.log("listening on port 8000");
})

// SOCKET CODE
// this gets the socket.io module
var io = require('socket.io').listen(server);

// IO.SOCKETS.ON (this is where sockets listens for their event)
io.sockets.on('connection', function(socket){


	// listening for event "increase_count" from index.ejs
	socket.on("increase_count", function(data){
		// send the count back to index.ejs
		// making this 'io' instead of 'socket' makes it broadcast to everyone
		io.emit('update_count', {response: data});
	});


	// listening for event "reset_count from index.ejs"
	socket.on("reset_count", function(data){
		// send the count back to index.ejs
		// making this 'io' instead of 'socket' makes it broadcast to everyone
		io.emit('reset_counter', {response: data});
	});



}) // end of io.socket.on











