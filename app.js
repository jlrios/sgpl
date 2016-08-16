var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');

var routes = require('./routes/routes');
var authenticate = require('./modules/authenticate');

var app = express();

var http = require('http').Server(app);

app.set('view engine', 'jade');

// Se le indica a express que debe utilizar el direcotio public
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
   extended:true
}));

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/', authenticate);

http.listen(3000, function() {
   console.log("Escuchando por el puerto *:3000...");
});
