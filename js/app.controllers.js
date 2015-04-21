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
            // needs to be modified for API v.2 in the future
            if ($scope.user !== null) {
                $scope.user.groups = groupService.getForUser($scope.user.id);
                $scope.user.labels = labelService.getAll();
                $scope.user.fasts = homeService.getFavorites();
            }
        });

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
