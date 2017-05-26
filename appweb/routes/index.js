var express = require('express');
var dao=require('./dao');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'index' ,layout:false});
});
router.get('/error', function(req, res, next) {
  res.render('error', { title: 'error' ,layout:false});
});
router.get('/header', function(req, res, next) {
  res.render('Templates/header', { title: 'Header' ,layout:false});
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' ,layout:false});
});

router.post('/login', function(req, res, next) {
dao.login(req,res);
});

router.get('/productDetail', function(req, res, next) {
  res.render('productDetail', { title: 'Login' ,layout:false});
});
router.post('/crearUsuario', function(req, res, next) {
  dao.crearUsuario(req,res);
});

router.get('/productGrid', function(req, res, next) {
  if(req.session.user){
    res.render('Templates/productGrid', { title: 'productGrid',layout: "master_page"});
  }else{
    var pagina='<!doctype html><html><head></head><body>'+
    '<p>No tiene permitido ingresar sin login</p>'+
    '<br><a href="/">Retornar</a></body></html>';
    res.send(pagina);
  }
});
router.get('/productList', function(req, res, next) {
  if(req.session.user){
    res.render('Templates/productList', { title: 'productList',layout: "master_page"});
  }else{
    var pagina='<!doctype html><html><head></head><body>'+
    '<p>No tiene permitido ingresar sin login</p>'+
    '<br><a href="/">Retornar</a></body></html>';
    res.send(pagina);
  }
});
router.get('/detalle', function(req, res, next) {
  if(req.session.user){
    res.render('Templates/productDetail', { title: 'productDetail',layout: "master_page"});
  }else{
    var pagina='<!doctype html><html><head></head><body>'+
    '<p>No tiene permitido ingresar sin login</p>'+
    '<br><a href="/">Retornar</a></body></html>';
    res.send(pagina);
  }
});
router.get('/registro', function(req, res, next) {

    res.render('registro', { title: 'registro',layout: false});

});
router.get('/productList', function(req, res, next) {
  res.render('productList', { title: 'Login' ,layout:false});
});

module.exports = router;
