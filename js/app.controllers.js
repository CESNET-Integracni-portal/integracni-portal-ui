(function () {
    angular.module('app.module').controller('NavigationController', function ($scope) {
        this.fastFolders = fastFolders;
    });

    angular.module('app.module').controller('ViewController', function () {
        // TODO
    });

    angular.module('app.module').controller('MainController', function ($scope, userService, urlService, oauthService) {

        $scope.user = userService.getById(2);
        $scope.basePath = urlService.basePath();
        $scope.table = true;

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
