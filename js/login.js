(function () {

    app = angular.module('app.module', ['services.module', 'utils.module']);

    app.controller('MainController', function ($scope, oauthService) {
        $scope.errorMessage = null;

        var handleError = function (data, status, headers, config) {
            if (status === 401) {
                $scope.errorMessage = "Špatné přihlašovací údaje";
            } else {
                $scope.errorMessage = "Někde se stala chyba";
            }
        };

        var login = function (username, pass) {
            $scope.errorMessage = null;
            var that = this;

            var deffered = oauthService.loginWithPass(username, pass);
            deffered.error(function (data, status, headers, config) {
                handleError(data, status, headers, config);
            });
        };

        $scope.superAdmin = function () {
            login("admin", "admin");
        };

        $scope.unitManager = function () {
            login("unit_manager", "unit_manager");
        };

        $scope.normalUser = function () {
            login("unit_manager", "unit_manager");
        };
    });
})();
