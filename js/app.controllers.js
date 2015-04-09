(function () {
    app.controller('NavigationController', function ($scope, $rootScope) {
        this.fastFolders = fastFolders;
    });

    app.controller('ViewController', function () {
        // TODO
    });

    app.controller('MainController', function ($scope, $rootScope, groupService, userService, urlService, oauthService, labelService) {

        //$scope.user = userService.getById(2);
        $scope.basePath = urlService.basePath();
        $scope.table = true;

        $rootScope.$watch('currentUser', function() {
            $scope.user = $rootScope.currentUser;
            $scope.user.groups = groupService.getForUser($scope.user.id);
            $scope.user.labels = labelService.getForUser($scope.user.id);
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

        //$scope.deaultSidebar = function () {

        //  $scope.mySidebar = {tempateUrl: "./partials/archive_show.html", data: {}};
        //  ;
        //  $('.sidebar').sidebar('hide');
        //  $scope.sidebarShow = false;
        //};

        //$scope.defineSidebar = function (templateUrl, data) {

        //    $scope.mySidebar = {tempateUrl: templateUrl, data: data};
        //   $('.sidebar').sidebar('show');
        //   $scope.sidebarShow = true;
        //};
        //$scope.deaultSidebar();
    });

    // ----- fast Folders (in left navigation) -----
    var fastFolders = [{
            id: 1,
            name: "work",
            url: "/1" // id původní složky
        }];

    var folders = [{
            id: 1
        }];

    // routes controllers
})();
