var express = require('express');
var bodyParser = require('body-parser');

var routes = require('./routes/routes');
var db = require('./modules/db');

var app = express();

var http = require('http').Server(app);

app.set('view engine', 'jade');

// Se le indica a express que debe utilizar el direcotio public
app.use(express.static(__dirname + '/public'));

app.use(express.static(__dirname + '/vendor'));

app.use(bodyParser.urlencoded({
   extended:true
}));

app.use(bodyParser.json());

app.use('/', routes);
app.use('/', db);

http.listen(3000, function() {
   console.log("Escuchando por el puerto *:3000...");
});
