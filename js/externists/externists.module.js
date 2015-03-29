(function () {
    var extmod = angular.module('externists.module', ['utils.module', 'services.module']);

    //CONTROLLER
    extmod.controller('extrCtrl', function ($scope, userService) {
        var unitId = $scope.user.unitId;
        $scope.externists = userService.getExternistsForUnit(unitId);
        $scope.users = userService.getAll();
        var that = this;
        var modal = null;

        var getModal = function () {
            modal = $('#externist.modal');
            return modal;
        };

        $scope.addExternist = function () {

            getModal().modal('show');
        };

        $scope.saveExternists = function (externist) {
            // create
            if ($scope.index === null) {
                externist.unitId = unitId;
                var createdUser = userService.create(externist);
                $scope.externists.push(angular.copy(createdUser));
                that.reset();
                //update
            } else {
                var updatedUser = userService.updateUser(externist);
                $scope.externists[$scope.index] = angular.copy(updatedUser);
                that.reset();
            }
            getModal().modal('hide dimmer');
            getModal().destroy();
        };

        $scope.deleteUser = function (index) {
            $scope.externists.splice(index, 1);
            userService.deleteUser(index);
        };

        $scope.editUser = function (index, externist) {
            $scope.externist = angular.copy(externist);
            $scope.index = index;
            getModal().modal('show');
        };

        this.reset = function () {
            $scope.externist = {};
            $scope.index = null;
        };
        this.reset();
    });

    //DIRECTIVE
    extmod.directive("setExternist", function () {
        return {
            restrict: 'E',
            templateUrl: "./partials/set-externist.html",
            controller: 'extrCtrl'
        };
    });
})();
