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
      controller: function($scope, groupService, userService) {
        var userId = $scope.user.id;
        var that = this;

        $scope.save = function(group){
          // create
          if ($scope.index === null){
            group.userId = userId;
            var createdGroup = groupService.create(group);
            $scope.user.groups.push(angular.copy(createdGroup));
            that.reset();
          //update
          } else {
            var updatedGroup = groupService.updateGroup(group);
            $scope.user.groups[$scope.index] = angular.copy(updatedGroup);
            that.reset();
          }
        };

        $scope.addUser = function(index){
          if ($scope.group.user !== null){
            that.users[index].disabled = true;
            that.users[index].originalIndex = index;
            $scope.group.users.push(that.users[index]);
            $scope.group.user = null;
          }
        };

        $scope.isDisabled = function(user){
          return (typeof user.disabled !== 'undefined' && user.disabled );
        };

        $scope.removeUser = function(index){
          that.users[$scope.group.users[index].originalIndex].disabled = true;
          $scope.group.users.splice(index, 1);
        };

        $scope.deleteGroup = function(index){
          $scope.user.groups.splice(index, 1);
          groupService.deleteGroup(index);
        };

        $scope.editGroup = function(index, group){
          $scope.group = angular.copy(group);
          $scope.index = index;
        };

        this.reset = function(){
          $scope.group = {};
          $scope.group.users = [];
          $scope.group.user = null;
          that.users = userService.getAll();
          $scope.index = null;
        };
        this.reset();
      },
      controllerAs: "groupsCtrl"
    };
  });

  app.directive("setLabels", function() {
    return {
      restrict: 'E',
      templateUrl: "./partials/set-labels.html",
      controller: function($scope, labelService) {
        var userId = $scope.user.id;
        $scope.label = {};
        $scope.index = null;
        $scope.save = function(label){
          // create
          if ($scope.index === null){
            label.userId = userId;
            var createdLabel = labelService.create(label);
            $scope.user.labels.push(angular.copy(createdLabel));
            label.name ="";
            label.color = null;
          //update
          } else {
            var updatedLabel = labelService.updateLabel(label);
            $scope.user.labels[$scope.index] = angular.copy(updatedLabel);
            label.name ="";
            label.color = null;
            $scope.index = null;
          }
        };

        $scope.deleteLabel = function(index){
          $scope.user.labels.splice(index, 1);
          labelService.deleteLabel(index);
        };

        $scope.editLabel = function(index, label){
          $scope.label = angular.copy(label);
          $scope.index = index;
        }

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
        this.users = userService.getAll();
        var that = this;

        $scope.save = function(user){
          // create
          if ($scope.index === null){
            user.unitId = unitId;
            var createdUser = userService.create(user);
            $scope.externists.push(angular.copy(createdUser));
            that.reset();
          //update
          } else {
            var updatedUser = userService.updateUser(user);
            $scope.externists[$scope.index] = angular.copy(updatedUser);
            that.reset();
          }
        };

        $scope.deleteUser = function(index){
          $scope.externists.splice(index, 1);
          userService.deleteUser(index);
        };

        $scope.editUser = function(index, user){
          $scope.user = angular.copy(user);
          $scope.index = index;
        };

        this.reset = function(){
          $scope.user = {};
          $scope.index = null;
        };
        this.reset();

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