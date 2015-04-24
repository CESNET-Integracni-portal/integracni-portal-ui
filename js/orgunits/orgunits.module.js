(function () {
    var orgmod = angular.module('orgunits.module', ['utils.module', 'services.module']);

    // CONTROLLER
    orgmod.controller('orgunitsCtrl', function ($scope, unitService, userService) {
        // Ready for API v0.2
        //unitService.getAll().success(function(data){
        //    $scope.units = data;
        //});
        $scope.units = unitService.getAll();
        //userService.getAll().success(function (data) {
        //    $scope.users = data;
        //});
        $scope.users = userService.getAll();
        var that = this;

        $scope.saveUnit = function (unit) {
            if ($scope.index === null) {
                // create
                // Ready for API v0.2
                // unitService.createUnit(unit).success(function (data) {
                // var createdUnit = data;
                var createdUnit = unit;
                $scope.units.push(angular.copy(createdUnit));
                that.reset();
                //});
            } else {
                //update
                // Ready for API v0.2
                if (unit.name !== $scope.oldunit.name) {
                    unitService.renameUnit(unit.id, unit.name);
                }
                if (unit.quota !== $scope.oldunit.quota) {
                    unitService.changeQuota(unit.id, unit.quota);
                }
                // todo - userids instead of emails
                if (unit.admins !== $scope.oldunit.admins) {
                    unitService.assignAdmins(unit.id, unit.admins);
                }
                $scope.units[$scope.index] = angular.copy(unit);
                that.reset();
            }
        };

        $scope.deleteUnit = function (index) {
            // Ready for API v0.2
            //unitService.deleteUnit(index).success(function (data) {
            $scope.units.splice(index, 1);
            //});
        };

        $scope.editUnit = function (index, unit) {
            $scope.unit = angular.copy(unit);
            $scope.oldunit = angular.copy(unit);
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
