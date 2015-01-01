// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; 		// set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o'); // connect to our database
var Search     = require('./app/models/search');


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

router.route('/search')

	// send a search (accessed at POST http://localhost:8080/api/search)

	.post(function(req, res) { // req is the search input
		var search = new Search();
		search.name = req.body.name;

		var results = function();// Call function with search save results 
		search.results = results;
		// Turn javascript data into JSON
		// List of post objects with message, cost, url, and possibly picture
		var posts = new Array(results.length);
		for (int i = 0; i<results.length; i++) {
			posts[i] = JSON.stringify({"message": results[i].message, 
										"cost": results[i].cost, 
										"URL": results[i].url, 
										"picture": results[i].picture})
		}
		return posts;
	});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);

