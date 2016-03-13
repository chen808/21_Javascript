// ROUTES

module.exports = function Route(app, server){
	// this gets the socket.io module
	var io = require('socket.io').listen(server);

	// root route to render the index.ejs view
	app.get('/', function(req, res){
		res.render("index");
	})

	// this will run when events happen
	io.sockets.on('connection', function(socket){
		// the server listens when the clients triggered the event called "posting_form"
		socket.on("posting_form", function(data){
			// this generates random number
			var random_number = Math.floor((Math.random()*1000) + 1);

			// this code will emit the data to the client
			socket.emit('updated_message', {response: data});
			socket.emit('random_number', {response: random_number})
		})
	})
}