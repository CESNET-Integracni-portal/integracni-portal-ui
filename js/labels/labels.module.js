(function () {
    var lblmod = angular.module('labels.module', ['utils.module', 'services.module']);

    // CONTROLLER
    // All labelService methods return promise, so code will have to be modified
    
    lblmod.controller('lblCtrl', function ($scope, labelService) {
        var userId = $scope.user.id;
        $scope.label = {};
        $scope.index = null;

        $scope.saveLabel = function (label) {
            // create
            if ($scope.index === null) {
                label.userId = userId;
                // needs to be modified for API v.2 in the future
                var createdLabel = labelService.createLabel(label);
                $scope.user.labels.push(angular.copy(createdLabel));
                label.name = "";
                label.color = null;
                //update
            } else {
                // needs to be modified for API v.2 in the future
                // update label will have labelId parameter
                var updatedLabel = labelService.updateLabel(label);
                $scope.user.labels[$scope.index] = angular.copy(updatedLabel);
                label.name = "";
                label.color = null;
                $scope.index = null;
            }
        };

        $scope.deleteLabel = function (index) {
            $scope.user.labels.splice(index, 1);
            // needs to be modified for API v.2 in the future
            labelService.deleteLabel(index);
        };

        $scope.editLabel = function (index, label) {
            $scope.label = angular.copy(label);
            $scope.index = index;
        };

        $scope.empty = function () {
            return (typeof $scope.label === 'undefined' || $scope.label.length === 0);
        };
    });

    // DIRECTIVE
    lblmod.directive("setLabels", function () {
        return {
            restrict: 'E',
            templateUrl: "./partials/labels/set-labels.html",
            controller: 'lblCtrl'
        };
    });
})();
