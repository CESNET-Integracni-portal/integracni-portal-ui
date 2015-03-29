(function () {
    var pswmod = angular.module('password.module', []);

    // CONTROLLER
    pswmod.controller('pswCtrl', function () {
        // TODO 
    });

    // DIRECTIVE
    pswmod.directive("setChangePass", function () {
        return {
            restrict: 'E',
            templateUrl: "./partials/set-change-pass.html",
            controller: 'pswCtrl'
        };
    });
})();
