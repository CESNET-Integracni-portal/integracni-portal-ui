(function () {
    var stgmod = angular.module('settings.module', []);

    // DIRECTIVES
    stgmod.directive("adminTabs", function () {
        return {
            restrict: "E",
            templateUrl: "./partials/settings_pages/admin-tabs.html",
            controller: function () {
                this.tab = 3;

                this.isSet = function (checkTab) {
                    return this.tab === checkTab;
                };

                this.setTab = function (activeTab) {
                    this.tab = activeTab;
                };
            },
            controllerAs: "tab"
        };
    });

    stgmod.directive("settingsTabs", function () {
        return {
            restrict: "E",
            templateUrl: "./partials/settings_pages/settings-tabs.html",
            controller: function () {
                this.tab = 1;

                this.isSet = function (checkTab) {
                    return this.tab === checkTab;
                };

                this.setTab = function (activeTab) {
                    this.tab = activeTab;
                };
            },
            controllerAs: "tab"
        };
    });
})();
