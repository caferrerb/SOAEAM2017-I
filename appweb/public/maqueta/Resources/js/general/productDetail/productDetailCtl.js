"use strict";

/*El use strict hace que se deba codificar de manera correcta, siendo estricto
 * a la hora de compilar el codigo ejemplo:
 * x = 3.14; // This will cause an error (x is not defined)*/


/* global app */

/*Toda funcion de controlador debe tener un $scope, que es la referencia a todos
 * los elementos que pertenecen al constrolador*/
/*app.controller(nombre de la funcion)  ($scope, nombre de los servicios a utilizar)*/
/*$windows servicio por defecto para poder utilizar refresco de pagina y redireccionamiento*/
/*logInService, nombre del servicio que contiene la promesa. */
app.controller('CtlProductDetail', function ($scope,$window,$cookies, productDetailService) {

    /*Se inicializa el modelo*/
    $scope.productSKU = $cookies.get('sku');
    $scope.data = "";
    //alert($scope.productSKU);


    /*Se define una funcion en el controlador*/
    $scope.getProduct = function () {
      $cookies.remove('sku');
            productDetailService.getProduct($scope.productSKU).then(function (response) {
                if (response.code===200) {
                  $scope.data = JSON.parse(response.body);
                }else{
                  alert("No fue encontrado el producto");
                }
            });
    };

    $scope.getProduct();
});
