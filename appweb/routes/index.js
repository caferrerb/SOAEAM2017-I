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
router.post('/getProduct', function(req,res,next){
  dao.getProduct(req, res);
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

router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.end();
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
    res.render('Templates/productList', { title: 'productList'});
  }else{
    var pagina='<!doctype html><html><head></head><body>'+
    '<p>No tiene permitido ingresar sin login</p>'+
    '<br><a href="/">Retornar</a></body></html>';
    res.send(pagina);
  }
});
router.get('/detalle/:productSKU', function(req, res, next) {
  if(req.session.user){
    var sku = req.params.productSKU;
    res.cookie('sku', sku);
    res.redirect('/detalle');
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

router.get('/listarProductosPorNombre', function(req, res, next) {
  dao.listarProductosPorNombre(req, res);
});

router.get('/productTrolley', function(req, res, next) {
  if(req.session.user){
    res.render('Templates/productTrolley', { title: 'productTrolley',layout: "master_page"});
  }else{
    var pagina='<!doctype html><html><head></head><body>'+
    '<p>No tiene permitido ingresar sin antes logearse</p>'+
    '<br><a href="/">Retornar</a></body></html>';
    res.send(pagina);
  }
});


router.post('/buy',function(req,res,next){
    
    dao.buy(req,res);
});

module.exports = router;
