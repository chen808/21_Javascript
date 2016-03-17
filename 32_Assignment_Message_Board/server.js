// 32_Assignment_Message_Board

// 1) make sure all neccessary module have been installed
// 2) terminal > nodemon server.js
// 3) terminal > sudo mongod (mongo server)
// 4) terminal > sudo mongo (database)

// REQUIRES
// require express module
var express = require("express");
// create an express app
var app = express();
// require body-parser
var bodyParser = require("body-parser");
// integrate body-parser with our app
app.use(bodyParser.urlencoded());
// require mongoose
var mongoose = require("mongoose");
// require path
var path = require("path");

// CONNECTING MONGOOSE TO MONGODB database
mongoose.connect('mongodb://localhost/message_board');

// ESTABLISH A SCHEMA VARIABLE
var Schema = mongoose.Schema; // <----- enables your models to read and understand those ObjectID MongoDB generates




// MODEL: MESSAGE
var MessageSchema = new mongoose.Schema({
	name: String,
	message: String,
	comment: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});
// creating the database based off above schema
mongoose.model('Message', MessageSchema);
// retrieving this Schema from our Models, named 'Message'
var Message = mongoose.model('Message');






// MODEL: COMMENT
var CommentSchema = new mongoose.Schema({
	// since this is a reference to different document, the _ is the naming convention
	_message: {type: Schema.Types.ObjectId, ref:'Message'},
	name: String,
	comment: String,
	created_at: {type: Date, default: new Date}
});
// creating the database based off above schema
mongoose.model('Comment', CommentSchema);
// retrieving this Schema from our Models, name 'Comment'
var Comment = mongoose.model('Comment');






// SETTINGS
// setting our static folder directory
// app.use(express.static(__dirname + "./static"));
// setting our views folder directory
app.set('views', path.join(__dirname, './views'));
// setting our view engine set to EJS
app.set('view engine', 'ejs');



// GETS
app.get('/', function(request, respond){



	Message.find({}).populate('comment').exec(function(err, message){
		console.log(message);

		respond.render('index', {all_messages: message})
	}) 
		
		// render index.ejs
		// respond.render('index', {all_messages: message, all_comments: comment});
	
});


// POST
app.post('/create_message', function(request, respond){
	var message = new Message( { name:request.body.name, message:[request.body.message] } )

	console.log(message.id); //<------- this captures the newest message id
	
	message.save(function(err){
		if(err){
			console.log("Error saving message");
		}
		else{
			console.log("Successfully created a quote");
			respond.redirect('/');
		}
	})
});


app.post('/posts/:id', function(request, response){

	Message.findOne({_id:request.params.id}, function(err, message){
		// getting the comment from index.ejs
		var comment = new Comment(request.body);
		// set the reference
		comment._message = message._id;
		message.comment.push(comment);
		// saving to database
		comment.save(function(err){
			message.save(function(err){
				if(err){
					console.log('Error');
				}
				else{
					response.redirect('/');
				}
			});
		});
	});

}); // end of app.post






// SET SERVER TO LISTEN TO PORT:8000
app.listen(8000, function(){
	console.log("Batman is listening on port 8000");
})















