(function () {
    var grpmod = angular.module('groups.module', ['utils.module', 'services.module']);

    // CONTROLLER
    grpmod.controller('groupsCtrl', function ($scope, groupService, userService) {
        var that = this;
        var newgrp = true;
        $scope.users = userService.getAll();

        $scope.showMembers = function (index, group) {
            $scope.group = angular.copy(group);
            $scope.index = index;
            that.newgrp = true;
        };

        $scope.saveGroup = function (group) {
            if ($scope.index === null) {
                // create
                // Ready for API v0.2
                //groupService.createGroup(group).success(function (data) {
                $scope.user.groups.push(angular.copy(group));
                that.reset();
                //});
            } else {
                //update
                // Ready for API v0.2
                //groupService.updateGroup(group.id, group).success(function (data) {
                $scope.user.groups[$scope.index] = angular.copy(group);
                that.reset();
                //});
            }
        };

        $scope.addMember = function (group) {
            if ($scope.group.users.indexOf(group.member) === -1) {
                $scope.group.users.push(group.member);
                // Ready for API v0.2
                //groupService.updateGroup(group.id, group).success(function(data){
                $scope.user.groups[$scope.index] = angular.copy(group);
                //});
            }
        };

        $scope.deleteMember = function (user, group) {
            $scope.group.users.splice($scope.group.users.indexOf(user), 1);
            // Ready for API v0.2
            //groupService.updateGroup(group.id, group).success(function (data) {
            $scope.user.groups[$scope.index] = angular.copy(group);
            //});
        };

        $scope.isDisabled = function (user) {
            return (typeof user.disabled !== 'undefined' && user.disabled);
        };

        $scope.deleteGroup = function (index) {
            // Ready for API v0.2
            // groupService.deleteGroup(index).success(function(data){
            $scope.user.groups.splice(index, 1);

            // });
        };

        $scope.editGroup = function (index, group) {
            $scope.group = angular.copy(group);
            $scope.index = index;
            that.newgrp = false;
        };

        $scope.clear = function () {
            if (that.newgrp) {
                that.reset();
            }
        };

        this.reset = function () {
            $scope.group = {};
            $scope.group.users = [];
            $scope.group.user = null;
            that.users = userService.getAll();
            $scope.index = null;
        };
        this.reset();
    });

    // DIRECTIVE
    grpmod.directive("setGroups", function () {
        return {
            restrict: 'E',
            templateUrl: "./partials/groups/set-groups.html",
            controller: 'groupsCtrl'
        };
    });
})();
