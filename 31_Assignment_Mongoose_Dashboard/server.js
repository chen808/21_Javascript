// REQUIRES
// require express module
var express = require("express");
// create an express app
var app = express();
// require body-parser (to recieve from clients)
var bodyParser = require("body-parser");
// integrate body-parser with our app
app.use(bodyParser.urlencoded());
// require mongoose
var mongoose = require("mongoose");
// require path
var path = require("path");


// CONNECTING MONGOOSE TO MONGODB DATABASE
mongoose.connect('mongodb://localhost/mongees');


// SCHEMAS
var MongySchema = new mongoose.Schema({
	name:String,
	power:String,
})


// MODELS
mongoose.model('Mongy', MongySchema);		// setting schema in our 'User' model
var Mongy = mongoose.model('Mongy');		// retrieving this schema from our 'User' model


// SETTINGS
// setting our static folder directory
app.use(express.static(__dirname + "./static"));
// setting our views folder directory
app.set('views', path.join(__dirname, './views'));
// setting our view engine set to EJS
app.set('view engine', 'ejs');




// GETS
app.get('/', function(req, res){
	Mongy.find({}, function(err, mongy){
	res.render('index', {mongies: mongy});	
	})
})

app.get('/mongooses/:id', function(req, res){
	Mongy.findOne({_id: req.params.id}, function(err, mongy){
		res.render('show', {mongies:mongy});
	})
})

app.get('/to_new', function(req, res){
	res.render('new');
})

app.get('/mongooses/:id/edit', function(req, res){

	Mongy.findOne({_id: req.params.id}, function(err, mongy){
		res.render('edit', {mongies:mongy});
	})
		

})


// POST
app.post('/mongooses/new', function(req, res){
	var mongy = new Mongy( {name:req.body.name, power:req.body.power} );
	mongy.save(function(err){
		if(err){
			console.log("No Mongy entered to database!");
		}
		else{
			console.log("New Mongy!");
			res.redirect('/');
		}
	})
})

app.post('/mongooses/:id', function(req, res){
	Mongy.update({_id:req.params.id}, {name: req.body.name, power: req.body.power}, function(err,mongy){
		res.redirect('/');
	})
})

app.post('/mongooses/:id/destroy', function(req, res){
	Mongy.remove({_id:req.params.id}, function(err, user){
		res.redirect('/');
	})
})







// SET SERVER TO LISTEN TO PORT:8000
app.listen(8000, function(){
	console.log("Batman is listening on port 8000");
})










