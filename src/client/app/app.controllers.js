(function () {
//    app.controller('NavigationController', function ($scope, $rootScope) {
//    });
//    app.controller('ViewController', function ($scope, $rootScope) {
//    });

	var app = angular.module('app.module');

    app.controller('MainController', /* @ngInject */ function ($scope, $rootScope, groupService, userService, urlService, oauthService, labelService, homeService) {

        $scope.basePath = urlService.basePath();
        $scope.table = true;

        $rootScope.activeLabels = [];
        $scope.activateLabel = function (name) {
            var index = $rootScope.activeLabels.indexOf(name);
            if (index === -1) {
                $rootScope.activeLabels.push(name);
            } else {
                $rootScope.activeLabels.splice(index, 1);
            }
            if($rootScope.activeModule === "shared") {
                $rootScope.reloadShared();
            } else {
                $rootScope.reloadHome();
            }
        };

        $scope.activeModule = function (name) {
            $rootScope.activeModule = name;
        };

        $scope.isActive = function (name) {
            return $rootScope.activeLabels.indexOf(name) !== -1;
        };

        $scope.showAsTable = function () {
            $scope.table = true;
        };

        $scope.showAsItems = function () {
            $scope.table = false;
        };

        $scope.logout = function () {
            oauthService.logout();
        };
    });
})();
