var http=require('http');
var querystring = require('querystring');



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

function crearUsuario(pedido,respuesta){
  var data=JSON.stringify({
    "customer":{
      "identification":{
        "type":""+pedido.body.tipo+"",
        "number":""+pedido.body.documento+""
      },
      "application":{

        "user":""+pedido.body.user+"",
        "password":""+pedido.body.password+""

      },
      "personal":{
        "firstName":""+pedido.body.nombre+"",
        "lastName":""+pedido.body.apellido+"",
        "sex":"M",
        "age":"22"
      },
      "social":{
        "mail":""+pedido.body.email+"",
        "cellNumber":""+pedido.body.telefono+""
      },
      "localization":{
        "country":""+pedido.body.pais+"",
        "state":""+pedido.body.estado+"",
        "city":""+pedido.body.ciudad,
        "addressStreet":""+pedido.body.direccion+""
      }
    }
  });
  var options={
    host:'104.155.149.197',
    port:'8091',
    path:'/tienda/cliente/create',
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  };
  console.log(data);
  var req = http.request(options, function(res) {
    console.log('Status: ' + res.statusCode);
    console.log('Headers: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (body) {
      console.log('Body: ' + body);
      if(JSON.parse(body).code==='200'){
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

function listarProductosPorNombre(pedido, respuesta){  
  var page = "";
  if(pedido.query.page !== undefined){
    page = "?page="+pedido.query.page;
  }
  console.log(pedido.query.producto+ " "+ page);
  var options = {
    "method": "GET",
    "hostname": "104.155.149.197",
    "port": "8091",
    "path": "/tienda/producto/search/"+pedido.query.producto+page,
    "headers": {
      "cache-control": "no-cache",
      "postman-token": "94e338b6-68e2-0bf6-e7a7-8f6a1698db07"
    }
  };

  var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);
      respuesta.write(body.toString());
      respuesta.end();
    });
  });

  req.write(querystring.stringify({ orden: 'DESC', ordenado: 'lider', page: '1' }));
  req.end();
}

exports.login = login;
exports.crearUsuario = crearUsuario;
exports.listarProductosPorNombre = listarProductosPorNombre;
