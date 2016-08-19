var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
   res.render("index", {title:'SGPL | Inicio'});
});

router.get('/signin', function(req, res) {
   res.render('sign-in', {title:'SGPL | Iniciar sesión'});
});

router.get('/signup', function(req, res) {
  res.render('sign-up', {title: 'SGPL | Pre Registro de Usuario'});
});

router.get('/dashboard', ensureAuthenticated, function(req, res) {
   res.render('dashboard/dashboard', {title:'SGPL | Dashboard'});
})

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
  console.log('Sesión cerrada.');
});

function ensureAuthenticated(req, res, next) {
  console.log("Entro.");
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

module.exports = router;
