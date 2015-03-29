(function () {
    var dirmod = angular.module('directives.module', []);

    dirmod.directive("customSidebar", function () {
        var mySidebar;

        if (typeof mySidebar === 'undefined' || mySidebar === null) {
            return;
        }
        return {
            restrict: 'EA',
            templateUrl: function (tElement, tAttrs) {
                return tAttrs.templateUrl;
            }
        };
    });
})();
