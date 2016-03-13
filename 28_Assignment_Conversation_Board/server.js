// load the express module
var express = require("express");
// path module
var path = require("path");
// invoke the express function
var app = express();
// require body-parser
var bodyParser = require('body-parser');


// tell our server to use '/static' folder for static content
app.use(express.static(__dirname + "/static"));
// set the location where express will look for ejs views
app.set('views', __dirname + '/views');
// set the view engine
app.set('view engine', 'ejs');
// using body-parser
app.use(bodyParser.urlencoded());


// GETS
app.get('/', function(request, response){
	// this will render views > index.ejs
	response.render("index");
});

// POSTS






// express will listen to port 8000
var server = app.listen(8000, function(){
	console.log("Batman is listening on port 8000");
});


// SOCKET CODE
// this gets the socket.io.module
var io = require('socket.io').listen(server);


// IO.SOCKET>ON (this is where sockets listen for their event)
io.sockets.on('connection', function(socket){


	// listen for "new_user"
	socket.on("new_user", function(data){
		// using io.emit to announce to everyone
		io.emit("new_user_message", {response: data});
	});

	// listen for "current_user_message"
	socket.on("current_user_new_message", function(data){
		io.emit("newMessage", {response: data});
	});






})














