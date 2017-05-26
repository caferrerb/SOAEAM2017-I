var http=require('http');
var querystring = require('querystring');


function log(pedido,respuesta){
  var price="";
  console.log('entre');
  http.get(options,function(res){
    var body='';

    res.on('data',function(chunk){
      body+=chunk;
      console.log('si hay datos');
    });

    res.on('end',function(){
      price=body;
      console.log(price);
      respuesta.end(price);
    })
  }).end();

}

function login(pedido,respuesta){
  var data=JSON.stringify({"customer":{"aplicacion":{"user":""+pedido.body.user+"","password":""+pedido.body.password+""}}});
  var options={
    host:'104.155.149.197',
    port:'8091',
    path:'/tienda/cliente/find',
    method:'POST',
    headers: {
        'Content-Type': 'application/json',
    }
  };
  var req = http.request(options, function(res) {
  console.log('Status: ' + res.statusCode);
  console.log('Headers: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (body) {
    console.log('Body: ' + body);
    if(JSON.parse(body).code==='200'){
      pedido.session.user=JSON.parse(body).response.customer.aplicacion.user;
      console.log(pedido.session.user);
    }
    respuesta.write(body);
    respuesta.end();
  });
});
req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});
// write data to request body
req.write(data);
req.end();
}

exports.login = login;
