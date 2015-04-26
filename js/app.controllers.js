(function () {
//    app.controller('NavigationController', function ($scope, $rootScope) {
//    });
//    app.controller('ViewController', function ($scope, $rootScope) {
//    });

    app.controller('MainController', function ($scope, $rootScope, groupService, userService, urlService, oauthService, labelService, homeService) {

        //$scope.user = userService.getById(2);
        $scope.basePath = urlService.basePath();
        $scope.table = true;

        $rootScope.$watch('currentUser', function () {
            $scope.user = $rootScope.currentUser;
            // needs to be modified for API v0.2 in the future
            if ($scope.user !== null) {
                $scope.user.groups = groupService.getAll();
                $scope.user.labels = labelService.getAll();
                $scope.user.fasts = homeService.getFavorites();
            }
        });

        $rootScope.activeLabels = new Array();
        $scope.activateLabel = function (name) {
            var index = $rootScope.activeLabels.indexOf(name);
            if (index === -1) {
                $rootScope.activeLabels.push(name);
            } else {
                $rootScope.activeLabels.splice(index, 1);
            }
            $rootScope.reloadData();
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
