"use strict";
var app = angular.module("Store", ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
            .when('/', {
                templateUrl: 'Views/Templates/productGrid.html'
            })
            .when('/ProductosGrid', {
                templateUrl: 'Views/Templates/productGrid.html'
            })
            .when('/ProductosList', {
                templateUrl: 'Views/Templates/productList.html'
            })
            .when('/Detalle', {
                templateUrl: 'Views/Templates/productDetail.html'
            })
            .otherwise({
                redirectTo: '/',
            });
});
