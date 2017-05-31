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
app.controller('CtlUser', function ($scope,$window, userService) {

    /*Se inicializa el modelo*/
    $scope.user = "";

    /*Se define una funcion en el controlador*/
    $scope.login = function (form) {
        if (form) {
            userService.login($scope.user).then(function (response) {
                if (response.code==='200') {
                  $window.location.href="/productGrid";

                }else{
                  alert("Los datos ingresados no coinciden con un usuario en nuestra base de datos");
                }
            });
        } else {
            alert("Verifique los datos ingresados");
        }
    };

    $scope.logOut = function () {

            userService.logOut().then(function (response) {
              sessionStorage.clear();
              $window.location.href="/";
              
            });

    };

    $scope.registro = function () {
      $window.location.href="/registro";

    };


    $scope.crearUsuario = function (form) {
           if (form) {

               if($scope.user.password===$scope.user.password1){
                 userService.crearUsuario($scope.user).then(function (response) {

                     if (response.code==='200') {
                         alert("Se ha registrado con exito");
                         $window.location.href="/";

                         $scope.user = "";
                     } else if(response.code==='404') {
                         alert("Ya existe un usuario registrado con el mismo numero de documento");

                     }else if(response.code==='-1'){
                       alert("Nombre de usuario ya existe");
                     }
                 });
               }else{
                 alert("el password no coincide");
               }



           } else {
               alert("Verifique los datos ingresados");
           }
       };


});
