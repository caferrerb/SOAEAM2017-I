"use strict";
var app = angular.module("Store", ['ngRoute', 'ngCookies']);

app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});
