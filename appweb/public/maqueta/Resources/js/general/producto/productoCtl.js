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
app.controller('CtlProducto', function ($scope, $window, productoService) {

	$scope.busqueda = {};
	$scope.productos = [];

	$scope.totalItems = 100;
    $scope.currentPage = 1;
    $scope.maxSize = 5;

	$scope.listarProductosPorNombre = function(){
		productoService.listarProductosPorNombre($scope.busqueda).then(function(response){
			if(response.code === "200"){				
				$scope.productos = response.response.products;
			}else{
				alert("No se encontraron datos");
			}
		});
	};

});
