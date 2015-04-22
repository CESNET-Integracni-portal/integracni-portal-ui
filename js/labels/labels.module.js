(function () {
    var lblmod = angular.module('labels.module', ['utils.module', 'services.module']);

    // CONTROLLER
    // All labelService methods return promise, so code will have to be modified

    lblmod.controller('lblCtrl', function ($scope, labelService) {
        $scope.label = {};
        $scope.index = null;

        $scope.saveLabel = function (label) {
            // create
            if ($scope.index === null) {
                // Ready for API v0.2
                //labelService.createLabel(label).success(function (data) {
                $scope.user.labels.push(angular.copy(label));
                label.name = "";
                label.color = null;
                //});
                //update
            } else {
                // Ready for API v0.2
                //labelService.updateLabel(label.id, label).success(function (data) {
                $scope.user.labels[$scope.index] = angular.copy(label);
                label.name = "";
                label.color = null;
                $scope.index = null;
                //});
            }
        };

        $scope.deleteLabel = function (index) {
            // Ready for API v0.2
            //labelService.deleteLabel(index).success(function (data) {
            $scope.user.labels.splice(index, 1);
            //});
        };

        $scope.editLabel = function (index, label) {
            $scope.label = angular.copy(label);
            $scope.index = index;
        };

        $scope.empty = function () {
            return (typeof $scope.label === 'undefined' || $scope.label.length === 0);
        };
    });

    lblmod.controller('labelSearchController', function ($scope, homeService, archiveService) {
        // TODO
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
