var express = require('express');
var router = express.Router();
var firebird = require('node-firebird');

var options = {};

options.host = 'localhost';
options.port = 3050;
options.database = 'C:\\Firebird\\DEMO.fdb';
options.user = 'SYSDBA';
options.password = 'masterkey';
options.role = null;
options.pageSize = 4096;

router.post('/authenticate', function(req, res) {
   firebird.attach(options, function(err, db) {
      if (err) {
         console.log('Error al intentar conectar al servidor...');
         throw err;
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
               "b.CLIENTE_ID = '" + req.body.cliente.numero + "' AND a.CLIENTE_ID = '" + req.body.cliente.numero + "' AND a.CLAVE_CLIENTE = '" + req.body.cliente.clave + "'",
            function(err, rsl) {
               console.log("Autenticación exitosa...");
               res.redirect('/dashboard');
               db.detach();
         });
      }
   });
});

module.exports = router;
