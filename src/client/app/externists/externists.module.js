(function () {
    var extmod = angular.module('externists.module', ['utils.module', 'services.module']);

    // CONTROLLER
    // All userService methods return promise, so code will have to be modified

    extmod.controller('extrCtrl', extrCtrl);

	/* @ngInject */
	function extrCtrl($scope, userService, unitService) {
		var unitId = $scope.user.unitId;
		// Ready for API v0.2
		//userService.getExternistsForUnit(unitId).success(function(data){
		$scope.user.externists = userService.getExternistsForUnit(unitId);
		//});
		//userService.getAll().success(function(data){
		$scope.users = userService.getAll();
		//});
		//unitService.getAll().success(function (data) {
		$scope.units = unitService.getAll();
		//});
		var that = this;

		$scope.saveExternists = function (externist) {

			if ($scope.index === null) {
				// create
				externist.unitId = unitId;
				// Ready for API v0.2
				// userService.createUser(externist).success(function(data){
				var createdUser = userService.createUser(externist);
				$scope.user.externists.push(angular.copy(createdUser));
				that.reset();
				//});
			} else {
				// update
				// Ready for API v0.2
				//userService.updateUser(externist.id, externist).success(function (data) {
				var updatedUser = userService.updateUser(externist.id, externist);
				$scope.user.externists[$scope.index] = angular.copy(updatedUser);
				that.reset();
				//});
			}
		};

		$scope.deleteUser = function (index) {
			// Ready for API v0.2
			//userService.deleteUser(index).success(function (data) {
			$scope.user.externists.splice(index, 1);
			//});
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
	}

    // DIRECTIVES
    extmod.directive("setExternist", /* @ngInject */ function () {
        return {
            restrict: 'E',
            templateUrl: "app/externists/set-externist.html",
            controller: 'extrCtrl'
        };
    });
})();
