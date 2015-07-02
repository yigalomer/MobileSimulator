// INIT
// =============================================================================
// call the packages we need

var express    = require('express');        // call express
var server        = express();                 // define our server using express
var bodyParser = require('body-parser');
var morgan = require('morgan');             // log requests to the console (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var colors = require('colors');
var util = require('util');

// configure server to use bodyParser()
// this will let us get the data from a POST
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(morgan('dev'));                     // log every request to the console
server.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
server.use(methodOverride());

var port = process.env.PORT || 9999;        // set our port

// =============================================================================

// SETUP STATIC FILE LOCATION
// =============================================================================

server.use(express.static(__dirname + '/public'));

// SETUP CONTROLLERS
// =============================================================================

var mobileRealTimeController = require('./controllers/mobileRealTimeController'); //Init the patches controllers

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
server.use('/api/PrintbeatService/RealtimeTracking', mobileRealTimeController);

server.use('/api', function (req, res) { 
    res.json({ message: 'Welcome to our api!' });
    
});


server.use(function(err, req, res, next) {
    
    console.error(err.stack);

    res.status(500).send('ERROR: '+ err.message);
});


// =============================================================================

// START THE SERVER
// =============================================================================
server.listen(port);

var startMsg = util.format('Server started, listening on port {0}', port);

console.log(startMsg.yellowBG);


