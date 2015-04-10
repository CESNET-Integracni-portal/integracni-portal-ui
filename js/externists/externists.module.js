(function () {
    var extmod = angular.module('externists.module', ['utils.module', 'services.module', 'Mac']);

    // CONTROLLER
    // All userService methods return promise, so code will have to be modified

    extmod.controller('extrCtrl', function ($scope, userService, unitService) {
        var unitId = $scope.user.unitId;
        // needs to be modified for API v.2 in the future
        $scope.externists = userService.getExternistsForUnit(unitId);
        $scope.users = userService.getAll();
        $scope.units = unitService.getAll();
        
        var that = this;

        $scope.saveExternists = function (externist) {
            // create
            if ($scope.index === null) {
                externist.unitId = unitId;
                // needs to be modified for API v.2 in the future
                var createdUser = userService.createUser(externist);
                $scope.externists.push(angular.copy(createdUser));
                that.reset();
                //update
            } else {
                // needs to be modified for API v.2 in the future
                var updatedUser = userService.updateUser(externist);
                $scope.externists[$scope.index] = angular.copy(updatedUser);
                that.reset();
            }
        };

        $scope.deleteUser = function (index) {
            $scope.externists.splice(index, 1);
            // needs to be modified for API v.2 in the future
            userService.deleteUser(index);
        };

        $scope.editUser = function (index, externist) {
            $scope.externist = angular.copy(externist);
            $scope.index = index;
        };

        this.reset = function () {
            $scope.externist = {};
            $scope.index = null;
        };
        this.reset();
    });

    // DIRECTIVES
    extmod.directive("setExternist", function () {
        return {
            restrict: 'E',
            templateUrl: "./partials/externists/set-externist.html",
            controller: 'extrCtrl'
        };
    });
})();
