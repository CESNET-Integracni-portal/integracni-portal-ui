(function() {
  var app = angular.module('settings', []);

  app.directive("setChangePass", function() {
    return {
      restrict: 'E',
      templateUrl: "./partials/set-change-pass.html"
    };
  });

  app.directive("setOrgunits", function() {
    return {
      restrict: 'E',
      templateUrl: "./partials/set-org-units.html"
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
      templateUrl: "./partials/set-labels.html"
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

})();