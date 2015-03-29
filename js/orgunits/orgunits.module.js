(function () {
    var orgmod = angular.module('orgunits.module', ['utils.module', 'services.module']);

    // CONTROLLER
    orgmod.controller('orgunitsCtrl', function ($scope, unitService, userService) {
        $scope.units = unitService.getAll();
        $scope.users = userService.getAll();
        var that = this;
        var modal = null;

        var getModal = function () {
            modal = $('#orgunit.modal');
            return modal;
        };

        $scope.addOrgunit = function () {
            getModal().modal('show');
        };

        $scope.saveUnit = function (unit) {
            // create
            if ($scope.index === null) {
                var createdUnit = unitService.create(unit);
                $scope.units.push(angular.copy(createdUnit));
                that.reset();
                //update
            } else {
                var updatedUnit = unitService.updateUnit(unit);
                $scope.units[$scope.index] = angular.copy(updatedUnit);
                that.reset();
            }
            getModal().modal('hide dimmer');
            getModal().destroy();
        };

        $scope.deleteUnit = function (index) {
            $scope.units.splice(index, 1);
            userService.deleteUser(index);
        };

        $scope.editUnit = function (index, unit) {
            $scope.unit = angular.copy(unit);
            $scope.index = index;
            getModal().modal('show');
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
            templateUrl: "./partials/set-org-units.html",
            controller: 'orgunitsCtrl'
        };
    });
})();
