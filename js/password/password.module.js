(function () {
    var pswmod = angular.module('password.module', []);

    // CONTROLLER
    pswmod.controller('pswCtrl', function ($scope, userService) {
        var that = this;
        $scope.message = null;

        $scope.changePassword = function (oldpw, newpw) {
            $scope.message = null;
            userService.changePassword($scope.user.id, oldpw, newpw).success(function (data) {
                // change was successfull
                $scope.message = "Změna hesla proběhla úspěšně.";
            }).error(function(data){
                // error while changing pw
                $scope.message = "Nastala chyba při změně hesla.";
            });
            that.reset();
        };

        this.reset = function () {
            $scope.oldpw = "";
            $scope.newpw = "";
            $scope.newpw2 = "";
        };
    });

    // DIRECTIVE
    pswmod.directive("setChangePass", function () {
        return {
            restrict: 'E',
            templateUrl: "./partials/password/set-change-pass.html",
            controller: 'pswCtrl'
        };
    });
})();
