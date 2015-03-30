// app.module.js
(function () {
    app = angular.module('app.module',
            ['utils.module',
                'externists.module',
                'groups.module',
                'labels.module',
                'orgunits.module',
                'password.module',
                'settings.module',
                'ui.router',
                'services.module',
                'Mac']);

    app.controller('NavigationController', function ($scope) {
        this.fastFolders = fastFolders;
    });

    app.controller('ViewController', function () {
        // TODO
    });

    app.controller('MainController', function ($scope, userService, urlService, oauthService) {

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

    app.run(function (oauthService) {
        oauthService.refresh();
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
})();
