(function() {

  var app = angular.module('app', ['ui.router']);

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

  app.controller('NavigationController', function() {
    this.labels = labels;
    this.fastFolders = fastFolders;
  });

  app.controller('MainController', function() {
    this.user = unitUser;
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
      templateUrl: "./partials/set-groups.html"
    };
  });

  app.directive("setLabels", function() {
    return {
      restrict: 'E',
      templateUrl: "./partials/set-labels.html",
      controller: function() {
        this.labels = labels;
      },
      controllerAs: "labelsCtrl"
    };
  });

  app.directive("setRegistartion", function() {
    return {
      restrict: 'E',
      templateUrl: "./partials/set-registartion.html"
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

//-------------------------------------------------------------
// ---------------- DATA --------------------------------------
//-------------------------------------------------------------

  var unitUser = {
    name : "Karel"
  };

  // ----- labels -----
  var labels = [{
    id: 1,
    name: "Štítek 1",
    color: "red"
  },
  {
    id: 2,
    name: "Štítek 2",
    color: "blue"
  }];

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
      name: "SEN",
      users: ["Jan Novák"],
      size: 12345 
  },{
      name: "ATG",
      users: ["Petr Novák", "Karolína Novotná"],
      size: 12345 
  }
  ];

})();