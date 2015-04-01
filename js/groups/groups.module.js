(function () {
    var grpmod = angular.module('groups.module', ['utils.module', 'services.module']);

    // CONTROLLER
    grpmod.controller('groupsCtrl', function ($scope, groupService, userService) {
        var userId = $scope.user.id;
        var that = this;
        var newgrp = true;
        $scope.users = userService.getAll();

        $scope.showMembers = function (index, group) {
            $scope.group = angular.copy(group);
            $scope.index = index;
            that.newgrp = true;
        };

        $scope.saveGroup = function (group) {
            // create
            if ($scope.index === null) {
                group.userId = userId;
                var createdGroup = groupService.create(group);
                $scope.user.groups.push(angular.copy(createdGroup));
                that.reset();
                //update
            } else {
                var updatedGroup = groupService.updateGroup(group);
                $scope.user.groups[$scope.index] = angular.copy(updatedGroup);
                that.reset();
            }
        };

        $scope.addMember = function (group) {
            if ($scope.group.users.indexOf(group.member) === -1) {
                $scope.group.users.push(group.member);
                var updatedGroup = groupService.updateGroup(group);
                $scope.user.groups[$scope.index] = angular.copy(updatedGroup);
            }
        };

        $scope.deleteMember = function (user, group) {
            $scope.group.users.splice($scope.group.users.indexOf(user), 1);
            var updatedGroup = groupService.updateGroup(group);
            $scope.user.groups[$scope.index] = angular.copy(updatedGroup);
        };

        $scope.addUser = function (index) {
            if ($scope.group.user !== null) {
                that.users[index].disabled = true;
                that.users[index].originalIndex = index;
                $scope.group.users.push($scope.users[index]);
                $scope.group.user = null;
            }
        };

        $scope.isDisabled = function (user) {
            return (typeof user.disabled !== 'undefined' && user.disabled);
        };

        $scope.removeUser = function (index) {

        };

        $scope.deleteGroup = function (index) {
            $scope.user.groups.splice(index, 1);
            groupService.deleteGroup(index);
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
