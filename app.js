var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
//var morgan = require('morgan')('combined');
var cookieParser = require('cookie-parser')();
var expressSession = require('express-session');

//Rutas de la aplicación y autenticación
var routes = require('./routes/routes');
var authenticate = require('./modules/authenticate');

var app = express();
var http = require('http').Server(app);

//Set del motor de vistas
app.set('view engine', 'jade');

//Se le indica a express que debe utilizar el direcotio public
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
   extended:true
}));

//app.use(morgan);
app.use(cookieParser);

app.use(expressSession({
  secret: '1Txp3rt$#!',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', authenticate);
app.use('/', routes);

//Arranque del servidor
http.listen(3000, function() {
   console.log("Escuchando por el puerto *:3000...");
});
