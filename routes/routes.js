var express = require('express');
var connectEnsureLogin = require('connect-ensure-login');
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

router.get('/dashboard', connectEnsureLogin.ensureLoggedIn(),
  function(req, res) {
    res.render('dashboard/dashboard', {title:'SGPL | Dashboard'});
})

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
  console.log('Sesión cerrada.');
});

module.exports = router;
