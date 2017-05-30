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
    $scope.carrito = [];
    $scope.totalItems = 100;
    $scope.currentPage = 1;
    $scope.maxSize = 5;
    
    var obj = sessionStorage.getItem("carrito");
    if (obj) {
        $scope.carrito = JSON.parse(obj);
    }

    $scope.listarProductosPorNombre = function () {
        productoService.listarProductosPorNombre($scope.busqueda).then(function (response) {
            if (response.code === "200") {
                $scope.productos = response.response.products;
            } else {
                alert("No se encontraron datos");
            }
        });
    };
/***
 * Funcion añadir productos al carrito 
 * @param {type} obj producto a añadir
 * @returns {el producto agregado al carrito}
 */
    $scope.addTrolley = function (obj) {
        alert("El producto se añadio al carrito");
        if (sessionStorage.getItem("carrito")) {
            $scope.carrito = JSON.parse(sessionStorage.getItem("carrito"));
            $scope.carrito.push({obj});
            sessionStorage.clear();
            sessionStorage.setItem("carrito", JSON.stringify($scope.carrito));
        } else {
            sessionStorage.clear();
            $scope.carrito.push({obj});
            sessionStorage.setItem("carrito", JSON.stringify($scope.carrito));
        }
        console.log($scope.carrito);

    };

    /**
     * Funcion para eliminar productos del carrito de compras
     * @param {type} obj seleccionado para quitar
     * @returns la eliminacion del producto en el carrito
     */
    $scope.deleteTrolley = function (obj) {
        console.log(obj);
        for (var i = 0; i < $scope.carrito.length; i++) {
            var aux = $scope.carrito[i];
            console.log(obj);
            if (aux.obj.product.description.id === obj.obj.product.description.id) {
                $scope.carrito.splice(i, 1);
                sessionStorage.clear();
                sessionStorage.setItem("carrito", JSON.stringify($scope.carrito));
                alert("Se elimino el producto del carrito");
                break;
            }
        }
    };
});
