var express = require('express');
var router = express.Router();
var firebird = require('node-firebird');

//Autenticación con passport, se define una estrategia local
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

//El objeto options guarda la configuración para la conexión a la base de datos
var options = {};

options.host = 'localhost';
options.port = 3050;
//Ruta de conexión con Windows
//options.database = 'c://Firebird/DEMO.fdb';
options.database = '/home/jlrd/Documents/Firebird/DEMO.fdb';
options.user = 'SYSDBA';
options.password = 'masterkey';
options.role = null;
options.pageSize = 4096;

router.post('/authenticate', passport.authenticate('local', {
  successRedirect: '/dashboard/',
  failureRedirect: '/'

}));

passport.use(new localStrategy({
    usernameField: 'numero',
    passwordField: 'clave',
    passReqToCallback: true
  }, function(req, numero, clave, done) {
    firebird.attach(options, function(err, db) {
      if (err) {
        console.log('Error al intentar conectar al servidor...');
        throw err;
        return done(err);
      } else {
        console.log('Conectado a Firebird...');
        db.query(
           "SELECT " +
              "a.CLAVE_CLIENTE, " +
              "a.CLIENTE_ID, " +
              "b.NOMBRE " +
           "FROM " +
              "CLAVES_CLIENTES a, " +
              "CLIENTES b " +
           "WHERE " +
              "b.CLIENTE_ID = '" + numero + "' AND a.CLIENTE_ID = '" + numero + "' AND a.CLAVE_CLIENTE = '" + clave + "'",
        function(err, rsl) {
          if (err) {
            console.log("Ha ocurrido un error...");
            db.detach();
            return done(err);
          }
          if (isEmpty(rsl)) {
            db.detach();
            return done(null, false, {message: 'No se encontró usuario...'});
          } else {
            console.log("Autenticación exitosa...");

            db.detach();
            return done(null, rsl[0]);
          }
        });
      }
    }
  );
}));

passport.serializeUser(function(user, done) {
  done(null, user.CLIENTE_ID  );
});

passport.deserializeUser(function(id, done) {
  firebird.attach(options, function(err, db) {
    if (err) {
      throw err;
      return done(err);
    } else {
      db.query("SELECT * FROM CLIENTES WHERE CLIENTE_ID = '" + id + "'", function(err, rsl) {
        if (err) {
          db.detach();
          return done(err);
        }
        if (isEmpty(rsl)) {
          db.detach();
          return done(null, false);
        } else {
          db.detach();
          return done(null, rsl[0]);
        }
      });
    }
  });
});

function isEmpty(obj) {
   for(var key in obj) {
      if (hasOwnProperty.call(obj, key))
         return false;
   }
   return true;
}

module.exports = router;
