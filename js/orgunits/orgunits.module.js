(function () {
    var orgmod = angular.module('orgunits.module', ['utils.module', 'services.module']);

    // CONTROLLER
    // All unitService methods return promise, so code will have to be modified

    orgmod.controller('orgunitsCtrl', function ($scope, unitService, userService) {
        // needs to be modified for API v.2 in the future
        $scope.units = unitService.getAll();
        $scope.users = userService.getAll();
        
        var that = this;

        $scope.saveUnit = function (unit) {
            // create
            if ($scope.index === null) {
                // needs to be modified for API v.2 in the future
                var createdUnit = unitService.createUnit(unit);
                $scope.units.push(angular.copy(createdUnit));
                that.reset();
                //update
            } else {
                // needs to be modified for API v.2 in the future
                var updatedUnit = unitService.updateUnit(unit);
                $scope.units[$scope.index] = angular.copy(updatedUnit);
                that.reset();
            }
        };

        $scope.deleteUnit = function (index) {
            $scope.units.splice(index, 1);
            // needs to be modified for API v.2 in the future
            userService.deleteUser(index);
        };

        $scope.editUnit = function (index, unit) {
            $scope.unit = angular.copy(unit);
            $scope.index = index;
        };

        this.reset = function () {
            $scope.unit = {};
            $scope.index = null;
        };
        this.reset();
    });

    // DIRECTIVE
    orgmod.directive("setOrgunits", function () {
        return {
            restrict: 'E',
            templateUrl: "./partials/orgunits/set-org-units.html",
            controller: 'orgunitsCtrl'
        };
    });
})();
