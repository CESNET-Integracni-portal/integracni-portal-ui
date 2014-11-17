(function() {

  app = angular.module('app', ['ui.router']);

  app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');
    
    $locationProvider.html5Mode(true);

    $stateProvider
      .state("index", {
        url: "/",
        templateUrl: "./partials/folder.html"
      })    

      /*.state("folder.detail", {
        url: "/{folderId: [0-9]+}",
        templateUrl: "./partials/folder.html"
      })*/  

      .state("settings", {
        url: "/settings",
        template: "<settings-tabs></settings-tabs>" 
      })

      .state("archived", {
        url: "/archived",
        templateUrl: "./partials/archived.html"
      })

      .state("shared", {
        url: "/shared",
        templateUrl: "./partials/shared.html" 
      });
  });

  app.controller('MainController', function($scope, userService) {
    $scope.user = userService.getById(2);
  });

  app.controller('NavigationController', function($scope) {
    //var userId = $scope.user.id;
    //$scope.labels = labelService.getForUser(userId);
    this.fastFolders = fastFolders;
  });
  

  app.controller('ViewController', function() {
    
  });

  app.directive("setChangePass", function() {
    return {
      restrict: 'E',
      templateUrl: "./partials/set-change-pass.html"
    };
  });

  app.directive("setOrgunits", function() {
    return {
      restrict: 'E',
      templateUrl: "./partials/set-org-units.html",
      controller: function() {
        this.units = units;
      },
      controllerAs: "unitsCtrl"
    };
  });

  app.directive("setGroups", function() {
    return {
      restrict: 'E',
      templateUrl: "./partials/set-groups.html",
      controller: function($scope, groupService) {
        var userId = $scope.user.id;
        $scope.groups = groupService.getForUser(userId);
      },
      controllerAs: "groupsCtrl"
    };
  });

  app.directive("setLabels", function() {
    return {
      restrict: 'E',
      templateUrl: "./partials/set-labels.html",
      controller: function($scope, labelService) {
        //var userId = $scope.user.id;
        //$scope.labels = labelService.getForUser(userId);
      },
      controllerAs: "labelsCtrl"
    };
  });

  app.directive("setRegistartion", function() {
    return {
      restrict: 'E',
      templateUrl: "./partials/set-registartion.html",
      controller: function($scope, userService) {
        var unitId = $scope.user.unitId;
        $scope.externists = userService.getExternistsForUnit(unitId);
      },
      controllerAs: "externalsCtrl"
    };
  });

  app.directive("settingsTabs", function() {
    return {
      restrict: "E",
      templateUrl: "./partials/settings-tabs.html",
      controller: function() {
        this.tab = 1;

        this.isSet = function(checkTab) {
          return this.tab === checkTab;
        };

        this.setTab = function(activeTab) {
          this.tab = activeTab;
        };
      },
      controllerAs: "tab"
    };
  });

// ----- fast Folders (in left navigation) -----
  var fastFolders = [{
    id: 1,
    name: "Rychlá složka 1",
    url: "/1" // id původní složky
  },
  {
    id: 2,
    name: "Rychlá složka 2",
    url: "/2"
  }];

  var folders = [
    {
      id: 1,

    }];

  var units = [{
      id: 1,
      name: "SEN",
      users: ["Jan Novák"],
      size: 12345 
  },{
      id:2,
      name: "ATG",
      users: ["Petr Novák", "Karolína Novotná"],
      size: 12345 
  }];

})();